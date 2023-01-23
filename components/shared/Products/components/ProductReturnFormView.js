import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  ToastAndroid,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState, useEffect, useImperativeHandle} from 'react';
import SearchBar from '../../../SearchBar';
import CSingleSelectInput from '../../../common/SelectInput/CSingleSelectInput';
import {style} from '../../../../constants/Styles';
import {whiteLabel} from '../../../../constants/Colors';
import CardView from '../../../common/CardView';
import SectionList from './SectionList';
import {Constants, Strings, Values} from '../../../../constants';
import {AppText} from '../../../common/AppText';
import {useDispatch} from 'react-redux';
import {showNotification} from '../../../../actions/notification.action';
import ProductReturnSectionList from './ProductReturnSectionList';
import ProductQrCaptureModal from '../modals/ProductQrCaptureModal';
import {Notification} from '../../../modal/Notification';

const ProductReturnFormView = React.forwardRef((props, ref) => {
  const {
    questionType,
    item,
    typeLists,
    brandLists,
    productReturns,
    selectedLists,
  } = props;
  const skuCaptureModalRef = useRef(null);
  const [formData, setFormData] = useState(null);
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [productReturn, setProductReturn] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const dispatch = useDispatch();

  var previousCode = '';
  useImperativeHandle(
    ref,
    () => ({
      updatedSelectedLists(item) {
        var tmp = selectedProductIds.filter(
          element => element != item.product_id,
        );
        setSelectedProductIds(tmp);
      },
      initSelectedLists(ids) {
        setSelectedProductIds(ids);
      },
    }),
    [selectedProductIds],
  );

  useEffect(() => {
    filterProduct();
  }, [item, brand, type, searchKey]);

  const onCaptureAction = ({type, value}) => {
    console.log('capture action', value);
    if (type == Constants.actionType.ACTION_CAPTURE) {
      if (
        questionType == Constants.questionType.FORM_TYPE_PRODUCT_ISSUES &&
        productReturn == ''
      ) {
        dispatch(
          showNotification({
            type: Strings.Success,
            message: Strings.Choose_Reason,
            buttonText: 'Ok',
          }),
        );
      } else {
        var tmp = item.products.find(element => element.barcode == value);
        if (tmp != null && tmp != undefined) {
          console.log('capture item', tmp);
          if (questionType == Constants.questionType.FORM_TYPE_PRODUCT_ISSUES) {
            tmp = {...tmp, productReturn};
            setSelectedProductIds([...selectedProductIds, tmp.product_id]);
            props.changedSelectedProducts(tmp, 'add');
          }
          setSearchKey(value);
        } else if (value != previousCode) {
          if (Platform.OS === 'android') {
            ToastAndroid.show('Product not found', ToastAndroid.SHORT);
          } else {
            Alert.alert('Product not found');
          }
        }
        previousCode = value;
      }
    } else if (type === Constants.actionType.ACTION_DONE) {
      if (value) {
        var scanItem = products.find(
          element => element.product_id === value.product_id,
        );
        if (scanItem != undefined && value.quantity) {
          onItemChanged(type, scanItem, value.quantity);
        }
      }
    }
  };

  const onSearch = key => {
    setSearchKey(key);
  };

  const onCapture = () => {
    if (skuCaptureModalRef && skuCaptureModalRef.current) {
      skuCaptureModalRef.current.showModal();
    }
  };

  const filterProduct = () => {
    var tmp = item.products.filter(item => {
      var flag = true;
      if (brand != '' && item.brand != brand) {
        flag = false;
      }
      if (type != '' && item.product_type != type) {
        flag = false;
      }
      if (
        searchKey != '' &&
        !item.label?.toLowerCase().includes(searchKey.toLowerCase()) &&
        !item.barcode?.toLowerCase().includes(searchKey.toLowerCase()) &&
        !item.product_code?.toLowerCase().includes(searchKey.toLowerCase()) &&
        !item.product_type?.toLowerCase().includes(searchKey.toLowerCase())
      ) {
        flag = false;
      }
      return flag;
    });
    setProducts(tmp);
  };

  const onItemChanged = ({type, item, value}) => {
    if (type == Constants.actionType.ACTION_DONE) {
      if (
        questionType == Constants.questionType.FORM_TYPE_PRODUCT_RETURN &&
        productReturn === ''
      ) {
        dispatch(
          showNotification({
            type: Strings.Success,
            message: Strings.Choose_Reason,
            buttonText: 'Ok',
          }),
        );
      } else {
        if (questionType == Constants.questionType.FORM_TYPE_PRODUCT_RETURN) {
          item = {...item, productReturn, value};
        }
        console.log('product item', item);
        if (value) {
          setSelectedProductIds([...selectedProductIds, item.product_id]);
          props.changedSelectedProducts(item, 'add');
        } else {
          var tmp = selectedProductIds.filter(
            element => element != item.product_id,
          );
          setSelectedProductIds(tmp);
          props.changedSelectedProducts(item, 'remove');
        }
      }
    }
  };

  const onClear = () => {
    props.changedSelectedProducts(productReturn, 'remove_all');
  };

  return (
    <View style={styles.container}>
      <SearchBar
        isFilter
        onSearch={onSearch}
        initVal={searchKey}
        suffixButtonIcon="Scan_Icon"
        onSuffixButtonPress={onCapture}
      />

      <View style={{flexDirection: 'row', marginHorizontal: 10}}>
        <CSingleSelectInput
          bgType="card"
          bgStyle={[style.card, {borderWidth: 0}]}
          placeholderStyle={{color: whiteLabel().mainText, fontWeight: '700'}}
          description={'Brand'}
          placeholder={'Brand'}
          mode="single"
          checkedValue={brand}
          items={brandLists}
          hasError={false}
          disabled={false}
          onSelectItem={item => {
            setBrand(item.label);
          }}
          onClear={() => setBrand('')}
          containerStyle={{marginTop: 0, flex: 1}}
        />

        <CSingleSelectInput
          bgType="card"
          bgStyle={[style.card, {borderWidth: 0}]}
          placeholderStyle={{color: whiteLabel().mainText, fontWeight: '700'}}
          description={'Type'}
          placeholder={'Type'}
          mode="single"
          checkedValue={type}
          items={typeLists}
          hasError={false}
          disabled={false}
          onSelectItem={item => {
            setType(item.label);
          }}
          onClear={() => setType('')}
          containerStyle={{marginTop: 0, marginLeft: 5, flex: 1}}
        />
      </View>

      <CSingleSelectInput
        bgType="card"
        bgStyle={[style.card, {borderWidth: 0}]}
        placeholderStyle={{color: whiteLabel().mainText, fontWeight: '700'}}
        description={'Return Reason'}
        placeholder={'Return Reason'}
        mode="single"
        checkedValue={productReturn}
        items={productReturns}
        hasError={false}
        disabled={false}
        onSelectItem={item => {
          setProductReturn(item.label);
        }}
        onClear={() => setProductReturn('')}
        containerStyle={{marginTop: 0, marginHorizontal: 10, flex: 1}}
      />

      <View
        style={{flexDirection: 'row', marginHorizontal: 15, marginBottom: 5}}>
        <View style={{flex: 2, marginLeft: 5}}>
          <AppText
            title="Category"
            size="medium"
            color={whiteLabel().mainText}></AppText>
        </View>
        <View style={{flex: 3, alignItems: 'flex-start'}}>
          <AppText
            title="Product"
            size="medium"
            color={whiteLabel().mainText}></AppText>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end', marginRight: 10}}>
          <TouchableOpacity onPress={() => onClear()}>
            <AppText
              title="Clear"
              size="medium"
              color={whiteLabel().endDayBackground}></AppText>
          </TouchableOpacity>
        </View>
      </View>

      <CardView style={{marginHorizontal: 10}}>
        <View>
          <ProductReturnSectionList
            questionType={questionType}
            productReturn={productReturn}
            sections={products}
            checkedItemIds={selectedProductIds}
            selectedLists={selectedLists}
            onItemChanged={onItemChanged}
            style={{padding: 8}}
          />
        </View>
      </CardView>

      <ProductQrCaptureModal
        ref={skuCaptureModalRef}
        formData={formData}
        products={products}
        onButtonAction={onCaptureAction}
      />
      <Notification />
    </View>
  );
});
export default ProductReturnFormView;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
});
