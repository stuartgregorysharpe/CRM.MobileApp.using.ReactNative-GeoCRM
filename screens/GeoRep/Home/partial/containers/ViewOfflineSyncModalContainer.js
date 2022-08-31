

import { View } from 'react-native'
import React , {useState} from 'react'
import { Constants } from '../../../../../constants';
import ViewOfflineSync from '../components/ViewOfflineSync';

export default function ViewOfflineSyncModalContainer(props) {
    
    const [typeLists, setTypeLists] = useState([
        {label:'Location Visits' , time: '28 April 2022 18:35' , isStart:false , isSynced: true , isError : false } , 
        {label:'Forms' , time: '28 April 2022 18:35' , isStart:false , isSynced: true , isError : false} , 
        {label:'Product Orders' , time: '28 April 2022 18:35' , isStart:false , isSynced: true , isError : false} ,
        {label:'Add Locations' , time: '28 April 2022 18:35' , isStart:false , isSynced: true , isError : false}
      ]);
      
    const [detailLists, setDetailLists] = useState([
        {label:'Prospective Client' , address:'1233 Mongo Vald', time: '28 April 2022 18:35'} , 
        {label:'Prospective Client' , address:'1233 Mongo Vald', time: '28 April 2022 18:35'} , 
        {label:'Prospective Client' , address:'1233 Mongo Vald', time: '28 April 2022 18:35'}
    ]);

    const [isStart, setIsStart] = useState(false);
    
    const addData = (value) => {    
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }

    const startSync = () => {       
        setIsStart(true); 
        setTypeLists(
            [
                {label:'Location Visits' , time: '28 April 2022 18:35' , isStart:true , isSynced: false , isError : false} , 
                {label:'Forms' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false} , 
                {label:'Product Orders' , time: '28 April 2022 18:35' , isStart:false , isSynced: false, isError : false} ,
                {label:'Add Locations' , time: '28 April 2022 18:35' , isStart:false , isSynced: false, isError : false}
            ]
        );

        setTimeout(() => {
            setTypeLists(
                [
                    {label:'Location Visits' , time: '28 April 2022 18:35' , isStart:false , isSynced: true , isError : false} , 
                    {label:'Forms' , time: '28 April 2022 18:35' , isStart:true , isSynced: false , isError : false} , 
                    {label:'Product Orders' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false} ,
                    {label:'Add Locations' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false}
                ]
            );
        }, 5000);

        setTimeout(() => {
            setTypeLists(
                [
                    {label:'Location Visits' , time: '28 April 2022 18:35' , isStart:false , isSynced: true , isError : false} , 
                    {label:'Forms' , time: '28 April 2022 18:35' , isStart:false , isSynced: true , isError : false} , 
                    {label:'Product Orders' , time: '28 April 2022 18:35' , isStart:true , isSynced: false , isError : false} ,
                    {label:'Add Locations' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false}
                ]
            );
        }, 10000)
        setTimeout(() => {
            setTypeLists(
                [
                    {label:'Location Visits' , time: '28 April 2022 18:35' , isStart:false , isSynced: true , isError : false} , 
                    {label:'Forms' , time: '28 April 2022 18:35' , isStart:false , isSynced: true , isError : false} , 
                    {label:'Product Orders' , time: '28 April 2022 18:35' , isStart:false , isSynced: true , isError : false} ,
                    {label:'Add Locations' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : true}
                ]
            );
            setIsStart(false); 
        }, 15000)


    }
    
    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            <ViewOfflineSync
                onButtonAction={addData}                
                typeLists={typeLists}
                detailLists={detailLists}
                isStart={isStart}                
                startSync={startSync}
                {...props}
            />
        </View>
    )
}