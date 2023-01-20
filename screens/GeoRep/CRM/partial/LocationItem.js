
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity , Text } from 'react-native';
import SvgIcon from '../../../../components/SvgIcon';
import Colors, { whiteLabel } from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import { style } from '../../../../constants/Styles';

export function LocationItem ({isSelected, item, isChecked, onItemClicked }) {

    return (
      <TouchableOpacity style={[styles.resultItem , {backgroundColor: isSelected && isChecked ? whiteLabel().itemSelectedBackground : Colors.bgColor  }]} onPress={() => {
          if(isSelected){
            //setIsChecked(!isChecked);            
            item.checked = !isChecked;
            onItemClicked(!isChecked);
          }else{
            onItemClicked(!isChecked);
          }                  
      }}>

        <View style={{ flex:1 }}>
          {
            item.name !== "" &&
            <Text style={styles.subTitle}>{item.name}</Text>
          }
          {
            item.name === "" &&  item.address === "" &&         
            <View style={{flexDirection:'row'}}>
              <View style={[style.grey_bar,{width:'50%'}]}></View>
              <View style={[style.grey_bar,{width:'25%'}]}></View>
            </View>
            
          }
          {
            item.address !== "" && 
            <Text style={styles.text}>{item.address}</Text>
          }
          {
            item.address === "" &&
            <View style={{flexDirection:'row'}}>
              <View style={[style.grey_bar,{width:'25%'}]}></View>
              <View style={[style.grey_bar,{width:'30%'}]}></View>
              <View style={[style.grey_bar,{width:'25%'}]}></View>
            </View>          
          }

        </View>

        <View style={{ flex:1 , alignItems:'flex-end' }}>

          {
            item.distance !== "" && 
            <Text style={[styles.subTitle, styles.textRight]}>
              {item.distance}
            </Text>
          }
          {
            item.distance === "" && 
            <View style={[style.grey_bar,{width:'25%'}]}></View>
          }

          {
            item.status !== "" && 
            <Text style={[styles.text, styles.textRight,{color:item.status_text_color}]}>{item.status}</Text>
          }
                    
          {
            item.status === "" && 

            <View style={{flexDirection:'row'}} >
              <View style={[style.grey_bar,{width:'40%'}]}></View>
              <View style={[style.grey_bar,{width:'40%'}]}></View>
            </View>
          }

        </View>

        {
            isSelected && isChecked && 
            <View style={{justifyContent:'center',marginLeft:5}}><SvgIcon icon="Item_Selected" width='20px' height='20px' /></View>
        }
                
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    resultItem: {
        maxWidth: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 14,
        paddingRight: 14,
        borderTopWidth: 1,
        borderColor: '#e7e7e7',                        
    },
    subTitle: {
        fontSize: 14,
        fontFamily: Fonts.secondaryMedium,
        color: Colors.textColor,
        marginBottom: 4
      },
      text: {
        fontSize: 12,
        fontFamily: Fonts.secondaryMedium,
        color: Colors.disabledColor,
    },

    textRight: {
        textAlign: 'right'
    },

});