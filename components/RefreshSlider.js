import React , {useState} from 'react';
import { View, TouchableOpacity, ScrollView, Dimensions , Text} from 'react-native';
import { Title, Button } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import { useDispatch } from 'react-redux';
import Divider from './Divider';
import FilterButton from './FilterButton';
import { PRIMARY_COLOR, TEXT_COLOR, BG_COLOR } from '../constants/Colors';
import { breakPoint } from '../constants/Breakpoint';
import { SLIDE_STATUS, SUB_SLIDE_STATUS } from '../actions/actionTypes';
import Fonts from '../constants/Fonts';
import { postReloop } from '../actions/location.action';
import uuid from 'react-native-uuid';
import { getTwoDigit, notifyMessage } from '../constants/Consts';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function RefreshSlider({location_id, onClose}) {
  const dispatch = useDispatch();

  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [dateTimeType, setDateTimeType] = useState("datetime");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleScheduleDate = (date) => {
    console.log("handle schedule date");
    let datetime = "";
    let time = "";
    if (dateTimeType == "date") {
      datetime = String(date.getFullYear()) + "-" + getTwoDigit(date.getMonth() + 1) + "-" + String(date.getDate());
    } else if (dateTimeType == "datetime") {
      datetime = String(date.getFullYear()) + "-" + getTwoDigit(date.getMonth() + 1) + "-" + String(date.getDate());
      time =  String(date.getHours()) + ":" + String(date.getMinutes());
    }
    if(dateTimeType == "date"){      
      setDateTimeType("time");
      setIsDateTimePickerVisible(false);
      setIsDateTimePickerVisible(true);
      //notifyMessage(datetime);
    }else{
      setIsDateTimePickerVisible(false);
      //notifyMessage(datetime);      
    }

    console.log("date", datetime);
    console.log("time", time);
    let postDate ={
      location_id: location_id,
      day_option: "another_date",
      selected_date: datetime,
      selected_time: time
    };
    postReloop(postDate ,  uuid.v4()).then((res) => { notifyMessage("Success") }).catch((error) => { notifyMessage("Error")});
  }
  return (
    <ScrollView style={styles.refreshSliderContainer}>

    <TouchableOpacity style={{ padding: 6 }} onPress={() => dispatch({type: SLIDE_STATUS, payload: false})}>
      <Divider />
    </TouchableOpacity>

    <View style={styles.sliderHeader}>
      <Title style={{ fontFamily: Fonts.primaryBold }}>Re-loop</Title>

      <TouchableOpacity       
        onPress={() => {
          console.log("button close");
            dispatch({type: SUB_SLIDE_STATUS, payload: false});
        }}>
        <Text style={{ color:"#DC143C" , paddingRight:20, paddingLeft:20, paddingTop:20, paddingBottom:10}}>Close</Text>
      </TouchableOpacity>      
    </View>

    <FilterButton 
      text="Later Today" 
      onPress={() => {
        let postDate ={
          location_id: location_id,
          day_option: "today",
          selected_date: "",
          selected_time: ""
        };
        postReloop(postDate ,  uuid.v4()).then((res) => { notifyMessage("Success") }).catch((error) => { notifyMessage("Error")});
      
      }}
    />
    <FilterButton 
      text="Schedule Date" 
      onPress={() => setIsDateTimePickerVisible(true)}
    />

    <DateTimePickerModal
      isVisible={isDateTimePickerVisible}
      mode={dateTimeType}
      onConfirm={handleScheduleDate}
      onCancel={() => {setIsDateTimePickerVisible(false)}}
    />

    </ScrollView>
  )
}

const perWidth = setWidthBreakpoints(breakPoint);

const styles = EStyleSheet.create(parse({
  transitionView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: BG_COLOR,
    elevation: 2,
    zIndex: 100,
    padding: 10,
    overflow: "visible" 
  },
  refreshSliderContainer: {
    backgroundColor: BG_COLOR    
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
}));
