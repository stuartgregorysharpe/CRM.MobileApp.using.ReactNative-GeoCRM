import * as React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import SvgIcon from '../SvgIcon';
import { boxShadow, style } from '../../constants/Styles';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

export default function MultipleButton(props) {
  return (
    <TouchableOpacity style={[style.card, boxShadow, {borderColor:whiteLabel().fieldBorder, borderWidth:1} ]} onPress={props.onPress}>
      <View style={{flexDirection:'row' , alignItems:'center'}}>
        <Text style={[styles.cardtitle ,{color:props.text === 'Select Option' ? whiteLabel().helpText: Colors.mainText }]}>{props.text}</Text>                        
      </View>
      <SvgIcon icon="Drop_Down" width='23px' height='23px' />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  
  cardtitle: {
    color: Colors.textColor,
    fontSize: 14,
    fontFamily:Fonts.secondaryMedium,
  },
  cardSubtitle: {
    fontFamily:Fonts.secondaryMedium,
    fontSize: 14,
    color: whiteLabel().mainText
  },
})
