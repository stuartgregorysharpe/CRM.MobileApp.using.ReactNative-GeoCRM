
import { View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import DevicesModalView from '../components/DevicesModalView';
import { Constants } from '../../../../../constants';
import { useNavigation } from '@react-navigation/native';
import { expireToken } from '../../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import { GetRequestLocationDevicesDAO } from '../../../../../DAO';
let isMount = true;

export default function DevicesModalContainer(props) {
    
    const { locationId } = props;
    if( !locationId) return null;

    const  [lists, setLists] = useState([]);
    const navigationMain = useNavigation();
    const dispatch = useDispatch()
    
    useEffect(() => {
        
        getDeviceLists();
        return () =>{
            isMount = false;
        }
    },[]);

    const getDeviceLists = () => {
        let param = {
            location_id: locationId
        };                
                
        GetRequestLocationDevicesDAO.find(param).then((res) => {
            console.log("res", res, isMount)
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