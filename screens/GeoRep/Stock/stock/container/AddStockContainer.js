
import { View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import AddStockView from '../components/AddStockView'
import { getApiRequest } from '../../../../../actions/api.action';

export default function AddStockContainer(props) {
     
    const [deviceTypeLists, setDevicetypeLists] =  useState([]);    
    const [stockTypes, setStockTypes] = useState({});    

    useEffect(() => {
        _callStockFieldData();
    },[]);

    const _callStockFieldData = () => {        
        
        getApiRequest("https://dev.georep.com/local_api_old/stockmodule/stock-field-data?action=add_stock" , {}).then((res) =>{            
            if(res.status === "success"){
                setStockTypes(res.stock_types); 
                var types = [];
                for(let value of Object.keys(res.stock_types)){                    
                    types.push({value:value, label:value});
                }                
                setDevicetypeLists(types);
            }
        }).catch((e) => {
            
        });
    }

    
    const callAddStock = (type, data) => {
        
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