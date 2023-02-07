
import { View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import { Constants, Strings } from '../../../../../constants';
import { expireToken } from '../../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import { PostRequestDAO } from '../../../../../DAO';
import DevicePriorityModalView from '../components/DevicePriorityModalView';
import { clearLoadingBar, clearNotification, showLoadingBar, showNotification } from '../../../../../actions/notification.action';
import { generateKey } from '../../../../../constants/Utils';

var device_update_indempotency = '';

export default function DevicePriorityModalContainer(props) {
            
    const dispatch = useDispatch()
    const { device } = props;
    if(!device) return null;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        device_update_indempotency = generateKey();
    }, []);

    const onSubmit = (isPrimary) => {
        
        if(!isLoading){
            setIsLoading(true);
            
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
                    device.msisdn + "("  + primaryText  +  ")" ,
                    device_update_indempotency,
                    dispatch
                    ).then((res) => {
                        
                        setIsLoading(false);                        
                        dispatch((showNotification({type:Strings.Success , message : res.message, buttonText: Strings.Ok , buttonAction : () => {
                            props.onButtonAction({type: Constants.actionType.ACTION_CLOSE, value: 0});
                            dispatch(clearNotification());
                        }})));

            }).catch((e) => {
                setIsLoading(false);                
                expireToken(dispatch, e);
            })
            
        }    
    }
        
    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            <DevicePriorityModalView                 
                onSubmit={onSubmit}                
                {...props}
            />
        </View>
    )
}