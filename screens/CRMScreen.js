import React, { Fragment, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LocationScreen from './LocationScreen';
import LocationInfoScreen from './LocationInfoScreen';
import LocationSpecificInfoScreen from './LocationSpecificInfoScreen';
import SearchResultScreen from './SearchResultScreen';
import AddLeadScreen from './AddLeadScreen';

const Stack = createNativeStackNavigator();

export default function CRMScreen({navigation}) {
  return (
    <Fragment>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          options={{ header: () => null }}
        >
          {props => <LocationScreen {...props} screenProps={navigation} />}
        </Stack.Screen>
        <Stack.Screen
          name="LocationInfo"
          options={{ header: () => null }}
        >
          {props => <LocationInfoScreen {...props} screenProps={navigation} />}
        </Stack.Screen>
        <Stack.Screen
          name="LocationSpecificInfo"
          options={{ header: () => null }}
        >
          {props => <LocationSpecificInfoScreen {...props} screenProps={navigation} />}
        </Stack.Screen>
        <Stack.Screen
          name="SearchResult"
          options={{ header: () => null }}
        >
          {props => <SearchResultScreen {...props} screenProps={navigation} />}
        </Stack.Screen>
        <Stack.Screen
          name="AddLead"
          options={{ header: () => null }}
        >
          {props => <AddLeadScreen {...props} screenProps={navigation} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Fragment>
  );
}