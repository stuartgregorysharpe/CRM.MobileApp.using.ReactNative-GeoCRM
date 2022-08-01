import React, {useState, useEffect} from 'react';
import {View, StyleSheet, 
    Text,
    TextInput,
    TouchableWithoutFeedback} from 'react-native';
import {Colors, Constants, Fonts, Values} from '../../../../constants';
import { whiteLabel } from '../../../../constants/Colors';

import CCheckBox from '../../../common/CCheckBox';

const ProductReturnSelectItem = props => {

  const {isChecked , item , count} = props;
  const { product_type, label} = item;

  const onValueChange = value => {
    if (props.onItemAction) {
      props.onItemAction({
        type: Constants.actionType.ACTION_CHECK,
        item: item,
        value: value,
      });
    }
  };

  const onChangeCount = count => {
    if (props.onItemChanged) {      
      var cnt = 0;
      if (count && Number(count) >= 0) {
        const nextCount = Number(count);
        //cnt = nextCount.toFixed(2);
        cnt = nextCount;
      } else {
        cnt = 0;
      }
      props.onItemChanged({
        type: Constants.actionType.ACTION_DONE,
        item: item,
        value: cnt
      });
    }
  };

  
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onValueChange(!isChecked);
      }}>
      <View style={[styles.container, props.style]}>
        <View style={{flex:2}}>
          <Text style={styles.title}>{product_type}</Text>
        </View>        
        <View style={{flex:3, marginRight:5}}>
          <Text style={styles.title}>{label}</Text>
        </View>

        <View style={{flex:1}}>

          <View style={styles.boxContainer}>
            <TextInput
              style={styles.textInput}
              value={count + ''}
              onChangeText={text => {                
                onChangeCount(text);                               
              }}
              onBlur={() => {
                //onChangeCount(count);
              }}
              onEndEditing={() => {
                //onChangeCount(count);
              }}
              keyboardType={'number-pad'}
            />
          </View>
            
        </View>        

        {/* <CCheckBox value={isChecked} onValueChange={onValueChange} /> */}

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 35,
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
  
  boxContainer: {
    borderRadius: 2,
    borderWidth: 1,  
    borderColor: whiteLabel().fieldBorder,
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


});

export default ProductReturnSelectItem;
