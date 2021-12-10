import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Keyboard
} from 'react-native';
import { useDispatch } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import SvgIcon from './SvgIcon';
import LocationInfoInput from './LocationInfoInput';
import FilterButton from './FilterButton';
import Divider from './Divider';
import { PRIMARY_COLOR, BG_COLOR } from '../constants/Colors';
import { SLIDE_STATUS } from '../actions/actionTypes';
  
export default function LocationInfo({navigation}) {
  const dispatch = useDispatch();
  
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{padding: 6}} onPress={() => dispatch({type: SLIDE_STATUS, payload: false})}>
        <Divider />
      </TouchableOpacity>
      <ScrollView style={[styles.innerContainer, keyboardStatus ? {} : {marginBottom: 50}]}>
        <View style={styles.headerBox}>
          <View>
            <View style={styles.subtitleBox}>
              <SvgIcon style={styles.fontIcon} icon="Person_Sharp" width='16px' height='16px' />
              <Text style={styles.subtitle}>Customer Name</Text>
            </View>
            <Text style={styles.title}>Walmart Mayberg</Text>
          </View>
          <View style={styles.subtitleBox}>
            <SvgIcon style={styles.fontIcon} icon="Green_Star" width='22px' height='22px' />
            <Text style={styles.dateText}>Visited Recently: 28 May 2021</Text>
          </View>
        </View>
        <View style={styles.headerBox}>
          <View style={styles.addressText}>
            <View style={styles.subtitleBox}>
              <SvgIcon style={styles.fontIcon} icon="Location_Arrow" width='16px' height='16px' />
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
        <View style={{height: 10}}></View>
      </ScrollView>
      {!keyboardStatus && <View style={styles.nextButtonBar}>
        <TouchableOpacity style={[styles.nextButton, styles.accessButton]} onPress={() => navigation.navigate("LocationSpecificInfo")}>
          <Text style={styles.nextButtonText}>Access CRM</Text>
          <FontAwesomeIcon size={22} color={PRIMARY_COLOR} icon={ faAngleDoubleRight } />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.nextButton, styles.checkInButton]} onPress={() => console.log("pressed")}>
          <Text style={[styles.checkInButtonText]}>Check In</Text>
          <FontAwesomeIcon size={22} color="#fff" icon={ faAngleDoubleRight } />
        </TouchableOpacity>
      </View>}
    </View>
  )
}

const perWidth = setWidthBreakpoints(850);

const styles = EStyleSheet.create(parse({
  container: {
    backgroundColor: BG_COLOR,
    height: Dimensions.get('window').height - 100
  },
  innerContainer: {
    backgroundColor: BG_COLOR,
    padding: 10,
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
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom: 0,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderTopWidth: 0.5
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
    marginRight: 4
  },
  checkInButton: {
    backgroundColor: PRIMARY_COLOR,
  }
}));
