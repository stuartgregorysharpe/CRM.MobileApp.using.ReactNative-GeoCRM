import React, {useState, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, ScrollView, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';

import {Colors, Constants, Fonts, Values} from '../../../constants';

import {SubmitButton} from '../SubmitButton';
import {
  captureProductBarcode,
  constructFormData,
  filterProducts,
  getValueFromFormData,
} from './helper';
import SearchBar from '../../SearchBar';
import SectionList from './components/SectionList';
import CardView from '../../common/CardView';
import SKUCaptureModal from './modals/SKUCaptureModal';
const SKUSelectForm = props => {
  const dispatch = useDispatch();
  const {item, formIndex} = props;
  const [formData, setFormData] = useState({});
  const [keyword, setKeyword] = useState('');
  const skuCaptureModalRef = useRef(null);
  const products = useMemo(() => filterProducts(item.products, keyword));
  const data = item;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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
  useEffect(() => {
    const formData = constructFormData(item);
    setFormData(formData);
  }, [item]);
  const onSubmit = () => {
    const submitValueData = getValueFromFormData(formData, item, formIndex);
    if (props.onButtonAction) {
      props.onButtonAction({
        type: Constants.actionType.ACTION_FORM_SUBMIT,
        value: submitValueData,
      });
    }
  };
  const onCapture = () => {
    if (skuCaptureModalRef && skuCaptureModalRef.current) {
      skuCaptureModalRef.current.showModal();
    }
  };
  const onCaptureAction = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CAPTURE) {
      const _formData = captureProductBarcode(formData, item, value);
      if (_formData) {
        setFormData(_formData);
      }
    }
  };
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
            maxHeight: isKeyboardVisible
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
      <SKUCaptureModal
        ref={skuCaptureModalRef}
        item={item}
        formData={formData}
        onButtonAction={onCaptureAction}
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
