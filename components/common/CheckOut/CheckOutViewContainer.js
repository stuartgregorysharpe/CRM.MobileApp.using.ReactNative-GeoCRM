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
  LOCATION_CHECK_OUT_COMPULSORY,
} from '../../../actions/actionTypes';
import HomeCheckOut from '../../../screens/GeoRep/Home/partial/CheckOut';
import SpecificCheckOut from '../../../screens/GeoRep/CRM/checkin/partial/CheckoutButton';
import { PostRequestDAO } from '../../../DAO';
import {
  clearLoadingBar,
  clearNotification,
  showLoadingBar,
  showNotification,
} from '../../../actions/notification.action';
import {Constants, Strings} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import CalendarCheckOutButton from '../../../screens/GeoRep/Calendar/components/CalendarCheckOutButton';
import { generateKey } from '../../../constants/Utils';
import LoadingBar from '../../LoadingView/loading_bar';

var specificLocationId;
var check_out_indempotency = '';
let isMount = true;

export default function CheckOutViewContainer(props) {

  const {type, currentCall , isLoadingForm } = props;
  const dispatch = useDispatch();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const locationCheckOutCompulsory = useSelector(
    state => state.rep.locationCheckOutCompulsory,
  );
  const [isLoading, setIsLoading] = useState(false);
  const loadingBarRef = useRef(null);
  const navigationMain = useNavigation();
  
  useEffect(() => {
    isMount = true;
    initData();
    return () => {
      isMount = false;
    }
  }, []);

  useEffect(() => {
    console.log('updated location com', locationCheckOutCompulsory);
  }, [locationCheckOutCompulsory]);

  const initData = async () => {
    specificLocationId = await getLocalData('@specific_location_id');    
    check_out_indempotency = generateKey();
  };

  const checkOutLocation = useCallback(() => {    
    if(!isLoadingForm){
      _callCheckOut();
    }    
  }, [locationCheckOutCompulsory, isLoadingForm]);

  const _callCheckOut = () => {

    if (isLoading) {
      return;
    }

    if (locationCheckOutCompulsory) {
      if(props.showConfirmModal){
        props.showConfirmModal(Strings.CRM.Complete_Compulsory_Form);        
      }
      // dispatch(
      //   showNotification({
      //     type: Strings.Success,
      //     message: Strings.CRM.Complete_Compulsory_Form,
      //     buttonText: Strings.Ok,
      //     buttonAction: async () => {
      //       const location = await getJsonData('@checkin_location');            
      //       if(location != null && location != undefined){
      //         navigationMain.navigate('DeeplinkRepForms', {
      //           locationInfo: location,
      //         });
      //       }            
      //       dispatch(clearNotification());
      //     },
      //   }),
      // );
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
          

          await storeLocalValue('@checkin', '0');
          await storeLocalValue('@checkin_type_id', '');
          await storeLocalValue('@checkin_reason_id', '');
          await storeLocalValue('@specific_location_id', '');
          await storeLocalValue(Constants.storageKey.CHECKIN_SCHEDULE_ID, '');
          await storeJsonData('@form_ids', []);
          await storeJsonData('@setup', null);
          await storeJsonData('@checkin_location', null);
          
          dispatch({type: CHECKIN, payload: false, scheduleId: 0});
          dispatch({type: LOCATION_CHECK_OUT_COMPULSORY, payload: true});
                                      
          setIsLoading(false);
          if(loadingBarRef.current)
            loadingBarRef.current.hideModal();

          // if (type == 'specificInfo' || type == 'calendar') {
          //   if (props.goBack) {
          //     props.goBack(res);
          //   }
          // }
                                        
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
