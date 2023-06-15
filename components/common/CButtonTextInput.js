import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colors, Fonts} from '../../constants';
import {whiteLabel} from '../../constants/Colors';
import { AppText } from './AppText';

const CButtonTextInput = props => {
  return (
    <View style={[{alignSelf: 'stretch'}, props.style]}>
      <TextInput
        theme={{ colors: { text: 'black'  , placeholder: whiteLabel().disabledColor } }}
        disabled={props.disabled != undefined ? props.disabled : false}
        mode="outlined"
        outlineColor={
          props.hasError ? whiteLabel().endDayBackground : whiteLabel().fieldBorder
        }
        activeOutlineColor={
          props.hasError ? whiteLabel().endDayBackground : Colors.disabledColor
        }
        {...props}
        style={[styles.textInput, props.textInputStyle]}
      />

      <TouchableOpacity style={[styles.addButtonStyle , {backgroundColor: props.value != undefined && props.value != '' ? whiteLabel().actionFullButtonBackground : Colors.disabledColor } ]} onPress={() => props.onSubmit()}>
          <AppText title="Add" color="white" size="medium" type="secondaryMedium"></AppText>
      </TouchableOpacity>

      {props.hasError && props.isRequired && (
        <View style={{position: 'absolute', right: 0, top: 15}}>
          <Text
            style={[
              {
                color: whiteLabel().endDayBackground,
                marginHorizontal: 10,
                fontFamily: Fonts.primaryRegular,
              },
              props.errorTextStyle,
            ]}>
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
  addButtonStyle: {
      position:'absolute',
      right:0,
      backgroundColor: Colors.disabledColor,
      fontFamily:Fonts.secondaryBold,
      marginTop:7,    
      borderTopRightRadius:3,
      borderBottomRightRadius:3,
      marginRight:1,
      width: 100,      
      height:36,
      alignItems:'center',
      justifyContent:'center'
  }
});

export default CButtonTextInput;
