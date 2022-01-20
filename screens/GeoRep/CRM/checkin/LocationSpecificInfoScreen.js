import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import LocationInfoInput from '../LocationInfoInput';
import RefreshSlider from '../../../../components/modal/RefreshSlider';
import { PRIMARY_COLOR, BG_COLOR, TEXT_COLOR } from '../../../../constants/Colors';
import { boxShadow, style } from '../../../../constants/Styles';
import FilterButton from '../../../../components/FilterButton';
import SvgIcon from '../../../../components/SvgIcon';
import MarkerIcon from '../../../../components/Marker';
import { breakPoint } from '../../../../constants/Breakpoint';
import { SLIDE_STATUS, SUB_SLIDE_STATUS } from '../../../../actions/actionTypes';
import Fonts from '../../../../constants/Fonts';
import { grayBackground } from '../../../../constants/Styles';
import DeviceInfo from 'react-native-device-info';
import LocationInfoInputTablet from '../LocationInfoInputTablet';
import Images from '../../../../constants/Images';

const Rectangle = ({style, text, backgroundColor, borderColor, icon}) => (
  <View style={[styles.rectangle, style, {backgroundColor, borderColor}, borderColor ? {borderWidth: 1} : {}]}>
    <Text style={styles.text}>{text}</Text>
    {icon && <MarkerIcon icon={icon} width="20px" height="20px" />}
  </View>
);

