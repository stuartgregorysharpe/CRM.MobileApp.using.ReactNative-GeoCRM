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
      console.log(err);
    });
};



export const getLocationSearchListsByPage = async (
  filters,
  pageNumber,
  searchKey,
) => {

  var base_url = await getBaseUrl();
  var token = await getToken();
  var user_id = await getUserId();

  return new Promise(function (resolve, reject) {

    LocationService.getLocationService().then(locationService => {      
      locationService.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          console.log('URL ', `${base_url}/locations/location-search-list`);
          console.log('user_id', user_id);
          console.log('searchKey', searchKey);

          axios
            .get(`${base_url}/locations/location-search-list`, {
              params: {
                user_id: user_id,
                filters: filters,
                current_latitude: latitude,
                current_longitude: longitude,
                page_nr: pageNumber,
                search_text: searchKey,
              },
              headers: {
                Authorization: 'Bearer ' + token,
              },
            })
            .then(res => {
              if (res.data == undefined) {
                resolve([]);
              }
              if (res.data.error) {
                setToken(null);
                resolve([]);
              }

              if (res.data.status == 'success') {
                console.log('RESponse ', res.data.items);
                resolve(res.data.items);
              } else {
                resolve([]);
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
        },
        error => {
          axios
            .get(`${base_url}/locations/location-search-list`, {
              params: {
                user_id: user_id,
                filters: filters,
                current_latitude: -30.559989,
                current_longitude: 22.937508,
                page_nr: pageNumber,
                search_text: searchKey,
              },
              headers: {
                Authorization: 'Bearer ' + token,
              },
            })
            .then(res => {
              if (res.data == undefined) {
                resolve([]);
              }
              if (res.data.error) {
                setToken(null);
                resolve([]);
              }

              if (res.data.status == 'success') {
                console.log('RESponse ', res.data.items);
                resolve(res.data.items);
              } else {
                resolve([]);
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
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 2000,
          distanceFilter: 2,
        },
      );
    });


  });
};

export const getLocationInfoUpdate = async location_id => {
  var base_url = await getBaseUrl();
  var token = await getToken();

  console.log(`${base_url}/locations/location_info_update_fields_v2`);
  return new Promise(function (resolve, reject) {
    axios
      .get(`${base_url}/locations/location_info_update_fields_v2`, {
        params: {
          location_id: location_id,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(res => {
        if (res.data == undefined) {
          resolve([]);
        }
        console.log('message', res.data);
        resolve(res.data);
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

export const postLocationInfoUpdate = async postData => {
  var base_url = await getBaseUrl();
  var token = await getToken();

  console.log('Param ', postData);
  return new Promise(function (resolve, reject) {
    axios
      .post(`${base_url}/locations-info/location-info-update`, postData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': uuid.v4(),
        },
      })
      .then(res => {
        if (res.data == undefined) {
          resolve('Failed');
          return;
        }
        if (res.data.status == 'success') {
          resolve(res.data.message);
        } else {
          resolve('Failed');
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

export const getLocationInfo = async (location_id, currentLocation) => {
  console.log('currentLocation', currentLocation);
  var base_url = await getBaseUrl();
  var token = await getToken();
  var user_id = await getUserId();
  var prev_locations = await getLocationLoop();
  var prev_ids = prev_locations.map(item => item.location_id).join(',');

  console.log('prev_ids', prev_ids);
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
  console.log('params', params);
  //prev_locations=1332,1331&current_latitude=-33.7009653&current_longitude=18.4420495
  return new Promise(function (resolve, reject) {
    axios
      .get(`${base_url}/locations/location-info`, {
        params: params,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(res => {
        if (res.data == undefined) {
          resolve([]);
        }
        resolve(res.data);
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

export const postStageOutcomUpdate = async postData => {
  var base_url = await getBaseUrl();
  var token = await getToken();

  console.log(postData);
  return new Promise(function (resolve, reject) {
    axios
      .post(`${base_url}/location-info/updateStageOutcome`, postData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': uuid.v4(),
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
          'Indempotency-Key': uuid.v4(),
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
          'Indempotency-Key': uuid.v4(),
        },
      })
      .then(res => {
        console.log('res', res);
        if (res.data == undefined) {
          resolve('');
          return;
        }
        console.log(res.data);
        if (res.data.status == 'success') {
          resolve(res.data.message);
        } else {
          resolve('');
        }
      })
      .catch(err => {
        const error = err.response;
        console.log(error);
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
          'Indempotency-Key': uuid.v4(),
        },
      })
      .then(res => {
        if (res.data == undefined) {
          resolve('');
          return;
        }
        console.log(res.data);
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

export const getLocationFields = async location_id => {
  var token = await getToken();
  var baseUrl = await getBaseUrl();
  return new Promise(function (resolve, reject) {
    axios
      .get(`${baseUrl}/locations/location-fields`, {
        params: {
          location_id: location_id,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(res => {
        // console.log("getLocationFields:",res.data);
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == 'success') {
          resolve(res.data);
        } else {
          resolve([]);
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

export const getLocationContacts = async location_id => {
  var token = await getToken();
  var baseUrl = await getBaseUrl();
  return new Promise(function (resolve, reject) {
    axios
      .get(`${baseUrl}/locations/location-contacts`, {
        params: {
          location_id: location_id,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(res => {
        // console.log("getLocationFields:",res.data);
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == 'success') {
          resolve(res.data);
        } else {
          resolve([]);
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

export const addEditLocationContact = async postData => {
  var token = await getToken();
  var baseUrl = await getBaseUrl();
  console.log('URL ', `${baseUrl}/locations/add-edit-contacts`);
  console.log('Param ', postData);
  return new Promise(function (resolve, reject) {
    axios
      .post(`${baseUrl}/locations/add-edit-contacts`, postData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': uuid.v4(),
        },
      })
      .then(res => {
        // console.log("getLocationFields:",res.data);
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == 'success') {
          resolve(res.data);
        } else {
          resolve([]);
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

export const updateCustomerLocationFields = async postData => {
  var token = await getToken();
  var baseUrl = await getBaseUrl();
  console.log('URL ', `${baseUrl}/locations/location-fields`);
  console.log('Param ', postData);
  return new Promise(function (resolve, reject) {
    axios
      .post(`${baseUrl}/locations/location-fields`, postData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': uuid.v4(),
        },
      })
      .then(res => {
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == 'success') {
          resolve(res.data);
        } else {
          resolve([]);
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
