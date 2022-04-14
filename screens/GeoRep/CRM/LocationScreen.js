import React, { useState, useEffect ,useRef} from 'react';
import { SafeAreaView, Text, TextInput, View, TouchableOpacity, Dimensions, BackHandler , Image, Platform , AppState ,PermissionsAndroid} from 'react-native';
import { Provider } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import { useSelector, useDispatch } from 'react-redux';
import MapView , { Marker, Region, PROVIDER_GOOGLE ,Polygon , Polyline } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import AddLead from './popup/AddLead';
import FilterView from '../../../components/FilterView';
import SvgIcon from '../../../components/SvgIcon';
import GrayBackground from '../../../components/GrayBackground';
import Colors, {whiteLabel} from '../../../constants/Colors';
import { boxShadow, style } from '../../../constants/Styles';
import { breakPoint } from '../../../constants/Breakpoint';
import { CHANGE_CURRENT_LOCATION, CHANGE_LOGIN_STATUS, CHANGE_POLYGONS, IS_CALENDAR_SELECTION, SELECTED_LOCATIONS_FOR_CALENDAR, SLIDE_STATUS } from '../../../actions/actionTypes';
import { getLocationPinKey, getLocationFilters, getLocationInfo, getLocationMapByRegion } from '../../../actions/location.action';
import Fonts from '../../../constants/Fonts';
import Images from '../../../constants/Images';
import { MarkerView } from './partial/MarkerView';
import MarkerIcon from '../../../components/Marker';
import ClusteredMapView from './components/ClusteredMapView'
import { LocationInfoDetails } from './locationInfoDetails/LocationInfoDetails';
import Geolocation from 'react-native-geolocation-service';
import { updateCurrentLocation } from '../../../actions/google.action';
import { CrmCalendarSelection } from './partial/CrmCalendarSelection';
import { expireToken, isInsidePoly } from '../../../constants/Consts';0
import AddToCalendar from '../../../components/modal/AddToCalendar';
import { getMapMinZoomLevel, getPinSvg, getPolygonFillColorTransparency, setToken, storePinSvg } from '../../../constants/Storage';
import { Notification } from '../../../components/modal/Notification';
import { SvgXml } from 'react-native-svg';
import { useTransitionProgress } from 'react-native-screens';

const SlidUpArrow = () => (
  <View style={styles.slidUpArrow}>
    <Text style={styles.slidUpArrowText}>Pin Key</Text>
    <FontAwesomeIcon size={12} icon={faChevronUp} color={whiteLabel().mainText} />
  </View>
)

let isMount = true;
let id = 0;
let previousZoom = 0;
let mapPinSvg = null;

