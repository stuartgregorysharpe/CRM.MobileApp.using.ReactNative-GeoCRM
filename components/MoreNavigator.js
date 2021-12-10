import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import HomeScreen from '../screens/GeoRep/HomeScreen';
import CRMScreen from '../screens/GeoRep/CRMScreen';
import CalendarScreen from '../screens/GeoRep/CalendarScreen';
import RepFormsScreen from '../screens/GeoRep/FormsScreen';
import RepContentLibraryScreen from '../screens/GeoRep/ContentLibraryScreen';
import ProductSalesScreen from '../screens/GeoRep/ProductSalesScreen';
import NotificationsScreen from '../screens/GeoRep/NotificationsScreen';
import RepWebLinksScreen from '../screens/GeoRep/WebLinksScreen';
import RepHelpScreen from '../screens/GeoRep/HelpScreen';
import RepMessagesScreen from '../screens/GeoRep/MessagesScreen';
import OfflineSyncScreen from '../screens/GeoRep/OfflineSyncScreen';
import RecordedSalesScreen from '../screens/GeoRep/RecordedSalesScreen';
import RepSalesPipelineScreen from '../screens/GeoRep/SalesPipelineScreen';
import SupportScreen from '../screens/GeoRep/SupportScreen';

import CRMContentLibraryScreen from '../screens/GeoCRM/ContentLibraryScreen';
import CRMLocationsScreen from '../screens/GeoCRM/CRMLocationsScreen';
import CRMSalesPipelineScreen from '../screens/GeoCRM/SalesPipelineScreen';

import HomeLifeScreen from '../screens/GeoLife/HomeLifeScreen';
import NewsScreen from '../screens/GeoLife/NewsScreen';
import LocationsLifeScreen from '../screens/GeoLife/LocationsLifeScreen';
import CheckInScreen from '../screens/GeoLife/CheckInScreen';
import AccessScreen from '../screens/GeoLife/AccessScreen';
import ClubScreen from '../screens/GeoLife/ClubScreen';
import FlashbookScreen from '../screens/GeoLife/FlashbookScreen';
import BusinessDirectoryScreen from '../screens/GeoLife/BusinessDirectoryScreen';
import LifeContentLibraryScreen from '../screens/GeoLife/ContentLibraryScreen';
import LifeFormsScreen from '../screens/GeoLife/FormsScreen';
import LifeHelpScreen from '../screens/GeoLife/HelpScreen';
import LoyaltyCardsScreen from '../screens/GeoLife/LoyaltyCardsScreen';
import LunchOrdersScreen from '../screens/GeoLife/LunchOrdersScreen';
import LifeMessagesScreen from '../screens/GeoLife/MessagesScreen';
import ProfileScreen from '../screens/GeoLife/ProfileScreen';
import ReportFraudScreen from '../screens/GeoLife/ReportFraudScreen';
import LifeWebLinksScreen from '../screens/GeoLife/WebLinksScreen';
import WellBeingScreen from '../screens/GeoLife/WellBeingScreen';

const Stack = createNativeStackNavigator();

