import React, { useState } from 'react';
import { SafeAreaView, Text, View, ImageBackground, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Autocomplete from 'react-native-autocomplete-input';

export default function CRMScreen(props) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.autoCompleteBox}>
          {/* <TextInput style={styles.autoComplete}/> */}
          <Autocomplete
            
          />
        </View>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  map: {
    flexGrow: 1
  },
  autoCompleteBox: {
    padding: 30,
    height: 131,
    // backgroundColor: 'red'
  },
  autoComplete: {
    shadowColor: "#00000014",
    shadowOffset: {
    	width: 0,
    	height: 5,
    },
    shadowOpacity: 0.44,
    shadowRadius: 15,
    elevation: 15,
    borderRadius: 7,
    height: 131,
  }
});
