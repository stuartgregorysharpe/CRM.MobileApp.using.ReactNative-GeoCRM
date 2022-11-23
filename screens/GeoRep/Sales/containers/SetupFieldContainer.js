
import { View , BackHandler } from 'react-native'
import React , { useState , useEffect } from 'react'
import SetupFieldView from '../components/SetupFieldView';
import { GetRequestSetupFieldDAO } from '../../../../DAO';
import { expireToken } from '../../../../constants/Helper';
import { useDispatch } from 'react-redux';

const  SetupFieldContainer = (props) => {
    
    const [transaction_types , setTransactinTypes] = useState(null);
    const [warehouse , setWarehouse] = useState(null);
    const [currency , setCurrency] = useState(null);

    const dispatch = useDispatch()    
    let isMount = true;

    useEffect(() => {
        
        GetRequestSetupFieldDAO.find({}).then((res) => {            
            setTransactinTypes(res.transaction_types);
            setWarehouse(res.warehouse);
            setCurrency(res.currency);
        }).catch((e) => {
            expireToken(dispatch, e);
        });

        
    }, []);

 

    
    return (
        <View style={{alignSelf:'stretch' , flex:1 , marginHorizontal:10, marginBottom:10,  minHeight:300
             
        }}>                  
            <SetupFieldView 
                transaction_types={transaction_types} 
                currency={currency}
                warehouse={warehouse}  
                {...props} />
            
        </View>
    )
}
export default SetupFieldContainer;