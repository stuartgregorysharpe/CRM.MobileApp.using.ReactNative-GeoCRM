import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkFeatureIncludeParamFromSession,
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
import {  
  clearNotification,  
  showNotification,
} from '../../../actions/notification.action';
import {updateCurrentLocation} from '../../../actions/google.action';
import {Constants, Strings} from '../../../constants';
import {getDateTime} from '../../../helpers/formatHelpers';
import {LocationCheckinTypeDAO, PostRequestDAO} from '../../../DAO';
import {Notification} from '../../modal/Notification';
import {CHECKIN} from '../../../actions/actionTypes';
import {checkConnectivity} from '../../../DAO/helper';
import {getLocationInfo} from '../../../actions/location.action';
import { generateKey } from '../../../constants/Utils';

var checkin_indempotency = '';

const CheckinLinkButton = props => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {locationId, title, scheduleId} = props;
  if (!locationId) return null;
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isFeedbackModal, setIsFeedback] = useState(false);
  const [feedbackOptions, setFeedbackOptions] = useState([]);
  const [modalTitle, setModalTitle] = useState('Feedback');
  const [modalType, setModalType] = useState('feedback');
  const [checkinTypes, setCheckInTypes] = useState([]);
  const [originFeedbackData, setFeedback] = useState([]);
  const [checkinReason, setCheckInReason] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  var checkin_type_id = '';
  var reason_id = '';
  useEffect(() => {
    initData();
  }, []);
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
          console.log('modalType', modalType);
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
            _callLocationFeedback(item);
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
              setIsFeedback(false);
              _callCheckedIn();
            }
          } else if (modalType === 'checkin_reason') {
            var chk = checkinReason.find(element => element.reason === item);
            if (chk && chk.reason_id) {
              reason_id = checkinReason.find(
                element => element.reason === item,
              ).reason_id;
              _callCheckedIn();
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
        console.log('res', res);
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
    PostRequestDAO.find(
      locationId,
      postData,
      'checkin',
      'location-info/check-in',
      '',
      '',
      checkin_indempotency,
      dispatch
    )
      .then(async res => {
        checkin_indempotency = generateKey();
        setIsFeedback(false);
        setFeedbackOptions(originFeedbackData);
        setModalType('feedback');
        dispatch({type: CHECKIN, payload: true, scheduleId: scheduleId});
        await storeLocalValue('@checkin', '1');
        await storeLocalValue('@specific_location_id', locationId);
        await storeLocalValue(
          Constants.storageKey.CHECKIN_SCHEDULE_ID,
          scheduleId,
        );
        await storeLocalValue('@checkin_type_id', checkin_type_id);
        await storeLocalValue('@checkin_reason_id', reason_id);

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
          getLocationInfo(locationId, currentLocation).then(
            async locationInfo => {
            let checkInDetails = locationInfo;
            checkInDetails.current_call = {
              "checkin_time": postData.checkin_time,
              "location_name": checkInDetails.location_name.value
            };
              await storeJsonData('@checkin_location', checkInDetails);
              navigation.navigate('DeeplinkLocationSpecificInfoScreen', {
                locationId: locationId,
                page: 'checkin',
              });              
              onFinishProcess();
            },
          );
        }       
      })
      .catch(e => {
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
    if (isCheckin === '1') {
      dispatch(
        showNotification({
          type: 'success',
          message: Strings.You_Are_Currenly_Checkedin,
          buttonText: 'Continue',
          buttonAction: async () => {
            navigation.navigate('DeeplinkLocationSpecificInfoScreen', {
              locationId: locationId,
              page: 'checkin',
            });
            dispatch(clearNotification());
            onFinishProcess();
          },
        }),
      );
    } else {
      const isCheckinTypes = checkFeatureIncludeParamFromSession(
        features,
        'checkin_types',
      );
      console.log('isCheckinTypes', isCheckinTypes);



      if (isCheckinTypes) {
        _callCheckInTypes();
      } else {
        _callCheckedIn();
      }
    }
  };
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
          /*navigation.navigate('DeeplinkLocationSpecificInfoScreen', {
            locationId: locationId,
            pageType: 'checkin',
          });*/
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
      <Notification />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default CheckinLinkButton;
