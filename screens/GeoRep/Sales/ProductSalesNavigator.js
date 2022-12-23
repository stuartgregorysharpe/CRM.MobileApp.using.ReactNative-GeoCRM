import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductSales from './ProductSales';
import CartScreen from './CartScreen';

const Stack = createNativeStackNavigator();

export default function ProductSalesNavigator(props) {
  var screenProps = props.screenProps;
  if (screenProps === undefined) {
    screenProps = props.navigation;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" options={{header: () => null}}>
        {props => <ProductSales {...props} screenProps={screenProps} />}
      </Stack.Screen>

      <Stack.Screen
        name="CartScreen"
        options={{header: () => null, headerShown: false}}>
        {props => <CartScreen {...props} screenProps={screenProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
