import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Colors, Fonts, Values} from '../../../../constants';

const NumberCounter = props => {

  const {count , btnStyle  , btnTextStyle , inputBoxStyle , isClickable } = props;
  const step = props.step || 1;
  const fixed = props.fixed || 0;

  const onCount = isPlus => {
    if (props.onCount) {
      if (isPlus) {
        const nextCount = Number(count) + step;
        props.onCount(nextCount.toFixed(fixed));
      } else {
        const nextCount = Number(count) - step;
        if (nextCount < 0) {
          props.onCount(0);
        } else {
          props.onCount(nextCount.toFixed(fixed));
        }
      }

      if(props.onChangeText){

      }      
    }
  };
  
  const onChangeCount = count => {
    if (props.onCount) {
      if (count && Number(count) >= 0) {
        const nextCount = Number(count);
        props.onCount(nextCount.toFixed(fixed));
      } else {
        props.onCount(0);
      }
    }
  };

  const onEditDone = (qty) => {
    try{      
      if(props.onEditDone){ 
          if(parseFloat(qty) > 0){
            props.onEditDone(parseFloat(qty).toFixed(fixed));      
          }else{
            props.onEditDone(0);      
          }
          
      }
    }catch(e){
      console.log("on edit done error: ", e)
    }    
  }

  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        style={[styles.buttonStyle, btnStyle ? btnStyle : {}]}
        onPress={() => {
          if( (isClickable != undefined  && isClickable) || isClickable == undefined){
            onCount(false)
            onEditDone(Number(count) - Number(step) > 0 ? Number(count) - Number(step) : 0);
          }        
        }}>
        <Text style={[styles.buttonText, btnTextStyle ? btnTextStyle : {}]}>{'-'}</Text>
      </TouchableOpacity>

      <View style={[styles.boxContainer, inputBoxStyle ? inputBoxStyle : {}]}>
        <TextInput
          style={styles.textInput}
          value={count + ''}
          onChangeText={text => {
            if (props.onCount) {
              props.onCount(text);
            }
            if (props.onChangeText) {
              props.onChangeText(text);
            }
          }}
          onBlur={() => {
            onChangeCount(count);
            onEditDone(count);
          }}
          onEndEditing={() => {
            onChangeCount(count);         
          }}
          keyboardType={'number-pad'}
        />
      </View>
      <TouchableOpacity
        style={[styles.buttonStyle, btnStyle ? btnStyle : {}]}
        onPress={() => {
          if( (isClickable != undefined  && isClickable) || isClickable == undefined){
            onCount(true);
            onEditDone(Number(count) + Number(step));
          }
          
        }}>
        <Text style={[styles.buttonText, btnTextStyle ? btnTextStyle : {}]}>{'+'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    fontSize: Values.fontSize.xSmall,
    color: Colors.primaryColor,
    lineHeight: 12,
    padding: 0,
    textAlign: 'center',
    marginHorizontal: 8,
    marginVertical: 0,
    minHeight: 24,
  },
  buttonText: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.small,
    color: Colors.primaryColor,
  },
  buttonStyle: {
    width: 40,
    height: 40,    
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxContainer: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
  },
});

export default NumberCounter;
