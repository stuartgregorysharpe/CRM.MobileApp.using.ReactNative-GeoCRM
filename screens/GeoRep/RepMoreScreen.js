import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RepMoreIndexScreen from './RepMoreIndexScreen';
import ContentLibraryScreen from './ContentLibraryScreen';
import ProductSalesScreen from './ProductSalesScreen';
import NotificationsScreen from './NotificationsScreen';
import WebLinksScreen from './WebLinksScreen';
import HelpScreen from './HelpScreen';
import MessagesScreen from './MessagesScreen';
import OfflineSyncScreen from './OfflineSyncScreen';
import RecordedSalesScreen from './RecordedSalesScreen';
import SalesPipelineScreen from './SalesPipelineScreen';

const Stack = createNativeStackNavigator();

export default function RepMoreScreen({navigation}) {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        options={{ header: () => null }}
      >
        {props => <RepMoreIndexScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="ContentLibrary"
        options={{ header: () => null }}
      >
        {props => <ContentLibraryScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="ProductSales"
        options={{ header: () => null }}
      >
        {props => <ProductSalesScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="Notifications"
        options={{ header: () => null }}
      >
        {props => <NotificationsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="WebLinks"
        options={{ header: () => null }}
      >
        {props => <WebLinksScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="Help"
        options={{ header: () => null }}
      >
        {props => <HelpScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="Messages"
        options={{ header: () => null }}
      >
        {props => <MessagesScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="OfflineSync"
        options={{ header: () => null }}
      >
        {props => <OfflineSyncScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="RecordedSales"
        options={{ header: () => null }}
      >
        {props => <RecordedSalesScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="SalesPipeline"
        options={{ header: () => null }}
      >
        {props => <SalesPipelineScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}