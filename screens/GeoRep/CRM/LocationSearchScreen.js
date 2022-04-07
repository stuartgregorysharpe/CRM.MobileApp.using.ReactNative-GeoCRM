import React, { useState,useRef, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Dimensions ,  FlatList, Image, Platform , ActivityIndicator , BackHandler} from 'react-native';
import { Provider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import FilterView from '../../../components/FilterView';
import SearchBar from '../../../components/SearchBar';
import Colors, {whiteLabel} from '../../../constants/Colors';
import { breakPoint } from '../../../constants/Breakpoint';
import {  IS_CALENDAR_SELECTION, LOCATION_ID_CHANGED,  SELECTED_LOCATIONS_FOR_CALENDAR, SLIDE_STATUS, SUB_SLIDE_STATUS } from '../../../actions/actionTypes';
import { getLocationFilters, getLocationInfo,  getLocationSearchListsByPage } from '../../../actions/location.action';
import Fonts from '../../../constants/Fonts';
import Images from '../../../constants/Images';
import { grayBackground, style } from '../../../constants/Styles';
import { expireToken, getDistance } from '../../../constants/Consts';
import { LocationItem } from './partial/LocationItem';
import AlertDialog from '../../../components/modal/AlertDialog';
import AddToCalendar from '../../../components/modal/AddToCalendar';
import SvgIcon from '../../../components/SvgIcon';
import { LocationInfoDetails } from './locationInfoDetails/LocationInfoDetails';
import { getFilterData } from '../../../constants/Storage';
import LocationSearchScreenPlaceholder from './LocationSearchScreenPlaceholder';
import { Notification } from '../../../components/modal/Notification';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

var isEndPageLoading = false;
var searchKey = "";
var changedKey = "";

export default function LocationSearchScreen(props) {
  
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const crmStatus = useSelector(state => state.rep.crmSlideStatus);
  const [isRequest, setIsRequest] = useState(false);
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const filterParmeterChanged = useSelector(state => state.selection.searchFilters);
  const [orderLists, setOrderLists] = useState([]);
  const [originLists, setOriginLists] = useState([]);
  const [showItem, setShowItem] = useState(0);
  const [locationInfo, setLocationInfo] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");  
  const locationId = useSelector(state => state.location.locationId.value);
  const tabType =   useSelector(state => state.location.locationId.type);  
  const isSelected = useSelector( state => state.selection.isCalendarSelection);
  const selectedLocationsForCalendar = useSelector( state => state.selection.selectedLocationsForCalendar);    
  const [isCreated, setIsCreated] = useState(false);
  const [message, setMessage] = useState("");
  const [calendarType,setCalendarType] = useState( props.route.params !== undefined && props.route.params.calendar_type !== undefined ? props.route.params.calendar_type : '')
  const locationRef = useRef();
  const [pageType, setPageType ] = useState({name:"search-lists"});
  const [isLoading , setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);  
  const [pageNumber, setPageNumber] = useState(0);
  const [myLocation, setMyLocation] = useState(currentLocation);  

  useEffect(() => {
    setCalendarType( props.route.params !== undefined && props.route.params.calendar_type !== undefined ? props.route.params.calendar_type : '')
    props.screenProps.setOptions({                 
      headerTitle:() =>{
        return(<TouchableOpacity onPress={
          () =>{                        
            if( locationRef !== undefined && locationRef.current !== undefined && locationRef.current !== null){              
              locationRef.current.goBack();
            }else{
              console.log("yyy")
              goPreviousPage();
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
            if(locationRef !== undefined &&  locationRef.current !== undefined && locationRef.current !== null){                            
              locationRef.current.closePopup();
              setPageType({name:'search-lists'});
            }else{              
              setShowItem(0);
              dispatch({type: SLIDE_STATUS, payload: false});
              dispatch({type: LOCATION_ID_CHANGED, payload: {value:0, type:0}});              
            }
          }}
        >
        </TouchableOpacity>
      ),
    }); 

  });
  
  useEffect(() => {      
    if(orderLists.length === 0){      
      isEndPageLoading = false;
      loadMoreData();
    }
  },[]);

  

  useEffect(() => {
    setMyLocation(currentLocation);
  }, [currentLocation]);

  useEffect(() => {            
    if(locationId !== 0 && isRequest == false && tabType !== undefined){        
      setPageType({"name":"camera", "type":tabType});      
      openLocationInfo(locationId)
    }
  }, [locationId, tabType]);

  useEffect(() => {
    if(calendarType == "optimize" || calendarType == "add") {
      //setIsSelected(true)
      dispatch({type: IS_CALENDAR_SELECTION, payload: true});
    }
  },[calendarType]);

  useEffect(() => {              
    if(filterParmeterChanged !== undefined){            
      isEndPageLoading = false;
      setPageNumber(0);
      setOrderLists([]);
      setOriginLists([]);
      console.log("filter called from filter");
      loadMoreData();      
    }    
  }, [filterParmeterChanged]);

  useEffect( () => {
    if(isPageLoading){
      console.log("----------")
      searchKey = searchKeyword;      
      loadData(searchKey);
    }  
  },[isPageLoading]);  

  useEffect(() =>{
    console.log("search key board" ,searchKeyword)
    changedKey = searchKeyword;
  },[searchKeyword]);  

  const loadData = async (searchKey) => {

    console.log("search key", searchKey);
    console.log("page number", pageNumber);
    var filterData = await getFilterData('@filter');
    getLocationSearchListsByPage(filterData, pageNumber , searchKey)
    .then((res) => {
      if(pageNumber === 0){
        setIsLoading(false);
      }
      console.log("result length", res.length);
      console.log("searchKey", searchKey);
      console.log("current searchKey", changedKey);
      if(searchKey !== changedKey){
        console.log(searchKey, changedKey)
        setPageNumber(0);
        isEndPageLoading = false;
        getSearchData(res, searchKey, "pagination");
        searchKey = changedKey;
        loadData(searchKey);
      }else{
        setIsPageLoading(false);      
        getSearchData(res, searchKey, "pagination");
        if(res.length < 50){     
          isEndPageLoading = true;
        }else{        
          setPageNumber(pageNumber + 1);
        }
      }

    })
    .catch((error) => {  
      console.log("error", error);
      expireToken(dispatch, error);
    });
  }
  
  const goPreviousPage = () =>{
    if(navigation.canGoBack()){
      navigation.goBack();
      dispatch({type: SLIDE_STATUS, payload: false});      
      dispatch({type: LOCATION_ID_CHANGED, payload: {value:0, type:0}})
    }
  }

  const getSearchData = ( lists,  searchKey , type) => {

    if(pageNumber == 0){
      setOrderLists(lists);
      if(searchKey === ""){
        setOriginLists(lists);
      }
    }else{
      const tempLists = [ ...orderLists, ...lists ];
      setOrderLists(tempLists);      
    }        
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
      case "addtocalendar":
        setShowItem(3);
        return;
      default:
        setShowItem(0);
        return;
    }
  }
  

  const openLocationInfo = async(location_id) => {
    
    setLocationInfo(undefined);
    animation("locationInfo");
    console.log("calle m" , location_id);
    getLocationInfo( Number(location_id) , myLocation)
    .then((res) => {      
      if( locationRef !== undefined && locationRef.current !== undefined && locationRef.current !== null){        
        locationRef.current.updateView(res);
      }      
    })  
    .catch((e) =>{ 
      expireToken(dispatch, e);
      console.log("location info api ", e);  
    })
  }

  const renderLocation = (item, index) => {    
    return (<LocationItem       
      isChecked={selectedLocationsForCalendar.find(element => element.location_id === item.location_id ? true: false )}
      isSelected={isSelected}
      item={item}    
      onItemClicked={(isChecked) => {
        if(isSelected){

          orderLists[index].checked = isChecked; 
          var selectedItems = [ ...selectedLocationsForCalendar ];
          if(isChecked){
            selectedItems = [...selectedItems , {schedule_order: (index + 1).toString() , location_id: item.location_id , schedule_date:"Today" , schedule_time:'', schedule_end_time:'' } ];
          }else{
            selectedItems = selectedItems.filter( element => element.location_id !== item.location_id );
          }          
          dispatch({type: SELECTED_LOCATIONS_FOR_CALENDAR, payload: selectedItems})
        }else{
          openLocationInfo(item.location_id);
        }        
      }}>
      </LocationItem>)
  } 


  const loadMoreData = async() =>{
    
    console.log("isEnd Page Loading", isEndPageLoading);
    console.log("isPageLoading", isPageLoading);
    if( isEndPageLoading === false && isPageLoading === false){      
      if(pageNumber == 0 && searchKeyword === "" ){
        setIsLoading(true);
      }      
      setIsPageLoading(true);
    }    
  }

  renderFooter = () => {
    if( !isEndPageLoading && isPageLoading ){
      return (    
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.9}
            // onPress={loadMoreData}          
            style={styles.loadMoreBtn}>
            <Text style={styles.btnText}>Loading</Text>
            {isPageLoading ? (
              <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
            ) : null}
          </TouchableOpacity>
        </View>
      );
    }
    return (<View></View>);
  }
  
  return (
    <Provider>
      
      <SafeAreaView style={{flex:1, }}>
                
          <Notification/>
          <AlertDialog visible={isCreated}  message={message} onModalClose={() => setIsCreated(false) }></AlertDialog>              
          
          {crmStatus && (showItem == 3 || showItem == 1) && <TouchableOpacity
            activeOpacity={1} 
            style={grayBackground}
            onPress={() => {
              
              dispatch({type: SUB_SLIDE_STATUS, payload: false})
              dispatch({type: SLIDE_STATUS, payload: false});
              setShowItem(0); 

            }}
          ></TouchableOpacity>}

          {crmStatus && showItem == 1 && <View
            style={[styles.transitionView, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]}
          >
            <FilterView navigation={navigation} page={"search"} onClose={() =>{
              dispatch({type: SLIDE_STATUS, payload: false});
              setShowItem(0);  
            }} />
          </View>}

          {crmStatus && showItem == 2 &&
            <View
              style={[styles.transitionView, {top: 0}, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]}>

              <LocationInfoDetails
                  {...props}
                  ref={locationRef}              
                  animation={animation}    
                  goPreviousPage={goPreviousPage}
                  pageType={pageType}
                  currentLocation={myLocation}
                  refreshLocationInfo={(id) => {
                    openLocationInfo(id);
                  }}
                  clostDetailsPopup={() =>{
                    setShowItem(0);
                  }} locInfo={locationInfo} ></LocationInfoDetails>

            </View>
          }

          { crmStatus && showItem == 3 &&
            <View style={[styles.transitionView, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]} >
              <AddToCalendar selectedItems={selectedLocationsForCalendar} 
                onClose={() => { 
                  dispatch({type: SLIDE_STATUS, payload: false }); 
                  setShowItem(0); 
                  dispatch({type: IS_CALENDAR_SELECTION, payload: false});
                  dispatch({type: SELECTED_LOCATIONS_FOR_CALENDAR, payload: []});
                  getSearchData(originLists, "", "search");
                }}></AddToCalendar>
            </View>
          }

          <View style={styles.container}>
            <SearchBar 
              onSearch={(text) =>{                
                //getSearchData(originLists, text, "search");
                
                if(text.length >= 3 ){
                  setSearchKeyword(text);
                }else{
                  setSearchKeyword("");
                }

                if(text.length >= 3){
                  setPageNumber(0);
                  isEndPageLoading = false;
                  loadMoreData();
                }else if(text.length == 0){
                  setPageNumber(1);
                  isEndPageLoading = false;
                  setOrderLists(originLists);                  
                }

              }} 
              initVal={searchKeyword}
              isFilter={true}
              isLoading={isLoading}
              animation={() => {
                animation("filter");
              }} />                

            <View style={{flex:1}}>                            
              <View style={styles.buttonContainer}>
                <View style={styles.leftContainer}>
                  <TouchableOpacity 
                    disabled={isLoading} 
                    style={[styles.buttonTextStyle, {backgroundColor: isLoading ? Colors.skeletonColor : isSelected ? Colors.disabledColor:whiteLabel().actionFullButtonBackground}]} 
                    onPress={()=> {
                      if(!isLoading){
                        if(isSelected){
                          dispatch({type: SELECTED_LOCATIONS_FOR_CALENDAR, payload: []});
                        }
                        dispatch({type: IS_CALENDAR_SELECTION, payload: !isSelected});
                      }
                    } }>
                    <Text style={[styles.buttonText, {color:isLoading ? Colors.skeletonColor : Colors.whiteColor}]}>{isSelected? 'Cancel' : 'Select' }</Text>
                  </TouchableOpacity>
                </View>
                {
                  isSelected &&
                  <View style={{alignItems: 'flex-start',}}>
                    <TouchableOpacity 
                      disabled={isLoading} 
                      style={[styles.buttonTextStyle, { 
                          backgroundColor: Colors.bgColor , 
                          borderColor: isLoading ? Colors.bgColor : Colors.skeletonColor, borderWidth:2 , marginLeft:10}]} 
                      onPress={()=> {
                        if(isSelected){
                          dispatch({type: IS_CALENDAR_SELECTION, payload: true});
                          goPreviousPage();
                        }                
                      }}>
                      <Text style={[styles.buttonText, {color:isLoading ? Colors.bgColor : Colors.blackColor}]}>{'Map'}</Text>
                    </TouchableOpacity>                  
                  </View>                  
                }

                <View style={styles.rightContainer}>
                { isLoading === false && isSelected && selectedLocationsForCalendar.length > 0 && 

                  <TouchableOpacity 
                  style={styles.buttonTextStyle}
                  onPress={() => {                                        
                    if(selectedLocationsForCalendar.length > 0){
                      animation("addtocalendar");
                    }
                  }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Text style={styles.buttonText}>Add to Calendar</Text>
                      <SvgIcon icon="Arrow_Right" width='13px' height='13px' />
                    </View>                  
                  </TouchableOpacity>
                }
                </View>                              
              </View>

              {
                isLoading && 
                <LocationSearchScreenPlaceholder></LocationSearchScreenPlaceholder>
              }
              
              {
                orderLists.length !== 0 && 
                <View style={{marginBottom:100}}>
                  <FlatList
                    removeClippedSubviews={false}
                    maxToRenderPerBatch={10}
                    initialNumToRender={10}
                    windowSize={21}
                    data={orderLists}
                    renderItem={
                        ({ item , index }) => renderLocation(item, index)
                    }
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingHorizontal: 7, marginTop: 0 }}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold ={1}
                    ListFooterComponent={renderFooter.bind(this)}
                  />
                </View>
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
    backgroundColor: Colors.bgColor,
    height: '100%',
    paddingBottom: 0
  },

  buttonContainer:{    
    paddingTop:8,
    paddingBottom:17,
    flexDirection:'row',    
    marginLeft:10,
    marginRight:10,
    alignItems:'center'    
  },
  
  leftContainer:{    
    alignItems: 'flex-start',
  },

  rightContainer:{
    flex:1,
    alignItems: 'flex-end',
  },

  buttonTextStyle: {     
    paddingLeft:20,
    paddingRight:20,
    paddingTop:Platform.OS == "android" ? 5 : 8,
    paddingBottom:Platform.OS == "android" ? 5 : 8,
    borderRadius:15,
    backgroundColor: whiteLabel().actionFullButtonBackground
  },  

  buttonText:{
    color: whiteLabel().actionFullButtonText,
    fontSize: 12,
    fontFamily: Fonts.secondaryBold,
  },
  
  transitionView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.bgColor,    
    elevation: 2,
    zIndex: 2,
    padding: 0,
  },

  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  loadMoreBtn: {
    padding: 10,
    backgroundColor: Colors.skeletonColor,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  btnText: {
    color: Colors.whiteColor,
    fontSize: 15,
    textAlign: 'center',
  },

}));