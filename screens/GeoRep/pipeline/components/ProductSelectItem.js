import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import CCheckBox from '../../../../components/common/CCheckBox';
import {whiteLabel} from '../../../../constants/Colors';

import {Colors, Constants, Fonts} from '../../../../constants';

const ProductSelectItem = props => {
  const {isChecked, item} = props;
  const {product, indicator_color} = item;
  const isShowIndicator = indicator_color != undefined;
  const onValueChange = value => {
    if (props.onItemAction) {
      props.onItemAction({
        type: Constants.actionType.ACTION_CHECK,
        item: item,
        value: value,
      });
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onValueChange(!isChecked);
      }}>
      <View style={[styles.container, props.style]}>
        {isShowIndicator && (
          <View
            style={[styles.indicateCircle, {backgroundColor: indicator_color}]}
          />
        )}

        <Text style={styles.title}>{product}</Text>
        <CCheckBox
          value={isChecked}
          onValueChange={onValueChange}
          style={styles.checkbox}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    minHeight: 32,
    flexDirection: 'row',
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.primaryBold,
    color: Colors.blackColor,
    flex: 1,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteLabel().itemSelectedBackground,
    borderWidth: 1,
    borderColor: whiteLabel().itemSelectedBackground,
  },
  indicateCircle: {
    marginRight: 8,
    width: 10,
    height: 10,
    borderRadius: 10,
  },
});

export default ProductSelectItem;
