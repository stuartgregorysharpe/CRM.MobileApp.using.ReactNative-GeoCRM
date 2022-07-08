import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colors, Fonts} from '../../constants';
import {whiteLabel} from '../../constants/Colors';
const CTextInput = props => {
  const { dynamicFieldRef , index} = props;
  
  return (
    <View style={[{alignSelf: 'stretch'}, props.style]}>
      <TextInput
        ref={element => {
          if(dynamicFieldRef != undefined && index != undefined){
            dynamicFieldRef.current[index] = element;
          }
        }}
        //value={props.value != undefined? props.value : ''}                
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
        onSubmitEditing={() => {
          if (
            index <= dynamicFieldRef.current.length - 2 &&
            dynamicFieldRef.current[index + 1] != null
          ) {            
            dynamicFieldRef.current[index + 1].focus();          
          }
        }}
      />
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
});

export default CTextInput;
