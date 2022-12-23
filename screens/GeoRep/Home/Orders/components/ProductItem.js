import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors, Fonts} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';

const ProductItem = props => {
  const {
    product_name,
    warehouse_name,
    sub_detail,
    price,
    status,
    status_color,
  } = props.item;

  return (
    <View style={[styles.container, props.style]}>
      <View
        style={{
          alignSelf: 'stretch',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: whiteLabel().actionFullButtonBackground,
          borderBottomWidth: 1,
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}>
        <View>
          <Text style={styles.title}>{product_name}</Text>
          <Text style={styles.description}>{warehouse_name}</Text>
        </View>
        <View>
          <Text style={styles.text}>{sub_detail}</Text>
          <Text style={styles.priceText}>{price}</Text>
        </View>
      </View>
      <View
        style={{
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 4,
        }}>
        <Text style={[styles.statusText, {color: status_color}]}>{status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: whiteLabel().actionOutlineButtonBorder,
    borderRadius: 4,
    marginTop: 8,
  },
  statusText: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    lineHeight: 15,
    fontWeight: 'bold',
    fontFamily: Fonts.primaryBold,
    color: whiteLabel().inputText,
  },
  description: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: 'bold',
    fontFamily: Fonts.primaryBold,
    color: whiteLabel().helpText,
  },
  text: {
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'right',
    color: whiteLabel().inputText,
    fontWeight: '600',
    fontFamily: Fonts.primaryRegular,
  },
  priceText: {
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'right',
    color: whiteLabel().mainText,
    fontWeight: '600',
    fontFamily: Fonts.primaryRegular,
  },
});

export default ProductItem;
