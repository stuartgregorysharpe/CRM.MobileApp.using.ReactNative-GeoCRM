
import { Dimensions, View } from 'react-native'
import React , { useState , useEffect } from 'react'
import { SubmitButton } from '../../../../components/shared/SubmitButton';
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
        })

        return () =>{
            isMount = false;
        }
    }, []);

    
    return (
        <View style={{alignSelf:'stretch' , flex:1 , marginHorizontal:10, marginBottom:10 
        // , maxHeight: 500
        }}>                  
            <SetupFieldView transaction_types={transaction_types} warehouse={warehouse} currency={currency} {...props} />
            
        </View>
    )
}
export default SetupFieldContainer;