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
  CHANGE_LOCATION_INFO,
  CHANGE_CURRENT_LOCATION,
  STATUS_STAGE_OUTCOME_UPDATE
} from "./actionTypes";

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
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then(location => {
      dispatch({
        type: CHANGE_CURRENT_LOCATION, payload: {
          // latitude: -33.898004,
          // longitude: 18.523551,
          latitude: location.latitude,
          longitude: location.longitude,
        }
      })
      axios
        .get(`${getState().selection.payload.user_scopes.geo_rep.base_url}/locations/location-map`, {
          params: {
            user_id: getState().selection.payload.user_scopes.geo_rep.user_id,
            // current_latitude: -33.898004,
            // current_longitude: 18.523551,
            current_latitude: location.latitude,
            current_longitude: location.longitude
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
            dispatch({ type: STATUS_LOCATION_MAP, payload: 'success' });
            dispatch({ type: CHANGE_LOCATION_MAP, payload: res.data.locations })
          }
        })
        .catch((err) => {
          dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
          console.log(err);
        })
    })
    .catch(error => {
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

export const getLocationSearchList = () => (dispatch, getState) => {
  dispatch({ type: STATUS_LOCATION_SEARCH_LISTS, payload: 'request' });
  axios
    .get(`${getState().selection.payload.user_scopes.geo_rep.base_url}/locations/location-search-list`, {
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
        dispatch({ type: STATUS_LOCATION_SEARCH_LISTS, payload: 'success' });
        dispatch({ type: CHANGE_LOCATION_SEARCH_LISTS, payload: res.data.items })
      }
    })
    .catch((err) => {    
      dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
      console.log(err);
    })
}

export const getLocationInfo = (location_id) => (dispatch, getState) => {


  dispatch({type: STATUS_LOCATION_INFO, payload: 'request'});
  axios
    .get(`${getState().selection.payload.user_scopes.geo_rep.base_url}/locations/location-info`, {
      params: {
        user_id: getState().selection.payload.user_scopes.geo_rep.user_id,
        location_id
      },
      headers: {
        Authorization: 'Bearer ' + getState().selection.token,
      }
    })
    .then((res) => {      
      if (res.data == undefined) {
        dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
        return;
      }      
      dispatch({type: CHANGE_LOCATION_INFO, payload: res.data})    
    })  
    .catch((err) => {
      dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
      console.log(err);
    })
}

export const postStageOutcomUpdate = (request) => (dispatch, getState) => {
  let requestPayload = {
    "location_id": request.location_id,
    "stage_id": request.stage_id,
    "outcome_id": request.outcome_id,
    "campaign_id": 1
  }
  dispatch({ type: STATUS_STAGE_OUTCOME_UPDATE, payload: 'request' });
  axios
    .post(`${getState().selection.payload.user_scopes.geo_rep.base_url}/location-info/updateStageOutcome`, requestPayload, {
      headers: {
        Authorization: 'Bearer ' + getState().selection.token,
        'Indempotency-Key': request.indempotency_key
      }
    })
    .then((res) => {
      console.log("postStageOutcomUpdate: ", JSON.stringify(res));
      if (res.data == undefined) {
        dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
        return;
      }
      dispatch({type: STATUS_STAGE_OUTCOME_UPDATE, payload: 'success'});
      // dispatch({type: CHANGE_LOCATION_INFO, payload: res.data})
    })
    .catch((err) => {
      // dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
      dispatch({type: STATUS_STAGE_OUTCOME_UPDATE, payload: 'failure'});
      console.log(err.response);
    })
}