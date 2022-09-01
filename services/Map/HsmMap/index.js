import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import HMSMap, {MapTypes, Gravity} from '@hmscore/react-native-hms-map';
import {Colors} from '../../../constants';
import SvgIcon from '../../../components/SvgIcon';

const HmsMap = props => {
  const {region, currentLocation} = props;
  const {longitude, latitude, zoomEnabled} = region;
  const mapRef = useRef(null);
  const goToCurrentLocation = () => {
    if (currentLocation) {
      mapRef.current.setCoordinates({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
    }
  };
  return (
    <View style={[styles.container, props.style]}>
      <HMSMap
        ref={mapRef}
        mapType={MapTypes.NORMAL}
        liteMode={false}
        scrollGesturesEnabled={zoomEnabled}
        rotateGesturesEnabled={zoomEnabled}
        tiltGesturesEnabled={false}
        useAnimation={true}
        animationDuration={1000}
        camera={{
          target: {
            latitude: latitude,
            longitude: longitude,
          },
          zoom: 15,
        }}
        {...props}
      />
      <View style={styles.myLocation}>
        <TouchableOpacity
          onPress={() => {
            goToCurrentLocation();
          }}>
          <SvgIcon icon="GPS_LOCATION" width="20px" height="20px" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  myLocation: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 30,
    height: 30,
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    zIndex: 20000,
    justifyContent: 'center',
  },
});

export default HmsMap;
