import axios from "axios";
import { CHANGE_LOCATION_FILTERS, CHANGE_PIPELINE_FILTERS, STATUS_LOCATION_FILTERS, STATUS_PIPELINE_FILTERS } from "./actionTypes";

export function getPipelines(base_url, token, filters){    
    return new Promise(function(resolve, reject) {    
        console.log("lnk", JSON.stringify(`${base_url}/pipeline/pipeline-opportunities?filters=${filters}`));          
        axios
        .get(`${base_url}/pipeline/pipeline-opportunities`, {
          params: {
            filters:filters
          },
          headers: {
            Authorization: 'Bearer ' + token,
          }
        })
        .then((res) => {       
          
          if (res.data == undefined) {            
            resolve([]);
          }          
          if(res.data.status == "Success"){
            resolve(res.data);
          }else{
            resolve([]);
          }
        })
        .catch((err) => {                  
          reject(err);          
        })        

    });    
}

export const getPipelineFilters = (campaign_id='') => (dispatch, getState) => {
//.get(`${getState().selection.payload.user_scopes.geo_rep.base_url}/pipeline/pipeline-filters?campaign_id=`, {

console.log("RQ: ",`https://www.dev.georep.com/local_api_old/pipeline/pipeline-filters?campaign_id=${campaign_id}`);
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
      console.log("PIPELINE FILTERS: ",JSON.stringify(res.data));
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
