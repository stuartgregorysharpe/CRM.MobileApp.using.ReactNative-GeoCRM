import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colors, Fonts} from '../../constants';
import {whiteLabel} from '../../constants/Colors';


const CTextInput = props => {
  const { multiline, cTextRef, dynamicFieldRef , index} = props;
  

  return (
    <View style={[{alignSelf: 'stretch'}, props.style]}>
      <TextInput        
        ref={element => {
          if(dynamicFieldRef != undefined && index != undefined &&  dynamicFieldRef.current != undefined){
            dynamicFieldRef.current[index] = element;
          }
          if(cTextRef != undefined && cTextRef != null){
            cTextRef.current = element;
          }
        }}        
        disabled={props.disabled != undefined ? props.disabled : false}
        mode="outlined"        
        multiline={multiline != undefined ? multiline : false}
        numberOfLines={5}
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
            dynamicFieldRef != undefined &&
            dynamicFieldRef.current != undefined &&
            index <= dynamicFieldRef.current.length - 2 &&
            dynamicFieldRef.current[index + 1] != null
          ) {
            if(!multiline){
              dynamicFieldRef.current[index + 1].focus();
            }            
          }
          if(props.onSubmitEditing){
            props.onSubmitEditing();
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

      {
        props.errorText && props.hasError &&
        <Text style={{color:whiteLabel().endDayBackground, fontSize:12, marginLeft:5, marginTop:3}} >{props.errorText}</Text>
      }
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
