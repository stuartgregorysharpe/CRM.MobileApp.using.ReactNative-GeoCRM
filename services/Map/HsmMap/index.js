import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import HMSMap, {MapTypes, Gravity} from '@hmscore/react-native-hms-map';

const HmsMap = props => {
  const {region} = props;
  const {longitude, latitude, zoomEnabled} = region;
  return (
    <HMSMap
      mapType={MapTypes.NORMAL}
      liteMode={false}
      scrollGesturesEnabled={zoomEnabled}
      rotateGesturesEnabled={zoomEnabled}
      tiltGesturesEnabled={false}
      camera={{
        target: {
          latitude: latitude,
          longitude: longitude,
        },
        zoom: 12,
      }}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default HmsMap;
