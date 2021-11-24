import React, { Fragment } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LocationScreen from './LocationScreen';
import LocationInfoScreen from './LocationInfoScreen';
// import LocationSpecificInfoScreen from './LocationSpecificInfoScreen';
import SearchResultScreen from './SearchResultScreen';
import AddLeadScreen from './AddLeadScreen';

const Stack = createNativeStackNavigator();

export default function CRMScreen() {
  return (
    <Fragment>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={LocationScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="LocationInfo"
          component={LocationInfoScreen}
          options={{ header: () => null }}
        />
        {/* <Stack.Screen
          name="LocationSpecificInfo"
          component={LocationSpecificInfoScreen}
          options={{ header: () => null }}
        /> */}
        <Stack.Screen
          name="SearchResult"
          component={SearchResultScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="AddLead"
          component={AddLeadScreen}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    </Fragment>
  );
}