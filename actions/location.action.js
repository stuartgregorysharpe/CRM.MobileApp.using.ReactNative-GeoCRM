import Geolocation from 'react-native-geolocation-service';

import axios from "axios";
import {
  CHANGE_LOGIN_STATUS,
  STATUS_PIN_KEY,
  STATUS_LOCATION_MAP,
  STATUS_LOCATION_FILTERS,
  STATUS_LOCATION_SEARCH_LISTS,  
  CHANGE_PIN_KEY,
  CHANGE_LOCATION_MAP,
  CHANGE_LOCATION_FILTERS,
  CHANGE_LOCATION_SEARCH_LISTS,
  CHANGE_CURRENT_LOCATION,  
  CHANGE_POLYGONS
} from "./actionTypes";
import uuid from 'react-native-uuid';
import { getBaseUrl, getFilterData, getLocationLoop, getToken, getUserData, getUserId, setToken } from '../constants/Storage';

let cancelToken
export const getLocationPinKey = () => (dispatch, getState) => {
  dispatch({ type: STATUS_PIN_KEY, payload: 'request' });
  axios
    .get(`${getState().selection.payload.user_scopes.geo_rep.base_url}/locations/location-pin-key`, {
      params: {
        user_id: getState().selection.payload.user_scopes.geo_rep.user_id,
      },
      headers: {
        Authorization: 'Bearer ' + getState().selection.token
      }
    })
    .then((res) => {
      if (res.data == undefined) {
        dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
        return;
      }
      if (res.data.status == 'success') {
        console.log("pin data", res.data.items);
        dispatch({ type: STATUS_PIN_KEY, payload: 'success' });
        dispatch({ type: CHANGE_PIN_KEY, payload: res.data.items });
      }
    })
    .catch((err) => {      
      dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });      
    })
}

export const getLocationMapByRegion = async (currentLocation, box) => {

  var base_url = await getBaseUrl();
  var token = await getToken();
  var user_id = await getUserId();
  var filters = await getFilterData('@filter');
  var zoom_bounds = box.map(item => item).join(',');
  console.log("by region api",{
    user_id: user_id,
    filters: filters,
    current_latitude: currentLocation.latitude,
    current_longitude: currentLocation.longitude,
    zoom_bounds: zoom_bounds
  });

  return new Promise(function (resolve, reject) {
    axios
      .get(`${base_url}/locations/location-map`, {
        params: {
          user_id: user_id,
          filters: filters,
          current_latitude: currentLocation.latitude,
          current_longitude: currentLocation.longitude,
          zoom_bounds: zoom_bounds
        },
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then((res) => {
        console.log("api response" , res);
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == 'success') {
          resolve(res.data);
          console.log("polygon data", res.data.polygons);          
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        const error = err.response;
        if (error.status===401 && error.config && 
          !error.config.__isRetryRequest) {            
            reject("expired");
        }else{
          reject(err);  
        }                        
      })

  });
}



export const getLocationsMap = () => (dispatch, getState) => {
  dispatch({ type: STATUS_LOCATION_MAP, payload: 'request' });
  console.log("logss== ", getState().selection.filters);

  Geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      if (latitude !== undefined) {
        dispatch({
          type: CHANGE_CURRENT_LOCATION, payload: {
            latitude: latitude,
            longitude: longitude,
          }
        })
      }

      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.")
      }
      cancelToken = axios.CancelToken.source()
      axios
        .get(`${getState().selection.payload.user_scopes.geo_rep.base_url}/locations/location-map`, {
          cancelToken: cancelToken.token,
          params: {
            user_id: getState().selection.payload.user_scopes.geo_rep.user_id,
            current_latitude: latitude,
            current_longitude: longitude,
            filters: getState().selection.filters
          },
          headers: {
            Authorization: 'Bearer ' + getState().selection.token
          }
        })
        .then((res) => {

          if (res.data == undefined) {
            dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
            return;
          }

          if (res.data.error) {
            dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
            return;
          }

          console.log("get location map data CHANGE_LOCATION_MAP", res.data.locations.length);
          console.log("polygons", JSON.stringify(res.data.polygons.length));

          if (res.data.status == 'success') {
            dispatch({ type: STATUS_LOCATION_MAP, payload: 'success' });
            dispatch({ type: CHANGE_LOCATION_MAP, payload: res.data.locations });
            dispatch({ type: CHANGE_POLYGONS, payload: res.data.polygons });
          }
        })
        .catch((err) => {
          console.log("map api connection error", err);
          //dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
          console.log(err);
        })
    },
    error => {
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000 },
  );


}

