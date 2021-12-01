import React, { Fragment } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import { PRIMARY_COLOR } from '../constants/Colors';
import BottomTabNavigator from '../components/BottomTabNavigator';

const Stack = createNativeStackNavigator();

export default function AppScreens() {
  return (
    <Fragment>
      <StatusBar translucent backgroundColor={PRIMARY_COLOR} />
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: PRIMARY_COLOR,
          }
        }}
      >
        <Stack.Screen 
          name="Root" 
          component={BottomTabNavigator} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </Fragment>
  );
}