import {PermissionsAndroid, Platform} from 'react-native';

import HMSLocation from '@hmscore/react-native-hms-location';
const locationRequest = {
  priority:
    HMSLocation.FusedLocation.Native.PriorityConstants.PRIORITY_HIGH_ACCURACY,
  interval: 10000,
  numUpdates: 2147483647,
  fastestInterval: 10000,
  expirationTime: 3372036854775807.0,
  smallestDisplacement: 0.0,
  maxWaitTime: 0,
  needAddress: false,
  language: '',
  countryCode: '',
};

const locationSettingsRequest = {
  locationRequests: [locationRequest],
  alwaysShow: false,
  needBle: false,
};
async function getLocationAvailability() {
  await HMSLocation.FusedLocation.Native.getLocationAvailability();
}
async function checkLocationSettings() {
  await HMSLocation.FusedLocation.Native.checkLocationSettings(
    locationSettingsRequest,
  );
}

async function requestPermissions() {
  try {
    const userResponse = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      //PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION, // Not supported in RN 0.60
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    if (
      userResponse['android.permission.ACCESS_COARSE_LOCATION'] ==
        PermissionsAndroid.RESULTS.DENIED ||
      userResponse['android.permission.ACCESS_COARSE_LOCATION'] ==
        PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
      userResponse['android.permission.ACCESS_FINE_LOCATION'] ==
        PermissionsAndroid.RESULTS.DENIED ||
      userResponse['android.permission.ACCESS_FINE_LOCATION'] ==
        PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
      /*userResponse["android.permission.ACCESS_BACKGROUND_LOCATION"] ==
          PermissionsAndroid.RESULTS.DENIED ||
        userResponse["android.permission.ACCESS_BACKGROUND_LOCATION"] ==
          PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||*/
      userResponse['android.permission.READ_EXTERNAL_STORAGE'] ==
        PermissionsAndroid.RESULTS.DENIED ||
      userResponse['android.permission.READ_EXTERNAL_STORAGE'] ==
        PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
      userResponse['android.permission.WRITE_EXTERNAL_STORAGE'] ==
        PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
      userResponse['android.permission.WRITE_EXTERNAL_STORAGE'] ==
        PermissionsAndroid.RESULTS.DENIED
    ) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}

function watchPosition(
  successCallback,
  failureCallback,
  options = {},
  requestCodeCallback,
) {
  HMSLocation.FusedLocation.Native.requestLocationUpdatesWithCallbackEx(
    locationRequest,
  )
    .then(res => {
      const reqCode = res.requestCode;
      if (requestCodeCallback) {
        requestCodeCallback(reqCode);
      }

      HMSLocation.FusedLocation.Events.addFusedLocationEventListener(
        locationResult => {
          if (successCallback) {
            successCallback({
              coords: locationResult.lastLocation,
            });
          }
        },
      );
    })
    .catch(err => {
      if (failureCallback) {
        failureCallback(err);
      }
    });
}

function clearWatch(reqCode) {
  HMSLocation.FusedLocation.Native.removeLocationUpdatesWithCallback(reqCode);
}

function getCurrentPosition(successCallback, failureCallback, options = {}) {
  HMSLocation.FusedLocation.Native.getLastLocation()
    .then(pos => {
      if (successCallback) {
        successCallback({coords: pos});
      }
    })
    .catch(err => {
      if (failureCallback) {
        failureCallback(err);
      }
    });
}

export default {
  requestPermissions,
  watchPosition,
  clearWatch,
  getCurrentPosition,
};
