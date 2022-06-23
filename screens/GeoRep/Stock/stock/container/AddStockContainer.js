
import { View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import AddStockView from '../components/AddStockView'
import { getApiRequest, postApiRequest } from '../../../../../actions/api.action';
import { Constants } from '../../../../../constants';
import { useSelector } from 'react-redux';
import { getPostParameter } from '../../../../../constants/Helper';
import { showNotification } from '../../../../../actions/notification.action';
import { useDispatch } from 'react-redux';

export default function AddStockContainer(props) {
     
    const dispatch = useDispatch()
    const [deviceTypeLists, setDevicetypeLists] =  useState([]);    
    const [stockTypes, setStockTypes] = useState({});    
    const currentLocation = useSelector(state => state.rep.currentLocation);

    useEffect(() => {
        _callStockFieldData();
    },[]);

    const _callStockFieldData = () => {        
        
        getApiRequest("stockmodule/stock-field-data?action=add_stock" , {}).then((res) =>{            
            if(res.status === "success"){
                console.log("add stock", res.stock_types);
                setStockTypes(res.stock_types); 
                var types = [];
                for(let value of Object.keys(res.stock_types)){                    
                    types.push({value:value, label:value});
                }                
                console.log("tupes" , types)
                setDevicetypeLists(types);
            }
        }).catch((e) => {
            
        });
    }

    const callAddStock = (type, data) => {
        var userParam = getPostParameter(currentLocation);
        data['user_local_data'] = userParam.user_local_data;                
        console.log("post data" , data)

        postApiRequest("stockmodule/add-stock" , data).then((res) =>{
            if(res.status === "success"){
                dispatch(showNotification({type:'success' , message: res.message , buttonText: 'Ok'}));
            }else{
                dispatch(showNotification({type:'success' , message: res.errors , buttonText: 'Ok'}));
            }
            
            console.log("message" , res)
        }).catch((e) => {
            console.log("error", e)
        })
    }


    return (
        <View style={{alignSelf:'stretch'}}>
            <AddStockView 
                callAddStock={callAddStock}
                stockTypes={stockTypes}
                deviceTypeLists={deviceTypeLists}                
                {...props}
            />
        </View>
    )
}