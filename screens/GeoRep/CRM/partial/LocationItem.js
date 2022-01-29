
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity , Text } from 'react-native';
import SvgIcon from '../../../../components/SvgIcon';
import { BG_COLOR, DISABLED_COLOR, TEXT_COLOR } from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';

export function LocationItem ({isSelected, item, selectedItems, onItemClicked }) {

    const [isChecked, setIsChecked] = useState(false);    
    useEffect(() => {   
      //if(isSelected){
        setIsChecked(false);
      //}    
    }, [isSelected]);

    return (
      <TouchableOpacity style={[styles.resultItem , {backgroundColor: isSelected && isChecked ? 'rgba(61, 143, 251, 0.4)' : BG_COLOR  }]} onPress={() => {
          if(isSelected){
            setIsChecked(!isChecked);            
            item.checked = !isChecked;
            onItemClicked(!isChecked);
          }else{
            onItemClicked(!isChecked);
          }        
      }}>
        <View style={{ flex:1 }}>
          <Text style={styles.subTitle}>{item.name}</Text>
          <Text style={styles.text}>{item.address}</Text>
        </View>

        <View style={{ flex:1 }}>
          <Text style={[styles.subTitle, styles.textRight]}>
            {item.distance} mi
          </Text>
          <Text style={[styles.text, styles.textRight,{color:item.status_text_color}]}>{item.status}</Text>
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
        color: TEXT_COLOR,
        marginBottom: 4
      },
      text: {
        fontSize: 12,
        fontFamily: Fonts.secondaryMedium,
        color: DISABLED_COLOR,
    },

    textRight: {
        textAlign: 'right'
    },

});