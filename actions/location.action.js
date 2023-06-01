import LocationService from '../services/LocationService';
import axios from 'axios';
import {  
  LOCATION_CHECK_OUT_COMPULSORY_DEVICE,
  LOCATION_CHECK_OUT_COMPULSORY,
  LOCATION_CHECK_OUT_COMPULSORY_LOCATION_FIELD,
  CHANGE_LOCATION_FILTERS,  
} from './actionTypes';
import uuid from 'react-native-uuid';
import {
  getBaseUrl,  
  getLocationLoop,
  getToken,  
  getTokenData,  
  getUserId,
  setToken,
} from '../constants/Storage';
import { generateKey } from '../constants/Utils';
import { GetRequestLocationFiltersDAO, GetRequestLocationInfoDAO } from '../DAO';
import { expireToken } from '../constants/Helper';


export const setCompulsoryLocationField = compulsoryLocationField => ({
  type: LOCATION_CHECK_OUT_COMPULSORY_LOCATION_FIELD,
  payload: compulsoryLocationField,
});

export const setCompulsoryDevice = compulsoryDevice => ({
  type: LOCATION_CHECK_OUT_COMPULSORY_DEVICE,
  payload: compulsoryDevice,
});

export const setCompulsoryForm = compulsoryForm => ({
  type: LOCATION_CHECK_OUT_COMPULSORY,
  payload: compulsoryForm,
});


const getFieldOption =  (fieldOptionFilters, field_id) => {   

    if(fieldOptionFilters != undefined && fieldOptionFilters != ''){        
      for(let key of Object.keys(fieldOptionFilters)){
        if(field_id == key){
          return fieldOptionFilters[key];
        }
      }    
    }    
    return null;
};

  
export const getLocationFilters = async (onCompleted) => { 

  var user_id = await getTokenData("user_id");
  const postData = {
    user_id: user_id,
  };
  
  GetRequestLocationFiltersDAO.find(postData).then((res) => {
    
    if(res.status){
      const fieldOptionFilters = res.field_option_filters;
      const items = res.items;
      var filteredItems = [];
      items.forEach(element => {          
          const fieldOptions = getFieldOption(fieldOptionFilters , element.custom_field_id);
          if(fieldOptions != null){
            const newElmenet = { ...element };
            newElmenet.options = fieldOptions;
            filteredItems.push(newElmenet);
          }else{
            filteredItems.push(element);
          }
      });
      onCompleted('success' , filteredItems);
      
    }
  }).catch((e) => {
    onCompleted('failed' , e);
    
  });

};


export const getLocationInfo = async (location_id, currentLocation) => {
  
  
  var user_id = await getUserId();
  var prev_locations = await getLocationLoop();
  var prev_ids = prev_locations.map(item => item.location_id).join(',');

  var params = {
    user_id: user_id,
    location_id: location_id,
  };
  if (currentLocation != null && currentLocation !== undefined) {
    params = {
      user_id: user_id,
      location_id: location_id,
      current_latitude: currentLocation.latitude,
      current_longitude: currentLocation.longitude,
      prev_locations: prev_ids,
    };
  }

  return new Promise(function (resolve, reject) {

    GetRequestLocationInfoDAO.find(params).then((res) => {
      resolve(res);
    }).catch((e) => {
      reject(e);
    });      
  });
};


export const postDispositionFields = async postData => {
  var base_url = await getBaseUrl();
  var token = await getToken();
  console.log('URL ', `${base_url}/location-info/updateDispositionFields`);
  console.log('Param ', postData);
  return new Promise(function (resolve, reject) {
    axios
      .post(`${base_url}/location-info/updateDispositionFields`, postData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': generateKey(),
        },
      })
      .then(res => {
        if (res.data === undefined) {
          resolve('No data');
        }
        resolve(res.data.message);
      })
      .catch(err => {
        const error = err.response;
        if (
          error.status === 401 &&
          error.config &&
          !error.config.__isRetryRequest
        ) {
          reject('expired');
        } else {
          reject(err);
        }
      });
  });
};


