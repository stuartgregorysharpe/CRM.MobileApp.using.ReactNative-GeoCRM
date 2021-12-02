import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { Fragment, useState } from 'react';
import { Image } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

import ContentLibraryScreen from '../screens/GeoCRM/ContentLibraryScreen';
import CRMLocationsScreen from '../screens/GeoCRM/CRMLocationsScreen';
import SalesPipelineScreen from '../screens/GeoCRM/SalesPipelineScreen';

import { PRIMARY_COLOR } from '../constants/Colors';

const BottomTab = createBottomTabNavigator();

export default function RepBottomTabNavigator({ navigation }) {

  const tabBarIconStyle = {
    height: 18,
    width: 18,
  }

  return (
    <BottomTab.Navigator
      initialRouteName="CRMLocations"
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
          paddingBottom: 10
        }
      }}>
      <BottomTab.Screen
        name="CRMLocations"
        component={CRMLocationsScreen}
        options={{
          title: 'CRM Locations',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <Image source={require("../assets/images/bottom_icon/home_black_24dp.png")} style={tabBarIconStyle} />}
              {focused && <Image source={require("../assets/images/bottom_icon/home_black_24dp_blue.png")} style={tabBarIconStyle} />}
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
      />
      <BottomTab.Screen
        name="SalesPipeline"
        component={SalesPipelineScreen}
        options={{
          title: 'Sales Pipeline',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <Image source={require("../assets/images/bottom_icon/location_arrow.png")} style={tabBarIconStyle} />}
              {focused && <Image source={require("../assets/images/bottom_icon/location_arrow_blue.png")} style={tabBarIconStyle} />}
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
      />
      <BottomTab.Screen
        name="ContentLibrary"
        component={ContentLibraryScreen}
        options={{
          title: 'Content Library',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <Image source={require("../assets/images/bottom_icon/calendar_event_fill.png")} style={tabBarIconStyle} />}
              {focused && <Image source={require("../assets/images/bottom_icon/calendar_event_fill_blue.png")} style={tabBarIconStyle} />}
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
      />
    </BottomTab.Navigator>
  );
}

function HeaderRightView() {
  const [toggleSwitch, setToggleSwitch] = useState(true);

  const toggleSwitchStyle = {
    marginRight: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }

  const labelStyle = {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Gilroy-Medium'
  }
  return (
    <ToggleSwitch
      style={toggleSwitchStyle}
      label={toggleSwitch ? "Online" : "Offline"}
      labelStyle={labelStyle}
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
  )
}