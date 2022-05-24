
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

export default function MainPage(props) {

    const [isStart, setIsStart] = useState(true);    
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
        var param = {
          current_latitude: currentLocation.latitude != undefined ? currentLocation.latitude : 1,
          current_longitude: currentLocation.longitude != undefined ? currentLocation.longitude : 1
        };            
        getApiRequest("https://dev.georep.com/local_api_old/home/main-dashboard", param).then((res) => {      
            if(isSubscribed){
              console.log("res",res)
              setVisitCard(res.visits_card);
              setActivityCard(res.activity_card);
              setIsStart(res.startEndDay_state === Constants.homeStartEndType.START_MY_DAY ? true : false);
            }          
        }).catch((e) => {
        });
        initData();
        return () => (isSubscribed = false)
    },[]);    
    
    const initData  = async() =>{
      var startMyDay = await getLocalData("start_my_day");      
      setIsStart(startMyDay === "1" ? true: false);
    }

    const _callMyDay = () => {
        var userParam = getPostParameter(currentLocation);
        var postData = {
            startEndDay_type: isStart ? Constants.homeStartEndType.START_MY_DAY : Constants.homeStartEndType.END_MY_DAY,
            user_local_data: userParam.user_local_data,
        };
        postApiRequest("home/startEndDay", postData).then( async(res) => {
          await storeLocalValue("start_my_day", isStart ? '0' : '1' );
          setIsStart(!isStart);
        }).catch((e) => {

        });
    }

    const onCaptureAction = ({type, value}) => {
      setIsStart(!isStart);      
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

            <View style={{marginTop:5}}>
                <SubmitButton bgStyle={{backgroundColor:isStart? Colors.disabledColor : Colors.redColor , borderRadius:3}}
                  title={isStart? "Start My Day" : 'End My Day'}
                  onSubmit={() => {
                      if(features.includes("odometer_reading")){
                        odometerReadingModalRef.current.showModal();
                      }else{
                        setIsStart(!isStart);
                      }                      
                      
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
              currentLocation={currentLocation}     
              onButtonAction={onCaptureAction}
            />

        </ScrollView>
    )
}