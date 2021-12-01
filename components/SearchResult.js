import React from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import Divider from './Divider';
import { PRIMARY_COLOR, BG_COLOR } from '../constants/Colors';

const resultItemText = [
  {
    title: 'Prospective Client',
    number: '0.06 mi',
    text: '3412 W Magnolia Blvd',
    result: 'Opportunity: Invalid lead',
    color: '#8850BF'
  },
  {
    title: 'Prospective Client',
    number: '0.18 mi',
    text: '3407 W Olive Ave',
    result: 'Contact: Language Barrier',
    color: '#12E1FC'
  },
  {
    title: 'Prospective Client',
    number: '0.08 mi',
    text: '3727 W Magnolia Blvd',
    result: 'Presentation: DNK Request',
    color: '#DC143C'
  },
  {
    title: 'Prospective Client',
    number: '0.16 mi',
    text: '3111 N Kenwood St',
    result: 'DM: Priority Re-loop',
    color: '#DC143C'
  },
  {
    title: 'Prospective Client',
    number: '1.12 mi',
    text: '3500 W Olive Ave',
    result: 'Opportunity: House Account',
    color: '#8850BF'
  },
  {
    title: 'Prospective Client',
    number: '1.24 mi',
    text: '2333 N Ontario St',
    result: 'DM: DNK Request',
    color: '#DC143C'
  },
  {
    title: 'Prospective Client',
    number: '1.98 mi',
    text: '3519 W Pacific Ave',
    result: 'DM: Priority Re-loop',
    color: '#DC143C'
  },
  {
    title: 'Prospective Client',
    number: '2.17 mi',
    text: '2500 W Burbank Blvd',
    result: 'Contact: House Account',
    color: '#12E1FC'
  },
  {
    title: 'Prospective Client',
    number: '2.17 mi',
    text: '2000 N Hollywood Way',
    result: 'Re-loop: No Contact (DM)',
    color: '#0AD10A'
  },
  {
    title: 'Prospective Client',
    number: '2.48 mi',
    text: '3523 W Burbank Blvd',
    result: 'DM: Priority Re-loop',
    color: '#F7931E'
  },
  {
    title: 'Prospective Client',
    number: '3.11 mi',
    text: '731 N Hollywood Way',
    result: 'DM: DNK Request',
    color: '#DC143C'
  },
  {
    title: 'African American Library',
    number: '3.41 mi',
    text: '1200 Victor St Houston',
    result: 'Order: Closed Won - Call Center',
    color: '#D9AE30'
  },
]

const ResultItem = ({navigation, item, onClose}) => (
  <TouchableOpacity style={styles.resultItem} onPress={() => {navigation.navigate('LocationInfo'); onClose();}}>
    <View style={{maxWidth: '48%'}}>
      <Text style={styles.subTitle}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
    <View style={{maxWidth: '48%'}}>
      <Text style={[styles.subTitle, styles.textRight]}>{item.number}</Text>
      <Text style={[styles.text, styles.textRight, {color: item.color}]}>{item.result}</Text>
    </View>
  </TouchableOpacity>
)

export default function SearchResult({navigation, onClose}) {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.dividerBar} onPress={() => onClose()}>
        <Divider />
      </TouchableOpacity>
      <View style={styles.searchResultContent}>
        <Text style={styles.title}>Current Location</Text>
        {resultItemText.map((item, key) => (
          <ResultItem key={key} navigation={navigation} item={item} onClose={() => onClose()} />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    height: Dimensions.get('window').height - 225
  },
  dividerBar: {
    backgroundColor: BG_COLOR,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    color: PRIMARY_COLOR,
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
    padding: 14
  },
  resultItem: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#e7e7e7'
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
    color: '#23282D',
    marginBottom: 4
  },
  text: {
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
    color: '#9D9FA2',
  },
  textRight: {
    textAlign: 'right'
  }
})