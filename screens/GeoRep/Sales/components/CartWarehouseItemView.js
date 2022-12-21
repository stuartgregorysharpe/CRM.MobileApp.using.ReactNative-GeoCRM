import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import SvgIcon from '../../../../components/SvgIcon';
import {Fonts} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';
import {style} from '../../../../constants/Styles';

const CartWarehouseItemView = props => {
  const {itemCount, title} = props;
  return (
    <TouchableOpacity
      style={[styles.container, style.cardContainer, props.style]}
      onPress={() => {
        if (props.onPress) {
          props.onPress();
        }
      }}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
        <SvgIcon
          icon="Home_Black"
          height="12px"
          width="12px"
          style={{marginTop: 5}}
        />
        <View style={{flex: 1, marginLeft: 4}}>
          <Text style={styles.text}>{title}</Text>
          <Text
            style={[styles.text, {marginTop: 2}]}>{`${itemCount} Item`}</Text>
        </View>
      </View>
      <SvgIcon icon="Drop_Down" height="25" width="25" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 45,
    paddingLeft: 16,
    paddingRight: 10,
  },
  text: {
    fontSize: 14,
    color: whiteLabel().inputText,
    fontFamily: Fonts.primaryRegular,
  },
});

export default CartWarehouseItemView;
