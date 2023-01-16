import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colors, Fonts} from '../../constants';
import {whiteLabel} from '../../constants/Colors';


const CTextInput = props => {

  const { multiline, cTextRef, dynamicFieldRef , index , add_prefix, add_suffix} = props;  

  console.log("add", add_prefix, add_suffix)

  return (
    <View style={[{alignSelf: 'stretch'}, props.style]}>

      {add_prefix != undefined && add_prefix !== '' && (
        <Text
          style={styles.prefixContainer}>
          {' '}
          {add_prefix}{' '}
        </Text>
      )}

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
        //numberOfLines={3}
        autoGrow
        outlineColor={
          props.hasError ? whiteLabel().endDayBackground : whiteLabel().fieldBorder
        }
        activeOutlineColor={
          props.hasError ? whiteLabel().endDayBackground : Colors.disabledColor
        }
        {...props}        
        style={[ multiline ? styles.multilineTextInput : styles.textInput, props.textInputStyle]}        
        //contentStyle={{paddingLeft:30, left:10, marginLeft:20 , backgroundColor:'red'}}
        containerStyle={{ paddingLeft: 50 }}
        
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

      {add_suffix != undefined && add_suffix !== '' && (
          <Text
            style={styles.suffixContainer}>
            {' '}
            {add_suffix}{' '}
          </Text>
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
    height:36,    
    fontSize: 14,
    lineHeight: 30,    
    backgroundColor: Colors.bgColor,
    fontFamily: Fonts.secondaryMedium,
    
  },
  multilineTextInput :{
    fontSize:14,    
    backgroundColor: Colors.bgColor,
    fontFamily: Fonts.secondaryMedium,
    maxHeight:Platform.OS == 'android' ? 125 : 130
  },
  prefixContainer: {    
    marginTop:18,
    color: whiteLabel().helpText,
    fontSize: 12,    
    position:'absolute',    
    left: -1,
    zIndex: 999
  },
  suffixContainer: {
    marginTop:18,
    color: whiteLabel().helpText,
    fontSize: 12,    
    position:'absolute',    
    right:0,
    zIndex: 999
  }
});

export default CTextInput;
