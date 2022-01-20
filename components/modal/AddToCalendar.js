import React , {useState} from 'react';
import { View, TouchableOpacity, ScrollView, Dimensions , Text} from 'react-native';
import { Title, Button } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import { useDispatch } from 'react-redux';
import Divider from '../Divider';
import FilterButton from '../FilterButton';
import { PRIMARY_COLOR, TEXT_COLOR, BG_COLOR } from '../../constants/Colors';
import { breakPoint } from '../../constants/Breakpoint';
import { SLIDE_STATUS, SUB_SLIDE_STATUS } from '../../actions/actionTypes';
import Fonts from '../../constants/Fonts';
import { postReloop } from '../../actions/location.action';
import uuid from 'react-native-uuid';
import { getTwoDigit, notifyMessage } from '../../constants/Consts';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AlertDialog from './AlertDialog';
import { addCalendar } from '../../actions/calendar.action';

export default function AddToCalendar({selectedItems, onClose}) {
  const dispatch = useDispatch();

  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [dateTimeType, setDateTimeType] = useState("date");  
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleScheduleDate = (date) => {    
    let datetime = "";
    let time = "";
    datetime = String(date.getFullYear()) + "-" + getTwoDigit(date.getMonth() + 1) + "-" + String(date.getDate());
    //time =  String(date.getHours()) + ":" + String(date.getMinutes());    
    setIsDateTimePickerVisible(false);        

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
      setMessage(res);
      setIsConfirmModal(true)
    })
    .catch((error) => {
      console.log(error);
      setMessage(error.toString());
      setIsConfirmModal(true)
    })   
  }

  return (

    <ScrollView style={styles.refreshSliderContainer}>

      <AlertDialog visible={isConfirmModal} onModalClose={() => {
          setIsConfirmModal(false);
          onClose();
        } }  message={message}></AlertDialog>           
      <TouchableOpacity style={{ padding: 6 }} onPress={() => dispatch({type: SLIDE_STATUS, payload: false})}>
        <Divider />
      </TouchableOpacity>

      <View style={styles.sliderHeader}>
        <Title style={{ fontFamily: Fonts.primaryBold }}>Add to Calendar</Title>
        <TouchableOpacity       
          onPress={() => {
            //console.log("button close");
            //dispatch({type: SUB_SLIDE_STATUS, payload: false});
            onClose();
          }}>
          <Text style={{ color:"#DC143C" , paddingRight:20, paddingLeft:20, paddingTop:20, paddingBottom:10}}>Close</Text>
        </TouchableOpacity>      
      </View>

      <FilterButton 
        text="Today" 
        onPress={() => {


          console.log("selected items" , selectedItems);

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
  refreshSliderContainer: {
    backgroundColor: BG_COLOR,
    padding:10
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
}));
