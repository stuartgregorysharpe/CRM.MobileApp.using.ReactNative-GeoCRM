import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import HomeScreen from '../screens/GeoRep/HomeScreen';
import CRMScreen from '../screens/GeoRep/CRM/CRMScreen';
import CalendarScreen from '../screens/GeoRep/Calendar/CalendarScreen';
import RepFormsScreen from '../screens/GeoRep/Forms/FormsNavigator';
import RepContentLibraryScreen from '../screens/GeoRep/ContentLibrary/ContentLibraryScreen';
import ProductSalesScreen from '../screens/GeoRep/ProductSalesScreen';
import NotificationsScreen from '../screens/GeoRep/NotificationsScreen';
import RepWebLinksScreen from '../screens/GeoRep/WebLinks/WebLinksScreen';
import RepSupportScreen from '../screens/GeoRep/Support/SupportScreen';
import RepMessagesScreen from '../screens/GeoRep/MessagesScreen';
import OfflineSyncScreen from '../screens/GeoRep/OfflineSyncScreen';
import RecordedSalesScreen from '../screens/GeoRep/RecordedSalesScreen';
import RepSalesPipelineScreen from '../screens/GeoRep/pipeline/SalesPipelineScreen';
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
import LoyaltyCardsScreen from '../screens/GeoLife/LoyaltyCardsScreen';
import LunchOrdersScreen from '../screens/GeoLife/LunchOrdersScreen';
import LifeMessagesScreen from '../screens/GeoLife/MessagesScreen';
import ReportFraudScreen from '../screens/GeoLife/ReportFraudScreen';
import LifeWebLinksScreen from '../screens/GeoLife/WebLinksScreen';
import WellBeingScreen from '../screens/GeoLife/WellBeingScreen';

const Stack = createNativeStackNavigator();

