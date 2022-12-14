import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  setWidthBreakpoints,
  parse,
} from 'react-native-extended-stylesheet-breakpoints';
import RefreshSlider from '../../../../components/modal/RefreshSlider';
import Colors, { whiteLabel } from '../../../../constants/Colors';
import { style } from '../../../../constants/Styles';
import SvgIcon from '../../../../components/SvgIcon';
import { breakPoint } from '../../../../constants/Breakpoint';
import Fonts from '../../../../constants/Fonts';
import { grayBackground } from '../../../../constants/Styles';
import DeviceInfo from 'react-native-device-info';
import { LocationInfoInput } from '../locationInfoDetails/LocationInfoInput';
import { LocationInfoInputTablet } from '../locationInfoDetails/LocationInfoInputTablet';
import Images from '../../../../constants/Images';
import {
  getJsonData,
  getLocalData,
  storeLocalValue,
} from '../../../../constants/Storage';
import ActivityComments from '../activity_comments/ActivityComments';
import { getLocationInfo } from '../../../../actions/location.action';
import { Notification } from '../../../../components/modal/Notification';
import {
  clearNotification,
  showNotification,
} from '../../../../actions/notification.action';
import FeaturedCardLists from './partial/FeaturedCardLists';
import ActionItemsModal from '../action_items/modals/ActionItemsModal';
import { useNavigation } from '@react-navigation/native';
import NavigationHeader from '../../../../components/Header/NavigationHeader';
import DevicesModal from '../devices/modal/DevicesModal';
import {Constants, Strings} from '../../../../constants';
import {
  CHECKIN,
  LOCATION_CHECK_OUT_COMPULSORY,
} from '../../../../actions/actionTypes';
import CustomerContactModal from '../customer_contacts';
import CheckOutViewContainer from '../../../../components/common/CheckOut/CheckOutViewContainer';
import CustomerSaleHistoryModal from '../customer_sales';
import {expireToken} from '../../../../constants/Helper';
import {GetRequestFormListsDAO} from '../../../../DAO';
import {cos} from 'react-native-reanimated';
import DanOneSalesModal from '../danone_sales/modals/DanOneSalesModal';

