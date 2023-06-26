import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Platform , TextInput} from 'react-native';
import {Colors, Fonts} from '../../constants';
import {whiteLabel} from '../../constants/Colors';


const CTextInput = props => {

  const { multiline, cTextRef, dynamicFieldRef , index , add_prefix, add_suffix , isClickable} = props;  
  const hasError = props.hasError;  
  

  const renderTopDescription = descriptionText => {
    return <Text style={styles.descriptionText}>{descriptionText}</Text>;
  };

  const getPrefixPadding = () => {
    if(add_prefix != undefined && add_prefix !== ''){
      return 8 * add_prefix.length;
    }
    return 0;
  }

  const getDisableStatus = () => {
    if(isClickable != undefined && isClickable){
      return false;
    }  
    if(props.disabled != undefined){
      return !props.disabled;
    }
    return true;
  }

  return (
    <View style={{alignSelf:'stretch', marginTop:5}}>
      <View style={[{
          alignSelf: 'stretch' ,        
          borderColor: hasError ? whiteLabel().endDayBackground : whiteLabel().fieldBorder }, 
          props.style , styles.containerStyle]}>

        {add_prefix != undefined && add_prefix !== '' && (
          <Text
            style={styles.prefixContainer}>
            {' '}
            {add_prefix}{' '}
          </Text>
        )}

        {
          props.label && props.label != '' &&  props.value != undefined && props.value != '' &&
          renderTopDescription(props.label)
        }

        <TextInput        
          
          ref={element => {
            if(dynamicFieldRef != undefined && index != undefined &&  dynamicFieldRef.current != undefined){
              dynamicFieldRef.current[index] = element;
            }
            if(cTextRef != undefined && cTextRef != null){
              cTextRef.current = element;
            }
          }}        
          placeholder={props.label}
          editable={getDisableStatus()}
          //mode="outlined"
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
          style={[ multiline ? styles.multilineTextInput : styles.textInput, props.textInputStyle , {marginLeft : getPrefixPadding()} ]}        
          value={props.value}
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


        {props.hasError && props.isRequired && (add_suffix == undefined || add_suffix == '') && (
          <View style={{position: 'absolute', right: 0, top: 8}}>
            <Text
              style={[
                {
                  color: whiteLabel().endDayBackground,
                  marginHorizontal: 10,
                  fontFamily: Fonts.primaryRegular,
                  fontSize: 14,
                },
                props.errorTextStyle,
              ]}>
              {"required"}
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

        
      </View>
      {
          props.errorText && props.hasError &&
          <Text style={{color:whiteLabel().endDayBackground, fontSize:12, marginLeft:5, marginTop:3}} >{props.errorText}</Text>
      }

    </View>
  );
};

const styles = StyleSheet.create({

  containerStyle :{
    borderRadius: 4,    
    borderWidth:1,
    padding:3,
    paddingTop:5,
    justifyContent:'center',    
  },

  textInput: {
    alignSelf:'stretch',    
    height:30,
    fontSize: 14,
    paddingTop:0,
    paddingBottom:0,
    backgroundColor: Colors.bgColor,
    fontFamily: Fonts.secondaryMedium,         
    justifyContent:'center',  
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
  },
  descriptionText: {
    position: 'absolute',
    top: -8,
    left: 8,
    fontSize: 12,
    paddingHorizontal: 2,
    color: Colors.disabledColor,
    backgroundColor: Colors.bgColor,
    zIndex:999999999999999
  },
});

export default CTextInput;



