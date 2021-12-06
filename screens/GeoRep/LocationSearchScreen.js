import React, { 
  useState
} from 'react';
import { 
  View, 
  ScrollView, 
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  setWidthBreakpoints,
  parse
} from 'react-native-extended-stylesheet-breakpoints';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import SvgIcon from '../../components/SvgIcon';
import { 
  PRIMARY_COLOR, 
  BG_COLOR 
} from '../../constants/Colors';
import { boxShadow } from '../../constants/Styles';

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

const ResultItem = ({navigation, item}) => (
  <TouchableOpacity style={styles.resultItem} onPress={() => {navigation.navigate('LocationInfo');}}>
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

export default function LocationSearchScreen({navigation}) {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={[styles.searchInput, boxShadow]}
          placeholder='Search.....'
          value={text}
          onChangeText={text => setText(text)}
        />
        <FontAwesomeIcon style={styles.searchIcon} size={16} color="#9D9FA2" icon={ faSearch } />
        <TouchableOpacity style={styles.filterImageButton}>
          <SvgIcon icon="Filter" width="30px" height="30px" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginBottom: 70}}>
        <Text style={styles.title}>Current Location</Text>
        {resultItemText.map((item, key) => (
          <ResultItem key={key} navigation={navigation} item={item} />
        ))}
      </ScrollView>
    </View>
  )
}

const perWidth = setWidthBreakpoints(850);

const styles = EStyleSheet.create(parse({
  container: {
    backgroundColor: BG_COLOR,
  },
  searchBox: {
    position: 'relative',
    padding: 10,
  },
  searchInput: {
    paddingLeft: 36,
    paddingRight: 50,
    color: '#5d5d5d',
    fontSize: 12,
    backgroundColor: '#fff',
    borderRadius: 7,
    fontFamily: 'Gilroy-Medium',
    height: 45,
  },
  searchIcon: {
    position: 'absolute',
    top: 24,
    left: 20,
    elevation: 1,
    zIndex: 1
  },
  filterImageButton: {
    position: 'absolute',
    top: 18,
    right: 20,
    zIndex: 1,
    elevation: 1
  },
  title: {
    color: PRIMARY_COLOR,
    fontSize: 15,
    fontFamily: 'Gilroy-Bold',
    paddingLeft: 14,
    marginBottom: 10
  },
  resultItem: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    borderTopWidth: 1,
    borderColor: '#e7e7e7'
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'Gilroy-Bold',
    color: '#23282D',
    marginBottom: 4
  },
  text: {
    fontSize: 12,
    fontFamily: 'Gilroy-Medium',
    color: '#9D9FA2',
  },
  textRight: {
    textAlign: 'right'
  }
}));