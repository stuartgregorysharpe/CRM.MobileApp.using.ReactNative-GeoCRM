import React from 'react';
import { 
  SafeAreaView, 
  Text, 
  View, 
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import LocationInfoInput from '../components/LocationInfoInput';
import FilterButton from '../components/FilterButton';
import Divider from '../components/Divider';
import { PRIMARY_COLOR } from '../constants/Colors';

export default function LocationInfoScreen(props) {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Divider />
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
        <View style={styles.nextButtonBar}>
          <TouchableOpacity style={styles.nextButton} onPress={() => props.navigation.navigate("LocationSpecificInfo")}>
            <Text style={styles.nextButtonText}>Access CRM</Text>
            <FontAwesomeIcon size={25} color={PRIMARY_COLOR} icon={ faAngleDoubleRight } />
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={() => props.navigation.navigate("AddLead")}>
            <Text style={styles.nextButtonText}>Check In</Text>
            <FontAwesomeIcon size={25} color={PRIMARY_COLOR} icon={ faAngleDoubleRight } />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  headerBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  subtitleBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: PRIMARY_COLOR,
    textAlign: 'left',
    fontFamily: 'Gilroy-Medium',
  },
  dateText: {
    color: '#0AD10A',
    fontFamily: 'Gilroy-Medium',
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Gilroy-Bold',
    lineHeight: 22
  },
  addressText: {
    maxWidth: 210,
  },
  walmartImageBox: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  walmartImage: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 7
  },
  nextButtonBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
  },
  nextButton: {
    width: '47%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 7
  },
  nextButtonText: {
    color: PRIMARY_COLOR,
    fontSize: 16,
    fontFamily: 'Gilroy-Bold'
  },
  nextButtonIcon: {
    color: PRIMARY_COLOR,
    fontSize: 24
  },
  fontIcon: {
    width: 15,
    height: 16,
    marginRight: 8
  }
});
