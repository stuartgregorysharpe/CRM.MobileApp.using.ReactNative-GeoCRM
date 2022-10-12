
import { View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import DevicesModalView from './DevicesModalView';
import { Constants } from '../../../../constants';
import { getApiRequest } from '../../../../actions/api.action';
import { useNavigation } from '@react-navigation/native';
import { expireToken } from '../../../../constants/Helper';
import { useDispatch } from 'react-redux';

export default function DevicesModalContainer(props) {
    
    const { locationId } = props;
    const  [lists, setLists] = useState([])
    const navigationMain = useNavigation();

    const dispatch = useDispatch()

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
            console.log("location device api error: " , e);
            expireToken(dispatch , e);
        })
        return () =>{
            isMount = false;
        }
    },[]);

    const handleAction = (value) => {
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }
    
    const openStockModule = () => {
        navigationMain.navigate('DeeplinkStock');
        props.onButtonAction({type: Constants.actionType.ACTION_CLOSE, value: 0});
    }
    
    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            <DevicesModalView                 
                onButtonAction={handleAction}              
                lists= {lists}  
                openStockModule={openStockModule}
                {...props}
            />
        </View>
    )
}