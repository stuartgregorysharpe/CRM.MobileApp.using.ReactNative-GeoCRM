import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import LocationScreen from './LocationScreen';
import LocationScreen from './location/LocationScreen';
import LocationSpecificInfoScreen from './checkin/LocationSpecificInfoScreen';
import LocationSearchScreen from './LocationSearchScreen';
import {useSelector} from 'react-redux';
import TouchpointScreen from '../Touchpoint/TouchpointScreen';

const Stack = createNativeStackNavigator();

export default function CRMScreen(props) {
  var screenProps = props.screenProps;
  if (screenProps === undefined) {
    screenProps = props.navigation;
  }
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  useEffect(() => {}, []);

  if (features.includes('disable_crm_map_view')) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Root" options={{header: () => null}}>
          {props => (
            <LocationSearchScreen {...props} screenProps={screenProps} />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="LocationSpecificInfo"
          options={{header: () => null, headerShown: false}}>
          {props => (
            <LocationSpecificInfoScreen {...props} screenProps={screenProps} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  } else {
    
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          options={{header: () => null, headerShown: false}}>
          {props => <LocationScreen {...props} screenProps={screenProps} />}
        </Stack.Screen>
        <Stack.Screen
          name="TouchpointScreen"
          options={{header: () => null, headerShown: false}}>
          {props => <TouchpointScreen {...props} screenProps={screenProps} />}
        </Stack.Screen>
        <Stack.Screen name="LocationSearch" options={{header: () => null}}>
          {props => (
            <LocationSearchScreen {...props} screenProps={screenProps} />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="LocationSpecificInfo"
          options={{header: () => null, headerShown: false}}>
          {props => (
            <LocationSpecificInfoScreen {...props} screenProps={screenProps} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}
