import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, Dimensions , KeyboardAvoidingView , FlatList, Image} from 'react-native';
import { Provider } from 'react-native-paper';
import { useSelector, useDispatch , connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import LocationInfo from './LocationInfo';
import FilterView from '../../../components/FilterView';
import SearchBar from '../../../components/SearchBar';
import Skeleton from '../../../components/Skeleton';
import { PRIMARY_COLOR, BG_COLOR, TEXT_COLOR, GRAY_COLOR, DISABLED_COLOR } from '../../../constants/Colors';
import { breakPoint } from '../../../constants/Breakpoint';
import {  SLIDE_STATUS } from '../../../actions/actionTypes';
import { getLocationFilters, getLocationInfo } from '../../../actions/location.action';
import Fonts from '../../../constants/Fonts';
import Images from '../../../constants/Images';
import { style } from '../../../constants/Styles';
import { getDistance } from '../../../constants/Consts';
import { LocationItem } from './partial/LocationItem';
import { addCalendar } from '../../../actions/calendar.action';

export default function LocationSpecificInfoScreenzLocationSearchScreen(props) {
  
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const crmStatus = useSelector(state => state.rep.crmSlideStatus);
  const [isRequest, setIsRequest] = useState(true);
  const locationSearchLists = useSelector(state => state.location.locationSearchLists);
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [orderLists, setOrderLists] = useState([]);
  const [showItem, setShowItem] = useState(0);
  const [locationInfo, setLocationInfo] = useState();
  const [searchKeyword, setSearchKeyword] = useState();
  const [locationId , setLocationId] = useState(props.route.params && props.route.params.location_id ? props.route.params.location_id : 0);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {    
    props.screenProps.setOptions({                 
      headerTitle:() =>{
        return(<TouchableOpacity onPress={
          () =>{
            if(navigation.canGoBack()){              
              dispatch({type: SLIDE_STATUS, payload: false});              
              navigation.goBack(); 
            }
          }}>            
          <View style={style.headerTitleContainerStyle}>            
              <Image
                resizeMethod='resize'  
                style={{width:15,height:20, marginRight:5}}
                source={Images.backIcon}
              />
          <Text style={{color:"#FFF", fontFamily:Fonts.primaryRegular, fontSize:19, fontWeight:"400"}} >CRM</Text>
        </View></TouchableOpacity>)
      },
      headerLeft: () => (
        <TouchableOpacity 
          style={style.headerLeftStyle} 
          activeOpacity={1}
          onPress={() => {
            setShowItem(0);
          }}
        >
        </TouchableOpacity>
      ),
      
    });    
  });

  useEffect(() => {   
    if(locationId != 0){
      openLocationInfo(locationId)
    }    
  }, [locationId]);

  useEffect(() => {    
    getSearchData("");
    setIsRequest(false);
  }, [locationSearchLists]);

  const getSearchData = (searchKey) => {
    let items = [];    
    locationSearchLists.map((list, key) => {    
      let item = {
        name: list.name,
        address: list.address,
        distance: getDistance(list.coordinates, currentLocation).toFixed(2),
        status: list.status,
        location_id: list.location_id,
        status_text_color:list.status_text_color
      }
      if(searchKey === ''){
        items.push(item);
      }else{
        if(list.name.toLowerCase().includes(searchKey.toLowerCase()) || list.address.toLowerCase().includes(searchKey.toLowerCase())){      
          items.push(item);
        }
      }      
    });
    items.sort((a, b) => a.distance > b.distance ? 1 : -1);    
    setOrderLists(items);    
  }

  const animation = (name) => {
    dispatch({type: SLIDE_STATUS, payload: true});
    switch(name) {
      case "filter":        
        dispatch(getLocationFilters());
        setShowItem(1);
        return;
      case "locationInfo":
        setShowItem(2);        
        return;
      default:        
        return;
    }    
  }

  const openLocationInfo = async(location_id) => {    
    setIsRequest(true)
    getLocationInfo( Number(location_id))
    .then((res) => {
      setLocationInfo(res);
      setIsRequest(false)      
      animation("locationInfo");
    })
    .catch((e) =>{
      setIsRequest(false)      
    })
  }

  const LoadingView = () =>{
    return (
      <SafeAreaView>
        <View style={[styles.container, {padding: 10, justifyContent: 'center'}]}>
          {Array.from(Array(6)).map((_, key) => (
            <Skeleton key={key} />  
          ))}
        </View>
      </SafeAreaView>
    )
  }

  if (isRequest) {
    return LoadingView()
  }

  const renderLocation = (item, index) => {    
    return (<LocationItem 
      isSelected={isSelected}
      item={item}
      onItemClicked={() => {
        if(isSelected){

        }else{
          openLocationInfo(item.location_id);
        }        
      }}>  
      </LocationItem>)
  }

  return (
    <Provider>
      {
        isRequest &&
        <LoadingView></LoadingView>
      }
      <SafeAreaView style={{flex:1, }}>
          

          {crmStatus && showItem == 1 && <View
            style={[styles.transitionView, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]}
          >
            <FilterView navigation={navigation} />
          </View>}

          {crmStatus && showItem == 2 &&
            <View
              style={[styles.transitionView, {top: 0}, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]}>
              <LocationInfo locInfo={locationInfo} navigation={navigation} /> 
            </View>
          }

          <View style={styles.container}>
            <SearchBar 
              onSearch={(text) =>{
                getSearchData(text);
                setSearchKeyword(text);
              }} 
              initVal={searchKeyword}
              isFilter={true}
              animation={() => {
                console.log("filter icon clicked");
                animation("filter");
              }} />
            
            
            <View style={{flex:1}}>
              <View style={styles.buttonContainer}>                
                <View style={styles.leftContainer}>
                <TouchableOpacity onPress={()=> setIsSelected(!isSelected) }>
                  <Text style={[styles.buttonTextStyle, {backgroundColor: isSelected ? DISABLED_COLOR:PRIMARY_COLOR}]}>{isSelected? 'Cancel' : 'Select' }</Text>
                </TouchableOpacity>
                </View>
                
                <View style={styles.rightContainer}>
                { isSelected && 
                  <TouchableOpacity onPress={() =>{
                    var selectedItems = [];
                    orderLists.forEach((item, index) => {
                      if(item.checked != undefined && item.checked == true){
                        selectedItems.push({schedule_order: (index + 1).toString() , location_id: item.location_id , schedule_date:"Today" , schedule_time:'', schedule_end_time:'' });
                      }
                    });
                    console.log("selectedItems", selectedItems);
                    addCalendar({schedules:selectedItems})
                    .then((res) =>{
                      console.log(res);
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                    
                  }}>
                    <Text style={styles.buttonTextStyle}>Add to Schedule +</Text>
                  </TouchableOpacity>
                }
                </View>                              
              </View>
                            

              <FlatList
                data={orderLists}
                renderItem={
                    ({ item , index }) => renderLocation(item, index)
                }
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: 7, marginTop: 15 }}
              />

              {
                orderLists.length == 0 &&
                <LoadingView></LoadingView>
              }
            </View>
          </View>


      </SafeAreaView>
    </Provider>
  )
}

const perWidth = setWidthBreakpoints(breakPoint);
const styles = EStyleSheet.create(parse({
  container: {    
    backgroundColor: BG_COLOR,
    height: '100%',
    paddingBottom: 0
  },

  buttonContainer:{    
    padding:5,
    flexDirection:'row',    
    marginLeft:10,
    marginRight:10
  },
  leftContainer:{
    flex:1,
    alignItems: 'flex-start',
  },
  rightContainer:{
    flex:1,
    alignItems: 'flex-end',
  },

  buttonTextStyle: {
    color: "#FFF",
    fontSize: 12,
    fontFamily: Fonts.secondaryBold,
    backgroundColor:PRIMARY_COLOR,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:5,
    paddingBottom:5,
    borderRadius:15,
  },
  
  
  transitionView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: BG_COLOR,    
    elevation: 2,
    zIndex: 2,
    padding: 0,
  },


}));