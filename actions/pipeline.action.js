import axios from "axios";
import { getBaseUrl, getToken } from "../constants/Storage";
import { CHANGE_LOCATION_FILTERS, CHANGE_LOGIN_STATUS, CHANGE_PIPELINE_FILTERS, STATUS_LOCATION_FILTERS, STATUS_PIPELINE_FILTERS } from "./actionTypes";
import { generateKey } from "../constants/Utils";


export const getPipelineFilters = (campaign_id = '') => (dispatch, getState) => {    
  dispatch({ type: STATUS_LOCATION_FILTERS, payload: 'request' });
  axios
    .get(`${getState().selection.payload.user_scopes.geo_rep.base_url}/pipeline/pipeline-filters?campaign_id=${campaign_id}`, {
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
    })
}

export const postAddOpportunityFields = async (postData) => {
  var base_url = await getBaseUrl();
  var token = await getToken();  
  console.log("Paramer " , postData);
  
  return new Promise(function (resolve, reject) {    
    axios
      .post(`${base_url}/pipeline/pipeline-add-edit-opportunity`, postData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': generateKey()
        }
      })
      .then((res) => {
        console.log("res",res)
        if (res.data == undefined) {
          resolve(0);
          return;
        }
        resolve(1);
      })
      .catch((err) => {
        console.log("e", JSON.stringify(err));
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