export default function RepMoreScreen({navigation}) {
  const visibleMore = useSelector(state => state.rep.visibleMore);
  const selectProject = useSelector(state => state.selection.selectProject);

  useEffect(() => {
    ChangeScreen(visibleMore);
  }, [visibleMore]);

  const ChangeScreen = (key) => {
    switch(key) {
      case 'Home':
        navigation.navigate("Home");
        return;
      case 'CRM':
        navigation.navigate("CRM");
        return;
      case 'Calendar':
        navigation.navigate("Calendar");
        return;
      case 'RepForms':
        navigation.navigate("RepForms");
        return;
      case 'RepContentLibrary':
        navigation.navigate("RepContentLibrary");
        return;
      case 'ProductSales':
        navigation.navigate("ProductSales");
        return;
      case 'Notifications':
        navigation.navigate("Notifications");
        return;
      case 'RepWebLinks':
        navigation.navigate("RepWebLinks");
        return;
      case 'RepHelp':
        navigation.navigate("RepHelp");
        return;
      case 'RepMessages':
        navigation.navigate("RepMessages");
        return;
      case 'OfflineSync':
        navigation.navigate("OfflineSync");
        return;
      case 'RecordedSales':
        navigation.navigate("RecordedSales");
        return;
      case 'RepSalesPipeline':
        navigation.navigate("RepSalesPipeline");
        return;
      case 'Support':
        navigation.navigate("Support");
        return;
      
      case 'CRMContentLibrary':  
        navigation.navigate("CRMContentLibrary");
        return;
      case 'CRMLocations':
        navigation.navigate("CRMLocations");
        return;
      case 'CRMSalesPipeline':
        navigation.navigate("CRMSalesPipeline");
        return;
      
      case 'HomeLife':  
        navigation.navigate("HomeLife");
        return;
      case 'News':
        navigation.navigate("News");
        return;
      case 'LocationsLife':
        navigation.navigate("LocationsLife");
        return;
      case 'CheckIn':
        navigation.navigate("CheckIn");
        return;
      case 'Access':
        navigation.navigate("Access");
        return;
      case 'Club':
        navigation.navigate("Club");
        return;
      case 'Flashbook':
        navigation.navigate("Flashbook");
        return;
      case 'BusinessDirectory':
        navigation.navigate("BusinessDirectory");
        return;
      case 'LifeContentLibrary':
        navigation.navigate("LifeContentLibrary");
        return;
      case 'LifeForms':
        navigation.navigate("LifeForms");
        return;
      case 'LifeHelp':
        navigation.navigate("LifeHelp");
        return;
      case 'LoyaltyCards':
        navigation.navigate("LoyaltyCards");
        return;
      case 'LunchOrders':
        navigation.navigate("LunchOrders");
        return;
      case 'LifeMessages':
        navigation.navigate("LifeMessages");
        return;
      case 'Profile':
        navigation.navigate("Profile");
        return;
      case 'ReportFraud':
        navigation.navigate("ReportFraud");
        return;
      case 'LifeWebLinks':
        navigation.navigate("LifeWebLinks");
        return;
      case 'WellBeing':
        navigation.navigate("WellBeing");
        return;
      default:
        return;
    }
  }

  return (
    <Stack.Navigator>
      {/* rep More screen */}

      {selectProject == 'geo_rep' && <Stack.Screen
        name="Home"
        options={{ header: () => null }}
      >
        {props => <HomeScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && <Stack.Screen
        name="CRM"
        options={{ header: () => null }}
      >
        {props => <CRMScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && <Stack.Screen
        name="Calendar"
        options={{ header: () => null }}
      >
        {props => <CalendarScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && <Stack.Screen
        name="RepForms"
        options={{ header: () => null }}
      >
        {props => <RepFormsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && <Stack.Screen
        name="RepContentLibrary"
        options={{ header: () => null }}
      >
        {props => <RepContentLibraryScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && <Stack.Screen
        name="ProductSales"
        options={{ header: () => null }}
      >
        {props => <ProductSalesScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && <Stack.Screen
        name="Notifications"
        options={{ header: () => null }}
      >
        {props => <NotificationsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && <Stack.Screen
        name="RepWebLinks"
        options={{ header: () => null }}
      >
        {props => <RepWebLinksScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && <Stack.Screen
        name="RepHelp"
        options={{ header: () => null }}
      >
        {props => <RepHelpScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && <Stack.Screen
        name="RepMessages"
        options={{ header: () => null }}
      >
        {props => <RepMessagesScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && <Stack.Screen
        name="OfflineSync"
        options={{ header: () => null }}
      >
        {props => <OfflineSyncScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && <Stack.Screen
        name="RecordedSales"
        options={{ header: () => null }}
      >
        {props => <RecordedSalesScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && <Stack.Screen
        name="RepSalesPipeline"
        options={{ header: () => null }}
      >
        {props => <RepSalesPipelineScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && <Stack.Screen
        name="Support"
        options={{ header: () => null }}
      >
        {props => <SupportScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}

      {/* crm More Screen */}

      {selectProject == 'geo_crm' && <Stack.Screen
        name="CRMContentLibrary"
        options={{ header: () => null }}
      >
        {props => <CRMContentLibraryScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_crm' && <Stack.Screen
        name="CRMLocations"
        options={{ header: () => null }}
      >
        {props => <CRMLocationsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_crm' && <Stack.Screen
        name="CRMSalesPipeline"
        options={{ header: () => null }}
      >
        {props => <CRMSalesPipelineScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}

      {/* life More screen */}

      {selectProject == 'geo_life' && <Stack.Screen
        name="HomeLife"
        options={{ header: () => null }}
      >
        {props => <HomeLifeScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="News"
        options={{ header: () => null }}
      >
        {props => <NewsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="LocationsLife"
        options={{ header: () => null }}
      >
        {props => <LocationsLifeScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="CheckIn"
        options={{ header: () => null }}
      >
        {props => <CheckInScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="Access"
        options={{ header: () => null }}
      >
        {props => <AccessScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="Club"
        options={{ header: () => null }}
      >
        {props => <ClubScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="Flashbook"
        options={{ header: () => null }}
      >
        {props => <FlashbookScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="BusinessDirectory"
        options={{ header: () => null }}
      >
        {props => <BusinessDirectoryScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="LifeContentLibrary"
        options={{ header: () => null }}
      >
        {props => <LifeContentLibraryScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="LifeForms"
        options={{ header: () => null }}
      >
        {props => <LifeFormsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="LifeHelp"
        options={{ header: () => null }}
      >
        {props => <LifeHelpScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="LoyaltyCards"
        options={{ header: () => null }}
      >
        {props => <LoyaltyCardsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="LunchOrders"
        options={{ header: () => null }}
      >
        {props => <LunchOrdersScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="LifeMessages"
        options={{ header: () => null }}
      >
        {props => <LifeMessagesScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="Profile"
        options={{ header: () => null }}
      >
        {props => <ProfileScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="ReportFraud"
        options={{ header: () => null }}
      >
        {props => <ReportFraudScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="LifeWebLinks"
        options={{ header: () => null }}
      >
        {props => <LifeWebLinksScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && <Stack.Screen
        name="WellBeing"
        options={{ header: () => null }}
      >
        {props => <WellBeingScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
    </Stack.Navigator>
  );
}