export const getLocationFilters = () => (dispatch, getState) => {


  dispatch({ type: STATUS_LOCATION_FILTERS, payload: 'request' });
  axios
    .get(`${getState().selection.payload.user_scopes.geo_rep.base_url}/locations/location-filters`, {
      params: {
        user_id: getState().selection.payload.user_scopes.geo_rep.user_id,
      },
      headers: {
        Authorization: 'Bearer ' + getState().selection.token
      }
    })
    .then((res) => {
      if (res.data == undefined) {
        dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
        return;
      }

      if (res.data.status == 'success') {
        dispatch({ type: STATUS_LOCATION_FILTERS, payload: 'success' });
        dispatch({ type: CHANGE_LOCATION_FILTERS, payload: res.data.items })
      }
    })
    .catch((err) => {
      dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
      console.log(err);
    })

}


export const getLocationSearchListsByPage = async (filters, pageNumber) => {

  var base_url = await getBaseUrl();
  var token = await getToken();
  var user_id = await getUserId();

  return new Promise(function (resolve, reject) {

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        axios
          .get(`${base_url}/locations/location-search-list`, {
            params: {
              user_id: user_id,
              filters: filters,
              current_latitude: latitude,
              current_longitude: longitude,
              page_nr: pageNumber
            },
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
          .then((res) => {
            if (res.data == undefined) {
              resolve([]);
            }

            if (res.data.error) {
              setToken(null);
              resolve([]);
            }

            if (res.data.status == 'success') {
              resolve(res.data.items);
            } else {
              resolve([]);
            }
          })
          .catch((err) => {
            const error = err.response;
            if (error.status===401 && error.config && 
              !error.config.__isRetryRequest) {          
                reject("expired");
            }else{
              reject(err);  
            }
          })

      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000 },
    );


  });
}


export const getLocationSearchList = () => (dispatch, getState) => {

  // update current location

  Geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      dispatch({ type: CHANGE_CURRENT_LOCATION, payload: { latitude: latitude, longitude: longitude } });
      // call api 
      dispatch({ type: STATUS_LOCATION_SEARCH_LISTS, payload: 'request' });
      console.log("filters parameter for search lists == ", getState().selection.filters);

      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.")
      }
      cancelToken = axios.CancelToken.source()
      axios
        .get(`${getState().selection.payload.user_scopes.geo_rep.base_url}/locations/location-search-list`, {
          cancelToken: cancelToken.token,
          params: {
            user_id: getState().selection.payload.user_scopes.geo_rep.user_id,
            filters: getState().selection.filters,
            current_latitude: latitude,
            current_longitude: longitude
          },
          headers: {
            Authorization: 'Bearer ' + getState().selection.token
          }
        })
        .then((res) => {
          if (res.data == undefined) {
            dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
            return;
          }
          if (res.data.status == 'success') {
            console.log("search results count", res.data.items.length);
            dispatch({ type: STATUS_LOCATION_SEARCH_LISTS, payload: 'success' });
            dispatch({ type: CHANGE_LOCATION_SEARCH_LISTS, payload: res.data.items });

          }
        })
        .catch((err) => {
          dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
          console.log(err);
        })
    },
    error => {
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000 },
  );

}

