import GetLocation from 'react-native-get-location';
import axios from "axios";
import {
  CHANGE_LOGIN_STATUS,
  STATUS_PIN_KEY,
  STATUS_LOCATION_MAP,
  STATUS_LOCATION_FILTERS,
  STATUS_LOCATION_SEARCH_LISTS,
  STATUS_LOCATION_INFO,
  CHANGE_PIN_KEY,
  CHANGE_LOCATION_MAP,
  CHANGE_LOCATION_FILTERS,
  CHANGE_LOCATION_SEARCH_LISTS,
  CHANGE_CURRENT_LOCATION,
  STATUS_DISPOSITION_FIELDS_UPDATE
  
} from "./actionTypes";

import { getBaseUrl, getFilterData, getToken, getUserData, getUserId, setToken } from '../constants/Storage';

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
        console.log("pin data",  res.data.items );
        dispatch({ type: STATUS_PIN_KEY, payload: 'success' });
        dispatch({ type: CHANGE_PIN_KEY, payload: res.data.items });
      }
    })
    .catch((err) => {
      dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
      console.log(err);
    })
}

export const getLocationsMap = () => (dispatch, getState) => {    
  dispatch({ type: STATUS_LOCATION_MAP, payload: 'request' });  
  console.log("logss== ",getState().selection.filters);
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then(location => {
      console.log("current location" , location);
      if(location.latitude !== undefined){
        dispatch({
          type: CHANGE_CURRENT_LOCATION, payload: {          
             latitude: location.latitude,
             longitude: location.longitude,          
          }
        })
      }                  
      axios
        .get(`${getState().selection.payload.user_scopes.geo_rep.base_url}/locations/location-map`, {
          params: {
            user_id: getState().selection.payload.user_scopes.geo_rep.user_id,            
            current_latitude: location.latitude,
            current_longitude: location.longitude,
            filters: getState().selection.filters
          },
          headers: {
            Authorization: 'Bearer ' + getState().selection.token
          }
        })
        .then((res) => {
          
          if (res.data == undefined) {
            setToken(null);
            dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
            return;
          }

          if(res.data.error){
            setToken(null);
            dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
            return;
          }

          console.log("get location map data CHANGE_LOCATION_MAP" , res.data.locations.length);
          if (res.data.status == 'success') {
            dispatch({ type: STATUS_LOCATION_MAP, payload: 'success' });
            dispatch({ type: CHANGE_LOCATION_MAP, payload: res.data.locations })
          }
        })
        .catch((err) => {
          console.log("map api connection error", err);          
          setToken(null);
          dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
          console.log(err);
        })
    })
    .catch(error => {
      console.log("get location error", error);  
      const { code, message } = error;
      console.warn(code, message);
    });
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


export const getLocationSearchListsByPage = async( filters, pageNumber ) => {

    var base_url = await getBaseUrl();
    var token = await getToken();
    var user_id = await getUserId();

    return new Promise(function(resolve, reject) {

        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        })
        .then(location => {

          console.log("base_url ---- ",base_url);
          console.log({
            user_id : user_id,
            filters : filters,
            current_latitude : location.latitude,
            current_longitude : location.longitude, 
            page_nr : pageNumber
          });;

          axios
          .get(`${base_url}/locations/location-search-list`, {
            params: {
              user_id : user_id,
              filters : filters,
              current_latitude : location.latitude,
              current_longitude : location.longitude, 
              page_nr : pageNumber
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
              resolve(res.data.items);
            }else{
              resolve([]);
            }
          })
          .catch((err) => {        
            reject(err);          
            console.log(err);
          })

        })
        .catch(error => {
          console.log("get location error", error);  
          const { code, message } = error;      
        });
    });            
}


