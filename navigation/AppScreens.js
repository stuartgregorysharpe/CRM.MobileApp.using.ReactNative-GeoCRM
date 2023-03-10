import React, { useEffect, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  StatusBar,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import SignInScreen from '../screens/SignInScreen';
import BottomTabNavigator from '../components/BottomTabNavigator';
import Profile from '../components/Profile';
import More from '../components/More';
import { whiteLabel } from '../constants/Colors';
import { grayBackground } from '../constants/Styles';
import {
  SLIDE_STATUS,
  CHANGE_PROFILE_STATUS,
  CHANGE_MORE_STATUS,
  CHANGE_LOGIN_STATUS,
} from '../actions/actionTypes';
import WebViewScreen from '../screens/GeoRep/WebLinks/WebViewScreen';
import Config from '../constants/Config';
import Constants from '../constants/Constants';
import UITestScreen from '../screens/GeoRep/UITestScreen';
import { FormQuestions } from '../screens/GeoRep/Forms/questions/FormQuestions';
import LocationSpecificInfoScreen from '../screens/GeoRep/CRM/checkin/LocationSpecificInfoScreen';
import { FormsScreen } from '../screens/GeoRep/Forms/FormsScreen';
import { SalesPipelineScreen } from '../screens/GeoRep/Pipeline/SalesPipelineScreen';
import Stock from '../screens/GeoRep/Stock/Stock';
import DeviceInfo from 'react-native-device-info';
import { getLocalData, setToken, storeLocalValue } from '../constants/Storage';

const Stack = createNativeStackNavigator();

export default function AppScreens() {

  const dispatch = useDispatch();
  const showProfile = useSelector(state => state.rep.showProfile);
  const showMoreScreen = useSelector(state => state.rep.showMoreScreen);
  const loginStatus = useSelector(state => state.auth.loginStatus);
  const [isVersionUpdated, setIsVersionUpdated] = useState(false);

  useEffect(() => {

    checkAppVersion();

    dispatch({ type: SLIDE_STATUS, payload: false });
    dispatch({ type: CHANGE_PROFILE_STATUS, payload: 1 });
    dispatch({ type: CHANGE_MORE_STATUS, payload: 1 });

  }, []);

  useEffect(() => {
    moreStartAnimation(showMoreScreen);
    profileStartAnimation(showProfile);
  });

  const moreRef = useRef(null);
  const profileRef = useRef(null);
  const moreAnimatedValue = useRef(new Animated.Value(1)).current;
  const profileAnimatedValue = useRef(new Animated.Value(1)).current;

  const moreStartAnimation = toValue => {
    Animated.timing(moreAnimatedValue, {
      toValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };
  const profileStartAnimation = toValue => {
    Animated.timing(profileAnimatedValue, {
      toValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };


  const checkAppVersion = async () => {
    var versionCode = DeviceInfo.getVersion();
    var versionNumber = DeviceInfo.getBuildNumber();
    var currentVersionCode = await getLocalData("@versionCode");
    var currentVersionNumber = await getLocalData("@versionNumber");

    if (versionCode != currentVersionCode || versionNumber != currentVersionNumber) {
      console.log("version u pdated", currentVersionNumber);
      await storeLocalValue("@versionCode", versionCode);
      await storeLocalValue("@versionNumber", versionNumber);
      //setIsVersionUpdated(true);
      dispatch({ type: CHANGE_LOGIN_STATUS, payload: "logout" });
    }
  }

  const moreTranslateX = moreAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      0,
      Dimensions.get('window').width > Dimensions.get('window').height
        ? Dimensions.get('window').width + 100
        : Dimensions.get('window').height + 100,
    ],
    extrapolate: 'clamp',
  });
  const profileTranslateX = profileAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      0,
      Dimensions.get('window').width > Dimensions.get('window').height
        ? -Dimensions.get('window').width - 100
        : -Dimensions.get('window').height - 100,
    ],
    extrapolate: 'clamp',
  });

  if (Config.DEBUG_MODE == Constants.debugMode.DEBUG_UI_SCREEN) {
    return <UITestScreen />;
  }

  if (loginStatus != 'success') {
    return <SignInScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {(showProfile == 0 || showMoreScreen == 0) && (
        <TouchableOpacity
          activeOpacity={1}
          style={grayBackground}
          onPress={() => {
            dispatch({ type: CHANGE_PROFILE_STATUS, payload: 1 });
            dispatch({ type: CHANGE_MORE_STATUS, payload: 1 });
          }}></TouchableOpacity>
      )}

      <Animated.View
        ref={profileRef}
        style={[
          styles.transitionView,
          { transform: [{ translateX: profileTranslateX }], left: 0 },
        ]}>
        <Profile />
      </Animated.View>

      <Animated.View
        ref={moreRef}
        style={[
          styles.transitionView,
          { transform: [{ translateX: moreTranslateX }], right: 0 },
        ]}>
        <More />
      </Animated.View>

      <StatusBar translucent backgroundColor={whiteLabel().headerBackground} />

      <Stack.Navigator
        cardStyle={{
          opacity: 1,
        }}
        screenOptions={({ navigation }) => {
          return {
            detachPreviousScreen: !navigation.isFocused(),
          };
        }}>

        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="WebViewScreen"
          component={WebViewScreen}
          navigationOptions={{ headerShown: false }}
          options={{ header: () => false }}>
          {/* {props => <WebViewScreen {...props} />} */}
        </Stack.Screen>

        <Stack.Screen
          name="DeeplinkFormQuestionsScreen"
          options={{ header: () => false }}>
          {props => <FormQuestions {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name="DeeplinkLocationSpecificInfoScreen"
          options={{ header: () => false }}>
          {props => <LocationSpecificInfoScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen name="DeeplinkRepForms" options={{ header: () => null }}>
          {props => <FormsScreen {...props} isDeeplink={true} />}
        </Stack.Screen>

        <Stack.Screen
          name="DeeplinkRepSalesPipelineScreen"
          options={{ header: () => false }}>
          {props => <SalesPipelineScreen {...props} isDeeplink={true} />}
        </Stack.Screen>

        <Stack.Screen
          name="DeeplinkStock"
          options={{ header: () => false }}>
          {props => <Stock {...props} isDeeplink={true} />}
        </Stack.Screen>

      </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  transitionView: {
    position: 'absolute',
    top: 0,
    width: '90%',
    height: '100%',
    zIndex: 2,
    elevation: 2,
  },
});
