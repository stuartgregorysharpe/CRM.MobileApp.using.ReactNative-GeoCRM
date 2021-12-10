import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { Fragment, useState, useEffect } from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import { useDispatch, useSelector } from 'react-redux';

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

import MoreNavigator from './MoreNavigator';

import SvgIcon from './SvgIcon';
import { PRIMARY_COLOR } from '../constants/Colors';
import { 
  SLIDE_STATUS,
  CHANGE_MORE_STATUS,
  CHANGE_PROFILE_STATUS,
  SHOW_MORE_COMPONENT
} from '../actions/actionTypes';

import {
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
  View,
  Text
} from 'react-native'

const BottomTab = createBottomTabNavigator();

export default function RepBottomTabNavigator({navigation}) {
  const dispatch = useDispatch();
  const payload = useSelector(state => state.selection.payload);
  const selectProject = useSelector(state => state.selection.selectProject);
  const visibleMore = useSelector(state => state.rep.visibleMore);

  const bottomList = {
    0: [
      payload.user_scopes.geo_rep.modules_nav_order[0],
      payload.user_scopes.geo_rep.modules_nav_order[1],
      payload.user_scopes.geo_rep.modules_nav_order[2],
      payload.user_scopes.geo_rep.modules_nav_order[3]
    ],
    1: [
      payload.user_scopes.geo_life.modules_nav_order[0],
      payload.user_scopes.geo_life.modules_nav_order[1],
      payload.user_scopes.geo_life.modules_nav_order[2],
      payload.user_scopes.geo_life.modules_nav_order[3]
    ],
    2: [
      payload.user_scopes.geo_crm.modules_nav_order[0],
      payload.user_scopes.geo_crm.modules_nav_order[1],
      payload.user_scopes.geo_crm.modules_nav_order[2],
      payload.user_scopes.geo_crm.modules_nav_order[3]
    ]
  };

  useEffect(() => {
    if (visibleMore != '') {
      navigation.navigate("More");
      dispatch({type: SHOW_MORE_COMPONENT, payload: ''});
    }
  }, [visibleMore]);

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarHideOnKeyboard: true,
        headerStyle: {
          backgroundColor: PRIMARY_COLOR,
        },
        tabBarShowLabel: true,
        headerTitleStyle:  {
          color: "#fff",
          fontFamily: 'Product Sans-Regular'
        },
        tabBarIconStyle: {
          color: "#fff",
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          paddingTop: 10,
          paddingBottom: 10,
        }
      }}>

      {/* Rep Bottom Navigator */}

      {selectProject == 'geo_rep' && bottomList[0].includes('home_geo') && <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Home_Black_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Home_Black" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_rep' && bottomList[0].includes('crm_locations') && <BottomTab.Screen
        name="CRM"
        component={CRMScreen}
        options={{
          title: 'CRM',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Location_Arrow_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Location_Arrow" width='20px' height='20px' />}
            </Fragment>
          ),
          headerLeft: () => (
            <TouchableOpacity 
              style={styles.header} 
              activeOpacity={1}
              onPress={() => dispatch({type: SLIDE_STATUS, payload: false})}
            >
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_rep' && bottomList[0].includes('calendar') && <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: 'Calendar',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Calendar_Event_Fill_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Calendar_Event_Fill" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_rep' && bottomList[0].includes('forms') && <BottomTab.Screen
        name="RepForms"
        component={RepFormsScreen}
        options={{
          title: 'Forms',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_rep' && bottomList[0].includes('content_library') && <BottomTab.Screen
        name="RepContentLibrary"
        component={RepContentLibraryScreen}
        options={{
          title: 'Content Library',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Ballot_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Ballot" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_rep' && bottomList[0].includes('product_sales') && <BottomTab.Screen
        name="ProductSales"
        component={ProductSalesScreen}
        options={{
          title: 'Sales',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_rep' && bottomList[0].includes('notifications') && <BottomTab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_rep' && bottomList[0].includes('web_links') && <BottomTab.Screen
        name="RepWebLinks"
        component={RepWebLinksScreen}
        options={{
          title: 'Web Links',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Travel_Explore_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Travel_Explore" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_rep' && bottomList[0].includes('help') && <BottomTab.Screen
        name="RepHelp"
        component={RepHelpScreen}
        options={{
          title: 'Help',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_rep' && bottomList[0].includes('messages') && <BottomTab.Screen
        name="RepMessages"
        component={RepMessagesScreen}
        options={{
          title: 'Messages',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_rep' && bottomList[0].includes('offline_sync') && <BottomTab.Screen
        name="OfflineSync"
        component={OfflineSyncScreen}
        options={{
          title: 'Sync',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_rep' && bottomList[0].includes('recorded_sales') && <BottomTab.Screen
        name="RecordedSales"
        component={RecordedSalesScreen}
        options={{
          title: 'Recorded Sales',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_rep' && bottomList[0].includes('sales_pipeline') && <BottomTab.Screen
        name="RepSalesPipeline"
        component={RepSalesPipelineScreen}
        options={{
          title: 'Pipeline',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_rep' && bottomList[0].includes('support') && <BottomTab.Screen
        name="Support"
        component={SupportScreen}
        options={{
          title: 'SupportScreen',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Support_Agent_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Support_Agent" width='20px' height='20px' />}
            </Fragment>
          ),
          headerLeft: () => (
            <TouchableOpacity 
              style={styles.header} 
              activeOpacity={1}
              onPress={() => dispatch({type: SLIDE_STATUS, payload: false})}
            >
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {/* Life Bottom Navigator */}

      {selectProject == 'geo_life' && bottomList[1].includes('home_life') && <BottomTab.Screen
        name="HomeLife"
        component={HomeLifeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Home_Black_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Home_Black" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('news') && <BottomTab.Screen
        name="News"
        component={NewsScreen}
        options={{
          title: 'News',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Location_Arrow_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Location_Arrow" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('locations_life') && <BottomTab.Screen
        name="LocationsLife"
        component={LocationsLifeScreen}
        options={{
          title: 'Locations',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Calendar_Event_Fill_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Calendar_Event_Fill" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('check_in') && <BottomTab.Screen
        name="CheckIn"
        component={CheckInScreen}
        options={{
          title: 'Check In',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('access') && <BottomTab.Screen
        name="Access"
        component={AccessScreen}
        options={{
          title: 'Access Control',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('club') && <BottomTab.Screen
        name="Club"
        component={ClubScreen}
        options={{
          title: 'Club',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('flashbook') && <BottomTab.Screen
        name="Flashbook"
        component={FlashbookScreen}
        options={{
          title: 'FlashBook',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('business_directory') && <BottomTab.Screen
        name="BusinessDirectory"
        component={BusinessDirectoryScreen}
        options={{
          title: 'Business Directory',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('content_library') && <BottomTab.Screen
        name="LifeContentLibrary"
        component={LifeContentLibraryScreen}
        options={{
          title: 'Content Library',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Ballot_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Ballot" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('forms') && <BottomTab.Screen
        name="LifeForms"
        component={LifeFormsScreen}
        options={{
          title: 'Forms',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('help') && <BottomTab.Screen
        name="LifeHelp"
        component={LifeHelpScreen}
        options={{
          title: 'Help',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('loyalty_cards') && <BottomTab.Screen
        name="LoyaltyCards"
        component={LoyaltyCardsScreen}
        options={{
          title: 'Loyalty Cards',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('lunch_orders') && <BottomTab.Screen
        name="LunchOrdersScreen"
        component={LunchOrdersScreen}
        options={{
          title: 'Lunch Orders',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('messages') && <BottomTab.Screen
        name="LifeMessagesScreen"
        component={LifeMessagesScreen}
        options={{
          title: 'Messages',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('profile') && <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('report_fraud') && <BottomTab.Screen
        name="ReportFraudScreen"
        component={ReportFraudScreen}
        options={{
          title: 'Report Fraud',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('web_links') && <BottomTab.Screen
        name="LifeWebLinksScreen"
        component={LifeWebLinksScreen}
        options={{
          title: 'Web Links',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Travel_Explore_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Travel_Explore" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_life' && bottomList[1].includes('well_being') && <BottomTab.Screen
        name="WellBeingScreen"
        component={WellBeingScreen}
        options={{
          title: 'Well-being',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {/* CRM Bottom navigator */}

      {selectProject == 'geo_crm' && bottomList[2].includes('crm_locations') && <BottomTab.Screen
        name="CRMLocations"
        component={CRMLocationsScreen}
        options={{
          title: 'CRM',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Home_Black_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Home_Black" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_crm' && bottomList[2].includes('sales_pipeline') && <BottomTab.Screen
        name="CRMSalesPipeline"
        component={CRMSalesPipelineScreen}
        options={{
          title: 'Pipeline',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {selectProject == 'geo_crm' && bottomList[2].includes("content_library") && <BottomTab.Screen
        name="CRMContentLibrary"
        component={CRMContentLibraryScreen}
        options={{
          title: 'Content Library',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Ballot_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Ballot" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
      />}

      {/* More Screen */}

      <BottomTab.Screen
        name="More"
        component={MoreNavigator}
        options={{
          title: 'More',
          tabBarLabel: 'More',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Android_More_Horizontal_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Android_More_Horizontal" width='20px' height='20px' />}
            </Fragment>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
        listeners={({navigation}) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (visibleMore != '') {
              navigation.navigate("More");
              dispatch({type: SHOW_MORE_COMPONENT, payload: ''});
            } else {
              dispatch({type: CHANGE_MORE_STATUS, payload: 0});   
            }
          },
        })}
      />
    </BottomTab.Navigator>
  );
}

function HeaderRightView() {
  const dispatch = useDispatch();
  const payload = useSelector(state => state.selection.payload);

  const [toggleSwitch, setToggleSwitch] = useState(true);

  return (
    <View style={styles.headerRightView}>
      <ToggleSwitch
        style={styles.toggleSwitch}
        label={toggleSwitch ? "Online" : "Offline"}
        labelStyle={styles.toggleSwitchLabel}
        onColor="#fff"
        offColor="#a3c0f9"
        size="small"
        thumbOnStyle={{ backgroundColor: PRIMARY_COLOR }}
        thumbOffStyle={{ backgroundColor: PRIMARY_COLOR }}
        isOn={toggleSwitch}
        onToggle={toggleSwitch => {
          setToggleSwitch(toggleSwitch);
        }}
      />
      <TouchableOpacity style={styles.headerAvatar} onPress={() => dispatch({type: CHANGE_PROFILE_STATUS, payload: 0})}>
        <Text style={styles.headerAvatarText}>
          {payload.user_scopes.geo_rep.user_name.split(' ')[0] && payload.user_scopes.geo_rep.user_name.split(' ')[0][0].toUpperCase()}
          {payload.user_scopes.geo_rep.user_name.split(' ')[1] && payload.user_scopes.geo_rep.user_name.split(' ')[1][0].toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: PRIMARY_COLOR,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: '100%'
  },
  headerRightView: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 12
  },
  toggleSwitch: {
    marginRight: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  toggleSwitchLabel: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Gilroy-Medium'
  },
  headerAvatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 2,
    width: 36,
    height: 36,
    borderRadius: 20
  },
  headerAvatarText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Gilroy-Bold'
  }
})