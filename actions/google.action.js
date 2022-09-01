import {CHANGE_CURRENT_LOCATION} from './actionTypes';
import LocationService from '../services/LocationService';

export async function reverseGeocoding(currentLocation, customMasterFields) {
  const locationService = LocationService.GmsLocationService;
  return await locationService.reverseGeocoding(
    currentLocation,
    customMasterFields,
  );
}

export async function parseCoordinate(address) {
  const locationService = LocationService.GmsLocationService;
  return await locationService.parseCoordinate(address);
}

export const updateCurrentLocation = () => (dispatch, getState) => {
  LocationService.getLocationService().then(locationService => {
    locationService.getCurrentPosition(
      position => {
        console.log('updateCurrentLocation_position', position);
        const {latitude, longitude, accuracy} = position.coords;
        dispatch({
          type: CHANGE_CURRENT_LOCATION,
          payload: {
            latitude: latitude,
            longitude: longitude,
            accuracy: accuracy,
          },
        });
      },
      error => {
        //{"coords": {"accuracy": 1, "altitude": 0, "altitudeAccuracy": 0, "heading": 0, "latitude": 44.324005126953125, "longitude": -106.92974853515625, "speed": 0.38760000467300415}, "mocked": true, "provider": "network", "timestamp": 1660832855271}

        dispatch({
          type: CHANGE_CURRENT_LOCATION,
          payload: {
            latitude: 44.324005126953125,
            longitude: -106.92974853515625,
            accuracy: 1,
          },
        });

        console.log('updateCurrentLocation - errorCode:', error.code);
        console.log('updateCurrentLocation - errorMessage:', error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
};
