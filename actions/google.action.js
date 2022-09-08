import {CHANGE_CURRENT_LOCATION} from './actionTypes';
import LocationService from '../services/LocationService';
import { getJsonData, storeJsonData } from '../constants/Storage';

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
      async(position) => {        

        const {latitude, longitude, accuracy} = position.coords;
        dispatch({
          type: CHANGE_CURRENT_LOCATION,
          payload: {
            latitude: latitude,
            longitude: longitude,
            accuracy: accuracy,
          },
        });        
        await storeJsonData("@current_location" , {latitude:latitude, longitude:longitude});          

      },
      async(error) => {        

        await getJsonData("@current_location").then((location) => {
          console.log("offline location from local storage", location);
          console.log("latitude data", location.latitude);
          console.log("longitude data", location.longitude);

          if(location.latitude != undefined && location.longitude != undefined){
            dispatch({
              type: CHANGE_CURRENT_LOCATION,
              payload: {
                latitude: location.latitude , //!= undefined ? location.latitude : 44.324005126953125,
                longitude: location.longitude , // != undefined ? location.longitude : -106.92974853515625,
                accuracy: 1,
              },
            });
          }          
        }).catch((e) => {          
          
        })
        
        console.log('updateCurrentLocation - errorCode:', error.code);
        console.log('updateCurrentLocation - errorMessage:', error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
};