export default function LocationSpecificInfoScreen(props) {

  const dispatch = useDispatch();  
  const [locationInfo, setLocationIfo] = useState(props.route.params.data);
  const subSlideStatus = useSelector(state => state.rep.subSlideStatus);
  const [showItem, setShowItem] = useState(0);
  const [statusSubmit, setStatusSubmit] = useState(true);

  const showLoopSlider = () => {
    setShowItem(1);
    dispatch({type: SUB_SLIDE_STATUS, payload: true});
  }

  useEffect(() => {
    // custom header
    props.screenProps.setOptions({                 
      headerTitle:() =>{
        return(<TouchableOpacity onPress={
          () =>{            
            if(props.navigation.canGoBack()){              
              dispatch({type: SLIDE_STATUS, payload: false});              
              props.navigation.goBack(); 
            }
          }}>            
          <View style={style.headerTitleContainerStyle}>            
              <Image
                resizeMethod='resize'
                style={{width:15,height:20, marginRight:5}}
                source={Images.backIcon}
              />
          <Text style={style.headerTitle} >CRM</Text>
        </View></TouchableOpacity>)
      },

      headerLeft: () => (
        <TouchableOpacity 
          style={style.headerLeftStyle} 
          activeOpacity={1}
          onPress={() => {
            setShowItem(0);
          }}
        >
        </TouchableOpacity>
      ),
      
    });    
  });

  useEffect(() => {
    dispatch({type: SLIDE_STATUS, payload: false});    
  });

  useEffect(() => {
    dispatch({type: SUB_SLIDE_STATUS, payload: false});
  }, []);

  return (
    <SafeAreaView>
      {subSlideStatus && <TouchableOpacity
        activeOpacity={1} 
        style={grayBackground}
        onPress={() => {dispatch({type: SUB_SLIDE_STATUS, payload: false})}}
      ></TouchableOpacity>}
      {subSlideStatus && <View
          style={[styles.transitionView, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]}
        >
        <RefreshSlider location_id={locationInfo.location_id}  />
      </View>}

      <ScrollView style={styles.container}>
        <View style={styles.headerBox}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={styles.headerTitleBox}>
              <View style={styles.subtitleBox}>
                <SvgIcon style={styles.headerIcon} icon="Person_Sharp_White" width='14px' height='14px' />
                <Text style={styles.subtitle}>{locationInfo.location_name.custom_field_name ? locationInfo.location_name.custom_field_name : ''}</Text>
              </View>
              <Text style={styles.title}>{locationInfo.location_name.value}</Text>
            </View>
            <View style={styles.subtitleBox}>
              <SvgIcon style={styles.headerIcon} icon="Insert_Invitation" width='16px' height='16px' />
              <Text style={styles.subtitle}>Last Interaction: {locationInfo.last_interaction}</Text>
            </View>
          </View>
          <View style={styles.headerTitleBox}>
            <View style={styles.subtitleBox}>
              <SvgIcon style={styles.headerIcon} icon="Location_Arrow_White" width='14px' height='14px' />
              <Text style={styles.subtitle}>Address:</Text>
            </View>
            <Text style={styles.title}>{locationInfo.address}</Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Check out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterButton}>
            <FilterButton text="Contact: Jack Reacher" />
          </View>
        </View>



        <View style={styles.innerContainer}>
          
                  
            <View style={[styles.cardBox]}>
              {/* <Text style={styles.boldText}>Outcome</Text> */}
              
              {
              locationInfo && DeviceInfo.isTablet() ? <LocationInfoInputTablet
                  navigation={props.navigation} 
                  screenProps={props.screenProps} 
                  statusSubmit={statusSubmit}
                  showLoopSlider={showLoopSlider} 
                  infoInput={locationInfo} /> : 
                <LocationInfoInput
                  navigation={props.navigation} 
                  screenProps={props.screenProps} 
                  statusSubmit={statusSubmit} 
                  showLoopSlider={showLoopSlider} 
                  infoInput={locationInfo} />
              }     

            </View>                                       
        </View>

        <View style={{height: 60}}></View>
      </ScrollView>
      <TouchableOpacity style={[style.plusButton, {marginBottom:80}]} onPress={() => setStatusSubmit(!statusSubmit)}>
        <SvgIcon icon="DISPOSITION_POST" width='70px' height='70px' />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const perWidth = setWidthBreakpoints(breakPoint);

const styles = EStyleSheet.create(parse({
  container: {
    backgroundColor: BG_COLOR,
    padding: 10,
  },
  headerBox: {
    backgroundColor: PRIMARY_COLOR,
    padding: 10,
    paddingBottom: 0,
    marginBottom: 8
  },
  headerTitleBox: {
    flexDirection: perWidth('row', 'column'),
    alignItems: 'flex-start',
    marginBottom: 8
  },
  subtitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    marginBottom: 8,
    marginRight: 8
  },
  subtitle: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'left',
    fontFamily: Fonts.secondaryMedium,
  },
  dateText: {
    color: '#0AD10A',
    fontFamily: Fonts.secondaryMedium,
  },
  title: {
    fontSize: 14,
    color: '#fff',
    fontFamily: Fonts.secondaryBold,
    lineHeight: 22,
    maxWidth: 300
  },
  headerIcon: {
    marginRight: 8
  },
  innerContainer: {    
    justifyContent: 'space-between',
    flexDirection: perWidth('row-reverse', 'column')
  },
  locationInfoBox: {
    width: perWidth('63%', '100%')
  },
  cardContainer: {
    width: perWidth('33%', '100%'),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  cardBox: {
    display: perWidth('flex', 'flex'),
    width: '100%',
    padding: 12,    
    marginBottom: 8,
  },
  boldText: {
    fontSize: 18,
    color: TEXT_COLOR,
    fontFamily: Fonts.secondaryBold,
    marginBottom: 8
  },
  text: {
    fontSize: 16,
    color: TEXT_COLOR,
    fontFamily: Fonts.secondaryMedium
  },
  card: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginBottom: 8,
    width: perWidth('100%', '48%'),
    padding: 12,
    height: 80,
    borderRadius: 10,
  },
  cardTitleBox: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  cardIcon: {
    marginRight: 6
  },
  cardTitle: {
    color: TEXT_COLOR,
    fontFamily: Fonts.secondaryBold,
  },
  cardTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    color: '#9D9FA2',
    fontSize: 12,
    fontFamily: Fonts.primaryRegular
  },

  rectangle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 7,
    marginBottom: 8,
  },
  refreshImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 68,
    height: 68
  },
  outComeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginRight: 88,
  },
  filterButton: {
    display: perWidth('none', 'flex')
  },
  checkoutButton: {
    display: perWidth('flex', 'none'),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 'auto',
    width: 160,
    height: 40,
    borderRadius: 20
  },
  checkoutButtonText: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    fontFamily: Fonts.primaryMedium,
  },
  transitionView: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: BG_COLOR,
    elevation: 2,
    zIndex: 2,
    padding: 10,
  },
}));