import axios from "axios";
import { getBaseUrl, getToken } from "../constants/Storage";
import uuid from 'react-native-uuid';
import { generateKey } from "../constants/Utils";

export function getSupportIssues(base_url, token, params)
{
    return new Promise(function(resolve, reject) {                
        axios
        .get(`${base_url}/supportissues`, {
          params: params,
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then((res) => {                
          if (res.data == undefined) {            
            resolve([]);
          }          
          if(res.data.status == "success"){
            resolve(res.data.issues);
          }else{
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

export const  postSupportEmail = async (postData) => {
  
  var base_url = await getBaseUrl();
  var token = await getToken();
    return new Promise(function(resolve, reject) {
        axios
        .post(`${base_url}/supportmail`, postData, {
            headers: {
              Authorization: 'Bearer ' + token,
              'Indempotency-Key': generateKey() 
            }
        })
        .then((res) => {                
            console.log("res", res.data);
          if (res.data == undefined) {            
            resolve([]);
          }          
          if(res.data.status == "success"){
            resolve(res.data);
          }else{
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

