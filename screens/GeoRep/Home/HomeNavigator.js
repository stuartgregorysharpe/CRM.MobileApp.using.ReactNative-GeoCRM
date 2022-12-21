import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import HomeScreen from './HomeScreen';
import ProductSales from '../Sales/ProductSales';
import CartScreen from '../Sales/CartScreen';

const Stack = createNativeStackNavigator();

export default function HomeNavigator(props) {
  var screenProps = props.screenProps;
  if (screenProps === undefined) {
    screenProps = props.navigation;
  }
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  useEffect(() => {}, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        options={{header: () => null, headerShown: false}}>
        {props => <HomeScreen {...props} screenProps={screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="ProductSales"
        options={{header: () => null, headerShown: false}}>
        {props => (
          <ProductSales {...props} screenProps={screenProps} hasBack={true} />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="CartScreen"
        options={{header: () => null, headerShown: false}}>
        {props => (
          <CartScreen {...props} screenProps={screenProps} hasBack={true} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