const LocationSpecificInfoScreen = props => {
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
  const [isFormCompulsory, setIsFormCompulsory] = useState(true);
  const [isDanOneSales, setIsDanOneSales] = useState(false);
  const navigationMain = useNavigation();
  const showLoopSlider = () => { };
  const isShowCustomNavigationHeader = !props.screenProps;
  const isCheckin = useSelector(state => state.location.checkIn);
  const locationId = locationInfo ? locationInfo.location_id : location_id;
  const customerContactModalRef = useRef(null);
  const customerSaleHistoryModalRef = useRef(null);
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const isDisposition = features.includes('disposition_fields');
  let isMout = true;

  useEffect(() => {}, []);

  useEffect(() => {
    isMout = true;
    refreshHeader();
    initData();
    return () => {
      isMout = false;
    };
  }, [location_id]);

  useEffect(() => {
    isMout = true;
    if (isCheckin == false && pageType != 'access_crm') {
      if (props.navigation.canGoBack()) {
        if (isMout) {
          props.navigation.goBack();
        }
      }
    }
    if (isCheckin) {
      getCheckInLocation();
    }
    return () => {
      isMout = false;
    };
  }, [isCheckin]);

  useEffect(() => {
    const unsubscribe = navigationMain.addListener('focus', () => {
      getCheckInLocation();
    });
    return unsubscribe;
  }, [navigationMain]);

  const getCheckInLocation = async () => {
    var location = await getJsonData('@checkin_location');
    if (location != null) {
      if (
        locationInfoRef.current != undefined &&
        locationInfoRef.current != null
      ) {
        locationInfoRef.current.updateDispositionData(location);
      }
      setLocationIfo(location);
      getFormLists(location.location_id);
    } else {
      if (location_id !== undefined) {
        openLocationInfo(location_id);
        getFormLists(location_id);
      }
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
    } else if (pageType === 'access_crm') {
      openLocationInfo(location_id != undefined ? location_id : locationId);
      //getFormLists(location_id != undefined ? location_id : locationId);
    }
  };

  const goBack = () => {
    if (props.navigation.canGoBack()) {
      props.navigation.popToTop();
    }
  };

  const openLocationInfo = async location_id => {
    setIsLoading(true);
    getLocationInfo(Number(location_id), currentLocation)
      .then(res => {
        if (isMout) {
          if (
            locationInfoRef.current != undefined &&
            locationInfoRef.current != null
          ) {
            locationInfoRef.current.updateDispositionData(res);
          }
          setLocationIfo(res);
          setIsLoading(false);
        }
      })
      .catch(e => {
        if (isMout) {
          setIsLoading(false);
        }

        expireToken(dispatch, e);
      });
  };

  const onCloseCustomerContactsScreen = () => {
    setCanShowCustomerContactsScreen(false);
  };

  const onFeatureItemClicked = item => {
    if (item.title === 'Forms') {
      navigationMain.navigate('DeeplinkRepForms', { locationInfo: locationInfo });
    }
    if (item.link === 'customer_contacts') {
      customerContactModalRef.current.showModal();
    }
    if (item.link === 'activity_comments') {
      setIsActivityComment(true);
    }
    if (item.title === 'Sales Pipeline') {
      navigationMain.navigate('DeeplinkRepSalesPipelineScreen', {
        locationInfo: locationInfo,
      });
    }
    if (item.link === 'actions_items') {
      setIsActionItems(true);
    }

    if (item.link === 'devices') {
      devicesModalRef.current.showModal();
    }
    if (item.link === 'customer_sales') {
      if (customerSaleHistoryModalRef.current) {
        customerSaleHistoryModalRef.current.showModal();
      }
    }
    if (item.link === 'touchpoints') {
      navigationMain.navigate('TouchpointScreen', {
        locationId: locationId,
      });
    }

    if (item.link === 'danone_sales') {
      setIsDanOneSales(true);
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
                    props.navigation.goBack();
                  }
                }
              }}>
              <View style={style.headerTitleContainerStyle}>
                <Image
                  resizeMethod="resize"
                  style={{ width: 15, height: 20, marginRight: 5 }}
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

  const onDevicesModalClosed = ({ type, value }) => {
    if (type == Constants.actionType.ACTION_CLOSE) {
      devicesModalRef.current.hideModal();
    }
  };

  const onCustomerContactModalClosed = ({ type, value }) => { };
  const onCustomerSaleHistoryModalClosed = ({ type, value }) => { };

  const getFormLists = async locationId => {
    var param = {
      location_id: locationId,
    };
    if (isCheckin) {
      const checkin_type_id = await getLocalData('@checkin_type_id');
      const checkin_reason_id = await getLocalData('@checkin_reason_id');
      if (checkin_type_id && checkin_reason_id != '') {
        param.checkin_type_id = checkin_type_id;
      }
      if (checkin_reason_id && checkin_reason_id != '') {
        param.checkin_reason_id = checkin_reason_id;
      }
    }
    GetRequestFormListsDAO.find(param)
      .then(res => {
        getCompulsoryForm(res.forms);
      })
      .catch(e => {});
  };

  const getCompulsoryForm = async lists => {
    var formLists = [...lists];
    const formIds = await getJsonData('@form_ids');
    var flag = false;

    formLists.forEach(element => {
      if (
        element.compulsory === '1' &&
        (formIds == null ||
          (formIds != null && !formIds.includes(element.form_id)))
      ) {
        flag = true;
      }
    });
    setIsFormCompulsory(flag);
    dispatch({type: LOCATION_CHECK_OUT_COMPULSORY, payload: flag});
  };

  return (
    <SafeAreaView style={{}}>
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
        <CustomerSaleHistoryModal
          ref={customerSaleHistoryModalRef}
          locationId={locationInfo.location_id}
          onButtonAction={
            onCustomerSaleHistoryModalClosed
          }></CustomerSaleHistoryModal>
      )}

      {locationInfo != undefined && (
        <CustomerContactModal
          ref={customerContactModalRef}
          locationId={locationInfo.location_id}
          onButtonAction={onCustomerContactModalClosed}
        />
      )}

      <DevicesModal
        ref={devicesModalRef}
        title="Devices"
        locationId={
          location_id != undefined
            ? location_id
            : locationInfo != undefined
            ? locationInfo.location_id
            : 0
        }
        onButtonAction={onDevicesModalClosed}
      />

      {locationInfo && (
        <DanOneSalesModal
          visible={isDanOneSales}
          locationId={locationInfo.location_id}
          onModalClosed={() => setIsDanOneSales(false)}></DanOneSalesModal>
      )}

      {locationInfo && subSlideStatus && (
        <TouchableOpacity
          activeOpacity={1}
          style={grayBackground}
          onPress={() => { }}></TouchableOpacity>
      )}
      {subSlideStatus && (
        <View
          style={[
            styles.transitionView,
            showItem == 0
              ? {
                transform: [
                  { translateY: Dimensions.get('window').height + 100 },
                ],
              }
              : { transform: [{ translateY: 0 }] },
          ]}>
          <RefreshSlider location_id={locationInfo.location_id} />
        </View>
      )}

      {/* {isLoading && (
        <View style={{marginTop: 100}}>
          <ActivityIndicator />
        </View>
      )} */}

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
                    {locationInfo.location_name != undefined &&
                    locationInfo.location_name.custom_field_name != undefined
                      ? locationInfo.location_name.custom_field_name
                      : ''}
                  </Text>
                </View>
                <Text style={styles.title}>
                  {locationInfo.location_name != undefined
                    ? locationInfo.location_name.value
                    : ''}
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
            </View>

            {isCheckin && (
              <CheckOutViewContainer
                type="specificInfo"
                goBack={async res => {
                  dispatch(
                    showNotification({
                      type: 'success',
                      message: res.message,
                      buttonText: Strings.Ok,
                      buttonAction: async () => {
                        dispatch({
                          type: CHECKIN,
                          payload: false,
                          scheduleId: false,
                        });
                        dispatch({
                          type: LOCATION_CHECK_OUT_COMPULSORY,
                          payload: true,
                        });
                        dispatch(clearNotification());
                        goBack();
                      },
                    }),
                  );
                }}
              />
            )}
            {/* <View style={styles.filterButton}>
                  <FilterButton text="Contact: Jack Reacher" />
                </View> */}
          </View>
        )}

        <View style={[styles.innerContainer, { marginBottom: -14 }]}>
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
          isFormCompulsory={isFormCompulsory}
          onItemClicked={onFeatureItemClicked}></FeaturedCardLists>
        <View style={{ height: 60 }}></View>
      </ScrollView>

      {isDisposition && (
        <TouchableOpacity
          style={[style.plusButton, { marginBottom: 70 }]}
          onPress={() => setStatusSubmit(!statusSubmit)}>
          <SvgIcon icon="DISPOSITION_POST" width="70px" height="70px" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

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
      //display: perWidth('flex', 'flex'),
      width: '100%',
      marginBottom: 8,
    },

    filterButton: {
      display: perWidth('none', 'flex'),
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

export default LocationSpecificInfoScreen;
