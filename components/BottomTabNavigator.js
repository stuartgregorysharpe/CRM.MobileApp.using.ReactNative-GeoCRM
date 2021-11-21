import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { Pressable, View, Image, Text } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'

import HomeScreen from '../screens/HomeScreen';
import CRMScreen from '../screens/CRMScreen';
import CalendarScreen from '../screens/CalendarScreen';
import PiplineScreen from '../screens/PiplineScreen';
import MoreScreen from '../screens/MoreScreen';

import { PRIMARY_COLOR } from '../constants/Colors';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {

  const tabBarIconStyle = {
    height: 20,
    width: 20,
  }

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        headerStyle: {
          backgroundColor: PRIMARY_COLOR,
        },
        tabBarShowLabel: true,
        headerTitleStyle:  {
          color: "#fff",
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
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: () => <Image source={require("../assets/images/bottom_icon/home_black_24dp.png")} style={tabBarIconStyle} />,
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            color: "#B8B8B8",
            fontSize: 16
          },
        }}
      />
      <BottomTab.Screen
        name="CRMScreen"
        component={CRMScreen}
        options={{
          title: 'CRM',
          tabBarIcon: () => <Image source={require("../assets/images/bottom_icon/location_arrow.png")} style={tabBarIconStyle} />,
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            color: "#B8B8B8",
            fontSize: 16
          },
        }}
      />
      <BottomTab.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          title: 'Calendar',
          tabBarIcon: () => <Image source={require("../assets/images/bottom_icon/calendar_event_fill.png")} style={tabBarIconStyle} />,
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            color: "#B8B8B8",
            fontSize: 16
          },
        }}
      />
      <BottomTab.Screen
        name="PiplineScreen"
        component={PiplineScreen}
        options={{
          title: 'Pipline',
          tabBarIcon: () => <Image source={require("../assets/images/bottom_icon/filter_list_black_24dp.png")} style={tabBarIconStyle} />,
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            color: "#B8B8B8",
            fontSize: 16
          },
        }}
      />
      <BottomTab.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{
          title: 'More',
          tabBarIcon: () => <Image source={require("../assets/images/bottom_icon/android_more_horizontal.png")} style={tabBarIconStyle} />,
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            color: "#B8B8B8",
            fontSize: 16
          },
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
    alignItems: 'center'
  }

  const labelStyle = {
    color: '#fff'
  }
  return (
    <ToggleSwitch
      style={toggleSwitchStyle}
      label={toggleSwitch ? "Online" : "Offline"}
      labelStyle={labelStyle}
      onColor="#fff"
      offColor="#a3c0f9"
      size="medium"
      thumbOnStyle={{ backgroundColor: PRIMARY_COLOR }}
      thumbOffStyle={{ backgroundColor: PRIMARY_COLOR }}
      isOn={toggleSwitch}
      onToggle={toggleSwitch => {
        setToggleSwitch(toggleSwitch);
      }}
    />
  )
}