export const getLocationSearchList = () => (dispatch, getState) => {

  // update current location
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
  .then(location => {    
      dispatch({type: CHANGE_CURRENT_LOCATION, payload: {latitude: location.latitude,longitude: location.longitude } });
      // call api 
      dispatch({ type: STATUS_LOCATION_SEARCH_LISTS, payload: 'request' });  
      console.log("filters parameter for search lists == ", getState().selection.filters);
      axios
      .get(`${getState().selection.payload.user_scopes.geo_rep.base_url}/locations/location-search-list`, {
        params: {
          user_id: getState().selection.payload.user_scopes.geo_rep.user_id,
          filters: getState().selection.filters,
          current_latitude : location.latitude,
          current_longitude : location.longitude
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
      

  })
  .catch(error => {
    console.log("get location error", error);  
    const { code, message } = error;      
  });
    

}

export const getLeadFields = async() => {
  var base_url = await getBaseUrl();
  var token = await getToken();
  var user_id = await getUserId();
  return new Promise(function(resolve, reject) {
      axios
      .get(`${base_url}/leadfields`, {
        params: {
          user_id : user_id          
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
        }else{
          resolve([]);
        }
      })
      .catch((err) => {        
        reject(err);          
      })
  });
}


export const getLocationInfoUpdate = async(location_id) => {
  var base_url = await getBaseUrl();
  var token = await getToken();

  return new Promise(function(resolve, reject) {
      axios
      .get(`${base_url}/locations/location_info_update_fields`, {
        params: {
          location_id : location_id          
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
        reject(err);          
      })
  });
}

 

export const postLeadFields = async(postData , idempotencyKey) => {
  var base_url = await getBaseUrl();
  var token = await getToken();  
  return new Promise(function(resolve, reject) {      
    //JSON.stringify(postData)
    axios
    .post(`${base_url}/leadfields`, postData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Indempotency-Key': idempotencyKey
      }
    })
    .then((res) => {
      if(res.data == undefined){
        resolve(0);
        return;
      }
      resolve(1);      
    })
    .catch((err) => {
      reject(err);
    })
  });
}


export const postLocationInfoUpdate = async(postData , idempotencyKey) => {
  var base_url = await getBaseUrl();
  var token = await getToken();  
  console.log("url", `${base_url}/locations-info/location-info-update`);
  console.log("param", postData);

  return new Promise(function(resolve, reject) {      
  
    axios
    .post(`${base_url}/locations-info/location-info-update`, postData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Indempotency-Key': idempotencyKey
      }
    })
    .then((res) => {
      if(res.data == undefined){
        resolve("Failed");
        return;
      }
      if(res.data.status == "success"){
        resolve(res.data.message);
      }else{
        resolve("Failed");
      }            
    })
    .catch((err) => {
      reject(err);
    })
  });
}




export const getLocationInfo = async(location_id) => {

  var base_url = await getBaseUrl();
  var token = await getToken();  
  var user_id = await getUserId();
  return new Promise(function(resolve, reject) {                             
      axios
      .get(`${base_url}/locations/location-info`, {
        params: {
          user_id : user_id,
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
        resolve(res.data);        
      })
      .catch((err) => {        
        reject(err);          
      })
  });    
}


export const postStageOutcomUpdate = async(request) => {
    
    var base_url = await getBaseUrl();
    var token = await getToken();
    console.log("started ====");
    return new Promise(function(resolve, reject) {
      
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
        // dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
        reject(err);
        console.log(err.response);
      })
    });
}




export const postDispositionFields = async(postData, idempotencyKey) => {
    
  var base_url = await getBaseUrl();
  var token = await getToken();  
  return new Promise(function(resolve, reject) {
    axios
    .post(`${base_url}/location-info/updateDispositionFields`, postData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Indempotency-Key': idempotencyKey
      }
    })
    .then((res) => {
      if(res.data === undefined){
        resolve("No data")
      }      
      resolve(res.data.message);      
    })
    .catch((err) => {
      console.log("error", err)
      resolve("Error")      
    })
    
  });
}




export const postReloop = async(postData , idempotencyKey) => {
  var base_url = await getBaseUrl();
  var token = await getToken();  

  console.log(postData);

  return new Promise(function(resolve, reject) {          
    axios
    .post(`${base_url}/location-info/reloop`, postData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Indempotency-Key': idempotencyKey
      }
    })
    .then((res) => {
      if(res.data == undefined){
        resolve("");
        return;
      }
      console.log(res.data);
      if(res.data.status == "success"){
        resolve(res.data.message);
      }else{
        resolve("");
      }
    
    })
    .catch((err) => {
      //console.log(err);
      reject(err);
    })

  });
}

export const postLocationImage = async(postData , idempotencyKey) => {
  var base_url = await getBaseUrl();
  var token = await getToken();  
  //console.log(postData);
  return new Promise(function(resolve, reject) {          
    axios
    .post(`${base_url}/locations/location-image`, postData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Indempotency-Key': idempotencyKey
      }
    })
    .then((res) => {
      if(res.data == undefined){
        resolve("");
        return;
      }
      console.log(res.data);
      if(res.data.status == "success"){
        resolve(res.data.message);
      }else{
        resolve("");
      }    
    })
    .catch((err) => {
      //console.log(err);
      reject(err);
    })

  });
}

export const getGeocoding = async(latitude, longitude) => {  
  return new Promise(function(resolve, reject) {        
    console.log("url", `https://maps.googleapis.com/maps/api/geocode/json?result_type=street_address&latlng=${latitude},${longitude}&key=AIzaSyBtgcNrNTOftpHM44Qk9BVzhUdKIZEfvJw`);
    axios
    .get(`https://maps.googleapis.com/maps/api/geocode/json?result_type=street_address&latlng=${latitude},${longitude}&key=AIzaSyBtgcNrNTOftpHM44Qk9BVzhUdKIZEfvJw`, {      
      headers: {}
    })
    .then((res) => {
      resolve(res.data); 
    })
    .catch((err) => {
      reject(err);
    })
      
  });
}
