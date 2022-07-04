import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  setWidthBreakpoints,
  parse,
} from 'react-native-extended-stylesheet-breakpoints';
import RefreshSlider from '../../../../components/modal/RefreshSlider';
import Colors, {TEXT_COLOR, whiteLabel} from '../../../../constants/Colors';
import {style} from '../../../../constants/Styles';
import SvgIcon from '../../../../components/SvgIcon';
import {breakPoint} from '../../../../constants/Breakpoint';
import Fonts from '../../../../constants/Fonts';
import {grayBackground} from '../../../../constants/Styles';
import DeviceInfo from 'react-native-device-info';
import {LocationInfoInput} from '../locationInfoDetails/LocationInfoInput';
import {LocationInfoInputTablet} from '../locationInfoDetails/LocationInfoInputTablet';
import Images from '../../../../constants/Images';
import CustomerContactsScreen from '../customer_contacts/CustomerContactsScreen';
import {  
  storeLocalValue,
} from '../../../../constants/Storage';
import ActivityComments from '../activity_comments/ActivityComments';
import Checkout from './partial/Checkout';
import {getLocationInfo} from '../../../../actions/location.action';
import {Notification} from '../../../../components/modal/Notification';
import {
  clearNotification,
  showNotification,
} from '../../../../actions/notification.action';
import FeaturedCardLists from './partial/FeaturedCardLists';
import ActionItemsModal from '../action_items/modals/ActionItemsModal';
import CustomerSalesHistoryModal from '../customer_sales/CustomerSalesHistoryModal';
import {useNavigation} from '@react-navigation/native';
import NavigationHeader from '../../../../components/Header/NavigationHeader';
import DevicesModal from '../devices/DevicesModal';
import { Constants } from '../../../../constants';

