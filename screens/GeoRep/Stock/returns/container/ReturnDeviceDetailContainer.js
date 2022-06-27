
import { View } from 'react-native'
import React , {useEffect, useState } from 'react'
import { getApiRequest, postApiRequest, postApiRequestMultipart } from '../../../../../actions/api.action';
import * as RNLocalize from 'react-native-localize';
import { useSelector } from 'react-redux';
import ReturnDeviceDetailView from '../components/ReturnDeviceDetailView';

export default function ReturnDeviceDetailContainer(props) {
         
    const { locationId } = props;    
    const [lists, setLists] = useState([]);
    const [returnDevice, setReturnDevice] = useState();
    const [reason, setReason] = useState('');
    const [photos, setPhotos] = useState([]);
    const currentLocation = useSelector(state => state.rep.currentLocation);

    useEffect(() => {
        let isMount = true;
        let param = {
            location_id: locationId,
        };        
        getApiRequest("locations/location-devices", param ).then((res) => {                        
            if(isMount){      
                console.log("location id", locationId);
                console.log("res" , JSON.stringify(res))          
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

    const onReturnStock = () => {  

        var postData = new FormData();
        postData.append('stock_type', "Device");
        postData.append('location_id',  props.locationId);        
        postData.append('return_device',  returnDevice);
        postData.append('allocate_device',  reason);
        photos.map((item, index) => {
            postData.append(`File['return_image'][${index}]`,  item);
        })
        
        var time_zone = RNLocalize.getTimeZone();
        postData.append('user_local_data[time_zone]', time_zone);
        postData.append( 'user_local_data[latitude]', currentLocation && currentLocation.latitude != null ? currentLocation.latitude : '0' );
        postData.append( 'user_local_data[longitude]', currentLocation && currentLocation.longitude != null ? currentLocation.longitude : '0' );
                        
        postApiRequestMultipart("stockmodule/return-device" , postData).then((res) => {

        }).catch((e) => {

        });
    }

    return (
        <View style={{alignSelf:'stretch'}}>
            <ReturnDeviceDetailView                                
                onReturnStock = {onReturnStock}
                onReturnDevice={onReturnDevice}
                onReason={(reason) => onReason(reason)}
                onPhotos={(photos) => onPhotos(photos)}
                lists={lists}
                {...props}
            />

        </View>
    )
}