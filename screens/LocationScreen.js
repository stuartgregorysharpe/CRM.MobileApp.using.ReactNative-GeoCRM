import React, { Fragment, useState, useEffect, useRef } from 'react';
import { 
  SafeAreaView, 
  Text, 
  View, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Animated,
  Easing,
  ScrollView
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import OutsideView from 'react-native-detect-press-outside';
import { Avatar, Button, Title } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import FilterButton from '../components/FilterButton';
import Divider from '../components/Divider';
import { PRIMARY_COLOR } from '../constants/Colors';

const markers = [
  {
    path: require('../assets/images/map-marker/Purple_X.png'),
    text: 'Invalid Lead / Vacant'
  },
  {
    path: require('../assets/images/map-marker/Red_X.png'),
    text: 'DNK Request'
  },
  {
    path: require('../assets/images/map-marker/Red_Star.png'),
    text: 'No Contant - DM (F)'
  },
  {
    path: require('../assets/images/map-marker/Red_Triangle.png'),
    text: 'No Access - Final'
  },
  {
    path: require('../assets/images/map-marker/Grey_Triangle.png'),
    text: 'Not Interested'
  },
  {
    path: require('../assets/images/map-marker/Gold_Star.png'),
    text: 'Closed Won'
  },
  {
    path: require('../assets/images/map-marker/Green_Star.png'),
    text: 'Re-loop'
  },
  {
    path: require('../assets/images/map-marker/Orange_Star.png'),
    text: 'Priority Re-loop'
  },
  {
    path: require('../assets/images/map-marker/Turquoise.png'),
    text: 'Language Barrier'
  }
];

const filterButtonList = [
  "Campaign",
  "Lead Bucket",
  "Stage",
  "Outcome",
  "Outcome Modified Date",
  "Lead Status"
]

const MarkerView = () => (
  <Fragment>
    <Divider />
    <View style={styles.markerContent}>
      {markers.map((marker, key) => (
        <View style={styles.markerBox} key={key}>
          <Image style={styles.markerImage} source={marker.path} />
          <Text style={styles.markerText}>{marker.text}</Text>
        </View>
      ))}
    </View>
  </Fragment>
);

const FilterView = ({navigation}) => {
  return (
    <ScrollView style={{maxHeight: 400, backgroundColor: '#F9F9F9'}}>
      <Divider />
      <View style={styles.filterHeader}>
        <Title style={{fontFamily: 'Product Sans-Bold'}}>Filter your search</Title>
        <Button 
          labelStyle={{
            fontFamily: 'Product Sans-Regular', 
            letterSpacing: 0.2
          }}
          color="#DC143C" 
          uppercase={false} 
          onPress={() => console.log('Pressed')}
        >
          Clear Filters
        </Button>
      </View>
      {filterButtonList.map((list, key) => (
        <FilterButton text={list} key={key} />
      ))}
      <Button 
        mode="contained" 
        color={PRIMARY_COLOR} 
        uppercase={false} 
        labelStyle={{
          fontSize: 18, 
          fontFamily: 'Gilroy-Bold', 
          letterSpacing: 0.2
        }} 
        onPress={() => navigation.navigate('LocationInfo')}>
        Apply Filters
      </Button>
    </ScrollView>
  )
}

export default function LocationScreen(props) {
  const markerRef = useRef(null);
  const filterRef = useRef(null);

  const markerAnimatedValue = useRef(new Animated.Value(1)).current;
  const filterAnimatedValue = useRef(new Animated.Value(1)).current;

  const markerStartAnimation = (toValue) => {
    Animated.timing(markerAnimatedValue, {
      toValue,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const filterStartAnimation = (toValue) => {
    Animated.timing(filterAnimatedValue, {
      toValue,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const markerTranslateY = markerAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 350],
    extrapolate: 'clamp',
  });

  const filterTranslateY = filterAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 550],
    extrapolate: 'clamp',
  });

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  })

  const onPressZoomIn = () => {
    setMapRegion({
      latitude: mapRegion.latitude,
      longitude: mapRegion.longitude,
      latitudeDelta: mapRegion.latitudeDelta * 2,
      longitudeDelta: mapRegion.longitudeDelta * 2
    })
  }

  return (
    <SafeAreaView>
      <OutsideView
        childRef={filterRef}
        onPressOutside={() => {
          markerStartAnimation(1);
          filterStartAnimation(1);
        }}>
        <View style={styles.container}>
          <Animated.View
            ref={markerRef}
            style={[styles.transitionView, { transform: [{ translateY: markerTranslateY }] }]}
          >
            <MarkerView />
          </Animated.View>
          <Animated.View
            ref={filterRef}
            style={[styles.transitionView, { transform: [{ translateY: filterTranslateY }] }]}
          >
            <FilterView navigation={props.navigation} />
          </Animated.View>
          <View style={styles.autoCompleteBox}>
            <GooglePlacesAutocomplete
              styles={{
                textInput: {
                  paddingLeft: 42,
                  paddingRight: 50,
                  color: '#5d5d5d',
                  fontSize: 16,
                  fontFamily: 'Gilroy-Medium',
                  backgroundColor: '#fff',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              placeholder='Search.....'
              onPress={(data, details = null) => {
                console.log(data, details);
              }}
              query={{
                key: 'AIzaSyA36_9T7faYSK-w84OhxTe9CIbx4THru3o',
                language: 'en',
              }}
            />
            <FontAwesomeIcon style={styles.searchIcon} size={25} color="#9D9FA2" icon={ faSearch } />
            <TouchableOpacity style={styles.filterImageButton} onPress={() => {
              filterStartAnimation(0);
              markerStartAnimation(1);
            }}>
              <Image style={styles.filterImage} source={require('../assets/images/Filter.png')} />
            </TouchableOpacity>
          </View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation = {true}
            followUserLocation = {true}
            showsMyLocationButton = {true}
            zoomEnabled = {true}
            region={mapRegion}
          >
          </MapView>
          <TouchableOpacity style={styles.plusButton} onPress={onPressZoomIn}>
            <Avatar.Text 
              size={50}
              label="+"
              style={{ backgroundColor: PRIMARY_COLOR }}
              labelStyle={{fontSize: 30}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            markerStartAnimation(0);
            filterStartAnimation(1);
          }}>
            <Image style={styles.pinKey} source={require('../assets/images/Pin_Key.png')} />
          </TouchableOpacity>
        </View>
      </OutsideView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9'
  },
  map: {
    flexGrow: 1
  },
  plusButton: {
    position: 'absolute',
    right: 30,
    bottom: 40,
  },
  pinKey: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 92,
    height: 22,
  },
  transitionView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F9F9F9',
    elevation: 2,
    zIndex: 2,
    padding: 10,
  },
  autoCompleteBox: {
    position: 'relative',
    padding: 10,
    height: 66,
  },
  searchIcon: {
    position: 'absolute',
    top: 20,
    left: 20
  },
  filterImageButton: {
    position: 'absolute',
    top: 18,
    right: 20,
  },
  filterImage: {
    width: 30,
    height: 30
  },
  markerContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  markerBox: {
    width: '45%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  markerImage: {
    width: 22,
    height: 30,
    marginRight: 10
  },
  markerText: {
    color: '#23282D',
    fontFamily: 'Gilroy-Medium'
  },
  filterHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  }
});
