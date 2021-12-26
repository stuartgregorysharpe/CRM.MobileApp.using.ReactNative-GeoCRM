import * as React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import SvgIcon from './SvgIcon';
import { boxShadow } from '../constants/Styles';
import { TEXT_COLOR } from '../constants/Colors';

export default function FilterButton(props) {
  return (
    <TouchableOpacity style={[styles.card, boxShadow]} onPress={props.onPress}>
      <View>
        <Text style={styles.cardtitle}>{props.text}</Text>
        {props.subText && <Text style={styles.cardSubtitle}>{props.subText}</Text>}
      </View>
      <SvgIcon icon="Drop_Down" width='23px' height='23px' />
    </TouchableOpacity>
  )
}
  
const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    padding: 8,
    height: 44,
  },
  cardtitle: {
    color: TEXT_COLOR,
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
  },
  cardSubtitle: {
    fontSize: 12,
  },
})
