import React, { Fragment, useState, useEffect, useRef } from 'react';
import { 
  SafeAreaView, 
  Text, 
  View, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Animated,
  Easing
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import OutsideView from 'react-native-detect-press-outside';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

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
    <View style={styles.layoutBarContent}>
      <View style={styles.layoutBar}></View>
    </View>
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

const FilterButton = (props) => (
  <View style={styles.filterButtonBox}>
    <Text style={styles.filterText}>{props.text}</Text>
    <Image style={styles.dropdownImage} source={require("../assets/images/Drop_Down.png")} />
  </View>
);

const FilterView = () => {
  return (
    <Fragment>
      <View style={styles.layoutBarContent}>
        <View style={styles.layoutBar}></View>
      </View>
      <View style={styles.filterHeader}>
        <Text style={styles.filterHeaderText}>Filter your search</Text>
        <TouchableOpacity style={styles.filterClearButton}>
          <Text style={styles.filterClearButtonText}>Clear Filters</Text>
        </TouchableOpacity>
      </View>
      {filterButtonList.map((list, key) => (
        <FilterButton text={list} key={key} />
      ))}
      <TouchableOpacity style={styles.applyFilterButton}>
        <Text style={styles.applyFilterButtonText}>Apply Filters</Text>
      </TouchableOpacity>
    </Fragment>
  )
}

export default function LocationScreen(props) {
  const markerRef = useRef(null);
  const filterRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  
  const markerAnimatedValue = useRef(new Animated.Value(1)).current;
  const filterAnimatedValue = useRef(new Animated.Value(1)).current;

  const markerStartAnimation = (toValue) => {
    Animated.timing(markerAnimatedValue, {
      toValue,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const filterStartAnimation = (toValue) => {
    Animated.timing(filterAnimatedValue, {
      toValue,
      duration: 1000,
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
    outputRange: [0, 450],
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
        childRef={markerRef, filterRef}
        onPressOutside={() => {
          setShowModal(false);
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
            <FilterView />
          </Animated.View>
          <View style={styles.autoCompleteBox}>
            <GooglePlacesAutocomplete
              styles={{
                textInput: {
                  paddingLeft: 42,
                  paddingRight: 50,
                  color: '#5d5d5d',
                  fontSize: 16,
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              placeholder='Search'
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
              setShowModal(true);
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
          <TouchableOpacity onPress={onPressZoomIn}>
            <View style={styles.plusButton}>
              <FontAwesomeIcon size={20} color="#fff" icon={ faPlus } />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setShowModal(true);
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
    justifyContent: 'space-between'
  },
  map: {
    flexGrow: 1
  },
  autoCompleteBox: {
    position: 'relative',
    padding: 16,
    height: 76,
  },
  searchIcon: {
    position: 'absolute',
    top: 25,
    left: 25
  },
  filterImageButton: {
    position: 'absolute',
    top: 23,
    right: 25,
  },
  filterImage: {
    width: 30,
    height: 30
  },
  plusButton: {
    position: 'absolute',
    right: 30,
    bottom: 40,
    backgroundColor: PRIMARY_COLOR,
    width: 50,
    height: 50,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
    backgroundColor: '#fff',
    elevation: 2,
    zIndex: 2,
    padding: 10,
  },
  layoutBarContent: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  layoutBar: {
    width: 140,
    height: 4,
    backgroundColor: '#D8D8D8',
    borderRadius: 2
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
  filterHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  filterHeaderText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600'
  },
  filterClearButtonText: {
    color: '#DC143C'
  },
  filterButtonBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 7,
    marginBottom: 10,
    shadowColor: '#00000014',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 1,
    zIndex: 1
  },
  filterText: {
    color: '#23282D',
    fontSize: 16
  },
  dropdownImage: {
    width: 25,
    height: 25
  },
  applyFilterButton: {
    padding: 10,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 7
  },
  applyFilterButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  }
});
