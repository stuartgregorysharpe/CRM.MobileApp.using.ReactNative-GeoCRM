import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity, Image, Dimensions , BackHandler } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import RefreshSlider from '../../../../components/modal/RefreshSlider';
import { PRIMARY_COLOR, BG_COLOR, TEXT_COLOR, DISABLED_COLOR, whiteLabel } from '../../../../constants/Colors';
import { style } from '../../../../constants/Styles';
import SvgIcon from '../../../../components/SvgIcon';
import { breakPoint } from '../../../../constants/Breakpoint';
import { SLIDE_STATUS, SUB_SLIDE_STATUS } from '../../../../actions/actionTypes';
import Fonts from '../../../../constants/Fonts';
import { grayBackground } from '../../../../constants/Styles';
import DeviceInfo from 'react-native-device-info';
import { LocationInfoInput } from '../locationInfoDetails/LocationInfoInput';
import { LocationInfoInputTablet } from '../locationInfoDetails/LocationInfoInputTablet';
import Images from '../../../../constants/Images';
import CustomerContactsScreen from '../customer_contacts/CustomerContactsScreen';
import { FeatureCard } from '../partial/FeatureCard';
import { checkFeatureIncludeParam } from '../../../../constants/Storage';
import { useNavigation } from '@react-navigation/native';
import ActivityComments from '../activity_comments/ActivityComments';
import AlertDialog from '../../../../components/modal/AlertDialog';

