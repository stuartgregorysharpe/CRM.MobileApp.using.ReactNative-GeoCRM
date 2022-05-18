
import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import Bar from './Bar'

export default function WeeklyBar({graph}) {

  useEffect(() => {
    console.log("sdfsdf",[ parseInt(graph.monday.remaining) , parseInt(graph.monday.missed), parseInt(graph.monday.additional), parseInt(graph.monday.completed)])
  }, []);
  return (
    <View style={{justifyContent:'space-between' , flexDirection:'row', paddingHorizontal:10, marginTop:10 , height:130}}>      
        <Bar data={graph.monday} title="Mon" maxValue={15} values={[ parseInt(graph.monday.remaining) , parseInt(graph.monday.missed), parseInt(graph.monday.additional), parseInt(graph.monday.completed)]} ></Bar>
        <Bar data={graph.tuesday}  title="Tue" maxValue={15} values={[ parseInt(graph.tuesday.remaining) , parseInt(graph.tuesday.missed), parseInt(graph.tuesday.additional), parseInt(graph.tuesday.completed)]} ></Bar>
        <Bar data={graph.wednesday}  title="Wen" maxValue={15} values={[ parseInt(graph.wednesday.remaining) , parseInt(graph.wednesday.missed), parseInt(graph.wednesday.additional), parseInt(graph.wednesday.completed)]} ></Bar>
        <Bar data={graph.thursday}  title="Thur" maxValue={15} values={[ parseInt(graph.thursday.remaining) , parseInt(graph.thursday.missed), parseInt(graph.thursday.additional), parseInt(graph.thursday.completed)]} ></Bar>
        <Bar data={graph.friday}  title="Fri" maxValue={15} values={[ parseInt(graph.friday.remaining) , parseInt(graph.friday.missed), parseInt(graph.friday.additional), parseInt(graph.friday.completed)]} ></Bar>
        <Bar data={graph.saturday}  title="Sat" maxValue={15} values={[ parseInt(graph.saturday.remaining) , parseInt(graph.saturday.missed), parseInt(graph.saturday.additional), parseInt(graph.saturday.completed)]} ></Bar>
        <Bar data={graph.sunday}  title="Sun" maxValue={15} values={[ parseInt(graph.sunday.remaining) , parseInt(graph.sunday.missed), parseInt(graph.sunday.additional), parseInt(graph.sunday.completed)]} ></Bar>
    </View>
  )
}