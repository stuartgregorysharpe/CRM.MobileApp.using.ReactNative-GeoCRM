
import { View, Text , ScrollView, FlatList, Dimensions } from 'react-native'
import React , { useState  , useEffect , useRef } from 'react'
import SyncAll from './../partial/SyncAll'
import CheckOut from './../partial/CheckOut'
import {SubmitButton} from '../../../../components/shared/SubmitButton';
import IndicatorDotScroller from '../../../../components/common/IndicatorDotScroller'
import Colors from '../../../../constants/Colors';
import Visits from '../partial/cards/Visits';
import { useSelector } from 'react-redux'
import { getApiRequest, postApiRequest } from '../../../../actions/api.action';
import ActivityCard from '../partial/cards/ActivityCard';
import { getLocalData, storeLocalValue } from '../../../../constants/Storage';
import { getPostParameter } from '../../../../constants/Helper';
import { Constants } from '../../../../constants';
import OdometerReadingModal from './modal/OdometerReadingModal';
import { updateCurrentLocation } from '../../../../actions/google.action';
import { useDispatch } from 'react-redux';
import { Notification } from '../../../../components/modal/Notification';
import { showNotification } from '../../../../actions/notification.action';

export default function MainPage(props) {

    const dispatch = useDispatch();
    const [isStart, setIsStart] = useState(true);    
    const [startEndDayId, setStartEndDayId] = useState(0);
    const [pages, setPages] = useState(["",""]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [activityCard, setActivityCard] = useState(null);
    const [visitCard, setVisitCard] = useState(null);
    const pageWidth = Dimensions.get("screen").width - 20;
    const currentLocation = useSelector(state => state.rep.currentLocation);
    const odometerReadingModalRef = useRef(null);
    const features = useSelector(state => state.selection.payload.user_scopes.geo_rep.features);

    useEffect(() => {    
        let isSubscribed = true;        
        if(currentLocation.latitude === undefined){
          console.log("updated curretn location");
          dispatch(updateCurrentLocation());
        }        
        var param = {
          current_latitude: currentLocation.latitude != undefined ? currentLocation.latitude : 1,
          current_longitude: currentLocation.longitude != undefined ? currentLocation.longitude : 1
        };            
        //https://dev.georep.com/local_api_old/home/main-dashboard
        getApiRequest("https://dev.georep.com/local_api_old/home/main-dashboard", param).then((res) => {      
            if(isSubscribed){
              console.log("res",res)
              setVisitCard(res.visits_card);
              setActivityCard(res.activity_card);
              //setIsStart(res.startEndDay_state === Constants.homeStartEndType.START_MY_DAY ? true : false);
            }          
        }).catch((e) => {
        });
        initData();
        return () => (isSubscribed = false)
    },[]);

    const initData  = async() =>{
      var startMyDay = await getLocalData("start_my_day");      
      setIsStart( startMyDay === null || startMyDay === "1" ? true: false);
    }
    
    const _callMyDay = () => {
        var userParam = getPostParameter(currentLocation);
        var postData = {
            startEndDay_type: isStart ? Constants.homeStartEndType.START_MY_DAY : Constants.homeStartEndType.END_MY_DAY,
            user_local_data:  userParam.user_local_data !=undefined ? userParam.user_local_data : {time_zone: '', latitude: 0, longitude: 0},
        };        
        postApiRequest("home/startEndDay", postData).then( async(res) => {
          console.log("res" , res);
          if(res.status === "success"){
            setStartEndDayId(res.startEndDay_id);
            await storeLocalValue("start_my_day", isStart ? '0' : '1' );          
            setIsStart(!isStart);

            if(features.includes("odometer_reading")){
              odometerReadingModalRef.current.showModal();
            }

            
          }        
        }).catch((e) => {

        });
    }

    const onCaptureAction = async({type, value}) => {
      console.log(type);
      
      dispatch(
        showNotification({
          type: 'success',
          message: value,
          buttonText: 'Okay',
        }),
      ); 

      //setIsStart(!isStart);      
      //await storeLocalValue("start_my_day", !isStart ? "1" : "0");
      // odometerReadingModalRef.current.hideModal();
    };
    
    const renderCards = (item, index) => {            
        if(index == 0){
          return (
            <View 
            onLayout={e =>{
              const newWidth = e.nativeEvent.layout.width;          
            }} 
            key="1" style={{marginRight:1 , width:pageWidth}}>
              <Visits {...props} visitCard={visitCard} />
          </View>
          )
        }else if(index == 1){
          return (
            <View key="2" style={{marginRight:1 , width:pageWidth}}>
                {
                  activityCard &&                   
                  <ActivityCard activityCard={activityCard}></ActivityCard>
                }                  
            </View>   
          )
        }else if(index == 2){
          return (<View key="3" style={{marginRight:1 , width:pageWidth}}>
            <Text>dd</Text>
          </View>);
        }
    }

    return (
        <ScrollView style={{flex:1, marginHorizontal:10}}>          

            <Notification></Notification>
            <View style={{marginTop:5}}>
                <SubmitButton bgStyle={{backgroundColor:isStart? Colors.disabledColor : Colors.redColor , borderRadius:3}}
                  title={isStart? "Start My Day" : 'End My Day'}
                  onSubmit={() => {
                      _callMyDay()
                                                               
                  }}
                ></SubmitButton>
            </View>
                        
            <SyncAll></SyncAll>
            
            <CheckOut></CheckOut>
            
            <FlatList            
                removeClippedSubviews={false}
                // maxToRenderPerBatch={10}
                initialNumToRender={10}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={pages}            
                onScroll={(event) => {                              
                  if(event.nativeEvent.contentOffset.x % pageWidth == 0){                
                      setSelectedIndex(event.nativeEvent.contentOffset.x / pageWidth);
                  }              
                }}
                renderItem={
                ({ item, index }) => renderCards(item, index)
                }
                keyExtractor={(item, index) => index.toString()}                        
            />          

            <IndicatorDotScroller total={2} selectedIndex={selectedIndex} ></IndicatorDotScroller>            

            <OdometerReadingModal
              ref={odometerReadingModalRef}       
              title={"Odometer Reading"}  
              isStart={isStart}
              startEndDayId={startEndDayId}
              currentLocation={currentLocation}     
              onButtonAction={onCaptureAction}
            />

        </ScrollView>
    )
}