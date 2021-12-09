import * as React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNBootSplash from "react-native-bootsplash";
import { Provider } from 'react-redux';

import store from './store';
import AppScreens from './navigation/AppScreens';

EStyleSheet.build({
  $textColor: '#0275d8'
});

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer onReady={() => RNBootSplash.hide()}>
          <AppScreens />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}