export default function RepMoreScreen({navigation}) {
  const payload = useSelector(state => state.selection.payload);
  const visibleMore = useSelector(state => state.rep.visibleMore);
  const selectProject = useSelector(state => state.selection.selectProject);

  const [ componentListOne, setComponentListOne ] = useState([]);
  const [ componentListTwo, setComponentListTwo ] = useState([]);
  const [ componentListThree, setComponentListThree ] = useState([]);

  useEffect(() => {
    if (payload.user_scopes.geo_rep) {
      setComponentListOne([
        payload.user_scopes.geo_rep.modules_nav_order[4],
        payload.user_scopes.geo_rep.modules_nav_order[5],
        payload.user_scopes.geo_rep.modules_nav_order[6],
        payload.user_scopes.geo_rep.modules_nav_order[7],
        payload.user_scopes.geo_rep.modules_nav_order[8],
        payload.user_scopes.geo_rep.modules_nav_order[9],
        payload.user_scopes.geo_rep.modules_nav_order[10],
        payload.user_scopes.geo_rep.modules_nav_order[11],
        payload.user_scopes.geo_rep.modules_nav_order[12],
      ]);
    }
    if (payload.user_scopes.geo_life) {
      setComponentListTwo([
        payload.user_scopes.geo_life.modules_nav_order[4],
        payload.user_scopes.geo_life.modules_nav_order[5],
        payload.user_scopes.geo_life.modules_nav_order[6],
        payload.user_scopes.geo_life.modules_nav_order[7],
        payload.user_scopes.geo_life.modules_nav_order[8],
        payload.user_scopes.geo_life.modules_nav_order[9],
        payload.user_scopes.geo_life.modules_nav_order[10],
        payload.user_scopes.geo_life.modules_nav_order[11],
        payload.user_scopes.geo_life.modules_nav_order[12],
        payload.user_scopes.geo_life.modules_nav_order[13],
        payload.user_scopes.geo_life.modules_nav_order[14],
        payload.user_scopes.geo_life.modules_nav_order[15],
        payload.user_scopes.geo_life.modules_nav_order[16],
        payload.user_scopes.geo_life.modules_nav_order[17]
      ]);
    }
    if (payload.user_scopes.geo_crm) {
      setComponentListThree([
        payload.user_scopes.geo_crm.modules_nav_order[4]
      ]);
    };
  }, [payload]);

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
        navigation.navigate("RepForms", { screen: 'Root', params: { locationInfo: null } });
        //navigation.navigate("RepForms");
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
      case 'RepSupport':
        navigation.navigate("Support");
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
      // case 'LifeSupport':
      //   navigation.navigate("Support");
      //   return;
      case 'LoyaltyCards':
        navigation.navigate("LoyaltyCards");
        return;
      case 'LunchOrders':
        navigation.navigate("LunchOrders");
        return;
      case 'LifeMessages':
        navigation.navigate("LifeMessages");
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

      {selectProject == 'geo_rep' && componentListOne.includes('home_geo') && <Stack.Screen
        name="Home"
        options={{ header: () => null }}
      >
        {props => <HomeScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && componentListOne.includes('crm_locations') && <Stack.Screen
        name="CRM"
        options={{ header: () => null }}
      >
        {props => <CRMScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      
      {selectProject == 'geo_rep' && componentListOne.includes('web_links') && <Stack.Screen
        name="RepWebLinks"
        options={{ header: () => null }}
      >
        {props => <RepWebLinksScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}

      {selectProject == 'geo_rep' && componentListOne.includes('calendar') && <Stack.Screen
        name="Calendar"
        options={{ header: () => null }}
      >
        {props => <CalendarScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      
      
      {selectProject == 'geo_rep' && componentListOne.includes('forms') && <Stack.Screen
        name="RepForms"
        options={{ header: () => null }}
      >
        {props => <RepFormsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}


      {selectProject == 'geo_rep' && componentListOne.includes('content_library') && <Stack.Screen
        name="RepContentLibrary"
        options={{ header: () => null }}
      >
        {props => <RepContentLibraryScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && componentListOne.includes('product_sales') && <Stack.Screen
        name="ProductSales"
        options={{ header: () => null }}
      >
        {props => <ProductSalesScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && componentListOne.includes('notifications') && <Stack.Screen
        name="Notifications"
        options={{ header: () => null }}
      >
        {props => <NotificationsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && componentListOne.includes('messages') && <Stack.Screen
        name="RepMessages"
        options={{ header: () => null }}
      >
        {props => <RepMessagesScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && componentListOne.includes('offline_sync') && <Stack.Screen
        name="OfflineSync"
        options={{ header: () => null }}
      >
        {props => <OfflineSyncScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && componentListOne.includes('recorded_sales') && <Stack.Screen
        name="RecordedSales"
        options={{ header: () => null }}
      >
        {props => <RecordedSalesScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_rep' && componentListOne.includes('sales_pipeline') && <Stack.Screen
        name="RepSalesPipeline"
        options={{ header: () => null }}
      >
        {props => <RepSalesPipelineScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}

      {/* crm More Screen */}

      {selectProject == 'geo_crm' && componentListThree.includes('content_library') && <Stack.Screen
        name="CRMContentLibrary"
        options={{ header: () => null }}
      >
        {props => <CRMContentLibraryScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_crm' && componentListThree.includes('crm_locations') && <Stack.Screen
        name="CRMLocations"
        options={{ header: () => null }}
      >
        {props => <CRMLocationsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_crm' && componentListThree.includes('sales_pipeline') && <Stack.Screen
        name="CRMSalesPipeline"
        options={{ header: () => null }}
      >
        {props => <CRMSalesPipelineScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}

      {/* life More screen */}

      {selectProject == 'geo_life' && componentListTwo.includes('home_life') && <Stack.Screen
        name="HomeLife"
        options={{ header: () => null }}
      >
        {props => <HomeLifeScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && componentListTwo.includes('news') && <Stack.Screen
        name="News"
        options={{ header: () => null }}
      >
        {props => <NewsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && componentListTwo.includes('locations_life') && <Stack.Screen
        name="LocationsLife"
        options={{ header: () => null }}
      >
        {props => <LocationsLifeScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && componentListTwo.includes('check_in') && <Stack.Screen
        name="CheckIn"
        options={{ header: () => null }}
      >
        {props => <CheckInScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && componentListTwo.includes('access') && <Stack.Screen
        name="Access"
        options={{ header: () => null }}
      >
        {props => <AccessScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && componentListTwo.includes('club') && <Stack.Screen
        name="Club"
        options={{ header: () => null }}
      >
        {props => <ClubScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && componentListTwo.includes('flashbook') && <Stack.Screen
        name="Flashbook"
        options={{ header: () => null }}
      >
        {props => <FlashbookScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && componentListTwo.includes('business_directory') && <Stack.Screen
        name="BusinessDirectory"
        options={{ header: () => null }}
      >
        {props => <BusinessDirectoryScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && componentListTwo.includes('content_library') && <Stack.Screen
        name="LifeContentLibrary"
        options={{ header: () => null }}
      >
        {props => <LifeContentLibraryScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && componentListTwo.includes('forms') && <Stack.Screen
        name="LifeForms"
        options={{ header: () => null }}
      >
        {props => <LifeFormsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && componentListTwo.includes('loyalty_cards') && <Stack.Screen
        name="LoyaltyCards"
        options={{ header: () => null }}
      >
        {props => <LoyaltyCardsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && componentListTwo.includes('lunch_orders') && <Stack.Screen
        name="LunchOrders"
        options={{ header: () => null }}
      >
        {props => <LunchOrdersScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && componentListTwo.includes('messages') && <Stack.Screen
        name="LifeMessages"
        options={{ header: () => null }}
      >
        {props => <LifeMessagesScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && componentListTwo.includes('report_fraud') && <Stack.Screen
        name="ReportFraud"
        options={{ header: () => null }}
      >
        {props => <ReportFraudScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && componentListTwo.includes('web_links') && <Stack.Screen
        name="LifeWebLinks"
        options={{ header: () => null }}
      >
        {props => <LifeWebLinksScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}
      {selectProject == 'geo_life' && componentListTwo.includes('well_being') && <Stack.Screen
        name="WellBeing"
        options={{ header: () => null }}
      >
        {props => <WellBeingScreen {...props} screenProps={navigation} />}
      </Stack.Screen>}

      <Stack.Screen
        name="Support"
        options={{ header: () => null }}
      >
        {props => <RepSupportScreen {...props} screenProps={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}