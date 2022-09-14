import { View } from 'react-native'
import React , {useState , useEffect} from 'react'
import { Constants } from '../../../../../constants';
import OfflineSyncModalView from '../components/OfflineSyncModalView';
import { syncPostData } from '../../../../../services/SyncDatabaseService/PostSyncTable';

const ViewOfflineSyncModalContainer = props => {
    
    const [typeLists, setTypeLists] = useState([
        {label:'Location Visits' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false } , 
        {label:'Forms' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false} , 
        {label:'Product Orders' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false} ,
        {label:'Add Locations' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false}
    ]);

    const [isStart, setIsStart] = useState(false);
    const [currentSyncItem, setCurrentSyncItem] = useState(-1);
    const [processValue, setProcessValue] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [syncBtnTitle , setSyncBtnTitle] = useState("Sync All Items");
    const [isActive,setIsActive] = useState(true);
    
    useEffect(() => {
        var tmp = [];        
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
        setTypeLists(tmp);
    }, [currentSyncItem])
    
    const addData = (value) => {    
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }

    const syncData = async(lists, index) => {
        setCurrentSyncItem(index);
        setTotalValue(0);
        var res = await syncPostData(lists[index].label, ( processValue ,  totalValue ) => {            
            setProcessValue(processValue);
            setTotalValue(totalValue);            
        });      
        if(index < lists.length - 1){           
            await syncData(lists, index + 1);
        }else{
            setCurrentSyncItem(index + 1);
            setIsStart(false);
            setIsActive(false);
        }
    }

    const startSync = () => {       
        setIsStart(true); 
        syncData(typeLists, 0);                
    }
    
    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            <OfflineSyncModalView
                onButtonAction={addData}                
                typeLists={typeLists}                
                isSyncStart={isStart}        
                currentSyncItem={currentSyncItem}        
                processValue={processValue}
                totalValue={totalValue}
                startSync={startSync}
                syncBtnTitle={syncBtnTitle}
                isActive={isActive}
                {...props}
            />
        </View>
    )
}

export default ViewOfflineSyncModalContainer;
