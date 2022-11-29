import * as React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';
import {Provider} from 'react-redux';

import store from './store';
import AppScreens from './navigation/AppScreens';
import {enableScreens} from 'react-native-screens';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import {useEffect} from 'react';
import {getDBConnection} from './sqlite/DBHelper';
import {createTable} from './sqlite/FormDBHelper';
import {createBascketLastSync} from './sqlite/BascketLastSyncsHelper';
import KeyboardManager from 'react-native-keyboard-manager';
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
  useEffect(() => {
    initializeDB();
  }, []);

  const initializeDB = async () => {
    const db = await getDBConnection();
    if (db != null) {
      await createTable(db);
      await createBascketLastSync(db);
    }
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer onReady={() => RNBootSplash.hide()}>
          <AppScreens />
          {/* <GestureHandlerRootView></GestureHandlerRootView> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
