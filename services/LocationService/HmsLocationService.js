import {PermissionsAndroid, Platform} from 'react-native';

import HMSLocation from '@hmscore/react-native-hms-location';

async function getLocationAvailability() {
  await HMSLocation.FusedLocation.Native.getLocationAvailability();
}
async function checkLocationSettings() {
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
  const locationRequest = {
    priority:
      HMSLocation.FusedLocation.Native.PriorityConstants.PRIORITY_HIGH_ACCURACY,
    interval: 2000,
    numUpdates: 2147483647,
    fastestInterval: 2000,
    expirationTime: 3372036854775807.0,
    smallestDisplacement: 0.0,
    maxWaitTime: 3000,
    needAddress: false,
    language: '',
    countryCode: '',
  };
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

const getGeocoding = async (latitude, longitude) => {
  return new Promise(function (resolve, reject) {
    const getFromLocationNameRequest = {
      latitude: latitude,
      longitude: longitude,
      maxResults: 5,
    };

    const locale = {
      country: 'en',
    };

    HMSLocation.Geocoder.Native.getFromLocation(
      getFromLocationNameRequest,
      locale,
    )
      .then(hwLocationList => {
        resolve(hwLocationList);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getCoordinate = async address => {
  return new Promise(function (resolve, reject) {
    const getFromLocationNameRequest = {
      locationName: address,
      maxResults: 5,
    };
    console.log('getFromLocationNameRequest', getFromLocationNameRequest);

    const locale = {
      language: 'en',
      country: 'us',
    };

    HMSLocation.Geocoder.Native.getFromLocationName(
      getFromLocationNameRequest,
      locale,
    )
      .then(hwLocationList => {
        resolve(hwLocationList);
      })
      .catch(err => {
        reject(err);
      });
  });
};
async function reverseGeocoding(currentLocation, customMasterFields) {
  return await getGeocoding(currentLocation.latitude, currentLocation.longitude)
    .then(results => {
      if (results != null && results.length > 0) {
        const address_component = results[0];
        let addressFields = [...customMasterFields];
        const addressList = {
          state: address_component.state,
          city: address_component.city,
          country: address_component.countryName,
          pincode: address_component.postalCode,
          street_address: address_component.street,
          suburb: '',
        };
        const response = addressFields.map(addressField => {
          return {
            ...addressField,
            value: addressList[addressField.core_field_name] || '',
          };
        });
        return response;
      }
    })
    .catch(e => {
      console.log(e);
      return [];
    });
}
async function parseCoordinate(address) {
  return await getCoordinate(address)
    .then(results => {
      console.log('getCoordinate', results);
      if (results && results.length > 0) {
        const response = {
          latitude: results[0].latitude,
          longitude: results[0].longitude,
        };
        return response;
      }
      return null;
    })
    .catch(e => {
      console.log(e);
      return [];
    });
}
export default {
  requestPermissions,
  watchPosition,
  clearWatch,
  getCurrentPosition,
  getGeocoding,
  getCoordinate,
  reverseGeocoding,
  parseCoordinate,
};
