
import { View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import DevicesModalView from '../components/DevicesModalView';
import { Constants } from '../../../../../constants';
import { getApiRequest } from '../../../../../actions/api.action';
import { useNavigation } from '@react-navigation/native';
import { expireToken } from '../../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import GetRequestLocationDevices from '../../../../../DAO/locations/GetRequestLocationDevices';
import { GetRequestLocationDevicesDAO } from '../../../../../DAO';
import { getDevice } from 'react-native-device-info';

export default function DevicesModalContainer(props) {
    
    const { locationId } = props;
    const  [lists, setLists] = useState([])
    const navigationMain = useNavigation();

    const dispatch = useDispatch()
    let isMount = true;

    useEffect(() => {
        
        getDeviceLists();
        return () =>{
            isMount = false;
        }
    },[]);

    const getDeviceLists = () => {
        let param = {
            location_id: locationId,
        };                
        GetRequestLocationDevicesDAO.find(param).then((res) => {
            if(isMount){                             
                setLists(res.devices);
            }
        }).catch((e) => {
            console.log("location device api error: " , e);
            expireToken(dispatch , e);
        })
    }

    const handleAction = (value) => {
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }
    
    const openStockModule = () => {
        navigationMain.navigate('DeeplinkStock');
        props.onButtonAction({type: Constants.actionType.ACTION_CLOSE, value: 0});
    }

    const onRefresh = () =>{
        getDeviceLists()
    }
    
    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            <DevicesModalView                 
                onButtonAction={handleAction}              
                lists= {lists}  
                openStockModule={openStockModule}
                onRefresh={onRefresh}
                {...props}
            />
        </View>
    )
}