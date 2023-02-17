import * as React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';
import { Provider } from 'react-redux';

import store from './store';
import AppScreens from './navigation/AppScreens';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import { useEffect, useState } from 'react';
import { getDBConnection } from './sqlite/DBHelper';
import { createTable } from './sqlite/FormDBHelper';
import { createBascketLastSync } from './sqlite/BascketLastSyncsHelper';
import KeyboardManager from 'react-native-keyboard-manager';
import { firebase, FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { AppState, Button, Modal, Text, View } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { setContentFeedData } from './reducers/feed.reducer';
import { SET_CONTENT_FEED_DATA } from './actions/actionTypes';
if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableDebugging(false);
  KeyboardManager.setKeyboardDistanceFromTextField(10);
  /*KeyboardManager.setLayoutIfNeededOnUpdate(true);
  KeyboardManager.setEnableAutoToolbar(true);
  KeyboardManager.setToolbarManageBehaviourBy('subviews'); // "subviews" | "tag" | "position"
  KeyboardManager.setToolbarPreviousNextButtonEnable(false);
  KeyboardManager.setToolbarTintColor('#0000FF'); // Only #000000 format is supported
  KeyboardManager.setToolbarBarTintColor('#FFFFFF'); // Only #000000 format is supported
  KeyboardManager.setShouldShowToolbarPlaceholder(true);
  KeyboardManager.setOverrideKeyboardAppearance(false);
  KeyboardManager.setKeyboardAppearance('default'); // "default" | "light" | "dark"
  KeyboardManager.setShouldResignOnTouchOutside(true);
  KeyboardManager.setShouldPlayInputClicks(true);
  KeyboardManager.resignFirstResponder();*/
}
enableScreens(true);

EStyleSheet.build({
  $textColor: '#0275d8',
});

export default function App() {
  const [isShowModal, setShowModal] = useState(false);
  const appState = React.useRef(AppState.currentState);
  useEffect(() => {
    firebasePushNotifications();
    initializeDB();
    getAppStatus();
  }, []);

  const getAppStatus = () => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        store.dispatch({ type: SET_CONTENT_FEED_DATA, payload: true })
      }
      appState.current = nextAppState;
      clearAllNotifications();

    });
    return () => {
      subscription.remove();
    };
  }
  const clearAllNotifications = async () => {
    await notifee.cancelAllNotifications();
    await notifee.setBadgeCount(0);
  }
  const firebasePushNotifications = () => {
    firebase.messaging().onMessage(async (remoteMessage) => {
      displayForegroundNotification(remoteMessage);
      store.dispatch({ type: SET_CONTENT_FEED_DATA, payload: true })
    });
    firebase.messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("onNotificationOpenedApp: ", JSON.stringify(remoteMessage));
    });

    firebase.messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            JSON.stringify(remoteMessage)
          );
        }
      });

  }
  const displayForegroundNotification = async (messageData) => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
    await notifee.displayNotification({
      title: messageData.data.title,
      body: messageData.data.body,
      android: {
        channelId
      },
    });
  }
  const initializeDB = async () => {
    const db = await getDBConnection();
    if (db != null) {
      await createTable(db);
      await createBascketLastSync(db);
    }
  };
  const customModal = () => {
    return (<Modal
      animationType={'slide'}
      transparent={true}
      visible={isShowModal}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}>

      <View style={{ flex: 1, backgroundColor: '#00000099', justifyContent: 'center' }}>
        <Text style={{ color: '#ffffff' }}>Modal is open!</Text>
        <Button
          title="Click To Close Modal"
          onPress={() => {
            setShowModal(!isShowModal);
          }}
        />
      </View>
    </Modal>)
  }
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer onReady={() => RNBootSplash.hide()}>
          <AppScreens />
          {/* <GestureHandlerRootView></GestureHandlerRootView> */}
        </NavigationContainer>
        {customModal()}
      </SafeAreaProvider>
    </Provider>
  );
}
