import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';

import {Colors, Constants, Fonts} from '../../../../constants';

import CCheckBox from '../../../common/CCheckBox';

const SelectItem = props => {

  const {isChecked, item , checkedItemIds} = props;
  const { product_type, label} = item;
  //const label = "dfdf"
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
        <View style={{flex:1}}>
          <Text style={styles.title}>{product_type}</Text>
        </View>        
        <View style={{flex:2, marginRight:5}}>
          <Text style={styles.title}>{label}</Text>
        </View>
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
