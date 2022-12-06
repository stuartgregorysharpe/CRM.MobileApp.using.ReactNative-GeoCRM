
import { View , BackHandler } from 'react-native'
import React , { useState , useEffect } from 'react'
import { GetRequestAddProductFieldsDAO, GetRequestProductsFiltersDAO, GetRequestTransactionSubmitFieldsDAO } from '../../../../DAO';
import { expireToken } from '../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import { Constants, Strings } from '../../../../constants';
import { getJsonData, getTokenData } from '../../../../constants/Storage';
import { getRandomNumber, getTimeStamp } from '../../../../helpers/formatHelpers';
import DynamicFormView from '../../../../components/common/DynamicFormView';

const  TransactionSubmitContainer = (props) => {
        
    const dispatch = useDispatch();
    const [fields, setFields] = useState([])
    let isMount = true;
  
    useEffect(() => {        
        getTransactinSubmit();

        return () =>{
            isMount = false;
        }        
    }, []);

    const getTransactinSubmit = async() => {
        
        var setup = await getJsonData("@setup");
        var param = {};
        if(setup != null && setup.location && setup.transaction_type){
            
            param = {
                transaction_type : setup.transaction_type,
                location_id : setup.location.location_id
            }

            GetRequestTransactionSubmitFieldsDAO.find(param).then((res) => {            
                if(isMount){
                    if(res.status == Strings.Success){
                        console.log("res", JSON.stringify(res))
                        if(props.onChangeTitle)                    
                            props.onChangeTitle(res.title);
                        setFields(res.fields);
                    }
                }
            }).catch((e) => {
                expireToken(dispatch, e);
            });
        }

    }

    const onAdd = async(data) => {
        const  user_id = await getTokenData("user_id");
        const  add_product_id =  getTimeStamp() + user_id + getRandomNumber(4);
        const  submitData = {
            ...data,
            add_product_id : add_product_id
        }
        console.log("submitData",submitData);
        props.onButtonAction({type: Constants.actionType.ACTION_DONE, value: submitData});
    }
    
     return (
        <View style={{
            alignSelf:'stretch' , 
            flex:1 , 
            marginHorizontal:10, 
            marginBottom:10,     
            paddingTop:10         
             
        }}>                  
            <DynamicFormView
                fields={fields}    
                onAdd={onAdd}
                {...props} />
            
        </View>
    )
}

export default TransactionSubmitContainer;