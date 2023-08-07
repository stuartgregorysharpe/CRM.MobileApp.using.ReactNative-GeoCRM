import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import HomeScreen from '../screens/GeoRep/Home/HomeScreen';
import CRMScreen from '../screens/GeoRep/CRM/CRMScreen';
import CalendarScreen from '../screens/GeoRep/Calendar/CalendarScreen';
import RepFormsScreen from '../screens/GeoRep/Forms/FormsNavigator';
import RepContentLibraryScreen from '../screens/GeoRep/ContentLibrary/ContentLibraryScreen';
import ProductSalesScreen from '../screens/GeoRep/Sales/ProductSalesNavigator';
import NotificationsScreen from '../screens/GeoRep/NotificationsScreen';
import RepWebLinksScreen from '../screens/GeoRep/WebLinks/WebLinksScreen';
import RepSupportScreen from '../screens/GeoRep/Support/SupportScreen';
import RepMessagesScreen from '../screens/GeoRep/MessagesScreen';
import RecordedSalesScreen from '../screens/GeoRep/RecordedSalesScreen';
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
import Stock from '../screens/GeoRep/Stock/Stock';
import { useDispatch } from 'react-redux';
import { SalesPipelineScreen } from '../screens/GeoRep/Pipeline/SalesPipelineScreen';
import LearningScreen from '../screens/GeoRep/Learning/Learning';
import CourseDashboardScreen from '../screens/GeoRep/Learning/CourseDashboard';
import TermsToKnowScreen from '../screens/GeoRep/Learning/TermsToKnow';
import LessonStepsScreen from '../screens/GeoRep/Learning/LessonSteps';
import QuizStepsScreen from '../screens/GeoRep/Learning/QuizSteps.js';
import LessonCheckStepScreen from '../screens/GeoRep/Learning/LessonCheckSteps.js';


const Stack = createNativeStackNavigator();

export default function RepMoreScreen(props) {
  const { navigation } = props;

  return (
    <Stack.Navigator>
      {/* rep More screen */}

      <Stack.Screen name="Home" options={{ header: () => null }}>
        {props => <HomeScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="CRM" options={{ header: () => null }}>
        {props => <CRMScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="RepWebLinks" options={{ header: () => null }}>
        {props => <RepWebLinksScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="Calendar" options={{ header: () => null }}>
        {props => <CalendarScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="RepForms" options={{ header: () => null }}>
        {props => <RepFormsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="RepContentLibrary" options={{ header: () => null }}>
        {props => (
          <RepContentLibraryScreen {...props} screenProps={navigation} />
        )}
      </Stack.Screen>
      <Stack.Screen name="ProductSales" options={{ header: () => null }}>
        {props => <ProductSalesScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="Notifications" options={{ header: () => null }}>
        {props => <NotificationsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="RepMessages" options={{ header: () => null }}>
        {props => <RepMessagesScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="RecordedSales" options={{ header: () => null }}>
        {props => <RecordedSalesScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="RepSalesPipeline" options={{ header: () => null }}>
        {props => <SalesPipelineScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="Stock" options={{ header: () => null }}>
        {props => <Stock {...props} screenProps={navigation} />}
      </Stack.Screen>

      {/* crm More Screen */}

      <Stack.Screen name="CRMContentLibrary" options={{ header: () => null }}>
        {props => (
          <CRMContentLibraryScreen {...props} screenProps={navigation} />
        )}
      </Stack.Screen>

      <Stack.Screen name="CRMLocations" options={{ header: () => null }}>
        {props => <CRMLocationsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="CRMSalesPipeline" options={{ header: () => null }}>
        {props => (
          <CRMSalesPipelineScreen {...props} screenProps={navigation} />
        )}
      </Stack.Screen>

      <Stack.Screen name="Learning" options={{ header: () => null }}>
        {props => (
          <LearningScreen {...props} screenProps={navigation} />
        )}
      </Stack.Screen>

      {/* life More screen */}

      <Stack.Screen name="HomeLife" options={{ header: () => null }}>
        {props => <HomeLifeScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="News" options={{ header: () => null }}>
        {props => <NewsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="LocationsLife" options={{ header: () => null }}>
        {props => <LocationsLifeScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="CheckIn" options={{ header: () => null }}>
        {props => <CheckInScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="Access" options={{ header: () => null }}>
        {props => <AccessScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="Club" options={{ header: () => null }}>
        {props => <ClubScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="Flashbook" options={{ header: () => null }}>
        {props => <FlashbookScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="BusinessDirectory" options={{ header: () => null }}>
        {props => (
          <BusinessDirectoryScreen {...props} screenProps={navigation} />
        )}
      </Stack.Screen>

      <Stack.Screen name="LifeContentLibrary" options={{ header: () => null }}>
        {props => (
          <LifeContentLibraryScreen {...props} screenProps={navigation} />
        )}
      </Stack.Screen>

      <Stack.Screen name="LifeForms" options={{ header: () => null }}>
        {props => <LifeFormsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="LoyaltyCards" options={{ header: () => null }}>
        {props => <LoyaltyCardsScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="LunchOrders" options={{ header: () => null }}>
        {props => <LunchOrdersScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="LifeMessages" options={{ header: () => null }}>
        {props => <LifeMessagesScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="ReportFraud" options={{ header: () => null }}>
        {props => <ReportFraudScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="LifeWebLinks" options={{ header: () => null }}>
        {props => <LifeWebLinksScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="WellBeing" options={{ header: () => null }}>
        {props => <WellBeingScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="RepSupport" options={{ header: () => null }}>
        {props => <RepSupportScreen {...props} screenProps={navigation} />}
      </Stack.Screen>

      <Stack.Screen name = "CourseDashboard" options={{ header: () => null }}>
        {
          props => <CourseDashboardScreen {...props} screenProps={navigation}/>
        }
      </Stack.Screen>
      <Stack.Screen name = "TermsToKnow" options={{header: ()=>null}}>
        {
          props => <TermsToKnowScreen {...props} screenProps={navigation}/>
        }
      </Stack.Screen>
      <Stack.Screen name = "LessonSteps" options={{header: ()=>null}}>
        {
          props => <LessonStepsScreen {...props} screenProps={navigation}/>
        }
      </Stack.Screen>
      <Stack.Screen name = "QuizSteps" options={{header: ()=>null}}>
        {
          props => <QuizStepsScreen {...props} screenProps={navigation}/>
        }
      </Stack.Screen>
      <Stack.Screen name = "LessonCheckStep" options={{header: ()=>null}}>
        {
          props => <LessonCheckStepScreen {...props} screenProps={navigation}/>
        }
      </Stack.Screen>
    </Stack.Navigator>
  );
}

