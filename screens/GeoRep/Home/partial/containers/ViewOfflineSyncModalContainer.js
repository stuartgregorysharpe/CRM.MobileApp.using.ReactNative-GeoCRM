import { View } from 'react-native'
import React , {useState , useEffect} from 'react'
import { Constants, Strings } from '../../../../../constants';
import OfflineSyncModalView from '../components/OfflineSyncModalView';
import { syncPostData } from '../../../../../services/SyncDatabaseService/PostSyncTable';
import { useDispatch } from 'react-redux';
import { clearNotification, showNotification } from '../../../../../actions/notification.action';
import { useSelector } from 'react-redux';
import { CHANGE_SYNC_START } from '../../../../../actions/actionTypes';

const ViewOfflineSyncModalContainer = props => {
        
    const { isManual } = props;
    const [typeLists, setTypeLists] = useState([
        {label:'Location Visits' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false } , 
        {label:'Add Locations' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false},
        {label:'Forms' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false} , 
        {label:'Stock Module' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false} , 
        //{label:'Product Orders' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false} ,        
        {label:'Others' , time: '28 April 2022 18:35' , isStart:false , isSynced: false , isError : false}
    ]);

    const [isStart, setIsStart] = useState(false);
    const [currentSyncItem, setCurrentSyncItem] = useState(-1);
    const [processValue, setProcessValue] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [syncBtnTitle , setSyncBtnTitle] = useState("Sync All Items");
    const [isActive,setIsActive] = useState(true);    
    const offlineStatus = useSelector(state => state.auth.offlineStatus);
    var isHttpError = false;
    var isError = false;
    
    const dispatch = useDispatch()

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
    }, [currentSyncItem]);
    
    useEffect(() => {
        console.log("offlien item sync start", offlineStatus, isManual)
        if(!offlineStatus && !isManual){
            startSync();
        }
    },[offlineStatus , isManual]);
    
    const addData = (value) => {    
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }

    const syncData = async(lists, index) => {
        setCurrentSyncItem(index);
        setTotalValue(0);
        var res = await syncPostData(lists[index].label, ( processValue ,  totalValue , response ) => {            
            if(processValue == -1 && totalValue == -1){ // occured error
                isError = true;
                dispatch(showNotification({type: Strings.Success, message: response.errors , buttonText: Strings.Continue , buttonAction: () => {
                    isError = false;
                    syncData(typeLists, 0);
                    dispatch(clearNotification());
                }}))
            }else if(processValue == -2 && totalValue == -2){
                console.log("http error");                
                isHttpError = true;
            } else {
                setProcessValue(processValue);
                setTotalValue(totalValue);
            }
        });

        if(!isError){
            if(index < lists.length - 1){           
                await syncData(lists, index + 1);
            }else{
                setCurrentSyncItem(index + 1);
                setIsStart(false);
                setIsActive(false);
                // close modal after sync
                console.log(" isHttpError " , isHttpError);
                props.onButtonAction({type: Constants.actionType.ACTION_CLOSE, value: isHttpError ? 'Some items could not be synced, please contact support' : '' });
            }
        }   
    }

    const startSync = () => {       
        setIsStart(true); 
        dispatch({type: CHANGE_SYNC_START , payload: true });
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
                offlineStatus={offlineStatus}
                {...props}
            />
        </View>
    )
}

export default ViewOfflineSyncModalContainer;
