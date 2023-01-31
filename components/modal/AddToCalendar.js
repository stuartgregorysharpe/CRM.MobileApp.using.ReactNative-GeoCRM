import React, { useState , useRef } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,  
  Text,
} from 'react-native';
import {Title} from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import {  
  parse,
} from 'react-native-extended-stylesheet-breakpoints';
import {useDispatch, useSelector} from 'react-redux';
import Divider from '../Divider';
import FilterButton from '../FilterButton';
import Colors from '../../constants/Colors';
import {SLIDE_STATUS} from '../../actions/actionTypes';
import Fonts from '../../constants/Fonts';
import AlertDialog from './AlertDialog';
import {DateStartEndTimePickerView} from '../DateStartEndTimePickerView';
import {DatetimePickerView} from '../DatetimePickerView';
import {expireToken, getPostParameter} from '../../constants/Helper';
import {Notification} from './Notification';
import { postApiRequest } from '../../actions/api.action';
import { generateKey } from '../../constants/Utils';
import LoadingBar from '../LoadingView/loading_bar';
import { Strings } from '../../constants';

export default function AddToCalendar({selectedItems, onClose, isModal}) {

  const dispatch = useDispatch();

  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [isStartEndTimePicker, setStartEndTimePicker] = useState(false);
  const [dateTimeType, setDateTimeType] = useState('date');
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);  
  const loadingBarRef = useRef(null);
  const showDivider = isModal != true;
  const indempotencyKey = generateKey();

  const handleScheduleDate = date => {    
    let datetime = date;    
    if (selectedItems != undefined) {
      selectedItems.forEach((item, index) => {
        item.schedule_order = (index + 1).toString();
        item.schedule_date = datetime;
      });
      callApi(selectedItems , 'schedule_date');
    }
  };

  const showProgressingBar = () => {
    if(loadingBarRef.current){
      loadingBarRef.current.showModal();
    }
  }

  const hideProgressingBar = () => {
    if(loadingBarRef.current){
      loadingBarRef.current.hideModal();
    }
  }

  const callApi = (schedules , type) => {

    if(!isLoading){
      setIsLoading(true);
      if(type == 'today'){
        showProgressingBar();
      }
      
      var userParam = getPostParameter(currentLocation);
      let postData = {
        schedules: schedules,
        user_local_data: userParam.user_local_data,
      };  
 
      postApiRequest('calenderadd', postData, indempotencyKey).then((res) => {                      
          setStartEndTimePicker(false);
          setMessage(Strings.Calendar.Added_Calendar_Successfully);
          setIsConfirmModal(true);
          if(type == 'today'){
            hideProgressingBar();
          }          
          setIsLoading(false);
      }).catch((error) => {
          expireToken(dispatch, error);
          setMessage(error.toString());
          setIsConfirmModal(true);
          if(type == 'today'){
            hideProgressingBar();
          }          
          setIsLoading(false);
      });  
    }
  };

  return (
    <ScrollView style={styles.refreshSliderContainer}>

      <Notification />
      <LoadingBar 
        backButtonDisabled={true}
        ref={loadingBarRef} />      

      {showDivider && (
        <TouchableOpacity
          style={{padding: 6}}
          onPress={() => dispatch({type: SLIDE_STATUS, payload: false})}>
          <Divider />
        </TouchableOpacity>
      )}

      <View style={styles.sliderHeader}>
        <Title style={{fontFamily: Fonts.primaryBold}}>Add to Calendar</Title>
        <TouchableOpacity
          onPress={() => {
            if (onClose) {
              onClose();
            }
          }}>
          <Text
            style={{
              color: Colors.selectedRedColor,
              paddingRight: 20,
              paddingLeft: 20,
              paddingTop: 20,
              paddingBottom: 10,
            }}>
            Close
          </Text>
        </TouchableOpacity>
      </View>

      <FilterButton
        text="Today"
        onPress={() => {
          if (selectedItems.length === 1) {
            setDateTimeType('time');
            setStartEndTimePicker(true);
          } else {
            if (selectedItems != undefined) {
              selectedItems.forEach((item, index) => {
                item.schedule_order = (index + 1).toString();
                item.schedule_date = 'Today';
              });              
              callApi(selectedItems , "today");
            }
          }
        }}
      />
      
      <FilterButton
        text="Schedule Date"
        onPress={() => {
          if (selectedItems.length === 1) {
            setDateTimeType('datetime');
            setStartEndTimePicker(true);
          } else {
            setIsDateTimePickerVisible(true);
          }
        }}
      />

      <DateStartEndTimePickerView
        title={
          dateTimeType === 'time'
            ? 'Please select time: '
            : 'Please Select date and time:'
        }
        visible={isStartEndTimePicker}
        isLoading={isLoading}
        onModalClose={() => setStartEndTimePicker(false)}
        mode={dateTimeType}
        close={(startDate, endDate, startTime, endTime) => {
          selectedItems.forEach((item, index) => {
            item.schedule_order = (index + 1).toString();
            if (dateTimeType === 'time') {
              item.schedule_date = 'Today';
            } else {
              item.schedule_date = startDate
                .replace('/', '-')
                .replace('/', '-');
            }
            item.schedule_time = startTime;
            item.schedule_end_time = endTime;
          });
          callApi(selectedItems , "today_time");
        }}></DateStartEndTimePickerView>

      <DatetimePickerView
        isLoading={isLoading}
        visible={isDateTimePickerVisible}
        value={''}
        onModalClose={() => {
          setIsDateTimePickerVisible(false);
        }}
        close={date => {
          if (date.length > 0) {
            handleScheduleDate(date.replace('/', '-').replace('/', '-'));
          }
          setIsDateTimePickerVisible(false);
        }}></DatetimePickerView>      

      <AlertDialog
        visible={isConfirmModal}
        onModalClose={() => {
          setIsConfirmModal(false);
          if (onClose) {
            onClose();
          }
        }}
        message={message}></AlertDialog>
    </ScrollView>
  );
}

const styles = EStyleSheet.create(
  parse({
    refreshSliderContainer: {
      backgroundColor: Colors.bgColor,
      padding: 10,
      alignSelf: 'stretch',
    },
    sliderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
  }),
);
