import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNBootSplash from "react-native-bootsplash";
import { Provider } from 'react-redux';

import store from './store';
import AppScreens from './navigation/AppScreens';

function App() {
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

export default App;