export const getLeadFields = async () => {
  var base_url = await getBaseUrl();
  var token = await getToken();
  var user_id = await getUserId();
  console.log(`${base_url}/leadfields`);

  return new Promise(function (resolve, reject) {
    axios
      .get(`${base_url}/leadfields`, {
        params: {
          user_id: user_id
        },
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then((res) => {
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == 'success') {
          resolve(res.data.custom_master_fields);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        const error = err.response;
        if (error.status===401 && error.config && 
          !error.config.__isRetryRequest) {          
            reject("expired");
        }else{
          reject(err);  
        }
      })
  });
}


export const getLocationInfoUpdate = async (location_id) => {
  var base_url = await getBaseUrl();
  var token = await getToken();

  console.log(`${base_url}/locations/location_info_update_fields`);

  return new Promise(function (resolve, reject) {
    axios
      .get(`${base_url}/locations/location_info_update_fields`, {
        params: {
          location_id: location_id
        },
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then((res) => {
        if (res.data == undefined) {
          resolve([]);
        }
        console.log("message", res.data);
        resolve(res.data);

      })
      .catch((err) => {
        const error = err.response;
        if (error.status===401 && error.config && 
          !error.config.__isRetryRequest) {          
            reject("expired");
        }else{
          reject(err);  
        }
      })
  });
}



export const postLeadFields = async (postData, idempotencyKey) => {
  var base_url = await getBaseUrl();
  var token = await getToken();
  
  return new Promise(function (resolve, reject) {
    //JSON.stringify(postData)
    axios
      .post(`${base_url}/leadfields`, postData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': idempotencyKey
        }
      })
      .then((res) => {
        
        if (res.data.status === "success") {
          resolve(res.data.location_id);
        }
        resolve(0);
      })
      .catch((err) => {
        const error = err.response;
        if (error.status===401 && error.config && 
          !error.config.__isRetryRequest) {          
            reject("expired");
        }else{
          reject(err);  
        }
      })
  });
}


export const postLocationInfoUpdate = async (postData, idempotencyKey) => {
  var base_url = await getBaseUrl();
  var token = await getToken();
  console.log("url", `${base_url}/locations-info/location-info-update`);
  //console.log("param", postData);

  return new Promise(function (resolve, reject) {

    axios
      .post(`${base_url}/locations-info/location-info-update`, postData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': idempotencyKey
        }
      })
      .then((res) => {
        if (res.data == undefined) {
          resolve("Failed");
          return;
        }
        if (res.data.status == "success") {
          resolve(res.data.message);
        } else {
          resolve("Failed");
        }
      })
      .catch((err) => {
        const error = err.response;
        if (error.status===401 && error.config && 
          !error.config.__isRetryRequest) {          
            reject("expired");
        }else{
          reject(err);  
        }
      })
  });
}




export const getLocationInfo = async (location_id, currentLocation) => {

  console.log("currentLocation", currentLocation);
  var base_url = await getBaseUrl();
  var token = await getToken();
  var user_id = await getUserId();
  var prev_locations = await getLocationLoop();
  var prev_ids = prev_locations.map(item => item.location_id).join(',');


  var params = {
    user_id: user_id,
    location_id: location_id
  }
  if (currentLocation !== undefined) {
    params = {
      user_id: user_id,
      location_id: location_id,
      current_latitude: currentLocation.latitude,
      current_longitude: currentLocation.longitude,
      prev_locations: prev_ids
    }
  }
  console.log("params", params);
  //prev_locations=1332,1331&current_latitude=-33.7009653&current_longitude=18.4420495
  return new Promise(function (resolve, reject) {
    axios
      .get(`${base_url}/locations/location-info`, {
        params: params,
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then((res) => {
        if (res.data == undefined) {
          resolve([]);
        }
        resolve(res.data);
      })
      .catch((err) => {
        const error = err.response;
        if (error.status===401 && error.config && 
          !error.config.__isRetryRequest) {          
            reject("expired");
        }else{
          reject(err);  
        }
      })
  });
}


export const postStageOutcomUpdate = async (request) => {

  var base_url = await getBaseUrl();
  var token = await getToken();
  console.log("started ====");
  return new Promise(function (resolve, reject) {

    let requestPayload = {
      "location_id": request.location_id,
      "stage_id": request.stage_id,
      "outcome_id": request.outcome_id,
      "campaign_id": 1
    }
    axios
      .post(`${base_url}/location-info/updateStageOutcome`, requestPayload, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': request.indempotency_key
        }
      })
      .then((res) => {
        console.log("ended");
        if (res.data == undefined) {
          resolve(0);
          return;
        }
        resolve(1);
        // dispatch({type: CHANGE_LOCATION_INFO, payload: res.data})
      })
      .catch((err) => {
        const error = err.response;
        if (error.status===401 && error.config && 
          !error.config.__isRetryRequest) {          
            reject("expired");
        }else{
          reject(err);  
        }
      })
  });
}




export const postDispositionFields = async (postData, idempotencyKey) => {

  var base_url = await getBaseUrl();
  var token = await getToken();
  return new Promise(function (resolve, reject) {
    axios
      .post(`${base_url}/location-info/updateDispositionFields`, postData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': idempotencyKey
        }
      })
      .then((res) => {
        if (res.data === undefined) {
          resolve("No data")
        }
        resolve(res.data.message);
      })
      .catch((err) => {
        const error = err.response;
        if (error.status===401 && error.config && 
          !error.config.__isRetryRequest) {          
            reject("expired");
        }else{
          reject(err);  
        }
      })

  });
}


