import React, { useEffect } from 'react';
import { 
  SafeAreaView, 
  Text, 
  View, 
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import LocationInfoInput from '../components/LocationInfoInput';
import FilterButton from '../components/FilterButton';
import Divider from '../components/Divider';
import { PRIMARY_COLOR, BG_COLOR } from '../constants/Colors';

export default function LocationInfoScreen(props) {
  useEffect(() => {
    props.screenProps.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
  })
  return (
    <SafeAreaView style={{position: 'relative'}}>
      <TouchableOpacity style={styles.dividerBar} onPress={() => props.navigation.navigate("Root")}>
        <Divider />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={styles.headerBox}>
          <View>
            <View style={styles.subtitleBox}>
              <Image style={styles.fontIcon} source={require('../assets/images/person_sharp.png')} />
              <Text style={styles.subtitle}>Customer Name</Text>
            </View>
            <Text style={styles.title}>Walmart Mayberg</Text>
          </View>
          <View style={styles.subtitleBox}>
            <Image style={styles.fontIcon} source={require('../assets/images/Green_Pin.png')} />
            <Text style={styles.dateText}>Visited Recently: 28 May 2021</Text>
          </View>
        </View>
        <View style={styles.headerBox}>
          <View style={styles.addressText}>
            <View style={styles.subtitleBox}>
              <Image style={styles.fontIcon} source={require('../assets/images/location_arrow.png')} />
              <Text style={styles.subtitle}>Address</Text>
            </View>
            <Text style={styles.title}>Mayberg Cape Town 7441, South Africa, Cape Town Western Cape, 7441, South Africa</Text>
          </View>
          <View style={styles.walmartImageBox}>
            <Image style={styles.walmartImage} source={require("../assets/images/walmart.png")} />
          </View>
        </View>
        <LocationInfoInput />
        <FilterButton text="Contact: Jack Reacher" />
        <FilterButton text="Navigation" />
        <FilterButton text="Activity & Comments" subText="Jack Submitted a Brand Facings Task 4 days ago" />
      </ScrollView>
      <View style={styles.nextButtonBar}>
        <TouchableOpacity style={[styles.nextButton, styles.accessButton]} onPress={() => props.navigation.navigate("LocationSpecificInfo")}>
          <Text style={styles.nextButtonText}>Access CRM</Text>
          <FontAwesomeIcon size={22} color={PRIMARY_COLOR} icon={ faAngleDoubleRight } />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.nextButton, styles.checkInButton]} onPress={() => console.log("pressed")}>
          <Text style={[styles.checkInButtonText]}>Check In</Text>
          <FontAwesomeIcon size={22} color="#fff" icon={ faAngleDoubleRight } />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  dividerBar: {
    backgroundColor: BG_COLOR,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: BG_COLOR,
    padding: 10,
    marginBottom: 80
  },
  headerBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  subtitleBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  subtitle: {
    color: PRIMARY_COLOR,
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Gilroy-Medium',
  },
  dateText: {
    color: '#0AD10A',
    fontSize: 12,
    fontFamily: 'Gilroy-Medium',
  },
  title: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Gilroy-Bold',
    lineHeight: 20
  },
  addressText: {
    maxWidth: 175,
  },
  walmartImageBox: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  walmartImage: {
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 7
  },
  nextButtonBar: {
    backgroundColor: BG_COLOR,
    position: 'absolute',
    top: Dimensions.get('window').height - 140,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  nextButton: {
    width: '47%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 7,
  },
  nextButtonText: {
    color: PRIMARY_COLOR,
    fontSize: 15,
    fontFamily: 'Gilroy-Bold'
  },
  checkInButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Gilroy-Bold'
  },
  fontIcon: {
    width: 15,
    height: 16,
    marginRight: 8
  },
  checkInButton: {
    backgroundColor: PRIMARY_COLOR,
  }
});
