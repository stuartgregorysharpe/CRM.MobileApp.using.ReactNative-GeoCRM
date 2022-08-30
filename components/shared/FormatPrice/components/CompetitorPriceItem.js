import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Colors, Constants, Fonts, Values} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';
import {numberFieldValidator} from '../../../../constants/Helper';
import CSwtichButton from '../../../common/CSwitchButton';

const CompetitorPriceItem = props => {
  const {item} = props;
  if (!item) return null;
  const {competitor, price, price_type} = item;
  const priceTypeValue = price_type == 'Promo';
  const fixed = props.fixed || 2;
  const onChangePrice = (_priceText, _isConvertToNumber) => {
    let isConvertToNumber = _isConvertToNumber;
    let priceText = _priceText;
    if (typeof priceText === 'string' || priceText instanceof String) {
      while (!numberFieldValidator(priceText) && priceText != '') {
        priceText = priceText.substring(0, priceText.length - 1);
      }
    }

    let nextPrice = isConvertToNumber
      ? Number(priceText).toFixed(fixed)
      : priceText;
    if ((nextPrice == 0 || nextPrice == 'NaN') && isConvertToNumber) {
      nextPrice = '';
    }
    if (props.onItemAction) {
      props.onItemAction({
        type: Constants.actionType.ACTION_CHANGE_ITEM_PRICE,
        item,
        price: nextPrice,
      });
    }
  };
  const onChangePriceType = isPromo => {
    if (props.onItemAction) {
      props.onItemAction({
        type: Constants.actionType.ACTION_CHANGE_ITEM_PRICE_TYPE,
        item,
        price_type: isPromo ? 'Promo' : 'Normal',
      });
    }
  };
  return (
    <View style={[styles.container, styles.bottomBorder, props.style]}>
      <Text style={styles.text}>{competitor}</Text>
      <CSwtichButton
        onTitle="Promo"
        offTitle="Normal"
        value={priceTypeValue}
        onPress={onChangePriceType}
        style={{marginRight: 16}}
      />
      <TextInput
        style={styles.textInput}
        value={price + ''}
        onChangeText={text => {
          onChangePrice(text);
        }}
        onBlur={() => {
          onChangePrice(price, true);
        }}
        onEndEditing={() => {
          onChangePrice(price, true);
        }}
        keyboardType={'number-pad'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  bottomBorder: {
    borderBottomColor: whiteLabel().lineSeperator,
    borderBottomWidth: 1,
  },
  text: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.xSmall,
    color: whiteLabel().inputText,
    flex: 1,
  },
  textInput: {
    fontSize: Values.fontSize.xSmall,
    color: Colors.primaryColor,
    lineHeight: 12,
    textAlign: 'center',
    minHeight: 24,
    padding: 0,
    borderRadius: 4,
    marginRight: 12,
    borderWidth: 1,
    borderColor: whiteLabel().inputText,
    width: 70,
  },
});

export default CompetitorPriceItem;
