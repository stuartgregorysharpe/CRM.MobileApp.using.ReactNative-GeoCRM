import { StyleSheet, Text, View , FlatList } from 'react-native'
import React from 'react'
import ProductGroupItem from './items/ProductGroupItem';
import { SubmitButton } from '../../../../components/shared/SubmitButton';
import ProductItem from './items/ProductItem';

const ProductGroupView = (props) => {

    const { products , settings } = props;        

    const renderItem = (item, index) => {
        
        // if(item.count != undefined ){
        //     const products = item.products;
        //     if(parseInt(item.count) == 1){
        //         return (                
        //             <ProductItem 
        //                 key={index} item={products.length == 1 ? products[0] : null } 
        //                 geProductPrice={(product_id, qty) => {
        //                     console.log("ttt")
        //                     if(props.geProductPrice){
        //                         props.geProductPrice(product_id , qty)
        //                     }
        //                 }}                        
        //             />
        //         )
        //     }
        //     if(parseInt(item.count) > 1){
        //         return (                                        
        //             <ProductGroupItem key={index}
        //                 onGroupItemClicked={() => {                        
        //                 }}
        //                 title={item.product_group} products={products} />
        //         )
        //     }
        // }
        
        if(item.count == undefined ){
            return (
                <ProductItem 
                    key={index}
                    settings={settings}
                    geProductPrice={(product_id, qty) => {                    
                        if(props.geProductPrice){
                            props.geProductPrice(product_id , qty)
                        }
                    }}   
                    openProductDetail={(item) => {
                        if(props.openProductDetail){
                            props.openProductDetail(item);
                        }
                    }}
                    item={item} 
                />
            )
        }
        
    }

    const onSave = () => {
        if(props.onSaveProduct){
            props.onSaveProduct()
        }
    }
    
    return (
        <View style={{
            marginBottom:50
        }}> 
            <FlatList
                    data={products}
                    renderItem={({item, index}) => renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    //extraData={this.props}
                />
                
            <SubmitButton title="Save" onSubmit={onSave} />
        </View>
    )
}

export default ProductGroupView

const styles = StyleSheet.create({})