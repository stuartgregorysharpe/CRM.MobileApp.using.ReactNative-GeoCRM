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
import { setCompulsoryDevice, setCompulsoryForm, setCompulsoryLocationField } from '../../../actions/location.action';
import { checkCompulsoryDevice, checkCompulsoryForm, checkCompulsoryLocationFields } from '../../../screens/GeoRep/CRM/checkin/helper';
import { checkConnectivity } from '../../../DAO/helper';
import { haveLocationFieldPost } from './helper';

var specificLocationId; 
var check_out_indempotency = '';
let isMount = true;

export default function CheckOutViewContainer(props) {

  const {type, currentCall , isLoadingForm , loadCompulsoryInfo = false  } = props;
  const dispatch = useDispatch();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const compulsoryForm = useSelector( state => state.location.compulsoryForm);
  const compulsoryDevice = useSelector(state => state.location.compulsoryDevice);
  const compulsoryLocationField = useSelector( state => state.location.compulsoryLocationField );

  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isLocationFieldDataLoading, setIsLocationFieldDataLoading] = useState(false);
  const loadingBarRef = useRef(null);
  const navigationMain = useNavigation();
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const devices_compulsory_validation = features.includes("devices_compulsory_validation");  
  const location_specific_devices = features.includes("location_specific_devices");
  const validate_crm_fields = features.includes('validate_crm_fields');
  
  useEffect(() => {
    isMount = true;
    initData();
    loadData();
    return () => {
      isMount = false;
    }
  }, []);

  useEffect(() => {    
    setIsDataLoading(false);  
  }, [compulsoryForm , compulsoryDevice]);

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
          dispatch(setCompulsoryDevice(false));
          setIsDataLoading(false);
        }        
      }).catch((e) => {
        setIsDataLoading(false);
      });
      
      loadLocationFormCompulsory();
    }    
  }

  const loadLocationFormCompulsory = () => {
    if(validate_crm_fields){
      setIsLocationFieldDataLoading(true);
      checkCompulsoryLocationFields(specificLocationId).then((res) => {
        if(res){
          checkConnectivity().then(async(isConnected) => {
            if(isConnected){
              dispatch(setCompulsoryLocationField(res));
            }else{
              const flag = await haveLocationFieldPost(specificLocationId);            
              dispatch(setCompulsoryLocationField(!flag));
            }
            setIsLocationFieldDataLoading(false);
          }).catch((e) => {
            setIsLocationFieldDataLoading(false);
          });
        }else{
          dispatch(setCompulsoryLocationField(res));     
          setIsLocationFieldDataLoading(false);
        }              
      }).catch(e => {
        setIsLocationFieldDataLoading(false);
      });                       
    }else{
      dispatch(setCompulsoryLocationField(false));     
    }
  }

  const checkOutLocation = useCallback(() => {    
    if(!isLoadingForm && !isDataLoading && !isLocationFieldDataLoading){
      _callCheckOut();
    }    
  }, [compulsoryForm, compulsoryDevice, compulsoryLocationField , isLoadingForm , isDataLoading , isLocationFieldDataLoading]);
  
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
    if ( compulsoryForm ) {
      message = Strings.CRM.Complete_Compulsory_Form;
      type = 'compulsoryForm';
    }
   
    if( compulsoryDevice  &&  devices_compulsory_validation && location_specific_devices ) { 
      message = Strings.CRM.Complete_Compulsory_Device;
      type = 'compulsoryDevice';
    }

    console.log("compulsoryLocationField",compulsoryLocationField)
    if( compulsoryLocationField ) {
      message = Strings.CRM.Complete_Compulsory_Location_Field;
      type = 'compulsoryLocationField';
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

      if(props.onStart) {
        props.onStart();
      }

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
