
import { View } from 'react-native'
import React , { useEffect } from 'react'
import { Constants } from '../../../../constants';
import ProductDetailsView from '../components/ProductDetailsView';

const  ProductDetailsContainer = (props) => {
    
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