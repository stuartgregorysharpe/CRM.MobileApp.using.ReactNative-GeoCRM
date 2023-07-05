import React, {useState, useEffect , useRef } from 'react';
import {Platform } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {  
  expireToken,  
  getPostParameter,
} from '../../../constants/Helper';
import {
  getJsonData,
  getLocalData,
  storeJsonData,
  storeLocalValue,
} from '../../../constants/Storage';
import SelectionPicker from '../../modal/SelectionPicker';
import {SubmitButton} from '../../shared/SubmitButton';
import {updateCurrentLocation} from '../../../actions/google.action';
import {Constants, Strings} from '../../../constants';
import {formattedNumber, getDateTime} from '../../../helpers/formatHelpers';
import {LocationCheckinTypeDAO, PostRequestDAO} from '../../../DAO';
import {CHECKIN} from '../../../actions/actionTypes';
import {checkConnectivity} from '../../../DAO/helper';
import { generateKey } from '../../../constants/Utils';
import { getLocationInfoFromLocal } from '../../../sqlite/DBHelper';
import CheckinRingFenceModal from '../../modal/checkin_ring_fence';
import UpdateCustomerModal from '../../../screens/GeoRep/CRM/update_customer';
import { getDistanceBwtCurrentAndLocation, haveAddressUpdate } from './helper';

var checkin_indempotency = '';
var checkin_type_id = '';
var reason_id = '';

