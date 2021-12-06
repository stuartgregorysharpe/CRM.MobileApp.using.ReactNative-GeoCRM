import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LocationScreen from './LocationScreen';
import LocationSpecificInfoScreen from './LocationSpecificInfoScreen';
import LocationSearchScreen from './LocationSearchScreen';

const Stack = createNativeStackNavigator();

export default function CRMScreen({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        options={{ header: () => null }}
      >
        {props => <LocationScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="LocationSpecificInfo"
        component={LocationSpecificInfoScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="LocationSearch"
        component={LocationSearchScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}