export default function LocationScreen(props) {

  const navigation = props.navigation;
  const crmStatus = useSelector(state => state.rep.crmSlideStatus);  
  const polygons = useSelector(state => state.location.polygons);
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const filterParmeterChanged = useSelector(state => state.selection.mapFilters);
  const isCalendarSelection = useSelector(state => state.selection.isCalendarSelection);
  const selectedLocationsForCalendar = useSelector( state => state.selection.selectedLocationsForCalendar);

  const dispatch = useDispatch();
  const [showItem, setShowItem] = useState("map_view");
  const [locationInfo, setLocationInfo] = useState();  
  const [isRequest, setIsRequest] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const map = useRef(null)
  const [pageType, setPageType ] = useState({name:"search-lists"});
  const locationRef = useRef();
  const appState = useRef(AppState.currentState);
  const [setAppStateVisible] = useState(appState.current);
  const watchId = useRef<Number | null>(null);
  const [polygonLists, setPolygons] = useState([]);
  const [locationMaps , setLocationMap] = useState([]);
  const [isZoomOut , setIsZoomOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [boundBox, setBoundBox] = useState(undefined);
  const [editing , setEditing] = useState(null);
  const [creatingHole, setCreatingHole] = useState(false);
  const [isDraw , setIsDraw] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [tracksViewChanges, setTracksViewChanges] = useState(false);
  const [isGuranted, setIsGuranted] = useState(false);
  const [transCode, setTransCode] = useState("05");
    
  useEffect(() => { 
    initCode();
    refreshHeader();
    if (crmStatus) {
      props.screenProps.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    }     
    requestPermissions();    
    return () => {
      isMount = false;
    };    
  },[]);

  useEffect(() => {
    console.log("updated current location");
    console.log("isMount", isMount);
    console.log("editing", editing);
    console.log("is Draw", isDraw)
  },[currentLocation , editing, isDraw ,polygonLists]);


  useEffect(() => {
    console.log("locationMaps");    
  },[locationMaps ]);
 
  const initCode = async()  =>{
    var code = await getPolygonFillColorTransparency();
    setTransCode(code);
  }
  
  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth === 'granted') {
        dispatch(updateCurrentLocation());
        setIsGuranted(true);
      }
    }

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,        
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("gurranted -----")
          dispatch(updateCurrentLocation());
          setIsGuranted(true);
      }
    }
  }

  useEffect(() => {
      if( watchId.current === null || watchId.current === undefined){
          watchId.current = Geolocation.watchPosition(
            (position) => {         
                console.log("Tracking..")  
                if(currentLocation.latitude !== position.coords.latitude){
                  dispatch({type: CHANGE_CURRENT_LOCATION, payload: {latitude: position.coords.latitude ,longitude: position.coords.longitude , accuracy: position.coords.accuracy } });
                  console.log("track position", position);                
                }                
            },
            (error) => {
                console.log("tracking error");
                console.log(error);
                dispatch({type: CHANGE_CURRENT_LOCATION, payload: {latitude: currentLocation.latitude ,longitude: currentLocation.longitude , accuracy: currentLocation.accuracy , msg:'tracking error' } });
            },
            {
              distanceFilter: 5,
              desiredAccuracy: {
                  ios: "best",
                  android: "highAccuracy"
              },
              headingOrientation: "portrait",
              // Android ONLY
              androidProvider: "auto",
              interval: 2000, // Milliseconds
              fastestInterval: 2000, // Milliseconds
              maxWaitTime: 3000, // Milliseconds
              // IOS ONLY
              allowsBackgroundLocationUpdates: true,
              headingFilter: 1, // Degrees
              pausesLocationUpdatesAutomatically: false,
              showsBackgroundLocationIndicator: false,                
            },
        );
      }

      loadPinSvg();
      return () => {
        console.log("End page");
          if (watchId.current) {
            console.log("End page --");
              Geolocation.clearWatch(watchId.current);
          }          
      }
  }, []);
      
  useEffect(() => {
    if(polygons !== undefined && isMount && polygonLists.length === 0){
      //console.log("po is Mount", JSON.stringify(polygons.length));
      var tmp = [];
      polygons.forEach(element => {
        element.path.forEach(coords => {
          if(coords.length > 0 && coords[0].latitude !== undefined && coords[0].longitude !== undefined){
            let item = {
              path:element.path,
              fillColor: element.fillColor,
              strokeColor: element.strokeColor
            }
            tmp.push(item);
          }
        });
      });
      setPolygons(tmp);
    }
  },[polygons]);

  useEffect(() => {    
    console.log("crm bottom updated")
    refreshHeader();
    if (crmStatus) {
      props.screenProps.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    }
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, [crmStatus]);
  
  useEffect(() => {    
    console.log("crm navigation")
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("focuseed")
      isMount = true;
      refreshHeader();
      if (crmStatus) {
        props.screenProps.setOptions({
          tabBarStyle: {
            display: 'none',
          },
        });
      }
      if(map.current !== null && map.current.props){     
        console.log("focuseed on change region")
        map.current.props.onRegionChangeComplete();     
      }
    });
    return unsubscribe;
  }, [navigation]);
    
  useEffect(() => {
    console.log("filterParmeterChanged", filterParmeterChanged)
    if(currentLocation  && currentLocation.latitude !== undefined && boundBox !== undefined && isGuranted){
      setIsLoading(true);      
      getLocationMapByRegion(currentLocation, boundBox).then((res) =>{                                                                    
        console.log(res.locations);
        setIsLoading(false);        
        setLocationMap([...res.locations]);          
        dispatch({ type: CHANGE_POLYGONS, payload: res.polygons });        
      }).catch((e) => {
        expireToken(dispatch, e);
      });
    }                  
  }, [filterParmeterChanged]);
  
  const loadPinSvg = async() =>{
    mapPinSvg = await getPinSvg("@map_pin_key");        
  }

  const refreshHeader = () =>{
    props.screenProps.setOptions({           
      headerTitle:() =>{
        return(<TouchableOpacity                     
           onPress={
          () =>{
            dispatch({type: SLIDE_STATUS, payload: false});
            setIsBack(false);            
            if(navigation.canGoBack()){              
              navigation.goBack();              
            }
          }}>            
          <View style={style.headerTitleContainerStyle}>            
              {
                isBack &&
                <Image
                  resizeMethod='resize'
                  style={{width:15,height:20, marginRight:5}}
                  source={Images.backIcon}
                />
              }
            <Text style={style.headerTitle} >CRM</Text>
        </View></TouchableOpacity>)
      },

      headerLeft: () => (
        <TouchableOpacity 
          style={style.headerLeftStyle} 
          activeOpacity={1}
          onPress={() => {
            dispatch({type: SLIDE_STATUS, payload: false});
            setIsBack(false);            
            if(navigation.canGoBack()){              
              navigation.goBack();              
            }
          }}>            
        </TouchableOpacity>
      ),

      tabBarStyle: {
        position: 'absolute',
        height: 50,
        paddingBottom: Platform.OS == "android" ? 5 : 0,          
        backgroundColor: Colors.whiteColor,
      },
    });
  }

  const handleBackButtonClick = () => {
    if (crmStatus) {
      dispatch({type: SLIDE_STATUS, payload: false});
      return true;
    }
    props.navigation.goBack();
    return true;
  }


  const animation = (name) => {
    dispatch({type: SLIDE_STATUS, payload: true});
    setShowItem(name);
    if(name === "addLead" || name === "locationInfo"){
      setIsBack(true);
    }    
  }
  
  const finish = () => {
    setEditing(null);
    setCreatingHole(false);
  }

  const onPressMap = (e) => {
    if (!editing) {                          
      setEditing({
        id: id++,
        coordinates: [e.nativeEvent.coordinate],
        holes: [],
      });                      
    } else if (!creatingHole) {
      if(editing !== null && editing !== undefined){        
        setEditing({
          ...editing,
          coordinates: [...editing.coordinates, e.nativeEvent.coordinate],
        });                            
        if(editing.coordinates.length >= 2 && isFinish === false){                              
          setIsFinish(true);
        }
      }
    } else {        
        const holes = [...editing.holes];                            
        holes[holes.length - 1] = [
          ...holes[holes.length - 1],
          e.nativeEvent.coordinate,
        ];                                  
        setEditing({
            ...editing,
            id: id++, // keep incrementing id to trigger display refresh
            coordinates: [...editing.coordinates],
            holes,                          
        });                                        
    }
  }

  const regionChanged = async( region,  markers, bBox, zoom ) => {

    var minZoomLevel = await getMapMinZoomLevel();
    console.log("minZoomLevel", minZoomLevel);

    if(zoom >= minZoomLevel){
      if(isZoomOut === true){
        console.log("hide");
        setIsZoomOut(false);
      }
    }else{
      if(isZoomOut === false){
        setIsZoomOut(true);
      }
    }

    console.log("previous zoom", previousZoom);
    console.log("zoom ", zoom);
    
    if( markers !== undefined && markers.length < 20 ||  markers === undefined ){
      if( (previousZoom < minZoomLevel && zoom >= minZoomLevel && !isDraw) || ( previousZoom >= zoom  && zoom >= minZoomLevel && !isDraw ) ){
        setBoundBox(bBox);
        if(isLoading === false){
          setIsLoading(true);
          console.log("call map api =======", bBox);
          if( currentLocation && currentLocation.latitude){
            getLocationMapByRegion(currentLocation, bBox).then((res) =>{            
              console.log(" RE" , res)
              var lists = [...res.locations];
              setLocationMap(lists);                       
              setIsLoading(false);
              dispatch({ type: CHANGE_POLYGONS, payload: res.polygons });            
            }).catch((e) => {  
              console.log("EEE",e);
              expireToken(dispatch, e);
            });
          }          
        }                                    
      }
    }                      
    previousZoom = zoom;
  }

  
  const onMarkerPressed = (item , key) => {
    if(isCalendarSelection){
      var selectedLocations = [...selectedLocationsForCalendar];
      var flag = false;
      for(var i = 0; i < selectedLocations.length ; i++){
        if(selectedLocations[i].location_id === item.location_id){
          flag = true;
        }
      }
      if(flag){
        selectedLocations = selectedLocations.filter(ele => ele.location_id !== item.location_id);
      }else{
        selectedLocations = [...selectedLocations , {schedule_order: (key + 1).toString() , location_id: item.location_id , schedule_date:"Today" , schedule_time:'', schedule_end_time:'' } ];                            
      }               
      console.log("item.location_id",item.location_id);
      setTracksViewChanges(true);
      dispatch({type: SELECTED_LOCATIONS_FOR_CALENDAR, payload: selectedLocations});
      
    }else{
      openLocaitonInfoDetails( Number(item.location_id) );
    }
  }

  const openLocaitonInfoDetails = (location_id) => {
      animation("locationInfo");           
      if(currentLocation && currentLocation.latitude !== undefined){
        getLocationInfo( Number(location_id) , currentLocation)
        .then((res) => {                
            if( locationRef !== undefined && locationRef.current !== undefined && locationRef.current !== null){        
              locationRef.current.updateView(res);
              setLocationInfo(res);
            }
        })
        .catch((e) =>{
          expireToken(dispatch, e);
          setIsRequest(false);
        })
      }
      
  }

  return (
    <Provider>
      <SafeAreaView style={{flex:1}}>        
        <Notification/>
        <GrayBackground />        
        {
          crmStatus && (showItem == "marker" || showItem == "filter") && 
          <View style={[styles.transitionView, showItem === "map_view"  ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]} >
            
            {showItem == "marker" && <MarkerView isRequest={isRequest} />}            
            {
              showItem == "filter" && 
              <FilterView navigation={props.navigation} page={"map"} onClose={() =>{
                setShowItem("map_view");
                dispatch({type: SLIDE_STATUS, payload: false});
              }} />
            }
          </View>
        }

        {
          crmStatus && showItem ===  "addLead" &&
          <AddLead screenProps={props.screenProps} 
                onClose={(location_id) => {                  
                  //setIsBack(false);            
                  dispatch({type: SLIDE_STATUS, payload: false});
                  openLocaitonInfoDetails( Number(location_id) );

          }} />
        }
        
        {
          crmStatus &&  showItem == "locationInfo" && 
          <View style={[styles.transitionView, { top: 0 }, showItem == "map_view" ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]} >             
              <LocationInfoDetails ref={locationRef} navigation={props.navigation} screenProps={props.screenProps}  locInfo={locationInfo} pageType={pageType} />            
          </View>
        }
     
                
        { crmStatus && showItem == "addtocalendar" &&
            <View style={[styles.transitionView, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]} >              
              <AddToCalendar selectedItems={selectedLocationsForCalendar} 
                onClose={() => {
                  dispatch({type: SLIDE_STATUS, payload: false });
                  setShowItem("map_view");
                  dispatch({type: IS_CALENDAR_SELECTION, payload: false});
                  dispatch({type: SELECTED_LOCATIONS_FOR_CALENDAR, payload: []});                  
                }}></AddToCalendar>
            </View>
        }

        <View style={styles.container}>
          <View style={styles.searchBox}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={()=> {
                isMount = false;
                dispatch({type: SLIDE_STATUS, payload: false});
                props.navigation.navigate("LocationSearch");
              }}
            >
              <View pointerEvents='none'>
                <TextInput
                  style={[styles.searchInput, boxShadow]}
                  placeholder='Search.....'
                  placeholderTextColor={whiteLabel().helpText}
                />
              </View>
            </TouchableOpacity>

            <FontAwesomeIcon style={styles.searchIcon} size={16} color={whiteLabel().inactiveIcon} icon={ faSearch } />
              <TouchableOpacity style={styles.filterImageButton} onPress={() => {
                dispatch(getLocationFilters());
                animation("filter");
              }}>
              <SvgIcon icon="Filter" style={styles.Filter} width="30px" height="30px" />
            </TouchableOpacity>
          </View>

          {
            isCalendarSelection &&
            <CrmCalendarSelection            
              isDraw={isDraw}
              onClickDraw={() => {              
                console.log(isDraw);
                if(isDraw){
                  finish();
                  setIsFinish(false);
                }else{
                  if(tracksViewChanges === true){
                    setTracksViewChanges(false);
                  }
                }
                setIsDraw(!isDraw);
            }}
            onClickCancel={() => {
              props.navigation.navigate("LocationSearch");
            }}
            onClickList={() => {
              props.navigation.navigate("LocationSearch");
            }}
            onClickAddToCalendar={() => {
              animation("addtocalendar")
            }}
            >              
            </CrmCalendarSelection>
          }

          {
            currentLocation.latitude !== undefined && currentLocation.longitude !== undefined &&
            <View style={styles.mapContainer}>
                  <ClusteredMapView
                    clusterColor={whiteLabel().mainText}
                    ref={map}
                    //mapType="hybrid"
                    clusteringEnabled={true}
                    style={styles.mapView}                    
                    editing={editing}
                    scrollEnabled={!isDraw}          
                    onRegionChangeComplete={(region, markers , bBox , zoom) => {                                              
                      console.log(" ------------ on region changed ------");                      
                      regionChanged(region,  markers, bBox, zoom);
                      if(tracksViewChanges){
                        setTracksViewChanges(false);
                      }
                    }}                                      
                    onPress={(e) =>{
                      if(isCalendarSelection && isDraw){
                        onPressMap(e);
                      }                                            
                    }}
                    initialRegion={{                      
                      latitude: currentLocation.latitude,
                      longitude: currentLocation.longitude,
                      latitudeDelta: 0.015,
                      longitudeDelta: 0.015,
                    }}

                    currentLocation={{
                      latitude: currentLocation.latitude,
                      longitude: currentLocation.longitude,
                    }}>

                    {locationMaps.map((item , key) => (
                      <Marker
                        key={"markers" + item.location_id}               
                        tracksViewChanges={tracksViewChanges} 
                        onPress={() =>{
                          onMarkerPressed(item , key);                                                      
                        }}
                        coordinate={{
                          latitude: Number(item.coordinates.latitude),
                          longitude: Number(item.coordinates.longitude),
                        }}>                        
                        {
                          mapPinSvg.find(element => parseInt(element.pin_id) == parseInt(item.pin_id)) && mapPinSvg.find(element => parseInt(element.pin_id) == parseInt(item.pin_id)).svg_code &&
                          <SvgXml style={styles.markerIcon} xml={mapPinSvg.find(element => parseInt(element.pin_id) == parseInt(item.pin_id)).svg_code } width="34px" height="34px" />
                        }                        
                      </Marker>
                    ))}

                    {
                      editing && editing.coordinates.length === 2 &&
                      <Polyline    
                        key={"polyline"}
                        coordinates={editing.coordinates}                        
                        strokeColor="#000"                        
                        strokeWidth={1}
                      />                      
                    }
                    
                    {
                      polygonLists && polygonLists.length > 0  &&
                      polygonLists.map(polygon =>(                                            
                        polygon.path.map(item => (
                          <Polygon            
                            key={"polygons" + item.location_id}                  
                            coordinates={item}
                            //holes={polygon.holes}
                            strokeColor={polygon.strokeColor}
                            fillColor={polygon.fillColor + transCode }
                            strokeWidth={1}
                          />
                        ))                          
                      ))                        
                    }

                    <MapView.Circle
                      key={(currentLocation.longitude + currentLocation.latitude).toString()}
                      center = {{
                        latitude:  currentLocation.latitude,
                        longitude: currentLocation.longitude
                      }}
                      radius = { 200 }
                      strokeWidth = { 1 }
                      strokeColor = {Colors.primaryColor}
                      fillColor = { 'rgba(230,238,255,0.5)' }
                    />                        
                  </ClusteredMapView>          

                  {
                    (isLoading || isZoomOut ) &&
                    <View style={styles.bubble}>
                      <Text>
                        {
                          isLoading? 'Loading ....' : isZoomOut ? 'Zoomed out too far, zoom in to see results' : ''
                        }
                      </Text>
                    </View>                     
                  }               
                                      
                  {
                    isFinish && 
                    <TouchableOpacity style={styles.finishBtnStyle} onPress={() => {                      
                      setIsFinish(false);
                      setIsDraw(false);                      
                      
                      var selectedLocations = [...selectedLocationsForCalendar];
                      for(var i = 0; i <= locationMaps.length - 1; i++){
                        var flag = isInsidePoly(locationMaps[i].coordinates.latitude, locationMaps[i].coordinates.longitude, [editing.coordinates] );     
                        if(flag){
                          selectedLocations = [...selectedLocations , {schedule_order: (i + 1).toString() , location_id: locationMaps[i].location_id , schedule_date:"Today" , schedule_time:'', schedule_end_time:'' } ];                          
                        }                   
                      }
                      dispatch({type: SELECTED_LOCATIONS_FOR_CALENDAR, payload: selectedLocations});
                      finish();
                    }}>
                      <View>                      
                        <Text> Finish </Text>                      
                      </View>                     
                    </TouchableOpacity>                      
                  }
                         

            </View>
          }
                                        
            <TouchableOpacity
              style={styles.plusButton} 
              onPress={() => {                
                animation("addLead");
              }}>
              <SvgIcon icon="Round_Btn_Default_Dark" width='70px' height='70px' />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.pinKeyButton}
              onPress={() => {                
                dispatch(getLocationPinKey());
                animation("marker");
              }}>
              <SlidUpArrow />
            </TouchableOpacity>

        </View>
      </SafeAreaView>
    </Provider>
  )
}

