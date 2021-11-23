import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { Fragment, useState } from 'react';
import { Image } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

import HomeScreen from '../screens/HomeScreen';
import CRMScreen from '../screens/CRMScreen';
import CalendarScreen from '../screens/CalendarScreen';
import PipelineScreen from '../screens/PipelineScreen';
import MoreScreen from '../screens/MoreScreen';

import { PRIMARY_COLOR } from '../constants/Colors';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {

  const tabBarIconStyle = {
    height: 18,
    width: 18,
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
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
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
        name="CRMScreen"
        component={CRMScreen}
        options={{
          title: 'CRM',
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
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          title: 'Calendar',
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
      <BottomTab.Screen
        name="PipelineScreen"
        component={PipelineScreen}
        options={{
          title: 'Pipeline',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <Image source={require("../assets/images/bottom_icon/pipeline.png")} style={tabBarIconStyle} />}
              {focused && <Image source={require("../assets/images/bottom_icon/pipeline_blue.png")} style={tabBarIconStyle} />}
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
        name="MoreScreen"
        component={MoreScreen}
        options={{
          title: 'More',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <Image source={require("../assets/images/bottom_icon/android_more_horizontal.png")} style={tabBarIconStyle} />}
              {focused && <Image source={require("../assets/images/bottom_icon/android_more_horizontal_blue.png")} style={tabBarIconStyle} />}
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