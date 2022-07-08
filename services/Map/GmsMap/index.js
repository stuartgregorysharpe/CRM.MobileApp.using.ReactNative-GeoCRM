import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const GmsMap = props => {
  return <MapView provider={PROVIDER_GOOGLE} {...props}></MapView>;
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default GmsMap;
