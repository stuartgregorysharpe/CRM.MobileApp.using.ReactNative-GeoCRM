import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import SvgIcon from '../../../../components/SvgIcon';
import { boxShadow, style } from '../../../../constants/Styles';
import Colors, { whiteLabel } from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';

export default function Card({icon, title, subtitle , image, number, onPress}) {
  return (
    <TouchableOpacity style={[styles.cardContainer, boxShadow]} onPress={onPress}>
      {icon && <SvgIcon style={styles.leftIcon} icon={icon} width='24px' height='24px' />}
      {image && <Image style={styles.image} source={{uri:image}} />}
      <View style={{ flex: 1, flexDirection:'column', alignItems:'flex-start', paddingTop:10, paddingBottom:10 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subTitile}>{subtitle}</Text>}
      </View>
      {number && <View style={style.numberBox}>
        <Text style={styles.number}>{number}</Text>
      </View>}
      <SvgIcon icon="Angle_Left_form" width='20px' height='20px' />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex:1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 7,
    marginBottom: 10
  },
  leftIcon: {
    marginRight: 12,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 12
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.primaryBold,
    color: Colors.blackColor
  },
  subTitile: {
    fontSize: 12,
    fontFamily: Fonts.secondaryMedium,
    color: Colors.textColor,
    marginTop: 4
  },
  
  number: {
    fontFamily: Fonts.secondaryMedium,
    fontSize: 14,
    color: whiteLabel().countBoxText
  }
})