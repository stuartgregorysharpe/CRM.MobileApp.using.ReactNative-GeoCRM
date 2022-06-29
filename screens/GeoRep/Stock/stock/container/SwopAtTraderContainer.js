
import { View } from 'react-native'
import React , {useEffect, useState } from 'react'
import { getApiRequest, postApiRequest, postApiRequestMultipart } from '../../../../../actions/api.action';
import SwopAtTraderView from '../components/SwopAtTraderView';
import * as RNLocalize from 'react-native-localize';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../../../actions/notification.action';

export default function SwopAtTraderContainer(props) {
         
    const { locationId , item } = props;
    
    const [lists, setLists] = useState([]);
    const [returnDevice, setReturnDevice] = useState();
    const [reason, setReason] = useState('');
    const [photos, setPhotos] = useState([]);
    const currentLocation = useSelector(state => state.rep.currentLocation);
    const dispatch = useDispatch();

    console.log("PPP", props.item)

    useEffect(() => {
        let isMount = true;
        let param = {
            location_id: locationId,
        };        
        console.log("pp" , param)
        getApiRequest("locations/location-devices", param ).then((res) => {                        
            if(isMount){
                console.log("RR", res)
                setLists(res.devices);
            }            
        }).catch((e) => {
            console.log("e" , e);
        })
        return () =>{
            isMount = false;
        }
    },[]); 
     
    const onReturnDevice = (returnDevice) => {        
        setReturnDevice(returnDevice);
    }
    const onReason = (reason) =>{        
        setReason(reason)
    }
    const onPhotos = (photos) => {
        setPhotos(photos)
    }

    const onSwop = () => {        
        var postData = new FormData();
        postData.append('stock_type', "Device");
        postData.append('location_id',  props.locationId);                
        postData.append('return_device[location_device_id]', returnDevice.location_device_id);
        postData.append('return_device[return_reason]', reason);

        postData.append('allocate_device[stock_item_id]',  item.stock_item_id);
        postData.append('allocate_device[assigned_msisdn]',  item.serial);
        photos.map((item, index) => {
            var words = item.split('/');
            var ext = words[words.length - 1].split('.');
            var key = `return_image[${index}]`;
            postData.append( key, {
                uri: item,
                type: 'image/' + ext[1],
                name: words[words.length - 1],
            });      
        })
        
        var time_zone = RNLocalize.getTimeZone();
        postData.append('user_local_data[time_zone]', time_zone);
        postData.append( 'user_local_data[latitude]', currentLocation && currentLocation.latitude != null ? currentLocation.latitude : '0' );
        postData.append( 'user_local_data[longitude]', currentLocation && currentLocation.longitude != null ? currentLocation.longitude : '0' );
                        
        postApiRequestMultipart("stockmodule/swop-at-trader" , postData).then((res) => {
            dispatch(showNotification({type:'success' , message: res.message, buttonText: 'Ok'}))
        }).catch((e) => {

        });
    }

    return (
        <View style={{alignSelf:'stretch'}}>
            <SwopAtTraderView                                
                onSwop = {onSwop}
                onReturnDevice={onReturnDevice}
                onReason={(reason) => onReason(reason)}
                onPhotos={(photos) => onPhotos(photos)}
                lists={lists}
                {...props}
            />

        </View>
    )
}