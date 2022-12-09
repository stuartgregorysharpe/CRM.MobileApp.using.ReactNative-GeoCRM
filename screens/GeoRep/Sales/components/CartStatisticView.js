import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import SvgIcon from '../../../../components/SvgIcon';
import {Fonts} from '../../../../constants';
import Colors, {whiteLabel} from '../../../../constants/Colors';
import {style} from '../../../../constants/Styles';
import {formattedSpacingPrice} from '../../../../helpers/formatHelpers';

const CartStatisticsView = props => {
  const {currency} = props;
  const symbol = currency?.symbol || 'R';
  const {itemCount, unitCount, discount, subTotal, tax, total} = props.data;
  const discountCurrency = symbol + formattedSpacingPrice(discount);
  const subTotalCurrency = symbol + formattedSpacingPrice(subTotal);
  const taxCurrency = symbol + formattedSpacingPrice(tax);
  const totalCurrency = symbol + formattedSpacingPrice(total);
  return (
    <View style={[styles.container, style.cardContainer, props.style]}>
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() => {
          if (props.onPress) {
            props.onPress();
          }
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <Text
            style={[styles.text, {flex: 1}]}>{`${itemCount}     Items`}</Text>
          <Text
            style={[styles.text, {flex: 1}]}>{`${unitCount}     Units`}</Text>
          <Text style={[styles.text, {flex: 1}]}>{`${subTotalCurrency}`}</Text>
        </View>
        <SvgIcon icon="Drop_Down" height="25" width="25" />
      </TouchableOpacity>
      <View style={{alignItems: 'flex-end', paddingTop: 10}}>
        <View style={styles.itemContainer}>
          <Text
            style={[
              styles.label,
              {color: Colors.redColor},
            ]}>{`Discount:`}</Text>
          <Text style={[styles.currencyText, {color: Colors.redColor}]}>
            {discountCurrency}
          </Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.label}>{`Sub Total:`}</Text>
          <Text style={styles.currencyText}>{subTotalCurrency}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>{`Tax:`}</Text>
          <Text style={styles.currencyText}>{taxCurrency}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>{`Total:`}</Text>
          <Text style={styles.currencyText}>{totalCurrency}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  headerContainer: {
    height: 38,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: whiteLabel().actionOutlineButtonBorder,
  },
  text: {
    fontSize: 14,
    color: whiteLabel().inputText,
    fontFamily: Fonts.primaryRegular,
  },
  label: {
    fontSize: 14,
    color: whiteLabel().inputText,
    fontFamily: Fonts.primaryBold,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  currencyText: {
    fontSize: 14,
    color: whiteLabel().inputText,
    fontFamily: Fonts.primaryBold,
    width: 150,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
  },
});

export default CartStatisticsView;
