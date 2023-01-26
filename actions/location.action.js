import LocationService from '../services/LocationService';
import axios from 'axios';
import {
  CHANGE_LOGIN_STATUS,  
  STATUS_LOCATION_FILTERS,    
  CHANGE_LOCATION_FILTERS,  
} from './actionTypes';
import uuid from 'react-native-uuid';
import {
  getBaseUrl,  
  getLocationLoop,
  getToken,  
  getUserId,
  setToken,
} from '../constants/Storage';
import { generateKey } from '../constants/Utils';
import { GetRequestLocationInfoDAO } from '../DAO';

export const getLocationFilters = () => (dispatch, getState) => {
  dispatch({type: STATUS_LOCATION_FILTERS, payload: 'request'});
  axios
    .get(
      `${
        getState().selection.payload.user_scopes.geo_rep.base_url
      }/locations/location-filters`,
      {
        params: {
          user_id: getState().selection.payload.user_scopes.geo_rep.user_id,
        },
        headers: {
          Authorization: 'Bearer ' + getState().selection.token,
        },
      },
    )
    .then(res => {
      if (res.data == undefined) {
        dispatch({type: CHANGE_LOGIN_STATUS, payload: 'failure'});
        return;
      }

      if (res.data.status == 'success') {
        dispatch({type: STATUS_LOCATION_FILTERS, payload: 'success'});
        dispatch({type: CHANGE_LOCATION_FILTERS, payload: res.data.items});
      }
    })
    .catch(err => {
      dispatch({type: CHANGE_LOGIN_STATUS, payload: 'failure'});      
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

export const postStageOutcomUpdate = async postData => {
  var base_url = await getBaseUrl();
  var token = await getToken();

  console.log(postData);
  return new Promise(function (resolve, reject) {
    axios
      .post(`${base_url}/location-info/updateStageOutcome`, postData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': generateKey(),
        },
      })
      .then(res => {
        console.log('Resonse', res.data);
        if (res.data == undefined) {
          resolve(0);
          return;
        }
        resolve(1);
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

export const postReloop = async postData => {
  var base_url = await getBaseUrl();
  var token = await getToken();
  console.log('URL ', `${base_url}/location-info/reloop`);
  console.log('Param ', postData);
  return new Promise(function (resolve, reject) {
    axios
      .post(`${base_url}/location-info/reloop`, postData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': generateKey(),
        },
      })
      .then(res => {
        console.log('res', res);
        if (res.data == undefined) {
          resolve('');
          return;
        }        
        if (res.data.status == 'success') {
          resolve(res.data.message);
        } else {
          resolve('');
        }
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

export const postLocationImage = async postData => {
  var base_url = await getBaseUrl();
  var token = await getToken();
  console.log('URL ', `${base_url}/locations/location-image`);
  console.log('Param ', postData);
  return new Promise(function (resolve, reject) {
    axios
      .post(`${base_url}/locations/location-image`, postData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': generateKey(),
        },
      })
      .then(res => {
        if (res.data == undefined) {
          resolve('');
          return;
        }        
        if (res.data.status == 'success') {
          resolve(res.data.message);
        } else {
          resolve('');
        }
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

