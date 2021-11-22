import React, { Fragment } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LocationScreen from './LocationScreen';
import LocationInfoScreen from './LocationInfoScreen';

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
      </Stack.Navigator>
    </Fragment>
  );
}