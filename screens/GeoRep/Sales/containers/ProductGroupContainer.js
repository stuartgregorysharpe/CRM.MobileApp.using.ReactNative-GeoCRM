
import { View , BackHandler, Dimensions } from 'react-native'
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
            marginHorizontal:5,
            height:Dimensions.get("screen").height * 0.8            
        }}>
            <ProductGroupView 
                onSaveProduct={onSaveProduct}
                {...props}
            />
        </View>
    )
}
export default ProductGroupContainer;