const CheckinLinkButton = props => {

  const {locationId, title, scheduleId , locationInfo , checkinTypeId , checkinReasonId , coordinates } = props;
  if (!locationId) return null;
  
  const dispatch = useDispatch();
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const user_settings = useSelector(
    state => state.selection.payload.user_settings,
  );
  const offlineStatus = useSelector(state => state.auth.offlineStatus);
  
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isFeedbackModal, setIsFeedback] = useState(false);
  const [feedbackOptions, setFeedbackOptions] = useState([]);
  const [modalTitle, setModalTitle] = useState('Feedback');
  const [modalType, setModalType] = useState('feedback');
  const [checkinTypes, setCheckInTypes] = useState([]);
  const [originFeedbackData, setFeedback] = useState([]);
  const [checkinReason, setCheckInReason] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCallTrigger, setCallTriger] = useState(false); 
  const [distance, setDistance] = useState('');
  const checkRingFenceModalRef = useRef();
  const updateCustomerModalRef = useRef();
  
  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if(isCallTrigger){
      if(Platform.OS == 'android'){
        _callCheckedIn();
      }else{
        setTimeout(() => {
          _callCheckedIn();
        }, 500);
      }      
    }    
  }, [isCallTrigger]);

  const initData = () => {
    checkin_indempotency = generateKey();
    dispatch(updateCurrentLocation());
  };

  const showFeedbackDropDownModal = () => {
    return (
      <SelectionPicker
        title={modalTitle}
        clearTitle={'Close'}
        mode={'single'}
        value={[]}
        visible={isFeedbackModal}
        options={feedbackOptions}
        onModalClose={() => {          
          if (modalType === 'checkin_reason') {
            var options = [];
            checkinTypes.forEach((item, index) => {
              options.push(item.checkin_type);
            });
            setFeedbackOptions(originFeedbackData);
          } else {
            setFeedbackOptions(originFeedbackData);
          }
          setIsFeedback(false);
        }}
        onValueChanged={(item, index) => {
          if (modalType === 'feedback') {
            //_callLocationFeedback(item);
            setIsFeedback(false);
          } else if (modalType === 'checkin_type') {

            var checkinType = checkinTypes.find(
              element => element.checkin_type === item,
            );            
            if (
              checkinType != undefined &&
              checkinType.checkin_reasons.length > 0
            ) {
              checkin_type_id = checkinType.checkin_type_id;
              var options = [];
              checkinType.checkin_reasons.forEach((item, index) => {
                options.push(item.reason);
              });
              setModalType('checkin_reason');
              setModalTitle('Check In Reasons');
              setFeedbackOptions(options);
              setCheckInReason(checkinType.checkin_reasons);
            } else {
              if(checkinType != undefined){
                checkin_type_id = checkinType.checkin_type_id;              
                setIsFeedback(false);
                setCallTriger(true);
                //_callCheckedIn();
              }              
            }
          } else if (modalType === 'checkin_reason') {
            var chk = checkinReason.find(element => element.reason === item);
            if (chk && chk.reason_id) {
              reason_id = checkinReason.find(
                element => element.reason === item,
              ).reason_id;
              setIsFeedback(false);
              setCallTriger(true);
              //_callCheckedIn();
            } else {
              setModalType('feedback');
            }
          }
        }}></SelectionPicker>
    );
  };

  const _callCheckInTypes = async () => {
    setIsFeedback(true);
    setModalTitle('Check In Types');
    setModalType('checkin_type');
    setFeedbackOptions([]);
    LocationCheckinTypeDAO.find(features)
      .then(res => {        
        var options = [];
        res.forEach((item, index) => {
          options.push(item.checkin_type);
        });
        setFeedbackOptions(options);
        setCheckInTypes(res);
      })
      .catch(e => {
        expireToken(dispatch, e);
      });
  };

  const getLocationName = (checkInDetails , offlineLocation, flag) =>{
    if(flag){
      return checkInDetails?.location_name != undefined ? checkInDetails?.location_name : checkInDetails?.location_name?.value
    }else{
      return offlineLocation.name;
    }    
  }

  const _callCheckedIn = async () => {
    if (isLoading) {     
      return false;
    }
    var currentTime = getDateTime();
    var userParam = getPostParameter(currentLocation);
    let postData = {
      location_id: locationId,
      checkin_time: currentTime,
      checkin_type_id: checkin_type_id, //Selected checkin_type_id, if was requested
      reason_id: reason_id, //Selected reason_id, if was requested
      user_local_data: userParam.user_local_data,
    };
    
    setIsLoading(true);
    if(props.onStart){
      props.onStart();      
    }

    PostRequestDAO.find(
      locationId,
      postData,
      'checkin',
      'location-info/check-in',
      '',
      '',
      checkin_indempotency,
      null
    )
      .then(async res => {

        dispatch({type: CHECKIN, payload: true, scheduleId: scheduleId});        
        checkin_indempotency = generateKey(); 
        setCallTriger(false);      
        setFeedbackOptions(originFeedbackData);
        setModalType('feedback');
        await storeLocalValue('@checkin', '1');
        await storeLocalValue('@specific_location_id', locationId);
        await storeJsonData('@setup', null);
        await storeLocalValue(
          Constants.storageKey.CHECKIN_SCHEDULE_ID,
          scheduleId,
        );
        await storeLocalValue('@checkin_type_id', checkin_type_id);
        await storeLocalValue('@checkin_reason_id', reason_id);
        
        let checkInDetails = locationInfo;
        let offlineLocationInfo = null;
        var isLocationInfo = true;
        if(locationInfo === null || locationInfo === undefined){
          isLocationInfo = false;
          offlineLocationInfo = await getLocationInfoFromLocal(locationId);          
        }   

        if(checkInDetails == undefined || checkInDetails == null){
          checkInDetails = {
            location_id : offlineLocationInfo.location_id,
            location_name : offlineLocationInfo.name,
            address: offlineLocationInfo.address
          }
        }

        checkInDetails.current_call = {
          "checkin_time": postData.checkin_time,
          "location_name": getLocationName(checkInDetails , offlineLocationInfo , isLocationInfo)
        };        
        await storeJsonData('@checkin_location', checkInDetails);
                
        checkin_type_id = '';
        reason_id = '';

        checkConnectivity().then(async isOnline => {
          if (!isOnline) {
            let offlineScheduleCheckins = await getJsonData(
              Constants.storageKey.OFFLINE_SCHEDULE_CHECKINS,
            );
            if (!offlineScheduleCheckins) {
              offlineScheduleCheckins = [];
            }
            if (!offlineScheduleCheckins.includes(scheduleId)) {
              offlineScheduleCheckins.push(scheduleId);
            }

            await storeJsonData(
              Constants.storageKey.OFFLINE_SCHEDULE_CHECKINS,
              offlineScheduleCheckins,
            );
            
          }
        });        
        
        setIsLoading(false);       
        
        if(props.onCallback){          
          props.onCallback();
        }else{
          onFinishProcess();                    
        }

        if(props.onEnd){
          props.onEnd();
        }

      })
      .catch(e => {
        if(props.onEnd){
          props.onEnd();
        }        
        setIsLoading(false);        
        expireToken(dispatch, e);
      });
  };
  
  const onFinishProcess = () => {
    if (props.onFinishProcess) {
      props.onFinishProcess();
    }
  };

  const onCheckIn = async () => {
    var isCheckin = await getLocalData('@checkin');  
    console.log("ischeckin", isCheckin)
    if (isCheckin === '1') {
      if(props.showConfirmModal){
        props.showConfirmModal(Strings.You_Are_Currenly_Checkedin);
      }
    } else {
      if( !offlineStatus && await isInRingFence()){        
        handleCheckIn();
      } else if( offlineStatus && (await isInRingFence() || await haveAddressUpdate(locationId) ) ){      
        handleCheckIn();
      }else{
        showRingFenceModal();
      }      
    }
  };

  const isInRingFence = async () => {
    const response = await getDistanceBwtCurrentAndLocation(currentLocation, coordinates , user_settings , features);     
    setDistance(response.formattedDistance);
    return response.isInRingFence;
  }

  const handleCheckIn = () => {
    const isCheckinTypes = features.includes('checkin_types');      
    if (isCheckinTypes ) {
      if(checkinTypeId != undefined && checkinTypeId != ''){
        checkin_type_id = checkinTypeId;
        reason_id = checkinReasonId;        
        setCallTriger(true);
      }else{
        _callCheckInTypes();
      }        
    } else {
      _callCheckedIn();
    }
  }

  const showRingFenceModal = () => {
    if(checkRingFenceModalRef.current){
      checkRingFenceModalRef.current.showModal();
    }
  }

  const onCheckinRingFenceModalClosed = ({type , value}) => {
    checkRingFenceModalRef.current.hideModal();
    if(type == Constants.actionType.ACTION_CLOSE){

    }else if(type ==  Constants.actionType.ACTION_NEXT){      
      if(updateCustomerModalRef.current){
        updateCustomerModalRef.current.showModal();
      }        
    }else if(type == Constants.actionType.ACTION_APPLY){
      handleCheckIn();
    }
  }

  const onUpdateCustomerModalClosed = ({type , value}) => {
    if (type == Constants.actionType.ACTION_CLOSE) {      
      if(props.onReloadLocationData){        
        props.onReloadLocationData()
      }
      if(updateCustomerModalRef.current){
        updateCustomerModalRef.current.hideModal();
      }      
    }
  }

  const renderSubmitButton = () => {
    if (props.renderSubmitButton) {
      return props.renderSubmitButton(onCheckIn);
    }
    return (
      <SubmitButton
        title={title}
        onSubmit={() => {
          if (props.onPress) {
            props.onPress();
          }          
          onCheckIn();
        }}
        style={props.style}
      />
    );
  };
  

  return (
    <>
      {showFeedbackDropDownModal()}
      {renderSubmitButton()}

      <CheckinRingFenceModal
        ref={checkRingFenceModalRef}
        distance={distance}
        onButtonAction={onCheckinRingFenceModalClosed}
      />

      <UpdateCustomerModal 
        ref={updateCustomerModalRef}
        locationId={locationId}
        title="Update"
        onButtonAction={onUpdateCustomerModalClosed}
      />
      
    </>
  );
};


export default CheckinLinkButton;
