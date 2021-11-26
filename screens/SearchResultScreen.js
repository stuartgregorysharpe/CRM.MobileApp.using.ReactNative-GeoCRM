import React, {useEffect} from 'react';
import { SafeAreaView, View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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

const ResultItem = ({item}) => (
  <View style={styles.resultItem}>
    <View style={{maxWidth: '48%'}}>
      <Text style={styles.subTitle}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
    <View style={{maxWidth: '48%'}}>
      <Text style={[styles.subTitle, styles.textRight]}>{item.number}</Text>
      <Text style={[styles.text, styles.textRight, {color: item.color}]}>{item.result}</Text>
    </View>
  </View>
)

export default function SearchResultScreen(props) {
  useEffect(() => {
    props.screenProps.setOptions({
      tabBarStyle: {
        display: 'flex',
        height: 60,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#fff",
      },
    });
  })
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.autoCompleteBox}>
          <GooglePlacesAutocomplete
            styles={{
              textInput: {
                paddingLeft: 42,
                paddingRight: 50,
                color: '#5d5d5d',
                fontSize: 16,
                fontFamily: 'Gilroy-Medium',
                backgroundColor: '#fff',
                shadowColor: '#808080',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
                elevation: 1,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            placeholder='Search.....'
            onPress={(data, details = null) => {
              console.log(data, details);
            }}
            query={{
              key: 'AIzaSyA36_9T7faYSK-w84OhxTe9CIbx4THru3o',
              language: 'en',
            }}
          />
          <FontAwesomeIcon style={styles.searchIcon} size={25} color="#9D9FA2" icon={ faSearch } />
          <TouchableOpacity style={styles.filterImageButton} onPress={() => {
            filterStartAnimation(0);
            markerStartAnimation(1);
          }}>
            <Image style={styles.filterImage} source={require('../assets/images/Filter.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchResultContent}>
          <Text style={styles.title}>Current Location</Text>
          {resultItemText.map((item, key) => (
            <ResultItem key={key} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
  },
  title: {
    color: PRIMARY_COLOR,
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
    padding: 14
  },
  autoCompleteBox: {
    position: 'relative',
    padding: 10,
    height: 66,
  },
  searchIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    elevation: 1
  },
  filterImageButton: {
    position: 'absolute',
    top: 18,
    right: 20,
    elevation: 1
  },
  filterImage: {
    width: 30,
    height: 30
  },
  resultItem: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderTopWidth: 1,
    borderColor: '#e7e7e7'
  },
  subTitle: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'Gilroy-Bold',
    color: '#23282D',
    marginBottom: 4
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'Gilroy-Medium',
    color: '#9D9FA2',
  },
  textRight: {
    textAlign: 'right'
  }
})