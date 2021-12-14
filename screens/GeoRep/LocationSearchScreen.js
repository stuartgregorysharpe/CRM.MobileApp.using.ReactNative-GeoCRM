import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import GrayBackground from '../../components/GrayBackground';

import FilterView from '../../components/FilterView';
import SearchBar from '../../components/SearchBar';
import { PRIMARY_COLOR, BG_COLOR, TEXT_COLOR } from '../../constants/Colors';
import { breakPoint } from '../../constants/Breakpoint';
import { SLIDE_STATUS } from '../../actions/actionTypes';

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
  <TouchableOpacity style={styles.resultItem} onPress={() => {navigation.navigate('LocationSpecificInfo');}}>
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
  const dispatch = useDispatch();
  const crmStatus = useSelector(state => state.rep.crmSlideStatus);

  const [showItem, setShowItem] = useState(0);

  useEffect(() => {
    dispatch({type: SLIDE_STATUS, payload: false});
  }, []);

  const animation = () => {
    dispatch({type: SLIDE_STATUS, payload: true});
    setShowItem(1);
  }

  return (
    <SafeAreaView>
      <GrayBackground />
      {crmStatus && <View
        style={[styles.transitionView, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]}
      >
        {showItem == 1 && <FilterView navigation={navigation} />}
      </View>}
      <View style={styles.container}>
        <SearchBar animation={animation} />
        <ScrollView>
          <Text style={styles.title}>Current Location</Text>
          {resultItemText.map((item, key) => (
            <ResultItem key={key} navigation={navigation} item={item} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const perWidth = setWidthBreakpoints(breakPoint);

const styles = EStyleSheet.create(parse({
  container: {
    position: 'relative',
    backgroundColor: BG_COLOR,
    height: '100%'
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
    color: TEXT_COLOR,
    marginBottom: 4
  },
  text: {
    fontSize: 12,
    fontFamily: 'Gilroy-Medium',
    color: '#9D9FA2',
  },
  textRight: {
    textAlign: 'right'
  },
  transitionView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: BG_COLOR,
    elevation: 2,
    zIndex: 2,
    padding: 10,
  },
}));