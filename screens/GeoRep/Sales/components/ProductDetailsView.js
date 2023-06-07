import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SubmitButton} from '../../../../components/shared/SubmitButton';
import {AppText} from '../../../../components/common/AppText';
import {Colors} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';
import {getJsonData} from '../../../../constants/Storage';
import { validateDecimal } from '../../../../helpers/validateHelper';
import { afterDecimal, formattedPriceWithSpace } from '../../../../helpers/formatHelpers';

const ProductDetailsView = props => {

  const {product, settings} = props;
  if (!product || !settings) return null;

  const [adjustedPrice, setAdjustedPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [finalPrice, setFinalPrice] = useState(parseFloat(product.price));

  useEffect(() => {
    initializeData();
  }, [product]);

  useEffect(() => {
    try {
      var adjust = 0;
      var discount = 0;
      if (
        adjustedPrice != undefined &&
        adjustedPrice != '' &&
        adjustedPrice.replace( product?.symbol , '') != ''
      ) {
        adjust = parseFloat(adjustedPrice.replace(product?.symbol, ''));
      }
      if (
        discountPrice != undefined &&
        discountPrice != '' &&
        discountPrice.replace('%', '') != ''
      ) {    
        discount = parseFloat(discountPrice.replace('%', '')) / 100;
      } else {
        setFinalPrice(adjust);
      }
      if (discount != 0) {
        if (adjust != 0) {
          setFinalPrice(adjust - adjust * discount);
        } else {
          setFinalPrice(
            parseFloat(product.price) - parseFloat(product.price) * discount,
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [adjustedPrice, discountPrice]);

  const initializeData = async () => {
    const prodictPriceList = await getJsonData('@product_price');
    if (prodictPriceList != null) {
      const data = prodictPriceList.find(
        item => item.product_id === product.product_id && item.warehouse_id === product.warehouse_id
      );
      if (data != undefined && data.finalPrice != undefined) {
        setAdjustedPrice(data.finalPrice.adjustedPrice);
        setDiscountPrice(data.finalPrice.discountPrice);
        setFinalPrice(data.finalPrice.final_price);
      }
    }
  };

  const onSave = () => {
    if (props.onSaveProduct && finalPrice != 0) {
      
      props.onSaveProduct({
        product_id: product.product_id,
        warehouse_id  : product.warehouse_id,
        price: product.price,
        finalPrice: {          
          adjustedPrice : adjustedPrice != null && adjustedPrice != undefined ? adjustedPrice.replace(product?.symbol, '') : '',
          adjustedTextPrice: adjustedPrice != null && adjustedPrice != undefined ? adjustedPrice : '',
          discountPrice: discountPrice,
          final_price: finalPrice,
        },
        qty: product.qty,
        special: product.special,
        product: product,
      });
    }
  };

  const getSymbolPrice = text => {
    if (text != undefined && text.includes(product.symbol)) {
      return text;
    } else {
      return product.symbol + text;
    }
  };

  const getPercentagePrice = text => {
    if (text != undefined && text.includes('%')) {
      return text;
    } else {
      return text != undefined && text != '' ? text + '%' : '';
    }
  };

  return (
    <View
      style={{
        marginTop: 10,
        marginBottom: 20,
      }}>
      <View style={styles.itemContainer}>
        <View style={{flex: 1}}>
          <AppText title="Standard Price" />
        </View>
        <View style={{flex: 1}}>
          <AppText
            title={product.symbol + formattedPriceWithSpace(parseFloat(product.price))}
            color={whiteLabel().mainText}
          />
        </View>
      </View>

      <View style={styles.itemContainer}>
        <View style={{flex: 1}}>
          <AppText title="Adjusted Price" />
        </View>
        <View style={{flex: 1}}>
          <TextInput
            editable={settings?.allow_edit_price === '1'}
            style={styles.textInput}
            value={adjustedPrice}
            onChangeText={text => {
              var check = validateDecimal(text.replace(product.symbol,''));
              const length = afterDecimal(text.replace(product.symbol,''));
              if(check && length <= 2){                
                setAdjustedPrice(getSymbolPrice(text));
              }              
            }}
            onBlur={() => {}}
            onEndEditing={() => {}}
            keyboardType={'number-pad'}
          />
        </View>
      </View>

      <View style={styles.itemContainer}>
        <View style={{flex: 1}}>
          <AppText title="Discount %" />
        </View>
        <View style={{flex: 1}}>
          <TextInput
            editable={settings?.allow_discount === '1'}
            style={styles.textInput}
            value={discountPrice}
            onChangeText={text => {
              var check = validateDecimal(text);
              const length = afterDecimal(text);
              if( (check && length <= 2 && parseFloat(text) <= 100) || text == '' ){
                setDiscountPrice(text);
              }              
            }}
            onBlur={() => {
              console.log('on editing');
            }}
            onFocus={() => {
              if (discountPrice != undefined) {
                setDiscountPrice(discountPrice.replace('%', ''));
              }
            }}
            onEndEditing={() => {
              setDiscountPrice(getPercentagePrice(discountPrice));
            }}
            keyboardType={'number-pad'}
          />
        </View>
      </View>

      <View style={styles.itemContainer}>
        <View style={{flex: 1}}>
          <AppText title="Final Price" />
        </View>
        <View style={{flex: 1}}>
          <AppText
            title={product.symbol + formattedPriceWithSpace(parseFloat(finalPrice))}
            color={whiteLabel().mainText}
          />
        </View>
      </View>

      <SubmitButton title="Save" onSubmit={onSave} style={{marginTop: 15}} />
    </View>
  );
};

export default ProductDetailsView;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
  },

  textInput: {
    borderWidth: 1,
    borderColor: Colors.greyColor,
    paddingTop: 0,
    paddingBottom: 0,
    height: 30,
  },
});
