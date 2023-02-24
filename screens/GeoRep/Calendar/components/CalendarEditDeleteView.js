import { View } from 'react-native'
import React , { useState } from 'react'
import LocationInfoView from './LocationInfoView'
import CalendarDateTimeView from './CalendarDateTimeView';
import { SubmitButton } from '../../../../components/shared/SubmitButton';
import { whiteLabel } from '../../../../constants/Colors';

const CalendarEditDeleteView = (props) => {

  const { location , onDelete, onEdit } = props;

  const [schedule_date , setScheduleDate] = useState('');
  const [schedule_time, setScheduleTime] = useState('');
  const [end_time , setEndTime] = useState('');

  const updateScheduleData = (date, start_time, end_time) => {
    setScheduleDate(date);
    setScheduleTime(start_time);
    setEndTime(end_time)
  }
  
  return (
    <View style={{alignSelf:'stretch'}}>

        <LocationInfoView location={location} />

        <CalendarDateTimeView 
          initialDate={location?.schedule_date}
          schedule_time={location?.schedule_time}
          mode='time'
          updateScheduleData={(date, start_date, end_date) => {
            updateScheduleData(date, start_date, end_date);
          }}
        />

        <View style={{flexDirection:'row', marginHorizontal:10,marginTop:10, marginBottom: 20}}>
          <SubmitButton 
            onSubmit={() => onDelete() }
            title='Delete' style={{flex:1 , backgroundColor: whiteLabel().endDayBackground , marginRight:5 }} />
          <SubmitButton 
            onSubmit={() => onEdit({schedule_date: schedule_date, schedule_time: schedule_time, end_time: end_time}) }
            title='Save' style={{flex:1, marginLeft:5}}/>
        </View>
        
    </View>
  )
}

export default CalendarEditDeleteView