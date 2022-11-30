
import { View , BackHandler } from 'react-native'
import React , { useState , useEffect } from 'react'
import SetupFieldView from '../components/SetupFieldView';
import { GetRequestAddProductFieldsDAO, GetRequestProductsFiltersDAO } from '../../../../DAO';
import { expireToken } from '../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import { Constants, Strings } from '../../../../constants';
import ProductFilterView from '../components/ProductFilterView';
import AddProductView from '../components/add_product/AddProductView';
import GetRequestAddProductFields from '../../../../DAO/sales/GetRequestAddProductFields';

const  AddProductContainer = (props) => {
        
    const dispatch = useDispatch();
    const [fields, setFields] = useState([])
    let isMount = true;
  

    useEffect(() => {        
        GetRequestAddProductFieldsDAO.find({}).then((res) => {            
            if(isMount){
                if(res.status == Strings.Success){
                    if(props.onChangeTitle)                    
                        props.onChangeTitle(res.title);
                    setFields(res.fields);
                }
            }
        }).catch((e) => {
            expireToken(dispatch, e);
        });

        return () =>{
            isMount = false;
        }        
    }, []);


    
    return (
        <View style={{
            alignSelf:'stretch' , 
            flex:1 , 
            marginHorizontal:10, 
            marginBottom:10,              
             
        }}>                  
            <AddProductView 
                fields={fields}    
                {...props} />
            
        </View>
    )
}
export default AddProductContainer;