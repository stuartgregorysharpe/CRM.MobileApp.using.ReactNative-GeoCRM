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
        console.log('updateCurrentLocation - errorCode:', error.code);
        console.log('updateCurrentLocation - errorMessage:', error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
};
