import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Colors, Fonts} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';
import {AppText} from '../../../common/AppText';
import CTextInput from '../../../common/CTextInput';
import {SubmitButton} from '../../SubmitButton';

const LastScanResultView = props => {
  const {totalItemCount, products, lastScanedQrCode} = props;

  const [quantity, setQuantity] = useState('');
  const [productId, setProductId] = useState('');
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');

  useEffect(() => {
    console.log('lastScanedQrCode', lastScanedQrCode);
    if (products != undefined && lastScanedQrCode != null) {
      var check = products.find(item => item.product_code === lastScanedQrCode);
      if (check != undefined) {
        setProductId(check.product_id);
        setCategory(check.product_type);
        setProduct(check.label);
      } else {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Product not found', ToastAndroid.SHORT);
        } else {
          Alert.alert('Product not found');
        }
      }
    }
  }, [products, lastScanedQrCode]);

  return (
    <View style={[styles.container, props.style]}>
      {/* <View style={styles.modalHandler} /> */}

      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>{'Items: ' + totalItemCount}</Text>
      </View> */}

      <View style={styles.header}>
        <View style={{flex: 1, marginLeft: 5, flexDirection: 'row'}}>
          <AppText
            title="Category: "
            size="medium"
            color={whiteLabel().mainText}></AppText>
          <AppText
            title={category}
            size="medium"
            color={whiteLabel().blackColor}></AppText>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <AppText
            title="Product: "
            size="medium"
            color={whiteLabel().mainText}></AppText>
          <AppText
            title={product}
            size="medium"
            color={whiteLabel().blackColor}></AppText>
        </View>
      </View>

      <View style={{marginHorizontal: 10}}>
        <CTextInput
          label="Add Quantitys"
          value={quantity}
          keyboardType={'number-pad'}
          returnKeyType={'done'}
          isRequired={true}
          onChangeText={text => {
            setQuantity(text);
            //setIsStartRequired(false);
          }}
        />
      </View>

      <View style={styles.contentContainer}>
        {lastScanedQrCode && (
          <Text style={styles.text}>{'Last Scanned: ' + lastScanedQrCode}</Text>
        )}

        <SubmitButton
          style={{marginHorizontal: 10, marginVertical: 16}}
          title={'Done'}
          onSubmit={() => {
            if (props.onSubmit) {
              props.onSubmit({product_id: productId, quantity: quantity});
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: Colors.bgColor,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  contentContainer: {
    alignSelf: 'stretch',
    marginHorizontal: 8,
    flexDirection: 'column',
  },
  header: {
    height: 32,
    flexDirection: 'row',
    borderBottomColor: Colors.primaryColor,
    //borderBottomWidth: 2,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: Fonts.primaryBold,
    color: Colors.primaryColor,
  },
  text: {
    fontSize: 12,
    fontFamily: Fonts.primaryRegular,
    color: Colors.blackColor,
    marginTop: 12,
  },
  modalHandler: {
    height: 4,
    width: 90,
    marginVertical: 8,
    backgroundColor: Colors.grey2,
    alignSelf: 'center',
  },
});

export default LastScanResultView;
