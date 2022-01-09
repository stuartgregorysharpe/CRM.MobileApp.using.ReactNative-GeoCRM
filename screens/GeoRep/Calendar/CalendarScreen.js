import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

import SvgIcon from '../../../components/SvgIcon';
import { PRIMARY_COLOR } from '../../../constants/Colors';
import { boxShadow } from '../../../constants/Styles';
import { BG_COLOR } from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import { getBaseUrl, getToken } from '../../../constants/Storage';
import { getCalendar } from '../../../actions/calendar.action';

const lists = [
  {
    title: "Spar Century City",
    location: "Century City Cape Town 7441, South Africa, Cape Town Western Cape, 7441, South Africa",
    time: "09:00 - 17:00",
    distance: "1.8 km"
  },
  {
    title: "Clicks Century City",
    location: "Century City Cape Town 7441, South Africa, Cape Town Western Cape, 7441, South Africa",
    time: "09:00 - 17:00",
    distance: "2.7 km"
  },
  {
    title: "PnP Canal Walk",
    location: "Century Boulevard Shop 129 Canal Walk Shopping Centre, Cape Town Western Cape 7441, South Africa",
    time: "09:00 - 17:00",
    distance: "4.5 km"
  },
  {
    title: "Woolworths Canal Walk",
    location: "Century Boulevard Shop 129 Canal Walk Shopping Centre, Cape Town Western Cape 7441, South Africa",
    time: "09:00 - 17:00",
    distance: "5.1 km"
  },
  {
    title: "Super Spar Parklands",
    location: "Link Rd, Parklands, Cape Town, Cape Town Western Cape, 7441, South Africa",
    time: "09:00 - 17:00",
    distance: "11.7 km"
  }
]

function CalendarItem({title, location, time, distance}) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemLeft}>
        <View style={styles.itemTitleBox}>
          <SvgIcon style={{ marginRight: 4 }} icon="Location_Arrow" width='12px' height='12px' />
          <Text style={styles.itemTitle}>{title}</Text>
        </View>
        <Text style={styles.itemText}>{location}</Text>
      </View>
      <View style={styles.itemRight}>
        <Text style={[styles.itemTitle, {textAlign: 'center'}]}>{time}</Text>
        <TouchableOpacity style={styles.itemButton}>
          <Text style={styles.itemButtonText}>Check In</Text>
          <FontAwesomeIcon style={styles.itemButtonIcon} size={16} color="#fff" icon={ faCheckCircle } />
        </TouchableOpacity>
        <Text style={[styles.itemText, {textAlign: 'center'}]}>{distance}</Text>
      </View>
    </View>
  )
}

export default function CalendarScreen({screenProps}) {

  const [tabIndex, setTabIndex] = useState(2);
  //const [lists, setLists] = useState([]);

  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Calendar"
      });
    }
    loadList("today");
  }, []);

  const loadList = async(type) => {    
    
    var base_url = await getBaseUrl();
    var token = await getToken();

    if(base_url != null && token != null){      
      getCalendar(base_url, token, type)
      .then(res => {        
        setLists(res);        
      })
      .catch(error=>{
        setLists([]);
      });
    }    
  }    

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={[styles.tabContainer, boxShadow]}>
          <TouchableOpacity style={styles.tabItem} onPress={() => setTabIndex(1)}>
          <Text style={[styles.tabText, tabIndex == 1 ? styles.tabActiveText : {}]}>Last Week</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setTabIndex(2)}>
            <Text style={[styles.tabText, tabIndex == 2 ? styles.tabActiveText : {}]}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setTabIndex(3)}>
          <Text style={[styles.tabText, tabIndex == 3 ? styles.tabActiveText : {}]}>Week Ahead</Text>
          </TouchableOpacity>
        </View>

        {
          false && <TouchableOpacity style={styles.startButton} onPress={() => console.log("pressed")}>
            <Text style={[styles.startButtonText]}>Start My Day</Text>
            <FontAwesomeIcon style={styles.startButtonIcon} size={25} color="#fff" icon={ faAngleDoubleRight } />
          </TouchableOpacity>
        }


        {lists.map((item, index) => (
          <CalendarItem title={item.title} location={item.location} time={item.time} distance={item.distance} key={index} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.plusButton}>
        <SvgIcon icon="Round_Btn_Default_Dark" width='70px' height='70px' />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    minHeight: '100%',
    backgroundColor: BG_COLOR
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 7,
    backgroundColor: '#fff',
    marginBottom: 8
  },
  tabText: {
    fontFamily: Fonts.secondaryMedium,
    fontSize: 15,
    color: '#9D9FA2'
  },
  tabActiveText: {
    color: PRIMARY_COLOR,
    fontFamily: Fonts.secondaryBold,
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 2,
    paddingBottom: 2,
  },
  startButton: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    borderRadius: 7,
    backgroundColor: "#9D9FA2",
    marginBottom: 16
  },
  startButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: Fonts.primaryRegular
  },
  startButtonIcon: {
    position: 'absolute',
    right: 10
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 4,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    marginBottom: 16
  },
  itemLeft: {
    width: '60%',
  },
  itemRight: {
    width: '35%',
  },
  itemTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: Fonts.secondaryBold,
    color: PRIMARY_COLOR
  },
  itemText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.secondaryMedium,
    color: '#9D9FA2',
    maxHeight: 36
  },
  itemButton: {
    position: 'relative',
    justifyContent: 'center',
    padding: 4,
    backgroundColor: '#9D9FA2',
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 4
  },
  itemButtonActive: {
    backgroundColor: PRIMARY_COLOR
  },
  itemButtonText: {
    fontSize: 14,
    fontFamily: Fonts.secondaryMedium,
    textAlign: 'center',
    color: '#fff'
  },
  itemButtonIcon: {
    position: 'absolute',
    right: 8
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
    elevation: 1,
  },
})