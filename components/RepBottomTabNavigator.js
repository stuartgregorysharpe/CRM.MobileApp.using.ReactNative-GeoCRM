import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { Fragment, useState, useEffect } from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import { useDispatch } from 'react-redux';

import HomeScreen from '../screens/GeoRep/HomeScreen';
import CRMScreen from '../screens/GeoRep/CRMScreen';
import CalendarScreen from '../screens/GeoRep/CalendarScreen';
import PipelineScreen from '../screens/GeoRep/PipelineScreen';
import RepMoreScreen from '../screens/GeoRep/RepMoreScreen';

import SvgIcon from './SvgIcon';
import { PRIMARY_COLOR } from '../constants/Colors';
import { SLIDE_STATUS } from '../actions/actionTypes';

import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'

const BottomTab = createBottomTabNavigator();

export default function RepBottomTabNavigator({ navigation }) {
  const dispatch = useDispatch();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
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
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            dispatch({type: SLIDE_STATUS, payload: false})
            navigation.navigate("CRMScreen");
          },
        })}
      />
      <BottomTab.Screen
        name="CalendarScreen"
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
      />
      <BottomTab.Screen
        name="RepMore"
        component={RepMoreScreen}
        options={{
          title: 'More',
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: PRIMARY_COLOR,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: '100%'
  }
})