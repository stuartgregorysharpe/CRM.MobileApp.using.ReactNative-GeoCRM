import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colors, Fonts} from '../../constants';
import {whiteLabel} from '../../constants/Colors';
const CTextInput = props => {
  return (
    <View style={[{alignSelf: 'stretch'}, props.style]}>
      <TextInput
        mode="outlined"
        outlineColor={
          props.hasError ? whiteLabel().endDayBackground : Colors.primaryColor
        }
        activeOutlineColor={
          props.hasError ? whiteLabel().endDayBackground : Colors.disabledColor
        }
        {...props}
        style={[styles.textInput, props.textInputStyle]}
      />
      {props.hasError && props.isRequired && (
        <View style={{position: 'absolute', right: 0, top: 15}}>
          <Text
            style={{
              color: whiteLabel().endDayBackground,
              marginHorizontal: 10,
              fontFamily: Fonts.primaryRegular,
            }}>
            (required)
          </Text>
        </View>
      )}
    </View>
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
