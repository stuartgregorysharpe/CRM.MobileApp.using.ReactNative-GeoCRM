

import { View, Text ,StyleSheet ,TouchableOpacity ,ScrollView, FlatList, Dimensions ,Animated } from 'react-native'
import React , { useState ,useRef , useEffect } from 'react'
import SyncAll from './partial/SyncAll'
import CheckOut from './partial/CheckOut'
import ScrollTab from '../../../components/common/ScrollTab'
import {SubmitButton} from '../../../components/shared/SubmitButton';
import Colors from '../../../constants/Colors'
import Visits from './partial/cards/Visits'
import Invoices from './partial/cards/Invoices'
import Festivals from './partial/cards/Festivals'
import PagerView from 'react-native-pager-view';
// import { ScrollView } from 'react-native-gesture-handler'
import { getApiRequest } from '../../../actions/api.action'
import { useSelector } from 'react-redux'
import Activity from './partial/cards/ActivityCard'
import { style } from '../../../constants/Styles'
import { faListAlt } from '@fortawesome/free-solid-svg-icons'
import ActivityCard from './partial/cards/ActivityCard'
import IndicatorDotScroller from '../../../components/common/IndicatorDotScroller'


export default function HomeScreen(props) {

  const tabs = [{name:"Main", id:0}, {name:"Leaderboard",  id:1}, {name:"Sales", id : 2} , {name:"Actions" , id:3 } ];
  const [cardIndex, setCardIndex] = useState(0); 
  const refPagerView = useRef();
  const [isStart, setIsStart] = useState(true);
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [visitCard, setVisitCard] = useState(null);
  const [activityCard, setActivityCard] = useState(null);
  const [pages, setPages] = useState(["",""]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const pageWidth = Dimensions.get("screen").width - 20;
  const scrollX = React.useRef(new Animated.Value(0)).current;


  useEffect(() => {
    var screenProps = props.screenProps;    
    if(screenProps === undefined){
      screenProps = props.navigation;
    }
    if (screenProps) {
      screenProps.setOptions({        
        headerTitle: () => {
          return (<TouchableOpacity
            onPress={
              () => {}}>
            <View style={style.headerTitleContainerStyle}>                
              <Text style={style.headerTitle} >Home</Text>
            </View></TouchableOpacity>)
        }
      });      
    }
  });

  
  useEffect(() => {
    _callMainDashboard();
  },[]);

  const _callMainDashboard= () => {
    
    var param = {
      current_latitude: currentLocation.latitude != undefined ? currentLocation.latitude : 1,
      current_longitude: currentLocation.longitude != undefined ? currentLocation.longitude : 1
    };    
    getApiRequest("https://dev.georep.com/local_api_old/home/main-dashboard", param).then((res) => {      
      setVisitCard(res.visits_card);
      setActivityCard(res.activity_card);
    }).catch((e) => {
      
    });
  }

  const changePage = (nativeEvent) => {    
    setCardIndex(nativeEvent.position);
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
  const onViewRef = React.useRef((viewableItems)=> {
      console.log("viewableItems", viewableItems);      
  })
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50  , viewablePercentThreshold: 50})
  onViewableItemsChanged = ({viewableItems, changed}) =>{
    console.log("viewableItems", viewableItems);
    console.log("changed" , changed)
  }

  return (
    <View style={{flex:1, marginLeft:10 , marginRight:10 , marginTop:10}}>
        
        <ScrollTab tabs={tabs} onTabSelection={() => {
        }} ></ScrollTab> 
        <ScrollView style={{flex:1}}  >
          
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
                                                               

    </View>
  )
}

const styels = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
})