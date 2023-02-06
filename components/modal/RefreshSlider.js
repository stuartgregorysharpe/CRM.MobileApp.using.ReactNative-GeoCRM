import React, { useEffect ,  useState} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,  
  Text,
} from 'react-native';
import {Title, Button} from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  setWidthBreakpoints,
  parse,
} from 'react-native-extended-stylesheet-breakpoints';
import {useDispatch, useSelector} from 'react-redux';
import Divider from '../Divider';
import FilterButton from '../FilterButton';
import Colors, {  
  
} from '../../constants/Colors';
import {breakPoint} from '../../constants/Breakpoint';
import {SLIDE_STATUS, SUB_SLIDE_STATUS} from '../../actions/actionTypes';
import Fonts from '../../constants/Fonts';
import {
  expireToken,
  getPostParameter, 
} from '../../constants/Helper';
import AlertDialog from './AlertDialog';
import {DatetimePickerView} from '../DatetimePickerView';
import { PostRequestDAO } from '../../DAO';
import { generateKey } from '../../constants/Utils';

var reloop_indempotency = '';

export default function RefreshSlider({location_id, onClose}) {
  
  const dispatch = useDispatch();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [dateTimeType, setDateTimeType] = useState('datetime');
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    reloop_indempotency = generateKey();
  }, []);

  const handleScheduleDate = (date, time) => {

    let datetime = date;    
    
    var userParam = getPostParameter(currentLocation);
    let postData = {
      location_id: location_id,
      day_option: 'another_date',
      selected_date: datetime,
      selected_time: time,
      user_local_data: userParam.user_local_data,
    };
    
    callReloop(postData);
    setIsDateTimePickerVisible(false);

  };

  const callReloop = (postData) => {

    if(!isLoading){
      setIsLoading(true);      
      PostRequestDAO.find(0, postData , 'reloop' , 'location-info/reloop' , '' , '' , reloop_indempotency , dispatch).then((res) => {        
        setMessage(res.message);
        setIsConfirmModal(true);
        setIsLoading(false);        
      }).catch((error) => {
        setMessage('Failed');
        setIsConfirmModal(true);
        expireToken(dispatch, error);
        setIsLoading(false);
      });
    }    
  }  

  return (
    <ScrollView style={styles.refreshSliderContainer}>
      <AlertDialog
        visible={isConfirmModal}
        onModalClose={() => {
          setIsConfirmModal(false);
          dispatch({type: SUB_SLIDE_STATUS, payload: false});
        }}
        message={message}></AlertDialog>

      <TouchableOpacity
        style={{padding: 6}}
        onPress={() => dispatch({type: SLIDE_STATUS, payload: false})}>
        <Divider />
      </TouchableOpacity>

      <View style={styles.sliderHeader}>
        <Title style={{fontFamily: Fonts.primaryBold}}>Re-loop</Title>
        <TouchableOpacity
          onPress={() => {
            console.log('button close');
            dispatch({type: SUB_SLIDE_STATUS, payload: false});
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
        text="Later Today"
        onPress={() => {
          var userParam = getPostParameter(currentLocation);
          let postDate = {
            location_id: location_id,
            day_option: 'today',
            selected_date: '',
            selected_time: '',
            user_local_data: userParam.user_local_data,
          };

          callReloop(postDate);

        }}
      />

      <FilterButton
        text="Schedule Date"
        onPress={() => {
          if(!isLoading){
            setIsDateTimePickerVisible(true)
          }
          
        }}
      />

      {/* <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode={dateTimeType}
        onConfirm={handleScheduleDate}
        onCancel={() => {setIsDateTimePickerVisible(false)}}
      /> */}

      <DatetimePickerView
        visible={isDateTimePickerVisible}
        value={''}
        mode={'datetime'}
        onModalClose={() => {
          setIsDateTimePickerVisible(false);
        }}
        close={(date, time) => {
          console.log('date', date);
          if (date.length > 0) {
            handleScheduleDate(date.replace('/', '-').replace('/', '-'), time);
          }
          setIsDateTimePickerVisible(false);
        }}
      />
    </ScrollView>
  );
}

const perWidth = setWidthBreakpoints(breakPoint);

const styles = EStyleSheet.create(
  parse({
    refreshSliderContainer: {
      backgroundColor: Colors.bgColor,
    },
    sliderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
  }),
);