export default function LocationSpecificInfoScreen(props) {
  
  const dispatch = useDispatch();
  const navigationMain = useNavigation();
  const [locationInfo, setLocationIfo] = useState(props.route.params.data);
  const subSlideStatus = useSelector(state => state.rep.subSlideStatus);
  const [showItem, setShowItem] = useState(0);
  const [statusSubmit, setStatusSubmit] = useState(true);
  const locationInfoRef = useRef();
  const [canShowCustomerContactsScreen, setCanShowCustomerContactsScreen] = useState(false);
  const [featureCards, setFeatureCards] = useState([]);
  const [isActivityComment, setIsActivityComment] =  useState(false);
  
  
  const showLoopSlider = () => {
    // setShowItem(1);
    // dispatch({ type: SUB_SLIDE_STATUS, payload: true });
  }

  useEffect(() => {
    //dispatch({ type: SLIDE_STATUS, payload: false });  
  });

  useEffect(() => {
    // dispatch({ type: SUB_SLIDE_STATUS, payload: false });
    // dispatch({ type: SLIDE_STATUS, payload: false });
    loadFeatureCards(); 
    refreshHeader();

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);    
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  const handleBackButtonClick = async() => {    
    console.log("back buttn press")
    return true;
  }

  
  const onCloseCustomerContactsScreen = () => {
    console.log("onCloseCustomerContactsScreen");
    setCanShowCustomerContactsScreen(false);
  }

  const refreshHeader = () => {
    props.screenProps.setOptions({
      headerTitle: () => {
        return (<TouchableOpacity onPress={
          () => {
            console.log("Specific info header Title Clicked");
            if(canShowCustomerContactsScreen){
              console.log("canShowCustomerContactsScreen",canShowCustomerContactsScreen);
              setCanShowCustomerContactsScreen(false)
            }else{
              console.log("go back ", canShowCustomerContactsScreen);
              if (props.navigation.canGoBack()) {
                //dispatch({ type: SLIDE_STATUS, payload: false });
                props.navigation.goBack();
              }
            }
          }}>

          <View style={style.headerTitleContainerStyle}>
            <Image
              resizeMethod='resize'
              style={{ width: 15, height: 20, marginRight: 5 }}
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
  }

  const loadFeatureCards = async () => {    
    const customer_and_contacts = await checkFeatureIncludeParam("customer_and_contacts");
    const location_specific_forms = await checkFeatureIncludeParam("location_specific_forms");
    const location_specific_pipeline = await checkFeatureIncludeParam("location_specific_pipeline");
    const history_and_comments = await checkFeatureIncludeParam("history_and_comments");

    let featureCards = [];
    if (customer_and_contacts) {
      featureCards.push({
        title: `Customer & Contacts`,
        icon: 'Person_Sharp_feature_card',
        action: 'View all information',
        link : 'customer_contacts'
      });
    }

    if (location_specific_forms) {
      featureCards.push({
        title: `Forms`,
        icon: 'Form_feature_card',
        action: 'Specific to this location',
        link : 'forms'
      });
    }
    if(history_and_comments) {
      featureCards.push({
        title: `Activity & Comments`,
        icon: 'Activity_Comments',
        action: 'Activity tree',
        link : 'activity_comments'
      });
    }

    if (location_specific_pipeline) {
      featureCards.push({
        title: `Sales Pipeline`,
        icon: 'Sales_Pipeline_feature_Card',
        action: 'View location pipeline',
        link : 'sales_pipeline'
      });
    }
    setFeatureCards([...featureCards]);
  }

  if (canShowCustomerContactsScreen) {
    return (
        <CustomerContactsScreen onClose={onCloseCustomerContactsScreen} locationId={locationInfo.location_id} />      
    )
  }

  return (
    <SafeAreaView>
      
      <ActivityComments
         locationId={locationInfo.location_id}
         visible={isActivityComment}
         onModalClosed={() => setIsActivityComment(false)}
       >
      </ActivityComments>

      {subSlideStatus && <TouchableOpacity
        activeOpacity={1}
        style={grayBackground}
        onPress={() => { 
          //dispatch({ type: SUB_SLIDE_STATUS, payload: false }) 
        }}></TouchableOpacity>}
      {subSlideStatus && <View
        style={[styles.transitionView, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] }]}
      >
        <RefreshSlider location_id={locationInfo.location_id} />
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
          


          {/* <View style={styles.filterButton}>
            <FilterButton text="Contact: Jack Reacher" />
          </View> */}          
        </View>



        <View style={styles.innerContainer}>
          <View style={[styles.cardBox]}>

            {
              locationInfo !== undefined && locationInfo.address !== "" && DeviceInfo.isTablet() ?
                <LocationInfoInputTablet
                  ref={locationInfoRef}
                  infoInput={locationInfo}
                  pageType={'locationSpecificInfo'}
                  showLoopSlider={showLoopSlider} /> :
                <LocationInfoInput
                  ref={locationInfoRef}
                  infoInput={locationInfo}
                  pageType={'locationSpecificInfo'}
                  showLoopSlider={showLoopSlider}/>
            }           
          </View>
        </View>

        <View style={styles.featureCardContainer}>
          {
            featureCards.map((item, index) => {              
              return (
                <View key={index} style={{ marginLeft: index % 2 ? 5 : 0, width: '49%' }}>                  
                  <FeatureCard icon={item.icon} title={item.title} actionTitle={item.action} onAction={() => {
                    if (item.title === 'Forms') {
                      //dispatch({ type: SLIDE_STATUS, payload: false });
                      navigationMain.navigate("RepForms", { screen: 'Root', params: { locationInfo: locationInfo } });                    
                    }
                    if (item.title === 'Customer & Contacts') {              
                      setCanShowCustomerContactsScreen(true);                                                
                    }
                    if(item.link === "activity_comments"){
                      //navigationMain.navigate("ActivityComments");
                      setIsActivityComment(true);
                    }
                    if (item.title === 'Sales Pipeline') {
                      navigationMain.navigate("RepSalesPipeline", { locationInfo: locationInfo });
                    }
                  }} />
                </View>
              );
            })
          }
        </View>      
        <View style={{ height: 60 }}></View>

      </ScrollView>
      <TouchableOpacity style={[style.plusButton, { marginBottom: 80 }]} onPress={() => setStatusSubmit(!statusSubmit)}>
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
    backgroundColor: whiteLabel().headerBackground,
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
    color: whiteLabel().headerText,
    textAlign: 'left',
    fontFamily: Fonts.secondaryMedium,
  },
  dateText: {
    color: '#0AD10A',
    fontFamily: Fonts.secondaryMedium,
  },
  title: {
    fontSize: 14,
    color: whiteLabel().headerText,
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
    color: DISABLED_COLOR,
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
  featureCardContainer: {
    flex: 1,
    marginLeft:10,
    marginRight:10,
    marginBottom:10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
}));
