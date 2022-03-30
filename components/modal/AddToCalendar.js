import React , {useState} from 'react';
import { View, TouchableOpacity, ScrollView, Dimensions , Text} from 'react-native';
import { Title } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import { useDispatch } from 'react-redux';
import Divider from '../Divider';
import FilterButton from '../FilterButton';
import Colors from '../../constants/Colors';
import { breakPoint } from '../../constants/Breakpoint';
import { SLIDE_STATUS } from '../../actions/actionTypes';
import Fonts from '../../constants/Fonts';
import AlertDialog from './AlertDialog';
import { addCalendar } from '../../actions/calendar.action';
import { DateStartEndTimePickerView } from '../DateStartEndTimePickerView';
import { DatetimePickerView } from '../DatetimePickerView';
import { expireToken } from '../../constants/Consts';
import { Notification } from './Notification';


export default function AddToCalendar({selectedItems, onClose}) {
  const dispatch = useDispatch();

  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [isStartEndTimePicker, setStartEndTimePicker] = useState(false);
  const [dateTimeType, setDateTimeType] = useState("date");  
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleScheduleDate = (date) => {    
    let datetime = date;
    let time = "";    
    //datetime = String(date.getFullYear()) + "-" + getTwoDigit(date.getMonth() + 1) + "-" + String(date.getDate());
    //time =  String(date.getHours()) + ":" + String(date.getMinutes());    
    //setIsDateTimePickerVisible(false);

    if(selectedItems != undefined){
      selectedItems.forEach((item, index) => {                            
        item.schedule_order = (index + 1).toString();
        item.schedule_date = datetime;                                          
      });        
      
      let postDate ={
        schedules:selectedItems
      };
      console.log(postDate);
      callApi(postDate);
    }
  }

  const callApi = (postDate) =>{
    addCalendar(postDate)
    .then((res) =>{    
      setStartEndTimePicker(false);      
      setMessage(res);
      setIsConfirmModal(true);
    })
    .catch((error) => {
      console.log(error);
      expireToken(dispatch, error);
      setMessage(error.toString());
      setIsConfirmModal(true);

    })   
  }

  return (

    <ScrollView style={styles.refreshSliderContainer}>
                
      <Notification/> 
      <TouchableOpacity style={{ padding: 6 }} onPress={() => dispatch({type: SLIDE_STATUS, payload: false})}>
        <Divider />
      </TouchableOpacity>

      <View style={styles.sliderHeader}>
        <Title style={{ fontFamily: Fonts.primaryBold }}>Add to Calendar</Title>
        <TouchableOpacity       
          onPress={() => {            
            onClose();
          }}>
          <Text style={{ color:Colors.selectedRedColor , paddingRight:20, paddingLeft:20, paddingTop:20, paddingBottom:10}}>Close</Text>
        </TouchableOpacity>      
      </View>

      <FilterButton 
        text="Today" 
        onPress={() => {          
          if(selectedItems.length === 1){
            setDateTimeType("time");
            setStartEndTimePicker(true);
          }else{
            if(selectedItems != undefined){            
              selectedItems.forEach((item, index) => {                            
                item.schedule_order = (index + 1).toString();
                item.schedule_date = "Today";                                                          
              });            
              let postDate ={
                schedules:selectedItems
              };
              console.log(postDate);
              callApi(postDate);
            }     
          }                                                
        }}
      />

      <FilterButton 
        text="Schedule Date" 
        onPress={() => {
          if(selectedItems.length === 1){
            setDateTimeType("datetime");
            setStartEndTimePicker(true);
          }else{
            setIsDateTimePickerVisible(true);
          }          
        }}
      />

      <DateStartEndTimePickerView
        title = { dateTimeType === "time" ? "Please select time: " : "Please Select date and time:" }
        visible={isStartEndTimePicker}
        onModalClose={() => setStartEndTimePicker(false) }
        mode={dateTimeType}
        close={(startDate, endDate, startTime, endTime ) => {
          selectedItems.forEach((item, index) => {                     
            item.schedule_order = (index + 1).toString();
            if(dateTimeType === "time"){
              item.schedule_date = "Today";  
            }else{              
              item.schedule_date = startDate.replace("/","-").replace("/","-");
            }
            item.schedule_time = startTime;
            item.schedule_end_time = endTime;            
          });            
          let postDate ={
            schedules:selectedItems
          };                    
          callApi(postDate);
        }}
      >
      </DateStartEndTimePickerView>

      <DatetimePickerView 
      visible={isDateTimePickerVisible}
      value={''}
      onModalClose={() =>{
        setIsDateTimePickerVisible(false);
      }}
      close={(date) => {
        if(date.length > 0){
          handleScheduleDate(date.replace("/","-").replace("/","-"))
        }                
        setIsDateTimePickerVisible(false);
      }} ></DatetimePickerView>

      {/* <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode={dateTimeType}
        onConfirm={handleScheduleDate}
        onCancel={() => {setIsDateTimePickerVisible(false)}}
      /> */}

      <AlertDialog visible={isConfirmModal} onModalClose={() => {
          setIsConfirmModal(false);
          onClose();
        } }  message={message}></AlertDialog>  


    </ScrollView>
  )
}

const perWidth = setWidthBreakpoints(breakPoint);

const styles = EStyleSheet.create(parse({  
  refreshSliderContainer: {
    backgroundColor: Colors.bgColor,
    padding:10
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
}));
