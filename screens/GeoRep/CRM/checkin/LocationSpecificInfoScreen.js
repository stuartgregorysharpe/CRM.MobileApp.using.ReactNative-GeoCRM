import React, {useEffect, useState, useRef , useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,  
  StyleSheet,
  Platform
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors, { whiteLabel } from '../../../../constants/Colors';
import {style} from '../../../../constants/Styles';
import SvgIcon from '../../../../components/SvgIcon';
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
import SimCardReportModal from '../sim_card';
import { checkCompulsoryDevice, checkCompulsoryForm, checkCompulsoryLocationFields } from './helper';
import { checkConnectivity } from '../../../../DAO/helper';
import { haveLocationFieldPost } from '../../../../components/common/CheckOut/helper';
import AlertModal from '../../../../components/modal/AlertModal';
import LocationDetailsView from './components/LocationDetailsView';

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
  const alertModalRef = useRef();

  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const isDisposition = features.includes('disposition_fields');
  const devices_compulsory_validation = features.includes('devices_compulsory_validation');
  const validate_crm_fields = features.includes('validate_crm_fields');
  
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingDevice, setIsLoadingDevice] = useState(false);
  const [isLoadingLocationField, setIsLoadingLocationField] = useState(false);  
  const locationCheckOutCompulsory = useSelector( state => state.location.compulsoryForm );
  const compulsoryDevice = useSelector( state => state.location.compulsoryDevice );
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
      getCheckInLocation(true);
    }    
    return () => {
      isMout = false;
    };
  }, [isCheckin]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {         
      getCheckInLocation(false);
    });
    return unsubscribe;
  }, [navigation]);



  const checkOnlineStatus = useCallback(
    async () => {
      var specific_location_id  = await getLocalData("@specific_location_id");      
      if( (specific_location_id == '' || specific_location_id == undefined )  && pageType == 'checkin'){        
        goBack();
      }
    },
    [isCheckin],
  )
  
  const getCheckInLocation = async ( isOpenModal ) => {    
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
      if(isOpenModal){
        if(openModal == 'devices'){
          if(devicesModalRef.current)
            devicesModalRef.current.showModal();
        }else if(openModal == 'cusotmer_contact'){
          console.log("cusotmer_contact" , customerContactModalRef)
          if(customerContactModalRef.current)
            customerContactModalRef.current.showModal();
        }
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
        expireToken(dispatch, e , alertModalRef);
      });
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
  };
  
  const onCustomerSaleHistoryModalClosed = ({type, value}) => {};
  const onSimCardReportModalClosed = ({type , value}) => {};

  const checkCheckoutCompulsory = async (locationId) => {
    // await getFormLists(locationId);
    // await getDeviceList(locationId);
    // await getLocationFields(locationId);
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
    console.log("isLoadingDevice" , isLoadingDevice , devices_compulsory_validation)
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
    setIsLoadingLocationField(true);  
      checkCompulsoryLocationFields(locationId).then((res) => {
        if(res){
          checkConnectivity().then(async(isConnected) => {
            if(isConnected){
              dispatch(setCompulsoryLocationField(res));        
            }else{
              const flag = await haveLocationFieldPost(locationId);            
              dispatch(setCompulsoryLocationField(!flag));
            }
            setIsLoadingLocationField(false);
          }).catch((e) => {
            setIsLoadingLocationField(false);
          });        
        }else{          
          dispatch(setCompulsoryLocationField(false));
          //dispatch(setCompulsoryDevice(true));
          setIsLoadingLocationField(false);
        }
        
      }).catch((e) =>{
        setIsLoadingLocationField(false);
      })            
  }

  const showMessage = (message, type) => {
    const delay = Platform.OS == 'ios' ? 500 : 0;    
    setTimeout(() => {
      if(alertModalRef.current){
        alertModalRef.current.alert(message , Strings.Ok , false, type);
      }
    }, delay);
    
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
      
      <AlertModal 
        ref={alertModalRef}        
        onModalClose={ async(confirmModalType) => {          
          if(confirmModalType == 'go_back'){
            goBack();
          }else if(confirmModalType == 'compulsoryForm'){
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

      
      <CustomerContactModal
        ref={customerContactModalRef}
        locationId={
          location_id != undefined
            ? location_id
            : locationInfo != undefined
            ? locationInfo.location_id
            : 0
        }
        onClose={() => {
          const locId = location_id != undefined
          ? location_id
          : locationInfo != undefined
          ? locationInfo.location_id
          : 0;
          getLocationFields(locId);
        }}
        onButtonAction={onCustomerContactModalClosed}
      />
            
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

            <LocationDetailsView locationInfo={locationInfo} />

            {isCheckin && (
              <CheckOutViewContainer
                type="specificInfo"
                isLoadingForm={isLoadingForm}
                loadCompulsoryInfo={true}                
                showConfirmModal={(message , type) => {                  
                  showMessage(message, type);
                }}
                onStart={() => {
                  setPageType('crm_map');
                }}
                onCallback={async res => {
                  showMessage(res?.message , 'go_back');
                }}
              />
            )}            
          </View>
        )}
        
        <View style={[styles.innerContainer, {marginBottom: -14}]}>
          <View style={[styles.cardBox]}>
            {locationInfo !== undefined &&
            locationInfo?.address != '' &&
            locationInfo?.address != undefined &&
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
      
  innerContainer: {
    justifyContent: 'space-between',    
  },
  cardBox: {
    width: '100%',
    marginBottom: 8,
  },  
})

export default LocationSpecificInfoScreen;
