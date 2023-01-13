import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { useScreens } from 'react-native-screens';
import { firebase } from '@react-native-firebase/messaging';

//useScreens();
firebase.messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
