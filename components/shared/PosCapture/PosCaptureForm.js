import React, {useState, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, Text, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {showNotification} from '../../../actions/notification.action';
import {Colors, Constants, Fonts, Strings, Values} from '../../../constants';
import {whiteLabel} from '../../../constants/Colors';
import {style} from '../../../constants/Styles';
import QRScanModal from '../../common/QRScanModal';
import CSingleSelectInput from '../../common/SelectInput/CSingleSelectInput';
import {Notification} from '../../modal/Notification';
import SearchBar from '../../SearchBar';
import {SubmitButton} from '../SubmitButton';
import ProductList from './components/ProductList';
import {
  constructFormData,
  filterProducts,
  getValueFromFormData,
} from './helper';

const PosCaptureForm = props => {
  const dispatch = useDispatch();
  const {item, questionType, formIndex} = props;
  console.log('item', item);
  const [formData, setFormData] = useState({products: []});
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [lastScanedQrCode, setLastScannedQrCode] = useState('');
  const captureModalRef = useRef(null);
  const competitorPriceModalRef = useRef(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const products = useMemo(
    () => filterProducts(formData.products, keyword, selectedFormat),
    [formData, keyword, selectedFormat],
  );
  const formats = useMemo(() => {
    return item?.formats?.map(format => {
      return {
        label: format.product_name,
        value: format.product_id,
      };
    });
  }, item);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const validateForm = () => {};

  const onSubmit = () => {
    const submitValueData = getValueFromFormData(formData, item, formIndex);
    if (props.onButtonAction) {
      props.onButtonAction({
        type: Constants.actionType.ACTION_FORM_SUBMIT,
        value: submitValueData,
      });
    }
  };
  useEffect(() => {
    const formData = constructFormData(item);
    setFormData(formData);
  }, [item]);
  const onSearch = keyword => {
    setKeyword(keyword);
  };
  const onCapture = () => {
    if (captureModalRef && captureModalRef.current) {
      captureModalRef.current.showModal();
    }
  };
  const showErrorMessage = errorMessage => {
    console.log('errorMessage', errorMessage);
    dispatch(
      showNotification({
        type: 'error',
        message: errorMessage,
        buttonText: Strings.Ok,
      }),
    );
  };
  const onItemAction = data => {
    const {type, item} = data;
    if (type == Constants.actionType.ACTION_CHANGE_ITEM_PRICE) {
      const {price} = data;
      const _formData = {...formData};
      const _products = _formData.products;
      const itemIndex = _products.findIndex(
        x => x.product_id == item.product_id,
      );
      if (itemIndex < 0) {
        return false;
      }
      _products[itemIndex].price = price;
      setFormData(_formData);
    } else if (type == Constants.actionType.ACTION_CHANGE_ITEM_PRICE_TYPE) {
      const {price_type} = data;
      const _formData = {...formData};
      const _products = _formData.products;
      const itemIndex = _products.findIndex(
        x => x.product_id == item.product_id,
      );
      if (itemIndex < 0) {
        return false;
      }
      _products[itemIndex].price_type = price_type;
      setFormData(_formData);
    } else if (type == Constants.actionType.ACTION_COMP) {
      if (item.price == null || item.price == undefined || item.price == '') {
        const errorMessage = 'Please input a price for this format';
        return showErrorMessage(errorMessage);
      }
      setCompPressItem(item);
      competitorPriceModalRef.current.showModal();
    }
  };

  const onCaptureAction = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CAPTURE) {
      const foundProduct = formData.products.find(x => x.barcode == value);

      if (foundProduct) {
        setSelectedFormat(foundProduct.product_id);
        setLastScannedQrCode(value);
      }
    }
  };
  return (
    <View style={[styles.container, props.style]}>
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

      <ProductList items={products} onItemAction={onItemAction} />

      <QRScanModal ref={captureModalRef} onButtonAction={onCaptureAction} />
      <Notification />
      <SubmitButton
        title={'Save'}
        style={{marginVertical: 16}}
        onSubmit={() => {
          onSubmit();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.xSmall,
    color: Colors.textColor,
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxContainer: {
    marginTop: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  boxContainer: {
    marginTop: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
  },
});

export default PosCaptureForm;
