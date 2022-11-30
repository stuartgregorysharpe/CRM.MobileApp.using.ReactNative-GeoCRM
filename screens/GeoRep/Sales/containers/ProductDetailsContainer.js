
import { View , BackHandler, Dimensions } from 'react-native'
import React , { useState , useEffect } from 'react'
import { Constants } from '../../../../constants';
import ProductGroupView from '../components/ProductGroupView';
import ProductDetailsView from '../components/ProductDetailsView';

const  ProductDetailsContainer = (props) => {

    useEffect(() => {
        
    }, []);

    const onSaveProduct = (data) => {
        props.onButtonAction({type: Constants.actionType.ACTION_DONE, value: data});
    }

    return (
        <View style={{
            alignSelf:'stretch' ,             
            marginHorizontal:10,            
        }}>
            <ProductDetailsView 
                onSaveProduct={onSaveProduct}
                {...props}
            />
        </View>
    )
}
export default ProductDetailsContainer;