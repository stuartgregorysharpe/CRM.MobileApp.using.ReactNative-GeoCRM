import React, {useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import { TextInput, Button, Title } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import Divider from './Divider';
import { PRIMARY_COLOR, BG_COLOR } from '../constants/Colors';
import { breakPoint } from '../constants/Breakpoint';
import { SLIDE_STATUS } from '../actions/actionTypes';
import Fonts from '../constants/Fonts';
import { DISABLED_COLOR } from '../../constants/Colors';

export default function AddLead({screenProps}) {
  const dispatch = useDispatch();

  const customerNameRef = useRef();
  const addressRef = useRef();
  const contactEmailRef = useRef();
  const contactPersonRef = useRef();
  const contactMobileRef = useRef();
  const locationTypeRef = useRef();
  const groupRef = useRef();


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
  });

  return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={{padding: 6 }} onPress={() => dispatch({type: SLIDE_STATUS, payload: false})}>
          <Divider />
        </TouchableOpacity>
        <View style={styles.header}>
          <Title style={{ fontFamily: Fonts.primaryBold }}>Add Lead</Title>
          <Button 
            labelStyle={{
              fontFamily: Fonts.primaryRegular, 
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
        <TouchableOpacity
          activeOpacity={1}
          onPress={()=>customerNameRef.current.focus()}
        >
            <View>
              <TextInput
                ref = {customerNameRef}
                style={styles.textInput}
                label="Customer Name"
                mode="outlined"
                outlineColor="#133C8B"
                activeOutlineColor={DISABLED_COLOR}
                value={customerName}
                onChangeText={text => setCustomerName(text)}
              />
          </View>
        </TouchableOpacity>
        <View style={styles.linkBox}>
          <Text style={styles.linkBoxText}>Use Current Geo Location</Text>
          <Text style={styles.accuracyText}>Accuracy: 22m</Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={()=>addressRef.current.focus()}
        >
          <View>
            <TextInput
              ref = {addressRef}
              style={styles.textInput}
              label="Address"
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor={DISABLED_COLOR}
              value={address}
              onChangeText={text => setAddress(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={()=>contactPersonRef.current.focus()}
        >
          <View>
            <TextInput
              ref = {contactPersonRef} 
              style={styles.textInput}
              label="Primary Contact Person"
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor={DISABLED_COLOR}
              value={contactPerson}
              onChangeText={text => setContactPerson(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={()=>contactEmailRef.current.focus()}
        >
          <View>
            <TextInput
              ref = {contactEmailRef} 
              style={styles.textInput}
              label="Primary Contact Email"
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor={DISABLED_COLOR}
              value={contactEmail}
              onChangeText={text => setContactEmail(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={()=>contactMobileRef.current.focus()}
        >
          <View>
            <TextInput
              ref = {contactMobileRef} 
              style={styles.textInput}
              label="Primary Contact Mobile"
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor={DISABLED_COLOR}
              value={contactMobile}
              onChangeText={text => setContactMobile(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={()=>locationTypeRef.current.focus()}
        >
          <View>
            <TextInput
              ref = {locationTypeRef} 
              style={styles.textInput}
              label="Location Type"
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor={DISABLED_COLOR}
              value={locationType}
              onChangeText={text => setLocationType(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={()=>groupRef.current.focus()}
        >
          <View>
            <TextInput
              ref = {groupRef} 
              style={styles.textInput}
              label="Group"
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor={DISABLED_COLOR}
              value={group}
              onChangeText={text => getGroup(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => console.log("pressed")}>
          <Text style={[styles.addButtonText]}>Add</Text>
          <FontAwesomeIcon style={styles.addButtonIcon} size={25} color="#fff" icon={ faAngleDoubleRight } />
        </TouchableOpacity>
      </ScrollView>
  )
}

const perWidth = setWidthBreakpoints(breakPoint);

const styles = EStyleSheet.create(parse({
  container: {
    backgroundColor: 'BG_COLOR',
    zIndex: 100,
    elevation: 100
  },
  header: {
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
    fontSize: 14,
    lineHeight: 30,
    height: 40,
    backgroundColor: BG_COLOR,
    fontFamily: Fonts.secondaryMedium,
    marginBottom: 8
  },
  linkBox: {
    position: 'relative',
    marginBottom: 8
  },
  linkBoxText: {
    color: PRIMARY_COLOR,
    fontFamily: Fonts.secondaryMedium,
    textDecorationLine: 'underline',
    textDecorationColor: PRIMARY_COLOR,
    textAlign: 'center'
  },
  accuracyText: {
    fontFamily: Fonts.secondaryMedium,
    position: 'absolute',
    top: 2,
    right: 0,
    fontSize: 12
  },
  addButton: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 7,
    backgroundColor: PRIMARY_COLOR
  },
  addButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: Fonts.secondaryBold
  },
  addButtonIcon: {
    position: 'absolute',
    right: 10
  }
}));