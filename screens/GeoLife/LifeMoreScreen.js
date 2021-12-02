import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LifeMoreIndexScreen from './LifeMoreIndexScreen';
import AccessScreen from './AccessScreen';
import ClubScreen from './ClubScreen';
import FlashbookScreen from './FlashbookScreen';
import BusinessDirectoryScreen from './BusinessDirectoryScreen';
import ContentLibraryScreen  from './ContentLibraryScreen';
import FormsScreen from './FormsScreen';
import HelpScreen from './HelpScreen';
import LoyaltyCardsScreen from './LoyaltyCardsScreen';
import LunchOrdersScreen from './LunchOrdersScreen';
import MessagesScreen from './MessagesScreen';
import ProfileScreen from './ProfileScreen';
import ReportFraudScreen from './ReportFraudScreen';
import WebLinksScreen from './WebLinksScreen';
import WellBeingScreen from './WellBeingScreen';

const Stack = createNativeStackNavigator();

export default function LifeMoreScreen({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        options={{ header: () => null }}
      >
        {props => <LifeMoreIndexScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="Access"
        options={{ header: () => null }}
      >
        {props => <AccessScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="Club"
        options={{ header: () => null }}
      >
        {props => <ClubScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="Flashbook"
        options={{ header: () => null }}
      >
        {props => <FlashbookScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="BusinessDirectory"
        options={{ header: () => null }}
      >
        {props => <BusinessDirectoryScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="ContentLibrary"
        options={{ header: () => null }}
      >
        {props => <ContentLibraryScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="Forms"
        options={{ header: () => null }}
      >
        {props => <FormsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="Help"
        options={{ header: () => null }}
      >
        {props => <HelpScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="LoyaltyCards"
        options={{ header: () => null }}
      >
        {props => <LoyaltyCardsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="LunchOrders"
        options={{ header: () => null }}
      >
        {props => <LunchOrdersScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="Messages"
        options={{ header: () => null }}
      >
        {props => <MessagesScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="Profile"
        options={{ header: () => null }}
      >
        {props => <ProfileScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="ReportFraud"
        options={{ header: () => null }}
      >
        {props => <ReportFraudScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="WebLinks"
        options={{ header: () => null }}
      >
        {props => <WebLinksScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="WellBeing"
        options={{ header: () => null }}
      >
        {props => <WellBeingScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}