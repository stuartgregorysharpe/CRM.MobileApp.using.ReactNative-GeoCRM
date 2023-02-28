import { StyleSheet, View } from 'react-native'
import React , { useState , useEffect } from 'react'
import DatePicker from 'react-native-modern-datepicker';
import SvgIcon from '../../../../components/SvgIcon';
import Colors, { whiteLabel } from '../../../../constants/Colors';
import { TimePicker } from '../../../../components/TimePicker';
import { getTwoDigit } from '../../../../constants/Helper';
import { getCurrentDate } from '../../../../helpers/formatHelpers';

const CalendarDateTimeView = ( props ) => {

    const { initialDate , schedule_time, updateScheduleData } = props;

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
      if(schedule_time && schedule_time.includes('-')){
        const splited = schedule_time.split('-');
        if (splited.length == 2) {
          
          const start_time = splited[0];
          const end_time = splited[1];
          
          setStartTime(start_time.trim());
          setEndTime(end_time.trim());

          if(start_time){
            const hm = start_time.split(':');
            if(hm.length == 2){
              setStartHour(hm[0].trim());
              setStartMin(hm[1].trim());
            }
          }

          if(end_time){
            const hm = end_time.split(':');
            if(hm.length == 2){
              setEndHour(hm[0].trim());
              setEndMin(hm[1].trim());
            }
          }
        }
      }
    }, [schedule_time]);
    
  
  const getStartHour = (hour , min )  => {
    if (hour !== '' && min != '') {
      if (parseInt(min) - 30 > 0 ) {
        return getTwoDigit(parseInt(hour) );
      } else {
        if(parseInt(hour) > 1){
          return getTwoDigit(parseInt(hour) - 1);
        }else{
          return '00'
        }        
      }
    }
  }

  const getStartMin = ( hour,  min ) => {
    if (hour != '' && min !== '') {
      if (parseInt(min) - 30 > 0 ) {
        return getTwoDigit(parseInt(min) - 30 );
      } else {
        if(parseInt(hour) > 1){
          return getTwoDigit( 60 + parseInt(min) - 30);
        }else{
          return '00';
        }        
      }
    }
  }


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

  const updateHourMin = (startHour, startMin, endHour , endMin , which ) => {

    if( startMin != '' && endMin != '' && startHour != '' && endHour != '' && (parseInt(startHour) > parseInt(endHour) || parseInt(startHour) == parseInt(endHour) && parseInt(startMin) >= parseInt(endMin))){
      if(which == 'start'){
        setEndHour(getEndHour(startHour, startMin));
        setEndMin(getEndMin(startMin));      
        const end_time = getEndHour(startHour, startMin) + ':' + getEndMin(startMin);
        setEndTime(end_time); 
        updateScheduleData(date , startTime, end_time );
      }else{
        console.log("wich", which , endHour, endMin);
        setStartHour(getStartHour(endHour, endMin));        
        setStartMin(getStartMin( endHour, endMin));      
        const start_time = getStartHour(endHour, endMin) + ':' + getStartMin(endHour , endMin);
        console.log("start" , start_time)
        setStartTime(start_time); 
        updateScheduleData(date , start_time, endTime );
      }
      
    }

  }

  return (      
        <View>
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
                          
                }}

                selected={initialDate}
                minimumDate={getCurrentDate()}
                mode="calendar"
                onSelectedChange={date => {
                    setSelectedDate(date);
                    setStartDate(date);
                    setEndDate(date);
                    updateScheduleData(date , startTime, endTime);
                }}
            />
              
            <View
                  style={{                      
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginHorizontal: 10                    
                  }}>
                  
                  <TimePicker
                    title="Start Time"
                    initHour={startHour}
                    initMin={startMin}
                    initAP=""
                    onChangedHour={(hour , min) => {                          
                      updateHourMin(hour, min, endHour, endMin , 'start');
                    }}
                    onChangedMin={(hour, min) => {
                      updateHourMin(hour, min, endHour, endMin , 'start');                      
                    }}

                    onChanged={(hour, min, ap , type) => {
                      setStartHour(hour);
                      setStartMin(min);                      
                      setStartTime(hour + ':' + min);
                      if(type === 'arrow'){
                        updateHourMin(hour, min, endHour, endMin , 'start');
                      }
                    }}></TimePicker>

                    <View style={{width: 5}}></View>
                        
                    <TimePicker
                        title="End Time"
                        initHour={endHour}
                        initMin={endMin}
                        initAP=""
                        
                        onChangedHour={(hour , min) => {                          
                          updateHourMin(startHour, startMin, hour, min , 'end');
                        }}
                        onChangedMin={(hour, min) => {
                          updateHourMin(startHour, startMin, hour, min , 'end');  
                        }}

                        onChanged={(hour, min, ap , type) => {
                          setEndHour(hour);
                          setEndMin(min);
                          setEndTime(hour + ':' + min);
                          if(type === 'arrow'){
                            updateHourMin(startHour, startMin, hour, min , 'end');
                          }
                    }}></TimePicker>

            </View>
              
    </View>
  )
}

export default CalendarDateTimeView

const styles = StyleSheet.create({})