const perWidth = setWidthBreakpoints(breakPoint);
const styles = EStyleSheet.create(parse({
  container: {
    flex:1,
    justifyContent: 'space-between',
    backgroundColor: Colors.bgColor,        
    paddingBottom: Platform.OS == "android" ? 50 : 50,    
  },
  map: {
    flexGrow: 1,
    height:Dimensions.get("screen").height - 150,    
  },
  plusButton: {
    position: 'absolute',
    right: 20,
    bottom: 100,
  },
  pinKeyButton: {
    position: 'absolute',
    right: perWidth('auto', 9),
    left: perWidth(9, 'auto'),
    bottom: perWidth(100, 70),
    padding: 5
  },
  slidUpArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: whiteLabel().actionFullButtonBackground,
    backgroundColor: Colors.whiteColor,
    borderRadius: 6,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2
  },
  slidUpArrowText: {
    color: whiteLabel().mainText,
    fontSize: 12,
    fontFamily: Fonts.secondaryMedium,
    marginRight: 8,
  },
  pinKey: {
    width: 80,
    height: 18,
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
  searchBox: {
    position: perWidth('absolute', 'relative'),
    width: '100%',
    padding: 10,
    zIndex: 1,
    elevation: 1
  },
  searchInput: {
    paddingLeft: 36,
    paddingRight: 50,
    fontSize: 12,
    backgroundColor: Colors.whiteColor,
    borderRadius: 7,
    fontFamily: Fonts.secondaryMedium,
    height: 45,
  },
  
  searchIcon: {
    position: 'absolute',
    top: 24,
    left: 20,
  },
  filterImageButton: {
    position: 'absolute',
    top: 18,
    right: 20,
  },
  mapContainer: {
    flex: 1,  
  },
  mapView: { flex: 1, width: '100%', height: '100%' },
  bubble:{
    position:'absolute', alignSelf:'center' , bottom:0 ,paddingLeft:10, paddingRight:10, paddingTop:7, paddingBottom:7,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    backgroundColor: 'rgba(255,255,255,0.9)'
  },

  finishBtnStyle:{
    position:'absolute', alignSelf:'center' , bottom:20 ,paddingLeft:15, paddingRight:15, paddingTop:10, paddingBottom:10,
    borderRadius:7,
    backgroundColor: 'rgba(255,255,255,0.9)'
  },

}));
