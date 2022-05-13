import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {useKeyboard} from '@react-native-community/hooks';
import {Colors, Constants, Fonts, Values} from '../../../constants';

import {SubmitButton} from '../SubmitButton';
import {
  constructFormData,
  filterProducts,
  getValueFromFormData,
} from './helper';
import SearchBar from '../../SearchBar';
import SectionList from './components/SectionList';
import CardView from '../../common/CardView';
const SKUSelectForm = props => {
  const dispatch = useDispatch();
  const {item} = props;
  const [formData, setFormData] = useState({});
  const [keyword, setKeyword] = useState('');
  const keyboard = useKeyboard();
  const products = useMemo(() => filterProducts(item.products, keyword));
  const data = item;

  useEffect(() => {
    const formData = constructFormData(item);
    setFormData(formData);
  }, [item]);
  const onSubmit = () => {
    const submitValueData = getValueFromFormData(formData, item);
    if (props.onButtonAction) {
      props.onButtonAction({
        type: Constants.actionType.ACTION_FORM_SUBMIT,
        value: submitValueData,
      });
    }
  };
  const onCapture = () => {};
  let {selectedProductIds} = formData;
  const onItemAction = ({type, item, sectionName}) => {
    if (type == Constants.actionType.ACTION_CHECK) {
      const _formData = {...formData};
      let _selectedProductIds = _formData.selectedProductIds;
      if (_selectedProductIds.length > 0) {
        const foundId = _selectedProductIds.find(x => x == item.product_id);
        if (foundId) {
          _selectedProductIds = _selectedProductIds.filter(
            x => x != item.product_id,
          );
        } else {
          _selectedProductIds.push(item.product_id);
        }
      } else {
        _selectedProductIds.push(item.product_id);
      }

      _formData.selectedProductIds = _selectedProductIds;
      setFormData(_formData);
    } else if (type == Constants.actionType.ACTION_SELECT_ALL) {
      const _formData = {...formData};
      const sectionProducts = data.products[sectionName];
      const sectionProductIds = sectionProducts.map(x => x.product_id);
      let _selectedProductIds = _formData.selectedProductIds;
      const previouslySelected = sectionProductIds.filter(x =>
        _selectedProductIds.includes(x),
      );
      const alreadyAllSelected =
        previouslySelected.length == sectionProductIds.length;
      _selectedProductIds = _selectedProductIds.filter(
        x => !sectionProductIds.includes(x),
      );
      if (!alreadyAllSelected) {
        _selectedProductIds.push(...sectionProductIds);
      }
      _formData.selectedProductIds = _selectedProductIds;
      setFormData(_formData);
    }
  };
  const onSearch = keyword => {
    setKeyword(keyword);
  };
  return (
    <View style={[styles.container, props.style]}>
      <SearchBar
        isFilter
        onSearch={onSearch}
        suffixButtonIcon="Scan_Icon"
        onSuffixButtonPress={onCapture}
      />
      <CardView style={{marginHorizontal: 10}}>
        <ScrollView
          style={{
            maxHeight: keyboard.keyboardShown
              ? Values.deviceHeight * 0.2
              : Values.deviceHeight * 0.6,
            alignSelf: 'stretch',
          }}>
          <SectionList
            sections={products}
            checkedItemIds={selectedProductIds}
            onItemAction={onItemAction}
            style={{padding: 8}}
          />
        </ScrollView>
      </CardView>
      <SubmitButton
        style={{marginHorizontal: 10, marginVertical: 16}}
        title={'Submit'}
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

export default SKUSelectForm;
