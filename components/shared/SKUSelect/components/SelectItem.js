import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';

import {Colors, Constants, Fonts} from '../../../../constants';

import CCheckBox from '../../../common/CCheckBox';

const SelectItem = props => {
  const {isChecked, item} = props;
  const {label} = item;
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
        <Text style={styles.title}>{label}</Text>
        <CCheckBox value={isChecked} onValueChange={onValueChange} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 32,
    flexDirection: 'row',
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 11,
    fontFamily: Fonts.primaryRegular,
    color: Colors.blackColor,
  },
});

export default SelectItem;
