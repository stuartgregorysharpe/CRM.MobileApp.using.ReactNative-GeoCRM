import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { AppText } from '../../../../../components/common/AppText';
import { Colors } from '../../../../../constants';
import { whiteLabel } from '../../../../../constants/Colors';
import NumberCounter from '../../../../../components/shared/SKUCount/components/NumberCounter';
import { style } from '../../../../../constants/Styles';
import FastImage from 'react-native-fast-image';
import { formattedPriceWithSpace} from '../../../../../helpers/formatHelpers';
import SvgIcon from '../../../../../components/SvgIcon';

const ProductItem = props => {

  const {item, settings, isLoading} = props;
  if (!item) return null;  

  const [qty, setQty] = useState(item.qty != undefined ? item.qty : 0);

  useEffect(() => {
    setQty(item.qty);
  }, [item]);
  const onCount = qty => {
    setQty(qty);
  };

  const onEditDone = qty => {
    setQty(qty);
    if (props.geProductPrice) {
      props.geProductPrice(item, qty);
    }
  };

  const renderPrice = () => {
    if (item.finalPrice != 0) {
      return item.symbol + formattedPriceWithSpace(parseFloat(item.finalPrice));
    } else {
      return item.symbol + formattedPriceWithSpace(parseFloat(item.price));
    }
  };

  const renderDiscount = () => {
    if(item?.discountPrice != undefined){
      if (item?.discountPrice?.includes("%") ) {
        return "Discount " + item.discountPrice ;
      }else{
        return "Discount " + item.discountPrice + "%";
      }    
    }    
  }

  return (
    <View
      style={[
        styles.container,
        style.card,
        item.qty > 0 ? styles.redBorder : {},
      ]}>
      <FastImage
        style={styles.imgStyle}
        source={{
          uri: item.product_images != undefined ? item.product_images[0] : '',
        }}
      />
      <View style={{flex: 1, marginLeft: 5}}>
        <View style={{flexDirection: 'row'}}>
          <AppText
            title={item.product_name}
            size="big"
            type="secondaryBold"
            style={{flex: 1}}></AppText>

          {(settings?.allow_edit_price === '1' ||
            settings?.allow_discount === '1') && (
            <TouchableOpacity
              onPress={() => {
                if (props.openProductDetail) {
                  props.openProductDetail(item);
                }
              }}>
              <SvgIcon icon="Bottom_Arrow" height="25" width="25" />
            </TouchableOpacity>
          )}
        </View>
        {item.warehouse_name != undefined && (
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <AppText
              title={item.warehouse_name}
              color={whiteLabel().subText}></AppText>
            <AppText title="  |  " color={whiteLabel().subText}></AppText>
            <AppText
              title={'Stock: ' + item.soh}
              color={whiteLabel().subText}></AppText>
          </View>
        )}

        {
          item.discountPrice != '' &&
          <View style={{alignItems:'flex-end' , marginBottom: -5}}>
            <AppText                
                title={renderDiscount()}
                color={Colors.redColor}
                style={{fontSize:10}}></AppText>
          </View>
        }
        
        <View          
          style={{flexDirection: 'row', alignItems: 'center' , marginTop: item.discountPrice != '' ? 0 : 5 }}>
          <AppText
            title="Qty"
            color={whiteLabel().subText}
            style={{marginRight: 10}}></AppText>

          <NumberCounter
            btnStyle={styles.addContainer}
            btnTextStyle={styles.btnTextStyle}
            inputBoxStyle={styles.inputBoxStyle}
            style={{marginTop: 0, marginBottom: 0}}
            step={parseInt(item.qty_increments)}
            count={qty}
            onCount={onCount}            
            isClickable={!isLoading}
            fixed={1}
            onEditDone={onEditDone}
          />

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            {item.special == '1' && (
              <SvgIcon
                icon="Special"
                width="15"
                height="15"
                style={{marginRight: 5}}
              />
            )}
            <AppText
              style={[
                item.special == '1' ? {textDecorationLine: 'underline'} : {},
              ]}
              title={renderPrice()}
              size="medium"
              color={Colors.primaryColor}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  imgStyle: {
    width: 100,
    height: 100,
  },
  addContainer: {
    color: Colors.whiteColor,
    marginLeft: 0,
    marginRight: 0,
    width: 21,
    height: 21,
    borderRadius: 3,
    backgroundColor: whiteLabel().actionFullButtonBackground,
  },
  btnTextStyle: {
    color: Colors.whiteColor,
  },
  inputBoxStyle: {
    borderWidth: 0,
  },
  redBorder: {
    borderColor: whiteLabel().mainText,
    borderWidth: 1,
    borderRadius: 3,
  },
});
