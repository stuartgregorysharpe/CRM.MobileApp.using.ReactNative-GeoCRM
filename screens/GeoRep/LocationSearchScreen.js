import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, Dimensions , KeyboardAvoidingView} from 'react-native';
import { Provider } from 'react-native-paper';
import { useSelector, useDispatch , connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import GrayBackground from '../../components/GrayBackground';
import LocationInfo from '../../components/LocationInfo';
import FilterView from '../../components/FilterView';
import SearchBar from '../../components/SearchBar';
import Skeleton from '../../components/Skeleton';
import { PRIMARY_COLOR, BG_COLOR, TEXT_COLOR } from '../../constants/Colors';
import { breakPoint } from '../../constants/Breakpoint';
import { BACK_ICON_STATUS, SLIDE_STATUS } from '../../actions/actionTypes';
import { getLocationFilters, getLocationInfo } from '../../actions/location.action';
import Fonts from '../../constants/Fonts';
import CustomHeader from '../../components/Header/CustomHeader';

const ResultItem = ({navigation, item, animation}) => {

  const dispatch = useDispatch();
  return (
    <TouchableOpacity style={styles.resultItem} onPress={() => {
      animation();      
      dispatch(getLocationInfo(Number(item.location_id)));
    }}>
      <View style={{ maxWidth: '48%' }}>
        <Text style={styles.subTitle}>{item.name}</Text>
        <Text style={styles.text}>{item.address}</Text>
      </View>
      <View style={{ maxWidth: '48%' }}>
        <Text style={[styles.subTitle, styles.textRight]}>
          {item.distance} mi
        </Text>
        <Text style={[styles.text, styles.textRight,{color:item.status_text_color}]}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function LocationSearchScreen({navigation}) {

  const dispatch = useDispatch();
  const crmStatus = useSelector(state => state.rep.crmSlideStatus);
  const statusLocationSearchLists = useSelector(state => state.location.statusLocationSearchLists);
  const locationSearchLists = useSelector(state => state.location.locationSearchLists);
  const currentLocation = useSelector(state => state.rep.currentLocation);

  const [orderLists, setOrderLists] = useState([]);
  const [showItem, setShowItem] = useState(0);

  const getDistance = (prelatlng, currentlatlng) => {
    const prevLatInRad = toRad(Number(prelatlng.latitude));
    const prevLongInRad = toRad(Number(prelatlng.longitude));
    const latInRad = toRad(currentlatlng.latitude);
    const longInRad = toRad(currentlatlng.longitude);
  
    return (
      // In mile
      3963 *
      Math.acos(
        Math.sin(prevLatInRad) * Math.sin(latInRad) +
          Math.cos(prevLatInRad) * Math.cos(latInRad) * Math.cos(longInRad - prevLongInRad),
      )
    );
  }
  
  const toRad = (angle) => {
    return (angle * Math.PI) / 180;
  }

  useEffect(() => {
    dispatch({type: SLIDE_STATUS, payload: false});
  }, []);

  useEffect(() => {
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
      items.push(item);
    });
    items.sort((a, b) => a.distance > b.distance ? 1 : -1);    
    setOrderLists(items);
  }, [locationSearchLists]);

  const animation = (name) => {
    dispatch({type: SLIDE_STATUS, payload: true});
    switch(name) {
      case "filter":        
        dispatch(getLocationFilters());
        setShowItem(1);
        return;
      case "locationInfo":
        setShowItem(2);
        dispatch({type: BACK_ICON_STATUS, payload: true});
        return;
      default:
        
        return;
    }
    
  }

  if (statusLocationSearchLists == "request") {
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


  return (
    <Provider>
      <SafeAreaView style={{flex:1}}>
          
          <GrayBackground />
          {crmStatus && showItem == 1 && <View
            style={[styles.transitionView, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]}
          >
            <FilterView navigation={navigation} />
          </View>}

          {crmStatus && showItem == 2 &&
            <View
              style={[styles.transitionView, {top: 0}, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]}>
              <LocationInfo navigation={navigation} /> 
            </View>
          } 

            <View style={styles.container}>

              <SearchBar animation={() => animation("filter")} />

              <ScrollView>
                <Text style={styles.title}>Current Location</Text>
                {orderLists.map((locationSearchList, key) => (
                  <ResultItem key={key} navigation={navigation} item={locationSearchList} animation={() => animation("locationInfo")} />
                ))}
              </ScrollView>
            </View>
            
      </SafeAreaView>
    </Provider>
  )
}

const perWidth = setWidthBreakpoints(breakPoint);
const styles = EStyleSheet.create(parse({
  container: {
    position: 'relative',
    backgroundColor: BG_COLOR,
    height: '100%',
    paddingBottom: 70
  },
  title: {
    color: PRIMARY_COLOR,
    fontSize: 15,
    fontFamily: Fonts.secondaryBold,
    paddingLeft: 14,
    marginBottom: 10
  },

  resultItem: {
    maxWidth: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    borderTopWidth: 1,
    borderColor: '#e7e7e7'
  },
  subTitle: {
    fontSize: 14,
    fontFamily: Fonts.secondaryBold,
    color: TEXT_COLOR,
    marginBottom: 4
  },
  text: {
    fontSize: 12,
    fontFamily: Fonts.secondaryMedium,
    color: '#9D9FA2',
  },
  textRight: {
    textAlign: 'right'
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
}));