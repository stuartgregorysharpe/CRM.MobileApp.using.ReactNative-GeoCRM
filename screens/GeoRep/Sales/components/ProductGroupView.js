import { StyleSheet, Text, View , FlatList } from 'react-native'
import React from 'react'
import ProductItem from '../../../../components/shared/PosCapture/components/ProductItem';
import ProductGroupItem from './items/ProductGroupItem';
import { SubmitButton } from '../../../../components/shared/SubmitButton';

const ProductGroupView = (props) => {

    const { products } = props;
        
    const renderItem = (item, index) => {
        return (
            <ProductItem item={item} />
        )
    }

    const onSave = () => {
        if(props.onSaveProduct){
            props.onSaveProduct()
        }
    }
    
    return (
        <View>
            <FlatList
                    data={products}
                    renderItem={({item, index}) => renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.props}
                />
                
            <SubmitButton title="Save" onSubmit={onSave} />
        </View>
    )
}

export default ProductGroupView

const styles = StyleSheet.create({})