import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import SvgIcon from './SvgIcon';
import { boxShadow } from '../constants/Styles';
import { PRIMARY_COLOR, TEXT_COLOR } from '../constants/Colors';
import Fonts from '../constants/Fonts';

export default function Card({icon, title, subtitle , image, number, onPress}) {
  return (
    <TouchableOpacity style={[styles.cardContainer, boxShadow]} onPress={onPress}>
      {icon && <SvgIcon style={styles.leftIcon} icon={icon} width='24px' height='24px' />}
      {image && <Image style={styles.image} source={image} />}
      <View style={{ flexGrow: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subTitile}>{subtitle}</Text>}
      </View>
      {number && <View style={styles.numberBox}>
        <Text style={styles.number}>{number}</Text>
      </View>}
      <SvgIcon icon="Angle_Left" width='20px' height='20px' />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 12,
    paddingRight: 12,
    height: 70,
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
    color: '#000'
  },
  subTitile: {
    fontSize: 12,
    fontFamily: 'Gilroy-Medium',
    color: TEXT_COLOR,
    marginTop: 4
  },
  numberBox: {
    width: 24,
    height: 24,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginRight: 4
  },
  number: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
    color: '#fff'
  }
})