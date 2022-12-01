import { StyleSheet, Text, View , TextInput } from 'react-native'
import React , { useState , useEffect } from 'react'
import ProductGroupItem from './items/ProductGroupItem';
import { SubmitButton } from '../../../../components/shared/SubmitButton';
import ProductItem from './items/ProductItem';
import { AppText } from '../../../../components/common/AppText';
import { Colors } from '../../../../constants';
import { text } from '@fortawesome/fontawesome-svg-core';
import { whiteLabel } from '../../../../constants/Colors';
import { getJsonData } from '../../../../constants/Storage';

const ProductDetailsView = (props) => {

    const { product , settings } = props;    
    if (!product || !settings) return null;

    const [adjustedPrice, setAdjustedPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [finalPrice, setFinalPrice] = useState(parseFloat(product.price));

    useEffect(() => {
        initializeData();
    }, [product])

    useEffect(() => {
        try{
            var adjust = 0;
            var discount = 0;
            if(adjustedPrice != undefined && adjustedPrice != '' && adjustedPrice.replace("R",'') != ''){
                adjust = parseFloat(adjustedPrice.replace("R",''));            
            }
            if(discountPrice != '' && discountPrice.replace("%",'') != ''){
                discount = parseFloat(discountPrice.replace("%",'')) / 100;
            }else{
                setFinalPrice(adjust);
            }
            if(discount != 0){
                if(adjust != 0){
                    setFinalPrice(adjust - adjust * discount);
                }else{
                    setFinalPrice(parseFloat(product.price) - parseFloat(product.price) * discount);
                }                
            }            
        }catch(e){

        }
    }, [adjustedPrice, discountPrice]);

    const initializeData = async() => {
        const finalPriceList = await getJsonData("@final_price");
        const data =  finalPriceList.find(item =>  item.product_id === product.product_id);
        if(data != undefined){
            setAdjustedPrice(data.adjustedPrice);
            setDiscountPrice(data.discountPrice);
            setFinalPrice(data.final_price);
        }        
    }

    const onSave = () => {
        if(props.onSaveProduct && finalPrice != 0){
            props.onSaveProduct({product_id: product.product_id , adjustedPrice: adjustedPrice, discountPrice: discountPrice, final_price: finalPrice});
        }
    }

    const getSymbolPrice = (text) =>{
        console.log(text, product.symbol)
        if(text.includes(product.symbol)){
            return text;
        }else{
            return product.symbol + text;
        }
    }

    const getPercentagePrice = (text) => {
        if(text.includes('%')){
            return text;
        }else{
            return  text + "%";
        }
    }
    
    return (
        <View style={{
            marginTop:10,        
            marginBottom:20
        }}>
            <View style={styles.itemContainer}>
                <View style={{flex:1}}>
                    <AppText title="Standard Price" />
                </View>
                <View style={{flex:1}}>
                    <AppText title={product.symbol + product.price} color={whiteLabel().mainText}/>
                </View>
            </View>                

            <View style={styles.itemContainer}>
                <View style={{flex:1}}>
                    <AppText title="Adjusted Price" />
                </View>
                <View style={{flex:1}}>
                    <TextInput
                        editable={settings.allow_edit_price ===  "1"}
                        style={styles.textInput}
                        value={adjustedPrice}
                        onChangeText={text => {
                            setAdjustedPrice(getSymbolPrice(text))
                        }}
                        onBlur={() => {
                            
                        }}
                        onEndEditing={() => {
                            
                        }}
                        keyboardType={'number-pad'}
                    />
                </View>
            </View>                

            <View style={styles.itemContainer}>
                <View style={{flex:1}}>
                    <AppText title="Discount %" />
                </View>
                <View style={{flex:1}}>
                    <TextInput
                        editable={settings.allow_discount ===  "1"}
                        style={styles.textInput}
                        value={discountPrice}
                        onChangeText={text => {
                            setDiscountPrice(text)
                        }}
                        onBlur={() => {
                            console.log("on editing")
                        }}
                        onFocus={() => {
                            setDiscountPrice(discountPrice.replace("%",''));
                        }}
                        onEndEditing={() => {
                            
                            setDiscountPrice(getPercentagePrice(discountPrice))
                        }}
                        keyboardType={'number-pad'}
                    />
                </View>
            </View>                

            <View style={styles.itemContainer}>
                <View style={{flex:1}}>
                    <AppText title="Final Price" />
                </View>
                <View style={{flex:1}}>
                    <AppText title={ product.symbol + finalPrice}  color={whiteLabel().mainText}/>
                </View>
            </View>                

            <SubmitButton title="Save" onSubmit={onSave} style={{marginTop:15}} />
        </View>
    )
}

export default ProductDetailsView

const styles = StyleSheet.create({
    itemContainer:{
        flexDirection:'row', 
        paddingHorizontal:20,
        marginTop:5,
        marginBottom:5,
        alignItems:'center'
    },

    textInput:{
        borderWidth:1,
        borderColor: Colors.greyColor,
        paddingTop:0,
        paddingBottom:0,
        height:30
    }

})