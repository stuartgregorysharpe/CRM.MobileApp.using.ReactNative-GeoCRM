import React, {useState, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, Text, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {Colors, Constants, Fonts, Strings, Values} from '../../../constants';
import {style} from '../../../constants/Styles';
import SearchBar from '../../SearchBar';
import {SubmitButton} from '../SubmitButton';
import FormatPriceList from './components/FormatPriceList';
import {constructFormData, filterProducts} from './helper';

const FormatPriceView = props => {
  const dispatch = useDispatch();
  const {item, questionType, formIndex} = props;
  const [formData, setFormData] = useState({products: []});
  const [keyword, setKeyword] = useState('');
  const captureModalRef = useRef(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const products = useMemo(() => filterProducts(formData.products, keyword));
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

  return (
    <View style={[styles.container, props.style]}>
      <SearchBar
        isFilter
        onSearch={onSearch}
        suffixButtonIcon="Scan_Icon"
        onSuffixButtonPress={onCapture}
      />
      <FormatPriceList items={products} />
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
