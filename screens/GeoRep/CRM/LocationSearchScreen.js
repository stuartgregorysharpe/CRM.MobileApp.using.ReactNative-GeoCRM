import React, { useState,useRef, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, Dimensions ,  FlatList, Image, Platform , ActivityIndicator} from 'react-native';
import { Provider } from 'react-native-paper';
import { useSelector, useDispatch , connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import FilterView from '../../../components/FilterView';
import SearchBar from '../../../components/SearchBar';
import Colors, { PRIMARY_COLOR, BG_COLOR, DISABLED_COLOR } from '../../../constants/Colors';
import { breakPoint } from '../../../constants/Breakpoint';
import {  LOCATION_ID_CHANGED, LOCATION_LOOP_LISTS, SLIDE_STATUS, SUB_SLIDE_STATUS } from '../../../actions/actionTypes';
import { getLocationFilters, getLocationInfo, getLocationSearchList } from '../../../actions/location.action';
import Fonts from '../../../constants/Fonts';
import Images from '../../../constants/Images';
import { grayBackground, style } from '../../../constants/Styles';
import { getDistance } from '../../../constants/Consts';
import { LocationItem } from './partial/LocationItem';
import AlertDialog from '../../../components/modal/AlertDialog';
import AddToCalendar from '../../../components/modal/AddToCalendar';
import SvgIcon from '../../../components/SvgIcon';
import { LocationInfoDetails } from './locationInfoDetails/LocationInfoDetails';
import { SearchLists } from '../../../DAO';
import LocationInformation from '../../../DAO/LocationInformation';

var isCalled = false;

export default function LocationSearchScreen(props) {
  
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const crmStatus = useSelector(state => state.rep.crmSlideStatus);
  const [isRequest, setIsRequest] = useState(false);
  const locationSearchLists = useSelector(state => state.location.locationSearchLists);
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const filterParmeterChanged = useSelector(state => state.selection.searchFilters);
  const [orderLists, setOrderLists] = useState([]);
  const [showItem, setShowItem] = useState(0);
  const [locationInfo, setLocationInfo] = useState();
  const [searchKeyword, setSearchKeyword] = useState();  
  const locationId = useSelector(state => state.location.locationId.value);
  const tabType =   useSelector(state => state.location.locationId.type);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelected, setIsSelected] = useState(false);    
  const [isCreated, setIsCreated] = useState(false);
  const [message, setMessage] = useState("");
  const [calendarType,setCalendarType] = useState( props.route.params !== undefined && props.route.params.calendar_type !== undefined ? props.route.params.calendar_type : '')
  const locationRef = useRef();
  const [pageType, setPageType ] = useState({name:"search-lists"});
  const [isLoading , setIsLoading] = useState(true);

  useEffect(() => {

    setCalendarType( props.route.params !== undefined && props.route.params.calendar_type !== undefined ? props.route.params.calendar_type : '')
    props.screenProps.setOptions({                 
      headerTitle:() =>{
        return(<TouchableOpacity onPress={
          () =>{            
            if( locationRef !== undefined && locationRef.current !== undefined && locationRef.current !== null){
              console.log(locationRef);
              locationRef.current.goBack();
            }else{
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
              console.log("taop on 1");
              console.log(locationRef);
              locationRef.current.closePopup();
              setPageType({name:'search-lists'});
            }else{
              console.log("taop on 2");
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

  useEffect(() =>{
    console.log("ses is loading");
    SearchLists.load().then(result =>{
      setOrderLists(result);
      setIsLoading(true);    
    });
    
  },[]);

  useEffect(() => {            
    if(locationId !== 0 && isRequest == false && tabType !== undefined){  
      console.log("open locaiton info from calendar page");
      setPageType({"name":"camera", "type":tabType});      
      openLocationInfo(locationId)
    }
  }, [locationId, tabType]);

  useEffect(() => {
    if(calendarType == "optimize" || calendarType == "add") {
      setIsSelected(true)
    }
  },[calendarType]);

  useEffect(() => {          
    dispatch(getLocationSearchList());  
  }, [filterParmeterChanged]);  

  useEffect(() => {  
    if(locationSearchLists.length !== 0 ){         
      getSearchData("");      
    }else if(!isCalled){
      isCalled = true;
      dispatch(getLocationSearchList());
    }
  }, [locationSearchLists]);

  const goPreviousPage = () =>{
    if(navigation.canGoBack()){                            
      navigation.goBack();
      dispatch({type: SLIDE_STATUS, payload: false});
      dispatch({type: LOCATION_ID_CHANGED, payload: {value:0, type:0}})
    }
  }

  const getSearchData = async(searchKey) => {
    
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
    setIsLoading(false);
    console.log("set is loadin false");
    if(locationId === 0 || locationId  === undefined){
      console.log("loop list updated in location search");
      dispatch({type: LOCATION_LOOP_LISTS, payload:[...items]})
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
        return;
    }    
  }
  
  const openLocationInfo = async(location_id) => {    
    //setIsRequest(true)

    LocationInformation.load().then(res =>{      
      setLocationInfo(res);
      animation("locationInfo");
    });

    getLocationInfo( Number(location_id))
    .then((res) => {      
      if( locationRef !== undefined && locationRef.current !== undefined && locationRef.current !== null){        
        locationRef.current.updateView(res);
      }
      if(locationSearchLists.length == 0){
        dispatch(getLocationSearchList());
      }
    })
    .catch((e) =>{      
    })
  }

  const renderLocation = (item, index) => {    
    return (<LocationItem 
      isSelected={isSelected}
      item={item}    
      onItemClicked={(isChecked) => {
        if(isSelected){
          orderLists[index].checked = isChecked;
          var selectedItems = [];
          orderLists.forEach((item, index) => {
            if(item.checked != undefined && item.checked == true){
              selectedItems.push({schedule_order: (index + 1).toString() , location_id: item.location_id , schedule_date:"Today" , schedule_time:'', schedule_end_time:'' });
            }
          });
          console.log("selectedItems", selectedItems);
          setSelectedItems(selectedItems);          
        }else{
          openLocationInfo(item.location_id);
        }        
      }}>
      </LocationItem>)
  }  


  const loadMoreData = () =>{

  }
  renderFooter = () => {
    return (
    //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={loadMoreData}
          //On Click of button calling loadMoreData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Loading</Text>
          {true ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <Provider>
      
      <SafeAreaView style={{flex:1, }}>
                
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
                  ref={locationRef}
                  goPreviousPage={goPreviousPage}
                  pageType={pageType}
                  clostDetailsPopup={() =>{                
                    setShowItem(0);
                  }} locInfo={locationInfo} ></LocationInfoDetails>

            </View>
          }

          { crmStatus && showItem == 3 &&
            <View style={[styles.transitionView, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]} >
              <AddToCalendar selectedItems={selectedItems} 
                onClose={() => {  
                  dispatch({type: SLIDE_STATUS, payload: false }); 
                  setShowItem(0);        
                  setIsSelected(false); 
                  getSearchData("");                  
                }}></AddToCalendar> 
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
              isLoading={isLoading}
              animation={() => {
                animation("filter");
              }} />
                        
            <View style={{flex:1}}>
                            
              <View style={styles.buttonContainer}>
                <View style={styles.leftContainer}>
                  <TouchableOpacity 
                    disabled={isLoading} 
                    style={[styles.buttonTextStyle, {backgroundColor: isLoading ? Colors.skeletonColor : isSelected ? DISABLED_COLOR:PRIMARY_COLOR}]} 
                    onPress={()=> {
                      if(!isLoading){
                        setIsSelected(!isSelected)
                      }
                    } }>
                    <Text style={[styles.buttonText, {color:isLoading ? Colors.skeletonColor : Colors.whiteColor}]}>{isSelected? 'Cancel' : 'Select' }</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.rightContainer}>
                { isSelected && selectedItems.length > 0 && 
                  <TouchableOpacity 
                  style={styles.buttonTextStyle}
                  onPress={() =>{

                    var selectedItems = [];
                    orderLists.forEach((item, index) => {
                      if(item.checked != undefined && item.checked == true){
                        selectedItems.push({schedule_order: (index + 1).toString() , location_id: item.location_id , schedule_date:"Today" , schedule_time:'', schedule_end_time:'' });
                      }
                    });                    
                    console.log("selectedItems", selectedItems);
                    setSelectedItems(selectedItems);
                    if(selectedItems.length > 0){
                      animation("addtocalendar");
                    }

                  }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Text style={styles.buttonText}>Add to Calendar </Text>
                      <SvgIcon icon="Arrow_Right" width='13px' height='13px' />
                    </View>
                    
                  </TouchableOpacity>
                }
                </View>                              
              </View>
                            
              
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
                    onEndReachedThreshold ={0.1}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    backgroundColor: BG_COLOR,
    height: '100%',
    paddingBottom: 0
  },

  buttonContainer:{    
    paddingTop:8,
    paddingBottom:17,
    flexDirection:'row',    
    marginLeft:10,
    marginRight:10,
    
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
    paddingLeft:20,
    paddingRight:20,
    paddingTop:Platform.OS == "android" ? 5 : 8,
    paddingBottom:Platform.OS == "android" ? 5 : 8,
    borderRadius:15,
    backgroundColor: PRIMARY_COLOR
  },  
  buttonText:{
    color: Colors.whiteColor,
    fontSize: 12,
    fontFamily: Fonts.secondaryBold,
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
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },

}));