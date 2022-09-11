import { View } from 'react-native'
import React , {useState , useEffect} from 'react'
import { Constants } from '../../../../../constants';
import ViewOfflineSync from '../components/ViewOfflineSync';
import { syncPostData } from '../../../../../services/SyncDatabaseService/PostSyncTable';

export default function ViewOfflineSyncModalContainer(props) {
    
    const [typeLists, setTypeLists] = useState([
        {label:'Location Visits' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false } , 
        {label:'Forms' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false} , 
        {label:'Product Orders' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false} ,
        {label:'Add Locations' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false}
    ]);

    const [isStart, setIsStart] = useState(false);
    const [currentSyncItem, setCurrentSyncItem] = useState(-1);

    useEffect(() => {
        var tmp = [];
        console.log("currentSyncItem",currentSyncItem);
        typeLists.forEach((item, index) => {
            var element = 
            {
               label:item.label , 
               time: item.subLabel , 
               isStart: index == currentSyncItem ? true : false  , 
               isSynced: index < currentSyncItem ? true : false , 
               isError : false 
            };
            tmp.push(element);
        });
        console.log("updated lists", tmp);
        setTypeLists(tmp);
    }, [currentSyncItem])
    
    const addData = (value) => {    
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }

    const syncData = async(lists, index) => {
        setCurrentSyncItem(index);
        console.log("sync bascket name", lists[index].label)
        var res = await syncPostData(lists[index].label);
        console.log("Sync Data Response: " , res);
        if(index < lists.length - 1){
            console.log("RES", res);
            await syncData(lists, index + 1);
        }else{
            setCurrentSyncItem(-1);
            setIsStart(false);
        }
    }

    const startSync = () => {       
        setIsStart(true); 
        syncData(typeLists, 0);                
    }
    
    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            <ViewOfflineSync
                onButtonAction={addData}                
                typeLists={typeLists}                
                isSyncStart={isStart}        
                currentSyncItem={currentSyncItem}        
                startSync={startSync}
                {...props}
            />
        </View>
    )
}