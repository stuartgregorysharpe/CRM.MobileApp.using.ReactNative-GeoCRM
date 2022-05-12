
import { View, Text ,StyleSheet ,TouchableOpacity ,ScrollView, FlatList, Dimensions ,Animated } from 'react-native'
import React , { useState ,useRef , useEffect } from 'react'
import SyncAll from './../partial/SyncAll'
import CheckOut from './../partial/CheckOut'
import {SubmitButton} from '../../../../components/shared/SubmitButton';
import IndicatorDotScroller from '../../../../components/common/IndicatorDotScroller'
import Colors from '../../../../constants/Colors';
import Visits from '../partial/cards/Visits';
import { useSelector } from 'react-redux'
import { getApiRequest } from '../../../../actions/api.action';
import ActivityCard from '../partial/cards/ActivityCard';

export default function MainPage(props) {

    const [isStart, setIsStart] = useState(true);
    const [pages, setPages] = useState(["",""]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [activityCard, setActivityCard] = useState(null);
    const [visitCard, setVisitCard] = useState(null);
    const pageWidth = Dimensions.get("screen").width - 20;
    const currentLocation = useSelector(state => state.rep.currentLocation);

    useEffect(() => {
        let isSubscribed = true;
        _callMainDashboard(isSubscribed);
        return () => (isSubscribed = false)
      },[]);
    
    const _callMainDashboard= (isSubscribed) => {
        
        var param = {
          current_latitude: currentLocation.latitude != undefined ? currentLocation.latitude : 1,
          current_longitude: currentLocation.longitude != undefined ? currentLocation.longitude : 1
        };    
        
        getApiRequest("https://dev.georep.com/local_api_old/home/main-dashboard", param).then((res) => {      
            if(isSubscribed){
                setVisitCard(res.visits_card);
                setActivityCard(res.activity_card);
            }          
        }).catch((e) => {
          
        });
    }

    const renderCards = (item, index) => {
    
        console.log("render cards", index)
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
                    setIsStart(!isStart);
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
                console.log(event.nativeEvent.contentOffset);
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
        </ScrollView>
    )
}