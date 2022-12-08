
import { Dimensions, View  } from 'react-native'
import React , { useState , useEffect } from 'react'
import { GetRequestTransactionSubmitFieldsDAO } from '../../../../DAO';
import { expireToken } from '../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import { Constants, Strings } from '../../../../constants';
import { getJsonData, getTokenData } from '../../../../constants/Storage';
import { getRandomNumber, getTimeStamp } from '../../../../helpers/formatHelpers';
import DynamicFormView from '../../../../components/common/DynamicFormView';
import { useSelector } from 'react-redux';
import * as RNLocalize from 'react-native-localize';

const  TransactionSubmitContainer = (props) => {
        
    const dispatch = useDispatch();
    const [fields, setFields] = useState([])
    const currentLocation = useSelector(state => state.rep.currentLocation);
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
            
            if(props.onChangeTitle)                    
                props.onChangeTitle(setup.transaction_type.type + " Details");

            param = {
                transaction_type : setup.transaction_type.type,
                location_id : setup.location.location_id
            }

            GetRequestTransactionSubmitFieldsDAO.find(param).then((res) => {            
                if(isMount){
                    if(res.status == Strings.Success){                               
                        setFields(res.fields);
                        console.log("api res", res.fields)
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
        //props.onButtonAction({type: Constants.actionType.ACTION_DONE, value: submitData});
        
        var res = await generatePostParam(data);
        console.log("post data", res)
    }

    const generatePostParam =  async(data) => {        

        try{
            var transactionFields = [];        
            Object.keys(data).forEach(key =>{
                transactionFields.push({field_id: key , answer: data[key]});
            });
            var items = [];
            var added_products = [];
            const setupData = await getJsonData("@setup");
            console.log("setupData" ,setupData)    
            var time_zone = RNLocalize.getTimeZone();
            var postJsonData = {
                transaction_type : setupData.transaction_type.type,
                location_id: setupData.location.location_id,
                currency_id: setupData.currency_id.id,
                cart:{
                    items:items,
                    added_products: added_products,
                    totals: {
                        discount : '',
                        sub_total: '',
                        tax: '',
                        total: ''
                    }
                },
                transaction_fields : transactionFields,
                'user_local_data[time_zone]' : time_zone,
                'user_local_data[latitude]' : currentLocation && currentLocation.latitude != null ? currentLocation.latitude : '0',
                'user_local_data[longitude]' : currentLocation && currentLocation.longitude != null ? currentLocation.longitude : '0'
            }
            
        }catch(e){
            console.log(e)
        }
        return postJsonData;
    }
    
     return (
        <View style={{
            alignSelf:'stretch' , 
            flex:1 , 
            marginHorizontal:10, 
            marginBottom:10,     
            paddingTop:10,
            maxHeight: Dimensions.get("screen").height * 0.8
             
        }}>                  
            <DynamicFormView
                page="transaction_submit"
                buttonTitle={"Submit"}
                fields={fields}    
                onAdd={onAdd}
                {...props} />
            
        </View>
    )
}

export default TransactionSubmitContainer;