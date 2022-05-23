import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colors, Fonts} from '../../constants';
import {whiteLabel} from '../../constants/Colors';
const CTextInput = props => {
  return (
    <TextInput
      mode="outlined"
      outlineColor={
        props.hasError ? whiteLabel().endDayBackground : Colors.primaryColor
      }
      activeOutlineColor={
        props.hasError ? whiteLabel().endDayBackground : Colors.disabledColor
      }
      {...props}
      style={[styles.textInput, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 36,
    fontSize: 14,
    lineHeight: 30,
    backgroundColor: Colors.bgColor,
    fontFamily: Fonts.secondaryMedium,
  },
});

export default CTextInput;