export const postReloop = async (postData, idempotencyKey) => {
  var base_url = await getBaseUrl();
  var token = await getToken();

  console.log(postData);

  return new Promise(function (resolve, reject) {
    axios
      .post(`${base_url}/location-info/reloop`, postData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': idempotencyKey
        }
      })
      .then((res) => {
        if (res.data == undefined) {
          resolve("");
          return;
        }
        console.log(res.data);
        if (res.data.status == "success") {
          resolve(res.data.message);
        } else {
          resolve("");
        }

      })
      .catch((err) => {
        const error = err.response;
        if (error.status===401 && error.config && 
          !error.config.__isRetryRequest) {          
            reject("expired");
        }else{
          reject(err);  
        }
      })
  });
}

//{base_url}/locations-info/location-feedback

export const postLocationFeedback = async (postData) => {
  var base_url = await getBaseUrl();
  var token = await getToken();
  
  return new Promise(function (resolve, reject) {
    axios
      .post(`${base_url}/locations-info/location-feedback`, postData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': uuid.v4()
        }
      })
      .then((res) => {
        if (res.data == undefined) {
          resolve("");
          return;
        }
        console.log(res.data);
        if (res.data.status == "success") {
          resolve(res.data.message);
        } else {
          resolve("");
        }
      })
      .catch((err) => {
        const error = err.response;
        if (error.status===401 && error.config && 
          !error.config.__isRetryRequest) {          
            reject("expired");
        }else{
          reject(err);  
        }
      })

  });
}


export const postLocationImage = async (postData, idempotencyKey) => {
  var base_url = await getBaseUrl();
  var token = await getToken();
  //console.log(postData);
  return new Promise(function (resolve, reject) {
    axios
      .post(`${base_url}/locations/location-image`, postData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': idempotencyKey
        }
      })
      .then((res) => {
        if (res.data == undefined) {
          resolve("");
          return;
        }
        console.log(res.data);
        if (res.data.status == "success") {
          resolve(res.data.message);
        } else {
          resolve("");
        }
      })
      .catch((err) => {
        const error = err.response;
        if (error.status===401 && error.config && 
          !error.config.__isRetryRequest) {          
            reject("expired");
        }else{
          reject(err);  
        }
      })

  });
}

export const getLocationFields = async (location_id) => {
  var token = await getToken();
  var baseUrl = await getBaseUrl();
  return new Promise(function (resolve, reject) {
    axios
      .get(`https://www.dev.georep.com/local_api_old/locations/location-fields`, {
        params: {
          location_id: location_id,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
      .then((res) => {
        // console.log("getLocationFields:",res.data);
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == "success") {
          resolve(res.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        const error = err.response;
        if (error.status===401 && error.config && 
          !error.config.__isRetryRequest) {          
            reject("expired");
        }else{
          reject(err);  
        }
      })
  });

}

export const getLocationContacts = async (location_id) => {
  var token = await getToken();
  var baseUrl = await getBaseUrl();
  return new Promise(function (resolve, reject) {
    axios
      .get(`https://www.dev.georep.com/local_api_old/locations/location-contacts`, {
        params: {
          location_id: location_id,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
      .then((res) => {
        // console.log("getLocationFields:",res.data);
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == "success") {
          resolve(res.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        const error = err.response;
        if (error.status===401 && error.config && 
          !error.config.__isRetryRequest) {          
            reject("expired");
        }else{
          reject(err);  
        }
      })
  });

}


export const addEditLocationContact = async (request,indempotencyKey) => {
  var token = await getToken();
  var baseUrl = await getBaseUrl();
  return new Promise(function (resolve, reject) {
    axios
      .post(`${baseUrl}/locations/add-edit-contacts`, request,{
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': indempotencyKey
        }
      })
      .then((res) => {
        // console.log("getLocationFields:",res.data);
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == "success") {
          resolve(res.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        const error = err.response;
        if (error.status===401 && error.config && 
          !error.config.__isRetryRequest) {          
            reject("expired");
        }else{
          reject(err);  
        }
      })
  });

}

export const updateCustomerLocationFields = async (request,indempotencyKey) => {
  var token = await getToken();
  var baseUrl = await getBaseUrl();
  return new Promise(function (resolve, reject) {
    axios
      .post(`${baseUrl}/locations/location-fields`, request,{
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': indempotencyKey
        }
      })
      .then((res) => {
        // console.log("getLocationFields:",res.data);
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == "success") {
          resolve(res.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        const error = err.response;
        if (error.status===401 && error.config && 
          !error.config.__isRetryRequest) {          
            reject("expired");
        }else{
          reject(err);
        }
      })
  });

}