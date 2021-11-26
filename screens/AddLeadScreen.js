import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Divider from '../components/Divider';
import { PRIMARY_COLOR, BG_COLOR } from '../constants/Colors';

export default function AddLeadScreen(props) {
  useEffect(() => {
    props.screenProps.setOptions({
      tabBarStyle: {
        display: 'flex',
        height: 60,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#fff",
      },
    });
  })

  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [locationType, setLocationType] = useState('');
  const [group, getGroup] = useState('');

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  })
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Divider style={{marginBottom: 20}} />
        <View style={styles.header}>
          <Title style={{fontFamily: 'Product Sans-Bold'}}>Add Lead</Title>
          <Button 
            labelStyle={{
              fontFamily: 'Product Sans-Regular', 
              letterSpacing: 0.2
            }}
            color="#DC143C" 
            uppercase={false} 
            onPress={() => console.log('Pressed')}
          >
            Clear
          </Button>
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
        <TextInput
          style={styles.textInput}
          label="Customer Name"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={customerName}
          onChangeText={text => setCustomerName(text)}
        />
        <View style={styles.linkBox}>
          <Text style={styles.linkBoxText}>Use Current Geo Location</Text>
          <Text style={styles.accuracyText}>Accuracy: 22m</Text>
        </View>
        <TextInput
          style={styles.textInput}
          label="Address"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={address}
          onChangeText={text => setAddress(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Primary Contact Person"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={contactPerson}
          onChangeText={text => setContactPerson(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Primary Contact Email"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={contactEmail}
          onChangeText={text => setContactEmail(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Primary Contact Mobile"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={contactMobile}
          onChangeText={text => setContactMobile(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Location Type"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={locationType}
          onChangeText={text => setLocationType(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Group"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={group}
          onChangeText={text => getGroup(text)}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    padding: 10,
    marginBottom: 10
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  map: {
    width: '100%',
    height: 230,
    marginBottom: 10
  },
  textInput: {
    height: 50,
    fontFamily: 'Gilroy-Medium',
    marginBottom: 10
  },
  linkBox: {
    position: 'relative',
    marginBottom: 8
  },
  linkBoxText: {
    color: PRIMARY_COLOR,
    fontFamily: 'Gilroy-Medium',
    textDecorationLine: 'underline',
    textDecorationColor: PRIMARY_COLOR,
    textAlign: 'center'
  },
  accuracyText: {
    fontFamily: 'Gilroy-Medium',
    position: 'absolute',
    top: 2,
    right: 0,
    fontSize: 12
  }
})