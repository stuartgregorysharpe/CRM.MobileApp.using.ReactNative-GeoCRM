
import { View , BackHandler } from 'react-native'
import React , { useState , useEffect } from 'react'
import { Constants } from '../../../../constants';
import ProductGroupView from '../components/ProductGroupView';

const  ProductGroupContainer = (props) => {

    useEffect(() => {
        
    }, []);

    const onSaveProduct = (data) => {
        props.onButtonAction({type: Constants.actionType.ACTION_CLOSE, value: data});
    }

    return (
        <View style={{
            alignSelf:'stretch' , 
            flex:1 , 
            marginHorizontal:10, 
            marginBottom:10,  
            minHeight:250             
        }}>
            <ProductGroupView 
                onSaveProduct={onSaveProduct}
            />
        </View>
    )
}
export default ProductGroupContainer;