import React, {useState, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {Colors, Constants, Fonts, Strings, Values} from '../../../constants';
import {SubmitButton} from '../SubmitButton';
import CompetitorPriceList from './components/CompetitorPriceList';

const CompetitorView = props => {
  const {competitors, questionType, formIndex} = props;
  const [formData, setFormData] = useState({products: []});

  const onSubmit = _competitors => {
    if (props.onButtonAction) {
      props.onButtonAction({
        type: Constants.actionType.ACTION_FORM_SUBMIT,
        competitors: _competitors,
      });
    }
  };
  useEffect(() => {
    const formData = {
      products: competitors.map(x => {
        return {...x};
      }),
    };
    setFormData(formData);
  }, [competitors]);

  const onItemAction = data => {
    const {type, item} = data;
    if (type == Constants.actionType.ACTION_CHANGE_ITEM_PRICE) {
      const {price} = data;
      const _formData = {...formData};
      const _products = _formData.products;
      const itemIndex = _products.findIndex(
        x => x.competitor == item.competitor,
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
        x => x.competitor == item.competitor,
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
      <CompetitorPriceList
        items={formData.products}
        onItemAction={onItemAction}
      />
      <SubmitButton
        title={'Save'}
        style={{marginVertical: 16}}
        onSubmit={() => {
          onSubmit(formData.products);
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

export default CompetitorView;
