import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

async function requestPermissions() {
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization('whenInUse');
    return auth === 'granted';
  }

  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
}

function watchPosition(
  successCallback,
  failureCallback,
  options = {},
  watchIDCallback,
) {
  let _options = {
    distanceFilter: 10.5,
    desiredAccuracy: {
      ios: 'best',
      android: 'highAccuracy',
    },
    headingOrientation: 'portrait',
    // Android ONLY
    androidProvider: 'auto',
    interval: 2000, // Milliseconds
    fastestInterval: 2000, // Milliseconds
    maxWaitTime: 3000, // Milliseconds
    // IOS ONLY
    allowsBackgroundLocationUpdates: true,
    headingFilter: 1, // Degrees
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: false,
    ...options,
  };
  const watchID = Geolocation.watchPosition(
    successCallback,
    failureCallback,
    _options,
  );
  if (watchIDCallback) {
    watchIDCallback(watchID);
  }
}
function clearWatch(watchID) {
  Geolocation.clearWatch(watchID);
}

function getCurrentPosition(successCallback, failureCallback, options = {}) {
  let _options = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 10000,
    ...options,
  };
  Geolocation.getCurrentPosition(successCallback, failureCallback, _options);
}

export default {
  requestPermissions,
  watchPosition,
  clearWatch,
  getCurrentPosition,
};
