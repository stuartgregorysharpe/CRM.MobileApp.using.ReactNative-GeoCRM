import React, { Fragment, useEffect, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, Animated, Easing, Dimensions, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { PRIMARY_COLOR } from '../constants/Colors';
import BottomTabNavigator from '../components/BottomTabNavigator';

import Profile from '../components/Profile';
import More from '../components/More';

const Stack = createNativeStackNavigator();

export default function AppScreens() {
  const showProfile = useSelector(state => state.rep.showProfile);
  const showMoreScreen = useSelector(state => state.rep.showMoreScreen);

  useEffect(() => {
    moreStartAnimation(showMoreScreen);
    profileStartAnimation(showProfile);
  });

  const moreRef = useRef(null);
  const profileRef = useRef(null);

  const moreAnimatedValue = useRef(new Animated.Value(1)).current;
  const profileAnimatedValue = useRef(new Animated.Value(1)).current;

  const moreStartAnimation = (toValue) => {
    Animated.timing(moreAnimatedValue, {
      toValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };
  const profileStartAnimation = (toValue) => {
    Animated.timing(profileAnimatedValue, {
      toValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const moreTranslateX = moreAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Dimensions.get('window').width + 100],
    extrapolate: 'clamp',
  });
  const profileTranslateX = profileAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -Dimensions.get('window').width - 100],
    extrapolate: 'clamp',
  });

  return (
    <Fragment>
      <Animated.View
        ref={profileRef}
        style={[styles.transitionView, { transform: [{ translateX: profileTranslateX }] }]}
      >
        <Profile />
      </Animated.View>
      
      <Animated.View
        ref={moreRef}
        style={[styles.transitionView, { transform: [{ translateX: moreTranslateX }] }]}
      >
        <More />
      </Animated.View>

      <StatusBar translucent backgroundColor={PRIMARY_COLOR} />
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: PRIMARY_COLOR,
          }
        }}
      >
        <Stack.Screen 
          name="Root" 
          component={BottomTabNavigator}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  transitionView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    elevation: 2
  },
})