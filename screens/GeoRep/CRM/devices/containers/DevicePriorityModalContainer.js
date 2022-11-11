
import { View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import { Constants, Strings } from '../../../../../constants';
import { expireToken } from '../../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import { GetRequestLocationDevicesDAO, PostRequestDAO } from '../../../../../DAO';
import DevicePriorityModalView from '../components/DevicePriorityModalView';
import { clearNotification, showNotification } from '../../../../../actions/notification.action';

export default function DevicePriorityModalContainer(props) {
        
    const dispatch = useDispatch()
    const { device } = props;
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (isPrimary) => {
        
        if(!isLoading){
            setIsLoading(true)
            var postData = {
                location_device_id: device.location_device_id,
                primary_device: isPrimary? "1" : "0"
            }

            let primaryText = isPrimary ? "Primry" : "Additional";            
            PostRequestDAO.find(0, 
                    postData, 
                    "device_update", 
                    "device/update", 
                    device.description, 
                    device.msisdn + "("  + primaryText  +  ")" ).then((res) => {

                        setIsLoading(false)
                        dispatch((showNotification({type:Strings.Success , message : res.message, buttonText: Strings.Ok , buttonAction : () => {
                            props.onButtonAction({type: Constants.actionType.ACTION_CLOSE, value: 0});
                            dispatch(clearNotification());
                        }})));

            }).catch((e) => {
                setIsLoading(false)
                expireToken(dispatch, e);
            })
            
        }    
    }
        
    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            <DevicePriorityModalView                 
                onSubmit={onSubmit}
                isLoading={isLoading}
                {...props}
            />
        </View>
    )
}