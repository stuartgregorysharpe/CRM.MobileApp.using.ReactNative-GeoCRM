import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Provider} from 'react-native-paper';
import GrayBackground from '../../../../components/GrayBackground';
import {Notification} from '../../../../components/modal/Notification';
import LocationContainer from './components/LocationContainer';

const LocationScreen = props => {
  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Notification />
        <GrayBackground />
        <LocationContainer />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LocationScreen;
