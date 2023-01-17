
import { View  } from 'react-native'
import React , { useState , useEffect } from 'react'
import { GetRequestProductsFiltersDAO } from '../../../../DAO';
import { expireToken } from '../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import { Constants, Strings } from '../../../../constants';
import ProductFilterView from '../components/ProductFilterView';

const  ProductFilterContainer = (props) => {
    
    const [typeLists , setTypeLists] = useState([]);
    const [brandLists , setBrandLists] = useState([]);

    const dispatch = useDispatch()
    let isMount = true;
  
    useEffect(() => {        
        GetRequestProductsFiltersDAO.find({}).then((res) => {            
            if(isMount){
                if(res.status == Strings.Success && res.filters){
                    initializeData(res.filters , Constants.productFilterType.PRODUCT_TYPE)
                    initializeData(res.filters , Constants.productFilterType.BRAND)
                }                
            }
        }).catch((e) => {
            expireToken(dispatch, e);
        });

        return () =>{
            isMount = false;
        }        
    }, []);


    const initializeData = ( lists,  type) => {
        var productType = lists.find(item => item.filter_type === type);
        if(productType != undefined){
            var lists = []
            productType.options.forEach(element => {
                lists.push({label: element , value: element});
            });
            if(type == Constants.productFilterType.PRODUCT_TYPE){
                setTypeLists(lists)                        
            }else if(type == Constants.productFilterType.BRAND){
                setBrandLists(lists);
            }            
        }
    }

    const applyFilter = (data) => {
        props.onButtonAction({type: Constants.actionType.ACTION_DONE, value: data});
    }
    
    return (
        <View style={{
            alignSelf:'stretch' , 
            flex:1 , 
            marginHorizontal:10, 
            marginBottom:10,              
             
        }}>                  
            <ProductFilterView                 
                typeLists={typeLists}
                brandLists={brandLists}
                applyFilter={applyFilter}
                {...props} />
            
        </View>
    )
}
export default ProductFilterContainer;