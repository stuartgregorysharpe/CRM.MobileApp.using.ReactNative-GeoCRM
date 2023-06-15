import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,  
  Modal,  
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {Button, Title } from 'react-native-paper';
import Colors, {whiteLabel} from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Divider from './Divider';
import DatePicker from 'react-native-modern-datepicker';
import SvgIcon from './SvgIcon';
import {SubmitButton} from './shared/SubmitButton';
import { style} from '../constants/Styles';
import {TimePicker} from './TimePicker';
import {getTwoDigit} from '../constants/Helper';

export const DateStartEndTimePickerView = props => {
  const { visible, mode, onModalClose, close, value, title} = props;

  const [items, setItems] = useState([]);
  const [options, setOptions] = useState([]);
  const [date, setSelectedDate] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startHour, setStartHour] = useState('00');
  const [startMin, setStartMin] = useState('00');
  const [endHour, setEndHour] = useState('00');
  const [endMin, setEndMin] = useState('00');

  useEffect(() => {
    setStartTime(startHour + ':' + startMin);
    setEndTime(getEndHour(startHour, startMin) + ':' + getEndMin(startMin));
  }, []);

  const getEndHour = (hour, min) => {
    if (hour !== '') {
      if (parseInt(min) + 30 >= 60) {
        return getTwoDigit(parseInt(hour) + 1);
      } else {
        return getTwoDigit(parseInt(hour));
      }
    }
  };

  const getEndMin = min => {
    if (min !== '') {
      if (parseInt(min) + 30 >= 60) {
        return getTwoDigit(parseInt(min) + 30 - 60);
      } else {
        return getTwoDigit(parseInt(min) + 30);
      }
    }
  };

  return (
    // <TouchableWithoutFeedback onPress={onModalClose}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onModalClose}>
      <TouchableWithoutFeedback onPress={onModalClose}>
        <View style={[style.centeredView]}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={[style.modalView]}>
              <TouchableOpacity style={{padding: 6}}>
                <Divider />
              </TouchableOpacity>

              <View style={styles.sliderHeader}>
                <Title
                  style={{
                    fontFamily: Fonts.primaryBold,
                    fontSize: 16,
                    color: Colors.blackColor,
                  }}>
                  {title}
                </Title>
                <Button
                  labelStyle={{
                    fontFamily: Fonts.primaryRegular,
                    letterSpacing: 0.2,
                  }}
                  color={Colors.selectedRedColor}
                  uppercase={false}
                  onPress={async () => {
                    onModalClose();
                  }}>
                  Clear
                </Button>
              </View>

              {(mode === 'date' || mode === 'datetime') && (
                <DatePicker
                  nextSvg={
                    <SvgIcon
                      icon="Calendar_Previous"
                      width="23px"
                      height="23px"
                    />
                  }
                  prevSvg={
                    <SvgIcon icon="Calendar_Next" width="23px" height="23px" />
                  }
                  options={{
                    backgroundColor: Colors.bgColor,
                    textHeaderColor: whiteLabel().mainText,
                    textDefaultColor: Colors.blackColor,
                    selectedTextColor: whiteLabel().selectedTextColor,
                    mainColor: whiteLabel().itemSelectedBackground,
                    textSecondaryColor: whiteLabel().mainText,
                    //borderColor: 'rgba(122, 146, 165, 0.1)',
                  }}
                  selected={value}
                  mode="calendar"
                  onSelectedChange={date => {
                    setSelectedDate(date);
                    setStartDate(date);
                    setEndDate(date);
                  }}
                />
              )}

              {(mode === 'time' || mode === 'datetime') && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: mode === 'time' ? 15 : 0,
                  }}>
                  <TimePicker
                    title="Start Time"
                    initHour={startHour}
                    initMin={startMin}
                    initAP=""
                    onChanged={(hour, min, ap) => {
                      console.log('hour', hour);
                      console.log('min', min);
                      setStartHour(hour);
                      setStartMin(min);
                      setEndHour(getEndHour(hour, min));
                      setEndMin(getEndMin(min));

                      setStartTime(hour + ':' + min);
                      setEndTime(getEndHour(hour, min) + ':' + getEndMin(min));
                    }}></TimePicker>
                  <View style={{width: 5}}></View>
                  <TimePicker
                    title="End Time"
                    initHour={endHour}
                    initMin={endMin}
                    initAP=""
                    onChanged={(hour, min, ap) => {
                      setEndHour(hour);
                      setEndMin(min);
                      setEndTime(hour + ':' + min);
                    }}></TimePicker>
                </View>
              )}

              <View
                style={{
                  marginBottom: 10,
                  marginTop: 10,
                  width: Dimensions.get('window').width * 0.94,
                }}>
                <SubmitButton                  
                  onSubmit={() => {
                    close(startDate, endDate, startTime, endTime);
                  }}
                  title="Submit"></SubmitButton>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.bgColor,
    elevation: 2,
    zIndex: 20,
    padding: 10,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  timeTitleStyle: {
    fontSize: 11,
    color: Colors.blackColor,
  },
  textInput: {
    height: 25,
    fontSize: 12,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 0,
  },
});
