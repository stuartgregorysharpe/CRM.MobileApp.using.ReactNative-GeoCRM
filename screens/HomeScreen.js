import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Divider from '../components/Divider';

export default function HomeScreen(props) {
  const [text, setText] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  // const [customerName, setCustomerName] = useState('');
  // const [customerName, setCustomerName] = useState('');

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  })
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Divider />
        <View style={styles.header}>
          <Title>Add Lead</Title>
          <Button color="#DC143C" uppercase={false} onPress={() => console.log('Pressed')}>
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
          label="Customer Name"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={customerName}
          onChangeText={text => setCustomerName(text)}
        />
        <TextInput
          label="Address"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={address}
          onChangeText={text => setAddress(text)}
        />
        <TextInput
          label="Primary Contact Person"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={contactPerson}
          onChangeText={text => setContactPerson(text)}
        />
        <TextInput
          label="Primary Contact Email"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={contactEmail}
          onChangeText={text => setContactEmail(text)}
        />
        <TextInput
          label="Primary Contact Mobile"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={text}
          onChangeText={text => setText(text)}
        />
        <TextInput
          label="Location Type"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={text}
          onChangeText={text => setText(text)}
        />
        <TextInput
          label="Group"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={text}
          onChangeText={text => setText(text)}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
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
    height: 300,
    marginBottom: 10
  }
})