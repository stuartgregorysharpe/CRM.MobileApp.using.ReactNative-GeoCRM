import axios from "axios";
import { baseURL } from "../constants";
import { getBaseUrl, getToken } from "../constants/Storage";
import { CHANGE_LOCATION_FILTERS, CHANGE_PIPELINE_FILTERS, STATUS_LOCATION_FILTERS, STATUS_PIPELINE_FILTERS } from "./actionTypes";

export function getPipelines(base_url, token, filters) {
  return new Promise(function (resolve, reject) {
    console.log("lnk", JSON.stringify(`${base_url}/pipeline/pipeline-opportunities?filters=${filters}`));
    axios
      .get(`${base_url}/pipeline/pipeline-opportunities`, {
        params: {
          filters: filters
        },
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
      .then((res) => {

        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == "Success") {
          resolve(res.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        reject(err);
      })

  });
}

export const getPipelineFilters = (campaign_id = '') => (dispatch, getState) => {
  //.get(`${getState().selection.payload.user_scopes.geo_rep.base_url}/pipeline/pipeline-filters?campaign_id=`, {

  console.log("RQ: ", `https://www.dev.georep.com/local_api_old/pipeline/pipeline-filters?campaign_id=${campaign_id}`);
  dispatch({ type: STATUS_LOCATION_FILTERS, payload: 'request' });
  axios
    .get(`https://www.dev.georep.com/local_api_old/pipeline/pipeline-filters?campaign_id=${campaign_id}`, {
      params: {
        // user_id: getState().selection.payload.user_scopes.geo_rep.user_id,
      },
      headers: {
        Authorization: 'Bearer ' + getState().selection.token
      }
    })
    .then((res) => {
      console.log("PIPELINE FILTERS: ", JSON.stringify(res.data));
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

export const getAddOpportunityFields = (params,token) => {
  return new Promise(function (resolve, reject) {
    console.log("lnk", JSON.stringify(`https://www.dev.georep.com/local_api_old/pipeline/pipeline-add-edit-opportunity`)+"  params: "+JSON.stringify(params));
    axios
      .get(`https://www.dev.georep.com/local_api_old/pipeline/pipeline-add-edit-opportunity`, {
        params: params,
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
      .then((res) => {
        console.log(res);
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == "Success") {
          resolve(res.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      })
  });

}

export const getAddOpportunityContacts = (params,token) => {
  return new Promise(function (resolve, reject) {
    console.log("lnk", JSON.stringify(`https://www.dev.georep.com/local_api_phase_2/locations/customer-search`) + "params: "+JSON.stringify(params));
    axios
      .get(`https://www.dev.georep.com/local_api_phase_2/locations/customer-search`, {
        params: {
          filters: params
        },
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
      .then((res) => {
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == "success") {
          resolve(res.data.items);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      })
  });

}

export const postAddOpportunityFields = async(postData , idempotencyKey) => {
  var base_url = await getBaseUrl();
  var token = await getToken();  
  return new Promise(function(resolve, reject) {      
    //JSON.stringify(postData)
    axios
    .post(`https://www.dev.georep.com/local_api_old/pipeline/pipeline-add-edit-opportunity`, postData, {
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
