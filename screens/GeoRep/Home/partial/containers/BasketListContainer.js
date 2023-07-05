

import { View, TouchableOpacity } from 'react-native'
import React , { useState, useEffect , useRef, forwardRef ,useImperativeHandle } from 'react'
import BasketSyncProgress from '../components/BasketSyncProgress'
import { deleteRecords, handleRecords } from '../../../../../sqlite/DBHelper'
import { offlineDBVersion, Strings } from '../../../../../constants'
import { AppText } from '../../../../../components/common/AppText'
import Colors, { whiteLabel } from '../../../../../constants/Colors'
import { getBascketLastSyncTableData, getTableRecords, insertBascketLastSync } from '../../../../../sqlite/BascketLastSyncsHelper'
import * as RNLocalize from 'react-native-localize';
import SvgIcon from '../../../../../components/SvgIcon'
import { RotationAnimation } from '../../../../../components/common/RotationAnimation'
import { getBasketDateTime, getDateTimeFromBasketTime } from '../../../../../helpers/formatHelpers'
import { getBaskets } from './helper'
import { useDispatch , useSelector} from 'react-redux'
import { expireToken } from '../../../../../constants/Helper'
import { CHANGE_SYNC_START } from '../../../../../actions/actionTypes'
import GetRequestSyncTableData from '../../../../../DAO/sync/GetRequestSyncTableData'
import GetRequestSyncTables from '../../../../../DAO/sync/GetRequestSyncTables'
import AlertModal from '../../../../../components/modal/AlertModal'

var gSyncedRecords = 0;
var gBascketLists = getBaskets();
var isOneBasketSync = false;

