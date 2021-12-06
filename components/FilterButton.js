import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SvgIcon from './SvgIcon';
import { boxShadow } from '../constants/Styles';

export default function FilterButton(props) {
  return (
    <View style={[styles.card, boxShadow]}>
      <View>
        <Text style={styles.cardtitle}>{props.text}</Text>
        {props.subText && <Text style={styles.cardSubtitle}>{props.subText}</Text>}
      </View>
      <SvgIcon icon="Drop_Down" width='23px' height='23px' />
    </View>
  )
}
  
const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    padding: 8,
    height: 44,
  },
  cardtitle: {
    color: '#23282D',
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
  },
  cardSubtitle: {
    fontSize: 12,
  },
})
