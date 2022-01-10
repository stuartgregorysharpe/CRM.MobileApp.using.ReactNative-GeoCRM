import React, { Fragment, useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, View, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import { Provider } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import { useSelector, useDispatch } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import AddLead from '../../../components/AddLead';
import LocationInfo from './LocationInfo';
import FilterView from '../../../components/FilterView';
import MarkerIcon from '../../../components/Marker';
import Skeleton from '../../../components/Skeleton';
import SvgIcon from '../../../components/SvgIcon';
import Divider from '../../../components/Divider';
import GrayBackground from '../../../components/GrayBackground';
import { PRIMARY_COLOR, BG_COLOR, TEXT_COLOR } from '../../../constants/Colors';
import { boxShadow } from '../../../constants/Styles';
import { breakPoint } from '../../../constants/Breakpoint';
import { BACK_ICON_STATUS, SLIDE_STATUS } from '../../../actions/actionTypes';

import { 
  getLocationPinKey, 
  getLocationFilters,
  getLocationSearchList,
  getLocationInfo,
  getLocationsMap,
  getLeadFields
} from '../../../actions/location.action';
import Fonts from '../../../constants/Fonts';


const MarkerView = () => {
  const dispatch = useDispatch();
  const statusPinKeys = useSelector(state => state.location.statusPinKeys);
  const pins = useSelector(state => state.location.locationPins);
  const [markerIcons, setMarkerIcons] = useState([]);

  useEffect(() => {
    let items = [];
    pins.map((pin, key) => {
      items.push({
        text: pin.label,
        icon: pin.pin_image.split('/')[pin.pin_image.split('/').length - 1]
      })
    })
    setMarkerIcons(items)
  }, [pins])

  if (statusPinKeys == "request") {
    return (
      <SafeAreaView>
        <View style={{padding: 10, justifyContent: 'center'}}>
          {Array.from(Array(6)).map((_, key) => (
            <Skeleton key={key} />  
          ))}
        </View>
      </SafeAreaView>
    )
  }

  return (
    <Fragment>
      <TouchableOpacity style={{ padding: 6 }} onPress={() => dispatch({type: SLIDE_STATUS, payload: false})}>
        <Divider />
      </TouchableOpacity>
      <View style={styles.markerContent}>
        {markerIcons.map((markerIcon, key) => (
          <View style={styles.markerBox} key={key}>
            <MarkerIcon style={styles.markerIcon} icon={markerIcon.icon} width="28px" height="28px" />
            <Text style={styles.markerText}>{markerIcon.text}</Text>
          </View>
        ))}
      </View>
    </Fragment>
  )
};

const SlidUpArrow = () => (
  <View style={styles.slidUpArrow}>
    <Text style={styles.slidUpArrowText}>Pin Key</Text>
    <FontAwesomeIcon size={12} icon={faChevronUp} color={PRIMARY_COLOR} />
  </View>
)


export default function LocationScreen(props) {

  const crmStatus = useSelector(state => state.rep.crmSlideStatus);
  const locationMaps = useSelector(state => state.location.locationMaps);
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const dispatch = useDispatch();

  const [showItem, setShowItem] = useState(0);

  useEffect(() => {
    props.screenProps.setOptions({
     
      tabBarStyle: {
        position: 'absolute',
        height: 50,      
        paddingBottom: Platform.OS == "android" ? 5 : 0,          
        backgroundColor: "#fff",
      },
    });
    if (crmStatus) {
      props.screenProps.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    }

  });

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, [crmStatus]);

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
    switch(name) {
      case "marker":
        setShowItem(1);
        return;
      case "filter":
        setShowItem(2);
        return;
      case "addLead":
        setShowItem(3);
        dispatch({type: BACK_ICON_STATUS, payload: true});
        return;
      case "locationInfo":
        setShowItem(4);
        return;
      default:
        return;
    }
  }

  return (
    <Provider>
      <SafeAreaView style={{flex:1}}>
        <GrayBackground />


        {crmStatus && (showItem == 1 || showItem == 2) && <View
          style={[styles.transitionView, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]}
        >
          {showItem == 1 && <MarkerView />}
          {showItem == 2 && <FilterView navigation={props.navigation} />}
        </View>}
        
        {crmStatus && (showItem == 3 || showItem == 4) && <View
          style={[styles.transitionView, { top: 0 }, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]}
        >
          {showItem == 3 && <AddLead screenProps={props.screenProps} />}
          {showItem == 4 && <LocationInfo navigation={props.navigation} screenProps={props.screenProps} />}
        </View>}

        

        <View style={styles.container}>

          
          {/* <SearchBar animation={() => animation("filter")} /> */}

          <View style={styles.searchBox}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={()=> {
                dispatch({type: SLIDE_STATUS, payload: false});
                dispatch(getLocationSearchList());
                props.navigation.navigate("LocationSearch");
              }}
            >
              <View pointerEvents='none'>
                <TextInput
                  style={[styles.searchInput, boxShadow]}
                  placeholder='Search.....'
                />
              </View>
            </TouchableOpacity>
            <FontAwesomeIcon style={styles.searchIcon} size={16} color="#9D9FA2" icon={ faSearch } />
            <TouchableOpacity style={styles.filterImageButton} onPress={() => {
              dispatch(getLocationFilters());
              animation("filter");
            }}>
              <SvgIcon icon="Filter" width="30px" height="30px" />
            </TouchableOpacity>
          </View>

          
          <MapView
            moveOnMarkerPress={false}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation = {true}
            followUserLocation = {true}
            showsMyLocationButton = {true}
            zoomEnabled = {true}
            region={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121
            }}
            onPress={(e) => console.log(e)}
          >
            {locationMaps.map((locationMap, key) => (
              <Marker
                key={key}
                coordinate={{
                  latitude: Number(locationMap.coordinates.latitude),
                  longitude: Number(locationMap.coordinates.longitude)
                }}
                onPress={() => {
                  dispatch(getLocationInfo(Number(locationMap.location_id)));
                  animation("locationInfo");
                }}
              >
                <MarkerIcon style={styles.markerIcon} icon={locationMap.pin_image} width="34px" height="34px" />
              </Marker>
            ))}
            <MapView.Circle
              center = {{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude
              }}
              radius = { 200 }
              strokeWidth = { 1 }
              strokeColor = {PRIMARY_COLOR}
              fillColor = { 'rgba(230,238,255,0.5)' }
            />
          </MapView>

          <TouchableOpacity 
            style={styles.plusButton} 
            onPress={() => {
              dispatch(getLocationsMap());
              dispatch(getLeadFields());
              animation("addLead");
            }}
          >
            <SvgIcon icon="Round_Btn_Default_Dark" width='70px' height='70px' />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.pinKeyButton}
            onPress={() => {
              dispatch(getLocationPinKey());
              animation("marker");
            }}
          >
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
    backgroundColor: BG_COLOR,    
    paddingBottom: 60
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
    borderColor: PRIMARY_COLOR,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2
  },
  slidUpArrowText: {
    color: PRIMARY_COLOR,
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
    backgroundColor: BG_COLOR,
    elevation: 2,
    zIndex: 2,
    padding: 10,
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
    color: '#5d5d5d',
    fontSize: 12,
    backgroundColor: '#fff',
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
  markerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  markerBox: {
    width: perWidth('30%', '45%'),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  markerIcon: {
    marginRight: 10
  },
  markerText: {
    fontSize: 12,
    color: TEXT_COLOR,
    fontFamily: Fonts.secondaryMedium
  },
  goToAddLead: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    backgroundColor: '#fff',
    borderColor: PRIMARY_COLOR,
    borderRadius: 4,
    borderWidth: 1,
    padding: 2
  },
  goToAddLeadText: {
    color: PRIMARY_COLOR
  },
}));
