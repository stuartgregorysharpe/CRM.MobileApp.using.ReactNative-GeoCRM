import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useCallback , useRef} from 'react';
import {expireToken, getPostParameter} from '../../../constants/Helper';
import {getDateTime} from '../../../helpers/formatHelpers';
import {useSelector, useDispatch} from 'react-redux';
import {
  getJsonData,
  getLocalData,
  storeJsonData,
  storeLocalValue,
} from '../../../constants/Storage';
import {
  CHECKIN,  
} from '../../../actions/actionTypes';
import HomeCheckOut from '../../../screens/GeoRep/Home/partial/CheckOut';
import SpecificCheckOut from '../../../screens/GeoRep/CRM/checkin/partial/CheckoutButton';
import { PostRequestDAO } from '../../../DAO';
import {Constants, Strings} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import CalendarCheckOutButton from '../../../screens/GeoRep/Calendar/components/CalendarCheckOutButton';
import { generateKey } from '../../../constants/Utils';
import LoadingBar from '../../LoadingView/loading_bar';
import { setCompulsoryDevice, setCompulsoryForm } from '../../../actions/location.action';
import { checkCompulsoryDevice, checkCompulsoryForm } from '../../../screens/GeoRep/CRM/checkin/helper';

var specificLocationId;
var check_out_indempotency = '';
let isMount = true;

export default function CheckOutViewContainer(props) {

  const {type, currentCall , isLoadingForm , loadCompulsoryInfo = false } = props;
  const dispatch = useDispatch();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const locationCheckOutCompulsory = useSelector(
    state => state.location.compulsoryForm,
  );
  const compulsoryDevice = useSelector(state => state.location.compulsoryDevice);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const loadingBarRef = useRef(null);
  const navigationMain = useNavigation();
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const devices_compulsory_validation = features.includes("devices_compulsory_validation");  
  const location_specific_devices = features.includes("location_specific_devices");
  
  useEffect(() => {
    isMount = true;
    initData();
    loadData();
    return () => {
      isMount = false;
    }
  }, []);

  useEffect(() => {
    console.log('updated location com', locationCheckOutCompulsory);
    setIsDataLoading(false);
  }, [locationCheckOutCompulsory , compulsoryDevice]);

  const initData = async () => {
    specificLocationId = await getLocalData('@specific_location_id');    
    check_out_indempotency = generateKey();
  };

  const loadData = async () => {
    
    if(loadCompulsoryInfo){
      if(specificLocationId == undefined){
        specificLocationId = await getLocalData('@specific_location_id');
      }
      setIsDataLoading(true);
      checkCompulsoryForm(true, specificLocationId).then((res) => {      
        dispatch(setCompulsoryForm(res));
        if(devices_compulsory_validation && location_specific_devices){
          checkCompulsoryDevice(specificLocationId).then((res) => {            
            setIsDataLoading(false);
            dispatch(setCompulsoryDevice(res));
          }).catch((e) => {
            setIsDataLoading(false);    
          })
        }else{
          setIsDataLoading(false);
        }        
      }).catch((e) => {
        setIsDataLoading(false);
      });    
    }    
  }

  const checkOutLocation = useCallback(() => {    
    if(!isLoadingForm && !isDataLoading){
      _callCheckOut();
    }    
  }, [locationCheckOutCompulsory, compulsoryDevice, isLoadingForm , isDataLoading]);
  
  const _callCheckOut = async() => {

    if(check_out_indempotency == undefined || check_out_indempotency == ''){
      check_out_indempotency = generateKey();
    }
    if(specificLocationId === undefined || specificLocationId === ''){
      specificLocationId = await getLocalData('@specific_location_id');    
    }

    console.log("loading", isLoading, isDataLoading)
    if (isLoading || isDataLoading) {
      return;
    }

    var message = '';
    var type = '';
    if(specificLocationId === undefined || specificLocationId === ''){
      message = "Location ID error, please contact Support";      
      type = 'locationId';
    }
    if ( locationCheckOutCompulsory ) {
      message = Strings.CRM.Complete_Compulsory_Form;
      type = 'have_compulsory_form';
    }
    if( compulsoryDevice  &&  devices_compulsory_validation && location_specific_devices ) { 
      message = Strings.CRM.Complete_Compulsory_Device;
      type = 'compulsoryDevice';
    }

    if (message != '') {
      if(props.showConfirmModal){
        props.showConfirmModal( message , type );        
      }      
    } else {

      setIsLoading(true); 
      loadingBarRef.current.showModal();  

      var userParam = getPostParameter(currentLocation);
      var currentTime = getDateTime();

      let postData = {
        location_id: specificLocationId,
        checkout_time: currentTime,
        user_local_data: userParam.user_local_data,
      };

      PostRequestDAO.find(
        specificLocationId,
        postData,
        'checkout',
        'location-info/check-out',
        '',
        '',
        check_out_indempotency,
        null
      )
        .then(async res => {

          console.log('RES : ', res);     
          if(res.status === Strings.Success){
            await storeLocalValue('@checkin', '0');
            await storeLocalValue('@checkin_type_id', '');
            await storeLocalValue('@checkin_reason_id', '');
            await storeLocalValue('@specific_location_id', '');
            await storeLocalValue(Constants.storageKey.CHECKIN_SCHEDULE_ID, '');
            await storeJsonData('@form_ids', []);
            await storeJsonData('@setup', null);
            await storeJsonData('@checkin_location', null);            
            dispatch({type: CHECKIN, payload: false, scheduleId: 0});
            dispatch(setCompulsoryForm(true));
            dispatch(setCompulsoryDevice(true));            
          }
                                       
          setIsLoading(false);
          if(loadingBarRef.current)
            loadingBarRef.current.hideModal();
                    
          if(props.onCallback){
            props.onCallback(res);
          }
                    
          
        })
        .catch(e => {
          console.log('checkout error:', e);
          if(loadingBarRef.current)
            loadingBarRef.current.hideModal();
          setIsLoading(false);          
          expireToken(dispatch, e);
        });
    }
  };

  return (
    <View>
      {type == 'home' && (
        <HomeCheckOut
          currentCall={currentCall}
          _callCheckOut={checkOutLocation}
        />
      )}

      {type == 'specificInfo' && (
        <SpecificCheckOut _callCheckOut={checkOutLocation} />
      )}

      {type == 'calendar' && (
        <CalendarCheckOutButton _callCheckOut={checkOutLocation} />
      )}

      <LoadingBar 
        ref={loadingBarRef}
      />
    </View>
  );
}
