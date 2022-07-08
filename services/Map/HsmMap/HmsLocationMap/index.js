import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import HMSMap, {MapTypes, Gravity} from '@hmscore/react-native-hms-map';

const HmsLocationMap = props => {
  return (
    <HMSMap
      mapType={MapTypes.NORMAL}
      liteMode={false}
      camera={{
        target: {
          latitude: 41.02155220194891,
          longitude: 29.0037998967586,
        },
        zoom: 12,
      }}
      logoPosition={Gravity.TOP | Gravity.START}
      logoPadding={{
        paddingStart: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingEnd: 0,
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

export default HmsLocationMap;
