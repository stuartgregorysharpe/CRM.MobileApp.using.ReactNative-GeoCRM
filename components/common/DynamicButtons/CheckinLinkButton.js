import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment-timezone';
import {getApiRequest, postApiRequest} from '../../../actions/api.action';
import {
  checkFeatureIncludeParamFromSession,
  getPostParameter,
} from '../../../constants/Helper';
import {getLocalData} from '../../../constants/Storage';
import SelectionPicker from '../../modal/SelectionPicker';
import {SubmitButton} from '../../shared/SubmitButton';
import {
  clearNotification,
  showNotification,
} from '../../../actions/notification.action';
import {updateCurrentLocation} from '../../../actions/google.action';
import { Strings } from '../../../constants';
import { getDateTime } from '../../../helpers/formatHelpers';

const CheckinLinkButton = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {locationId, title} = props;
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

  var isCheckinTypes = false;
  var checkin_type_id = '';
  var reason_id = '';
  useEffect(() => {
    initData();
  }, []);
  const initData = () => {
    isCheckinTypes = checkFeatureIncludeParamFromSession(
      features,
      'checkin_types',
    );
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
            console.log('feedback, checkin', originFeedbackData);
            setFeedbackOptions(originFeedbackData);
          } else {
            console.log(' feedbackd ', originFeedbackData);
            setFeedbackOptions(originFeedbackData);
          }
          setIsFeedback(false);
        }}
        onValueChanged={(item, index) => {
          console.log('modalTypemodalType', modalType);
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
    //var check = await checkFeatureIncludeParam("checkin_types");
    setIsFeedback(true);
    setModalTitle('Check In Types');
    setModalType('checkin_type');
    setFeedbackOptions([]);
    getApiRequest('locations/checkin-types', {})
      .then(res => {
        console.log('re', res);
        if (res.status === 'success') {
          var options = [];
          res.checkin_types.forEach((item, index) => {
            options.push(item.checkin_type);
          });
          setFeedbackOptions(options);
          setCheckInTypes(res.checkin_types);
        }
      })
      .catch(e => {
        console.log('E', JSON.stringify(e));
      });
  };
  const _callCheckedIn = async () => {
    var currentTime = getDateTime();
    var userParam = getPostParameter(currentLocation);
    let postData = {
      location_id: locationId,
      checkin_time: currentTime,
      checkin_type_id: checkin_type_id, //Selected checkin_type_id, if was requested
      reason_id: reason_id, //Selected reason_id, if was requested
      user_local_data: userParam.user_local_data,
    };
    postApiRequest('location-info/check-in', postData)
      .then(res => {
        console.log('post data res', res);
        setIsFeedback(false);
        console.log('originFeedbackData', originFeedbackData);
        setFeedbackOptions(originFeedbackData);
        setModalType('feedback');
        navigation.navigate('DeeplinkLocationSpecificInfoScreen', {
          locationId: locationId,
          page: 'checkin',
        });
      })
      .catch(e => {});
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
          },
        }),
      );
    } else {
      if (isCheckinTypes) {
        _callCheckInTypes();
      } else {
        _callCheckedIn();
      }
    }
  };
  return (
    <>
      {showFeedbackDropDownModal()}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default CheckinLinkButton;
