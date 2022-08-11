import React, {useState, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, Text, Keyboard} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {Colors, Constants, Fonts, Strings, Values} from '../../../constants';
import {whiteLabel} from '../../../constants/Colors';
import {style} from '../../../constants/Styles';
import CSingleSelectInput from '../../common/SelectInput/CSingleSelectInput';
import SearchBar from '../../SearchBar';
import {SubmitButton} from '../SubmitButton';
import FormatPriceList from './components/FormatPriceList';
import {constructFormData, filterProducts} from './helper';

const FormatPriceView = props => {
  const dispatch = useDispatch();
  const {item, questionType, formIndex} = props;
  const [formData, setFormData] = useState({products: []});
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [keyword, setKeyword] = useState('');
  const captureModalRef = useRef(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const products = useMemo(
    () => filterProducts(formData.products, keyword, selectedFormat),
    [formData, keyword, selectedFormat],
  );
  const formats = useMemo(() => {
    return item?.formats?.map(format => {
      return {
        label: format.label,
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
    if (!validateForm()) {
      return;
    }
    /*const submitValueData = getValueFromFormData(formData, item, formIndex);
    if (props.onButtonAction) {
      props.onButtonAction({
        type: Constants.actionType.ACTION_FORM_SUBMIT,
        value: submitValueData,
      });
    }*/
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
      <CSingleSelectInput
        bgType="card"
        bgStyle={[style.card, {borderWidth: 0}]}
        placeholderStyle={{color: whiteLabel().mainText, fontWeight: '700'}}
        description={'Select Format'}
        placeholder={'Select Format'}
        checkedValue={selectedFormat}
        items={formats}
        hasError={false}
        disabled={false}
        onSelectItem={item => {
          setSelectedFormat(item.value);
        }}
        onClear={() => setSelectedFormat(null)}
        containerStyle={{
          marginTop: 8,
          marginLeft: 10,
          height: 38,
          marginRight: 10,
          marginBottom: 16,
        }}
      />

      <FormatPriceList items={products} onItemAction={onItemAction} />
      <SubmitButton
        title={'Submit'}
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

export default FormatPriceView;
