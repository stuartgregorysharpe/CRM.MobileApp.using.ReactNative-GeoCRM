import React, {useState, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, Text, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {Colors, Constants, Fonts, Strings, Values} from '../../../constants';
import {boxShadow, style} from '../../../constants/Styles';
import CTabSelector from '../../common/CTabSelector';

import {SubmitButton} from '../SubmitButton';
import BrandFacingList from './components/BrandFacingList';
import {
  constructFormData,
  filterProducts,
  getValueFromFormData,
} from './helper';

const BrandFacingView = props => {
  const dispatch = useDispatch();
  const {item, questionType, formIndex} = props;
  console.log('item', item);
  const [formData, setFormData] = useState({products: []});
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Brand');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const categories = [
    {title: 'Brand', id: 1, category: 'Brand'},
    {title: 'Competitor', id: 2, category: 'Competitor'},
  ];
  const products = useMemo(
    () => filterProducts(formData.products, selectedCategory),
    [formData, selectedCategory],
  );

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

  const onItemAction = data => {
    const {type, item} = data;
    if (type == Constants.actionType.ACTION_CHANGE_ITEM_FACING) {
      const {facing} = data;
      const _formData = {...formData};
      const _products = _formData.products;
      const itemIndex = _products.findIndex(x => x.name == item.name);
      if (itemIndex < 0) {
        return false;
      }
      _products[itemIndex].facing = facing;
      setFormData(_formData);
    }
  };
  return (
    <View style={[styles.container, props.style]}>
      <CTabSelector
        items={categories}
        selectedIndex={selectedTabIndex}
        showInView={true}
        onSelectTab={(item, index) => {
          setSelectedTabIndex(index);
          setSelectedCategory(item.category);
        }}
        containerStyle={[
          boxShadow,
          {
            marginBottom: 0,
            height: 40,
            backgroundColor: 'white',
            borderRadius: 4,
          },
        ]}
      />
      <BrandFacingList items={products} onItemAction={onItemAction} />
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

export default BrandFacingView;
