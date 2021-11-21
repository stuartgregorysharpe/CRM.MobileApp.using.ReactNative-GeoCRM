import React, { Fragment } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LocationScreen from './LocationScreen';

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
      </Stack.Navigator>
    </Fragment>
  );
}