export default function LocationSpecificInfoScreen(props) {
  const dispatch = useDispatch();

  const devicesModalRef = useRef(null);
  const [locationInfo, setLocationIfo] = useState(props.route.params.data);
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [pageType, setPageType] = useState(props.route.params.page);
  const location_id = props.route.params.locationId;
  const subSlideStatus = useSelector(state => state.rep.subSlideStatus);
  const [showItem, setShowItem] = useState(0);
  const [statusSubmit, setStatusSubmit] = useState(true);
  const locationInfoRef = useRef();
  const customerContactsRef = useRef();  
  const [canShowCustomerContactsScreen, setCanShowCustomerContactsScreen] =
    useState(false);
  const [isActivityComment, setIsActivityComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActionItems, setIsActionItems] = useState(false);
  const [isCustomerSales, setIsCustomerSales] = useState(false);
  const navigationMain = useNavigation();
  

  const showLoopSlider = () => {};
  const isShowCustomNavigationHeader = !props.screenProps;
  const isCheckin = useSelector(state => state.location.checkIn);

  useEffect(() => {
    refreshHeader();
    initData();
    if (location_id !== undefined) {
      openLocationInfo(location_id);
    }
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [location_id]);

  useEffect(() => {
    if (isCheckin == false) {
      if (props.navigation.canGoBack()) {
        props.navigation.popToTop();
      }
    }
  }, [isCheckin]);


  const hideBottomBar = () => {
    if (props.screenProps) {
      props.screenProps.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    }
  };

  const initData = async () => {
    if (pageType === 'checkin') {
      await storeLocalValue('@checkin', '1');
      if (locationInfo !== undefined && locationInfo.location_id != undefined) {
        await storeLocalValue(
          '@specific_location_id',
          locationInfo.location_id,
        );
      }
    }
  };

  const goBack = () => {
    if (props.navigation.canGoBack()) {
      props.navigation.goBack();
    }
  };

  const handleBackButtonClick = async () => {
    return true;
  };

  const openLocationInfo = async location_id => {
    setIsLoading(true);
    getLocationInfo(Number(location_id), currentLocation)
      .then(res => {
        if (locationInfoRef.current !== undefined) {
          locationInfoRef.current.updateDispositionData(res);
        }
        setLocationIfo(res);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
      });
  };

  const onCloseCustomerContactsScreen = () => {
    setCanShowCustomerContactsScreen(false);
  };

  const onFeatureItemClicked = item => {
    if (item.title === 'Forms') {
      navigationMain.navigate('DeeplinkRepForms', {locationInfo: locationInfo});
    }
    if (item.title === 'Customer & Contacts') {
      setCanShowCustomerContactsScreen(true);
    }
    if (item.link === 'activity_comments') {
      setIsActivityComment(true);
    }
    if (item.title === 'Sales Pipeline') {
      navigationMain.navigate('DeeplinkRepSalesPipelineScreen', {locationInfo: locationInfo});
    }
    if (item.link === 'actions_items') {
      setIsActionItems(true);
    }
    if(item.link === 'devices'){
      devicesModalRef.current.showModal();
    }
    if (item.link === 'customer_sales') {
      setIsCustomerSales(true);
    }
    if (item.link === 'touchpoints') {
      navigationMain.navigate('TouchpointScreen');
    }
  };

  const refreshHeader = () => {
    if (props.screenProps) {
      props.screenProps.setOptions({
        headerTitle: () => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (canShowCustomerContactsScreen) {
                  setCanShowCustomerContactsScreen(false);
                  customerContactsRef.current.onBackHandler();
                } else {
                  if (props.navigation.canGoBack()) {
                    if (pageType === 'checkin' || pageType === 'access_crm') {
                      hideBottomBar();
                    }
                    props.navigation.goBack();
                  }
                }
              }}>
              <View style={style.headerTitleContainerStyle}>
                <Image
                  resizeMethod="resize"
                  style={{width: 15, height: 20, marginRight: 5}}
                  source={Images.backIcon}
                />
                <Text style={style.headerTitle}>CRM</Text>
              </View>
            </TouchableOpacity>
          );
        },

        headerLeft: () => (
          <TouchableOpacity
            style={style.headerLeftStyle}
            activeOpacity={1}
            onPress={() => {
              setShowItem(0);
            }}></TouchableOpacity>
        ),
        tabBarStyle: {
          position: 'absolute',
          height: 50,
          paddingBottom: Platform.OS == 'android' ? 5 : 0,
          backgroundColor: Colors.whiteColor,
        },
      });
    }
  };

  const onDevicesModalClosed = ({type, value}) => {
    if(type == Constants.actionType.ACTION_CLOSE){
      devicesModalRef.current.hideModal()
    }
  }

  if (canShowCustomerContactsScreen) {
    return (
      <CustomerContactsScreen
        props={props}
        onClose={onCloseCustomerContactsScreen}
        locationId={locationInfo.location_id}
        ref={customerContactsRef}
      />
    );
  }

  return (
    <SafeAreaView style={{backgroundColor: locationInfo ? Colors.bgColor : {}}}>
      {isShowCustomNavigationHeader && (
        <NavigationHeader
          showIcon={true}
          title={'CRM'}
          onBackPressed={() => {
            props.navigation.goBack();
          }}
        />
      )}
      <Notification />

      {locationInfo != undefined && (
        <ActivityComments
          locationId={locationInfo.location_id}
          visible={isActivityComment}
          onModalClosed={() => setIsActivityComment(false)}></ActivityComments>
      )}

      {locationInfo != undefined && (
        <ActionItemsModal
          locationId={locationInfo.location_id}
          visible={isActionItems}
          onModalClosed={() => setIsActionItems(false)}></ActionItemsModal>
      )}

      {locationInfo != undefined && (
        <CustomerSalesHistoryModal
          locationId={locationInfo.location_id}
          visible={isCustomerSales}
          onModalClosed={() =>
            setIsCustomerSales(false)
          }></CustomerSalesHistoryModal>
      )}

      <DevicesModal
          ref={devicesModalRef}
          title="Devices"          
          locationId={locationInfo != undefined ? locationInfo.location_id : 0}
          onButtonAction={onDevicesModalClosed}
      />

      {locationInfo && subSlideStatus && (
        <TouchableOpacity
          activeOpacity={1}
          style={grayBackground}
          onPress={() => {}}></TouchableOpacity>
      )}
      {subSlideStatus && (
        <View
          style={[
            styles.transitionView,
            showItem == 0
              ? {
                  transform: [
                    {translateY: Dimensions.get('window').height + 100},
                  ],
                }
              : {transform: [{translateY: 0}]},
          ]}>
          <RefreshSlider location_id={locationInfo.location_id} />
        </View>
      )}

      {isLoading && (
        <View style={{marginTop: 100}}>
          <ActivityIndicator />
        </View>
      )}

      <ScrollView style={styles.container}>
        {locationInfo != undefined && (
          <View style={styles.headerBox}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <View style={styles.headerTitleBox}>
                <View style={styles.subtitleBox}>
                  <SvgIcon
                    style={styles.headerIcon}
                    icon="Person_Sharp_White"
                    width="14px"
                    height="14px"
                  />
                  <Text style={styles.subtitle}>
                    {locationInfo.location_name.custom_field_name
                      ? locationInfo.location_name.custom_field_name
                      : ''}
                  </Text>
                </View>
                <Text style={styles.title}>
                  {locationInfo.location_name.value}
                </Text>
              </View>
              <View style={styles.subtitleBox}>
                <SvgIcon
                  style={styles.headerIcon}
                  icon="Insert_Invitation"
                  width="16px"
                  height="16px"
                />
                <Text style={styles.subtitle}>
                  Last Interaction: {locationInfo.last_interaction}
                </Text>
              </View>
            </View>
            <View style={styles.headerTitleBox}>
              <View style={styles.subtitleBox}>
                <SvgIcon
                  style={styles.headerIcon}
                  icon="Location_Arrow_White"
                  width="14px"
                  height="14px"
                />
                <Text style={styles.subtitle}>Address:</Text>
              </View>
              <Text style={styles.title}>{locationInfo.address}</Text>
              <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Check out</Text>
              </TouchableOpacity>
            </View>

            {pageType === 'checkin' && (
              <Checkout
                goBack={async res => {
                  await storeLocalValue('@checkin', '0');
                  dispatch(
                    showNotification({
                      type: 'success',
                      message: res.message,
                      buttonText: 'Okay',
                      buttonAction: async () => {
                        dispatch(clearNotification());
                        goBack();
                      },
                    }),
                  );
                }}
                location_id={locationInfo.location_id}></Checkout>
            )}
            
            {/* <View style={styles.filterButton}>
                  <FilterButton text="Contact: Jack Reacher" />
                </View> */}
          </View>
        )}

        <View style={styles.innerContainer}>
          <View style={[styles.cardBox]}>
            {locationInfo !== undefined &&
            locationInfo.address !== '' &&
            DeviceInfo.isTablet() ? (
              <LocationInfoInputTablet
                ref={locationInfoRef}
                infoInput={locationInfo}
                pageType={'locationSpecificInfo'}
                showLoopSlider={showLoopSlider}
              />
            ) : (
              <LocationInfoInput
                ref={locationInfoRef}
                infoInput={locationInfo}
                pageType={'locationSpecificInfo'}
                showLoopSlider={showLoopSlider}
              />
            )}
          </View>
        </View>

        <FeaturedCardLists
          onItemClicked={onFeatureItemClicked}></FeaturedCardLists>
        <View style={{height: 60}}></View>
      </ScrollView>

      <TouchableOpacity
        style={[style.plusButton, {marginBottom: 80}]}
        onPress={() => setStatusSubmit(!statusSubmit)}>
        <SvgIcon icon="DISPOSITION_POST" width="70px" height="70px" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const perWidth = setWidthBreakpoints(breakPoint);

const styles = EStyleSheet.create(
  parse({
    container: {
      padding: 10,
    },
    headerBox: {
      backgroundColor: whiteLabel().headerBackground,
      padding: 10,
      paddingBottom: 0,
      marginBottom: 8,
    },
    headerTitleBox: {
      flexDirection: perWidth('row', 'column'),
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    subtitleBox: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 20,
      marginBottom: 8,
      marginRight: 8,
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
      maxWidth: 300,
    },
    headerIcon: {
      marginRight: 8,
    },
    innerContainer: {
      justifyContent: 'space-between',
      flexDirection: perWidth('row-reverse', 'column'),
    },

    cardBox: {
      display: perWidth('flex', 'flex'),
      width: '100%',
      padding: 12,
      marginBottom: 8,
    },

    filterButton: {
      display: perWidth('none', 'flex'),
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
      borderRadius: 20,
    },
    checkoutButtonText: {
      fontSize: 16,
      color: Colors.primaryColor,
      fontFamily: Fonts.primaryMedium,
    },
    transitionView: {
      position: 'absolute',
      bottom: 50,
      left: 0,
      right: 0,
      backgroundColor: Colors.bgColor,
      elevation: 2,
      zIndex: 2,
      padding: 10,
    },
  }),
);
