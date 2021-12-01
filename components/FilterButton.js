import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { boxShadow } from '../constants/Styles';

export default function FilterButton(props) {
  return (
    <View style={[styles.card, boxShadow]}>
      <View>
        <Text style={styles.cardtitle}>{props.text}</Text>
        {props.subText && <Text style={styles.cardSubtitle}>{props.subText}</Text>}
      </View>
      <Image style={styles.dropdownImage} source={require("../assets/images/Drop_Down.png")} />
    </View>
  )
}
  
const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    padding: 10,
    height: 50,
  },
  cardtitle: {
    color: '#23282D',
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
  },
  cardSubtitle: {
    fontSize: 12,
  },
  dropdownImage: {
    width: 25,
    height: 25,
  }
})
