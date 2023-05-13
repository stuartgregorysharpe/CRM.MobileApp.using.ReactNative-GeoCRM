import React, {useEffect, useState, useRef , useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,  
  StyleSheet
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors, { whiteLabel } from '../../../../constants/Colors';
import {style} from '../../../../constants/Styles';
import SvgIcon from '../../../../components/SvgIcon';
import Fonts from '../../../../constants/Fonts';
import DeviceInfo, { getDevice } from 'react-native-device-info';
import {LocationInfoInput} from '../locationInfoDetails/LocationInfoInput';
import {LocationInfoInputTablet} from '../locationInfoDetails/LocationInfoInputTablet';
import Images from '../../../../constants/Images';
import {
  getJsonData,
  getLocalData,  
} from '../../../../constants/Storage';
import ActivityComments from '../activity_comments/ActivityComments';
import {getLocationInfo, setCompulsoryDevice, setCompulsoryForm, setCompulsoryLocationField} from '../../../../actions/location.action';
import FeaturedCardLists from './partial/FeaturedCardLists';
import ActionItemsModal from '../action_items/modals/ActionItemsModal';
import {useNavigation} from '@react-navigation/native';
import NavigationHeader from '../../../../components/Header/NavigationHeader';
import DevicesModal from '../devices/modal/DevicesModal';
import {Constants, Strings} from '../../../../constants';
import CustomerContactModal from '../customer_contacts';
import CheckOutViewContainer from '../../../../components/common/CheckOut/CheckOutViewContainer';
import CustomerSaleHistoryModal from '../customer_sales';
import {expireToken} from '../../../../constants/Helper';
import DanOneSalesModal from '../danone_sales/modals/DanOneSalesModal';
import AlertDialog from '../../../../components/modal/AlertDialog';
import { clearNotification, showNotification } from '../../../../actions/notification.action';
import { Notification } from '../../../../components/modal/Notification';
import SimCardReportModal from '../sim_card';
import { checkCompulsoryDevice, checkCompulsoryForm, checkCompulsoryLocationFields } from './helper';

const LocationSpecificInfoScreen = props => {

  const navigation = props.navigation;
  const openModal = props.route?.params?.openModal;  
  const dispatch = useDispatch();
  const devicesModalRef = useRef(null);
  const [locationInfo, setLocationIfo] = useState(props.route.params.data);
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [pageType, setPageType] = useState(props.route.params.page);  
  const location_id = props.route.params.locationId;    
  const [statusSubmit, setStatusSubmit] = useState(true);
  const locationInfoRef = useRef();
  const customerContactsRef = useRef();
  const simCardReportModalRef =  useRef();

  const [canShowCustomerContactsScreen, setCanShowCustomerContactsScreen] =
    useState(false);
  const [isActivityComment, setIsActivityComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActionItems, setIsActionItems] = useState(false);  
  const [isDanOneSales, setIsDanOneSales] = useState(false);
  const navigationMain = useNavigation();
  const showLoopSlider = () => {};
  const isShowCustomNavigationHeader = !props.screenProps;
  const isCheckin = useSelector(state => state.location.checkIn);
  const locationId = locationInfo ? locationInfo.location_id : location_id; // access_crm location id
  const customerContactModalRef = useRef(null);
  const customerSaleHistoryModalRef = useRef(null);
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const isDisposition = features.includes('disposition_fields');
  const devices_compulsory_validation = features.includes('devices_compulsory_validation');
  const validate_crm_fields = features.includes('validate_crm_fields');
  
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingDevice, setIsLoadingDevice] = useState(false);
  const [isLoadingLocationField, setIsLoadingLocationField] = useState(false);
  const [isConfirmModal , setIsConfirmModal] = useState(false);
  const [confirmModalType, setConfirmModalType] = useState('');
  const [message, setMessage] = useState('');
  const locationCheckOutCompulsory = useSelector( state => state.location.compulsoryForm );
  const compulsoryDevice= useSelector( state => state.location.compulsoryDevice );
  const compulsoryLocationField= useSelector( state => state.location.compulsoryLocationField );
  

  let isMout = true;

  useEffect(() => {
    isMout = true;
    return () => {
      isMout = false;
    };
  }, []);

  useEffect(() => {    
    refreshHeader();        
  }, [location_id]);

  useEffect(() => {    
    isMout = true;
    checkOnlineStatus();
    if (isCheckin) {
      getCheckInLocation();
    }    
    return () => {
      isMout = false;
    };
  }, [isCheckin]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {         
      getCheckInLocation();
    });
    return unsubscribe;
  }, [navigation]);

  const checkOnlineStatus = useCallback(
    async () => {
      var specific_location_id  = await getLocalData("@specific_location_id");      
      console.log("Triggered", specific_location_id , pageType);
      if( (specific_location_id == '' || specific_location_id == undefined )  && pageType == 'checkin'){
        dispatch(clearNotification());
        goBack();
      }
    },
    [isCheckin],
  )
  
  const getCheckInLocation = async () => {    
    if(pageType == 'checkin'){
      var location = await getJsonData('@checkin_location');      
      if (location != null && location?.location_name?.value != undefined) {
        if (
          locationInfoRef.current != undefined &&
          locationInfoRef.current != null
        ) {
          locationInfoRef.current.updateDispositionData(location);
        }  
        setLocationIfo(location);
        checkCheckoutCompulsory(location.location_id);
        
      } else {
        var locId  = await getLocalData("@specific_location_id");        
        if (locId !== undefined) {        
          openLocationInfo(locId);
          checkCheckoutCompulsory(locId);
        }
      }
      if(openModal == 'devices'){
        devicesModalRef.current.showModal();
      }else if(openModal == 'cusotmer_contact'){
        customerContactModalRef.current.showModal();
      }
      
    }else if(pageType == 'access_crm'){
      if(locationId != undefined && locationInfo){
        locationInfoRef.current.updateDispositionData(locationInfo);
        checkCheckoutCompulsory(locationId);
      
      }
    }else{
      if(locationId != undefined && locationInfo){
        locationInfoRef.current.updateDispositionData(locationInfo);
        checkCheckoutCompulsory(locationId);
        
      }
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
        if (true) {
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
      navigationMain.navigate('DeeplinkRepForms', {locationInfo: locationInfo});
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

    if(item.link === 'sim_card_report'){
      if(simCardReportModalRef.current)
        simCardReportModalRef.current.showModal()
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
            }}></TouchableOpacity>
        ),        
      });
    }
  };

  const onDevicesModalClosed = async({type, value}) => {
    
    if (type == Constants.actionType.ACTION_CLOSE) {            
      devicesModalRef.current.hideModal();
    }
  };

  const onCustomerContactModalClosed = ({type, value}) => {    
    getLocationFields(locationInfo.location_id);
  };
  const onCustomerSaleHistoryModalClosed = ({type, value}) => {};
  const onSimCardReportModalClosed = ({type , value}) => {};

  const checkCheckoutCompulsory = async (locationId) => {
    await getFormLists(locationId);
    await getDeviceList(locationId);
    await getLocationFields(locationId);
  }

  const getFormLists = async locationId => {    
    if(isLoadingForm) return;
    setIsLoadingForm(true);
    checkCompulsoryForm(isCheckin, locationId).then((res) => {          
      console.log("check compulsory form => ", res)
      dispatch(setCompulsoryForm(res));
      setIsLoadingForm(false);
    }).catch((e) => {
      setIsLoadingForm(false);
    });
  };

  const getDeviceList = async (locationId) => {
    if(!devices_compulsory_validation) return;
    if(isLoadingDevice) return;
    setIsLoadingDevice(true);  
    checkCompulsoryDevice(locationId).then((res) => {      
      console.log("check compulsory device => ", res)
      dispatch(setCompulsoryDevice(res));
      setIsLoadingDevice(false);      
    }).catch((e) =>{  
      setIsLoadingDevice(false);
    })
  }

  const getLocationFields = async(locationId) => {    
    if(!validate_crm_fields) return;
    if(isLoadingLocationField) return;
    setIsLoadingDevice(true);  
    checkCompulsoryLocationFields(locationId).then((res) => {      
      console.log("check location fields device => ", res)
      dispatch(setCompulsoryLocationField(res));
      setIsLoadingLocationField(false);      
    }).catch((e) =>{  
      setIsLoadingLocationField(false);
    })
  }

  return (
    <SafeAreaView style={{flex:1}}>

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
      
      <AlertDialog 
        visible={isConfirmModal}
        message={message}
        onModalClose={ async() => {
          setIsConfirmModal(false);
          if(confirmModalType == 'go_back'){
            goBack();
          }else if(confirmModalType == 'have_compulsory_form'){
            navigationMain.navigate('DeeplinkRepForms', {
              locationInfo: locationInfo,
            }); 
          }else if(confirmModalType == 'compulsoryDevice'){
            devicesModalRef.current.showModal();
          }else if(confirmModalType == 'compulsoryLocationField'){
            customerContactModalRef.current.showModal();
          }
        }}
      />

      {
        locationInfo != undefined && (
          <SimCardReportModal 
            ref={simCardReportModalRef}
            locationId={locationId}
            title="Sim Card Report"
            clearText='Close'
            onButtonAction={onSimCardReportModalClosed}
          />
        )
      }

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
        onClose={() => {
          const locId = location_id != undefined
          ? location_id
          : locationInfo != undefined
          ? locationInfo.location_id
          : 0;
          console.log(locId)
          getDeviceList(locId);
        }}
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
                isLoadingForm={isLoadingForm}
                showConfirmModal={(message , type) => {
                  setMessage(message);
                  setConfirmModalType(type);
                  setIsConfirmModal(true);
                }}
                onCallback={async res => {                  
                  dispatch(showNotification({type: Strings.Success , message : res.message , buttonText: 'Ok'}));
                }}
              />
            )}            
          </View>
        )}
        
        <View style={[styles.innerContainer, {marginBottom: -14}]}>
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
          isFormCompulsory={locationCheckOutCompulsory}
          isDeviceCompulsory={compulsoryDevice}
          isLocationFieldCompulsory={compulsoryLocationField}
          onItemClicked={onFeatureItemClicked}></FeaturedCardLists>
        <View style={{height: 60}}></View>
      </ScrollView>

      {isDisposition && (
        <TouchableOpacity
          style={[style.plusButton, {marginBottom: 70}]}
          onPress={() => setStatusSubmit(!statusSubmit)}>
          <SvgIcon icon="DISPOSITION_POST" width="70px" height="70px" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  },
  cardBox: {
    width: '100%',
    marginBottom: 8,
  },  
})

export default LocationSpecificInfoScreen;
