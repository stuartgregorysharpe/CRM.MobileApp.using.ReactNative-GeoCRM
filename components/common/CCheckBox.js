import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {whiteLabel} from '../../constants/Colors';
import SvgIcon from '../SvgIcon';
const CCheckBox = props => {
  const {value} = props;
  return (
    <TouchableOpacity onPress={() => props.onValueChange(!value)}>
      <View
        style={[
          styles.checkBoxStyle,
          props.style,
          value ? {} : {backgroundColor: 'white'},
        ]}>
        <SvgIcon icon="Yes_No_Button_Check" width="15px" height="15px" />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  checkBoxStyle: {
    width: 18,
    height: 18,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteLabel().activeIcon,
    borderWidth: 1,
    borderColor: whiteLabel().activeIcon,
  },
});
export default CCheckBox;