export const BasketListContainer = forwardRef((props, ref) => {

    const [totalTableCount, setTotalTableCount] = useState(0);
    const [syncedTableCount, setSyncedTableCount] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [syncedRecords, setSyncedRecords] = useState(0); 
    const [isLoading, setIsLoading] = useState(false);
    const [currentBasket, setCurrentBasket] = useState("");
    const rotationAnimationRef = useRef();
    const alertModalRef = useRef();
    const [basketLists, setBasketLists] = useState(gBascketLists != undefined && gBascketLists.length > 0 ? basketLists : []);    
    const offlineStatus = useSelector(state => state.auth.offlineStatus);
    var lists = getBaskets();
    const dispatch = useDispatch();

    useImperativeHandle(ref, () => ({
        startSync(message) {
            isOneBasketSync = false;
            setBasketLists(getBaskets());
            syncTable(0 , message);
        },
        expand() {
            initDataFromDB();
        }
    }));

    useEffect(() => {
        setBasketLists(getBaskets());
    }, []);

    useEffect(() =>{
        if(basketLists != undefined && basketLists.length > 0){
            gBascketLists = basketLists;
        }
    }, [basketLists])

    const initDataFromDB = async() => {               
        var tmp = await Promise.all(
            lists.map(async (element, index) => {                    
                var res  =  await getBascketLastSyncTableData(element.slug);                
                var title = '';
                if(res.length > 0){                                                
                    title =  res.item(0).timestamp;
                }                  
                var tmp = {title: element.title, slug: element.slug, isLoading: false, lastSyncedDate:title};
                return tmp;
            })
        );
        setBasketLists(tmp);
        gBascketLists = tmp;
    }

    const updateBasket = (basket) => {
        var tmp =[];
        var currentTime = getBasketDateTime();
        gBascketLists.forEach((element) => {            
            if(element.slug === basket){
                tmp.push({ title:element.title , slug:element.slug , isLoading: isOneBasketSync ? true : false , lastSyncedDate:currentTime });
            }else{
                tmp.push({ title:element.title , slug:element.slug , isLoading: isOneBasketSync ? false : element.isLoading , lastSyncedDate:element.lastSyncedDate });
            }
        });        
        setBasketLists(tmp);        
        gBascketLists = tmp;
    }
         

    const syncTable = (basketId , message) => {        
        if(!isLoading){
            
            dispatch({type: CHANGE_SYNC_START , payload: true });
            var basket = lists[basketId].slug;
            setCurrentBasket(basket);
            setIsLoading(true);
            setSyncedRecords(0);
            setTotalRecords(0);
            setSyncedTableCount(0);
            setTotalTableCount(0);
            gSyncedRecords = 0;
    
            if(!isOneBasketSync && props.updateLoading){
                props.updateLoading(true)
            }
            if(isOneBasketSync){
                updateBasket(basket)
            }

            GetRequestSyncTables.find(offlineDBVersion , basket).then(async (res) => {
                if(res == 'offline'){
                    cancelSync();
                }else{
                    if(res.status === Strings.Success){
                        var tables = res.tables;
                        console.log("All tables", tables)                
                        if(tables != null && tables.length > 0){
                            setTotalTableCount(tables.length);
                            const tName = tables[0];
                            var lastSynced = await getTimeStampAndTimeZone( basket , tName);
                            await syncTableData(tables, 0 , 0, basket , lastSynced);
                        }else{
                            await saveSyncedStatusTable(basket);                    
                            if(isOneBasketSync){
                                initDataFromDB();
                                setIsLoading(false);
                                dispatch({type: CHANGE_SYNC_START , payload: false });
                                if(props.changeIsManual){
                                    props.changeIsManual(true)
                                }
                            }
                        }
                        
                        if(!isOneBasketSync){
                            if(basketId + 1 < lists.length){      
                                updateBasket(basket);
                                syncTable(basketId + 1 , message);                        
                            }else{                  
    
                                setCurrentBasket('');
                                setIsLoading(false);
                                dispatch({type: CHANGE_SYNC_START , payload: false });
                                if(props.changeIsManual){
                                    props.changeIsManual(true)
                                }
                                await saveSyncedStatusTable("sync_all");
                                updateBasket(basket);
                                if(props.updateLoading){
                                    props.updateLoading(false);
                                }
                                if(message != '' && message != null){
                                    if(alertModalRef.current){
                                        alertModalRef.current.alert(message);
                                    }                                    
                                }                                
                            }
                        }
                    }
                }   
            }).catch(e => {
                expireToken(dispatch, e , alertModalRef );
                dispatch({type: CHANGE_SYNC_START , payload: false });
                if(props.changeIsManual){
                    props.changeIsManual(true)
                }
            });
            
        }        
    }

    const syncTableData = async (tables , key , pageNumber, basket , lastSyncedParam ) => {    

        var tableName = tables[key];  
        if(tableName != undefined){

            await GetRequestSyncTableData.find(offlineDBVersion , tableName , pageNumber , lastSyncedParam).then( async(res) => {
                if(res == 'offline'){
                    cancelSync();
                }else{
                    console.log("Table Record Length", res.records.length);
                    console.log("Page Number" , pageNumber);
                    console.log("Total Page Number", res.total_pages);
    
                    if(lastSyncedParam != null && lastSyncedParam != ""){
                        console.log("delete previous ones");
                        await deleteRecords(tableName, res.records);
                    }                
                    
                    await handleRecords(tableName, res.records);
    
                    setTotalRecords(res.total_records);            
                    gSyncedRecords = gSyncedRecords + res.records.length;
                    setSyncedRecords( gSyncedRecords );
                    if(pageNumber + 1 < res.total_pages){                    
                        await syncTableData(tables , key, pageNumber + 1, basket , lastSyncedParam);
                    }else{
                        if(key + 1 < tables.length){
                            const tName = tables[key + 1];
                            const lastSynced = await getTimeStampAndTimeZone( basket , tName);
                            setSyncedTableCount(key + 1);
                            gSyncedRecords = 0;                    
                            await syncTableData(tables , key + 1 , 0 , basket , lastSynced );
                        }else{
                            setSyncedTableCount(key + 1);
                            setSyncedRecords(totalRecords);                        
                            saveSyncedStatusTable(basket);
                            if(isOneBasketSync){
                                initDataFromDB();
                                setIsLoading(false);
                            }                        
                        }
                    }
                }
                
            }).catch((e) => {
                console.log("sync-table-data api error", e);                
                expireToken(dispatch, e , alertModalRef);
            });                        
        }            
    }

    const saveSyncedStatusTable = async(basket) => {
        var time_zone = RNLocalize.getTimeZone();
        var currentTime = getBasketDateTime();
        await insertBascketLastSync(basket, currentTime, time_zone );
    }

    const cancelSync = () => {
        setIsLoading(false);
        dispatch({type: CHANGE_SYNC_START , payload: false });
        if(props.onClosed){
            props.onClosed();
        }
    }

    const getTimeStampAndTimeZone = async(basket , tableName) =>{

        var tableRecords = await getTableRecords(tableName);
        if(tableRecords.length == 0 ){
            return '';
        }else{
            var check = await getBascketLastSyncTableData(basket);
            if(check.length == 0 ){
                return '';
            }else{
                if(check.length > 0){                
                    var timestamp =  check.item(0).timestamp;
                    var timezone = check.item(0).timezone;                
                    var convertedTime = getDateTimeFromBasketTime(timestamp);
                    return `&timestamp=${convertedTime}&timezone=${timezone}`;
                }                  
            }
        }                
    }    
    
    const renderSyncData = (item, index) => {
        return (
            <View key={index}>
                <View style={{flexDirection:'row', marginTop:5, marginBottom:5, marginLeft:5, alignItems:'center'}}>
                    <View style={{flex:1}}>
                        <AppText type="secondaryBold" title={item.title} color={whiteLabel().mainText} style={{fontSize:11}}></AppText>                    
                    </View>
                    <View style={{flex:3}}>
                        {
                            item.isLoading && <AppText title={ item.slug != currentBasket ? "Pending..." :  ''} color={Colors.disabledColor} style={{fontSize:11}}></AppText>
                        }
                        {
                            !item.isLoading && <AppText title={item.lastSyncedDate} color={Colors.disabledColor} style={{fontSize:11}}></AppText>
                        }
                    </View>

                    {
                        !item.isLoading && item.lastSyncedDate != undefined && item.lastSyncedDate != '' &&
                        <SvgIcon icon="Check_Circle" width='16' height='16' style={{marginRight:10}} />           
                    }
                    {
                        !item.isLoading && item.lastSyncedDate != undefined && item.lastSyncedDate != '' &&
                        <TouchableOpacity onPress={() => {
                            if(!isLoading){
                                if(offlineStatus){
                                    if(props.showNotAvailableModal){
                                        props.showNotAvailableModal()
                                    }
                                }else{
                                    isOneBasketSync = true;
                                    syncTable(index , '');
                                }                            
                                
                            }                            
                        }}>
                            <View style={{backgroundColor:whiteLabel().actionFullButtonBackground , borderRadius:5, marginLeft:5 }}>           
                                <SvgIcon icon="Sync" width='35' height='35' />
                            </View>
                        </TouchableOpacity>
                    }                          
                    {                        
                        item.isLoading &&  item.slug != currentBasket && <RotationAnimation ref={rotationAnimationRef} style={{width:35,height:35}} />
                    }              
                </View>

                {
                    isLoading && item.slug === currentBasket &&
                    <BasketSyncProgress  
                        totalTableCount={totalTableCount }
                        syncedTableCount={syncedTableCount }
                        totalRecords={totalRecords}
                        syncedRecords={ syncedRecords}                        
                        isLoading={isLoading}                        
                    />
                }
            </View>
        )
    }

    return (
        <View style={{paddingHorizontal:10, marginTop:10}}>
            <AlertModal ref={alertModalRef} />
            {
                basketLists && basketLists.map((item, index) => {
                    return renderSyncData(item, index)
                })
            }
        </View>        
    )
});
