
import { View } from 'react-native'
import React , {useEffect, useState } from 'react'
import { getApiRequest, postApiRequest, postApiRequestMultipart } from '../../../../../actions/api.action';
import SwopAtTraderView from '../components/SwopAtTraderView';
import * as RNLocalize from 'react-native-localize';
import { useSelector } from 'react-redux';

export default function SwopAtTraderContainer(props) {
         
    const [lists, setLists] = useState([{description:'des'}]);
    const [returnDevice, setReturnDevice] = useState();
    const [reason, setReason] = useState('');
    const [photos, setPhotos] = useState([]);
    const currentLocation = useSelector(state => state.rep.currentLocation);

    useEffect(() => {
        let param = {
            location_id: 1,
        };
        console.log("param", param);
        getApiRequest("https://dev.georep.com/local_api_old/locations/location-devices", param ).then((res) => {            
            console.log("api respnse", res)
            setLists(res.devices);
        }).catch((e) => {
            console.log("e" , e);
        })
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
        postData.append('return_device',  returnDevice);
        postData.append('allocate_device',  reason);
        photos.map((item, index) => {
            postData.append(`File['return_image'][${index}]`,  item);
        })
        
        var time_zone = RNLocalize.getTimeZone();
        postData.append('user_local_data[time_zone]', time_zone);
        postData.append( 'user_local_data[latitude]', currentLocation && currentLocation.latitude != null ? currentLocation.latitude : '0' );
        postData.append( 'user_local_data[longitude]', currentLocation && currentLocation.longitude != null ? currentLocation.longitude : '0' );
                        
        postApiRequestMultipart("stockmodule/swop-at-trader" , postData).then((res) => {

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