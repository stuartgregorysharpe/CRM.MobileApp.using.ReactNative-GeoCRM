import {
  View,  
  StyleSheet,  
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useRef, useState, useEffect, useImperativeHandle} from 'react';
import SearchBar from '../../../SearchBar';
import SKUCaptureModal from '../../SKUSelect/modals/SKUCaptureModal';
import CSingleSelectInput from '../../../common/SelectInput/CSingleSelectInput';
import {style} from '../../../../constants/Styles';
import {whiteLabel} from '../../../../constants/Colors';
import CardView from '../../../common/CardView';
import SectionList from './SectionList';
import {Constants, Images, Strings, Values} from '../../../../constants';
import {AppText} from '../../../common/AppText';
import {useDispatch} from 'react-redux';
import AlertModal from '../../../modal/AlertModal';

const ProductSelectFormView = React.forwardRef((props, ref) => {
  const {
    questionType,
    item,
    typeLists,
    brandLists,
    productIssues,
    selectedLists,
  } = props;
  const skuCaptureModalRef = useRef(null);
  const alertModalRef = useRef();
  const [formData, setFormData] = useState(null);
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [productIssue, setProductIssue] = useState('');
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
    if (type == Constants.actionType.ACTION_CAPTURE) {
      if (
        questionType == Constants.questionType.FORM_TYPE_PRODUCT_ISSUES &&
        productIssue == ''
      ) {                        
        showAlertModal(Strings.Choose_Reason);        
      } else {
        var tmp = item.products.find(element => element.barcode == value);
        if (tmp != null && tmp != undefined) {
          if (questionType == Constants.questionType.FORM_TYPE_PRODUCT_ISSUES) {
            tmp = {...tmp, productIssue};
          }
          setSelectedProductIds([...selectedProductIds, tmp.product_id]);
          props.changedSelectedProducts(tmp, 'add');
        } else if (value != previousCode) {
          if (Platform.OS === 'android') {
            ToastAndroid.show('Product not found', ToastAndroid.SHORT);
          } else {
            Alert.alert('Product not found');
          }
        }
        previousCode = value;
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
    var tmp = item.products.filter(element => {
      var flag = true;
      if (brand != '' && element.brand != brand) {
        flag = false;
      }
      if (type != '' && element.product_type != type) {
        flag = false;
      }
      if (
        searchKey != '' &&
        !element?.label?.toLowerCase().includes(searchKey.toLowerCase()) &&
        !element?.barcode?.toLowerCase().includes(searchKey.toLowerCase()) &&
        !element?.product_code?.toLowerCase().includes(searchKey.toLowerCase()) &&
        !element?.product_type?.toLowerCase().includes(searchKey.toLowerCase())
      ) {
        flag = false;
      }
      return flag;
    });
    setProducts(tmp);
  };

  const onItemAction = ({type, item, value}) => {
    if (type == Constants.actionType.ACTION_CHECK) {
      if (
        questionType == Constants.questionType.FORM_TYPE_PRODUCT_ISSUES &&
        productIssue == ''
      ) {
        showAlertModal(Strings.Choose_Reason);        
      } else {
        if (questionType == Constants.questionType.FORM_TYPE_PRODUCT_ISSUES) {
          item = {...item, productIssue};
        }
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

  const showAlertModal = (message) => {
    if(alertModalRef.current){
      alertModalRef.current.alert(message, Strings.Ok);
    }
  }

  return (
    <View style={styles.container}>

      <AlertModal ref={alertModalRef} />

      <SearchBar
        isFilter
        onSearch={onSearch}
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

      {questionType == Constants.questionType.FORM_TYPE_PRODUCT_ISSUES && (
        <CSingleSelectInput
          bgType="card"
          bgStyle={[style.card, {borderWidth: 0}]}
          placeholderStyle={{color: whiteLabel().mainText, fontWeight: '700'}}
          description={'Product Issues'}
          placeholder={'Product Issues'}
          mode="single"
          checkedValue={productIssue}
          items={productIssues}
          hasError={false}
          disabled={false}
          onSelectItem={item => {
            setProductIssue(item.label);
          }}
          onClear={() => setProductIssue('')}
          containerStyle={{marginTop: 0, marginHorizontal: 10, flex: 1}}
        />
      )}

      <View
        style={{flexDirection: 'row', marginHorizontal: 15, marginBottom: 5}}>
        <View style={{flex: 1, marginLeft: 5}}>
          <AppText
            title="Type"
            size="medium"
            color={whiteLabel().mainText}></AppText>
        </View>
        <View style={{flex: 2, alignItems: 'center'}}>
          <AppText
            title="Product"
            size="medium"
            color={whiteLabel().mainText}></AppText>
        </View>
        <View style={{width: 100}}></View>
      </View>

      <CardView style={{marginHorizontal: 10}}>
        <View>
          <SectionList
            questionType={questionType}
            productIssue={productIssue}
            sections={products}
            checkedItemIds={selectedProductIds}
            selectedLists={selectedLists}
            onItemAction={onItemAction}
            style={{padding: 8}}
          />
        </View>
      </CardView>

      <SKUCaptureModal
        ref={skuCaptureModalRef}
        formData={formData}
        onButtonAction={onCaptureAction}
      />
    </View>
  );
});
export default ProductSelectFormView;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});
