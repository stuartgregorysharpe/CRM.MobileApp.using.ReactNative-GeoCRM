
import axios from "axios";
import { getBaseUrl, getToken } from "../constants/Storage";
import uuid from 'react-native-uuid';
import { generateKey } from "../constants/Utils";

export function getCalendar(base_url, token, period)
{    
    return new Promise(function(resolve, reject) {    
        console.log("lnk", `${base_url}/calendar?period=${period}`);          
        axios
        .get(`${base_url}/calendar?period=${period}`, {
          params: {},
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then((res) => {          
          if (res.data == undefined) {            
            resolve([]);
          }          
          if(res.data.status == "success"){
            resolve(res.data.items);
          }else{
            resolve([]);
          }
        })
        .catch((err) => {
          const error = err.response;
          if (error.status===401 && error.config && 
            !error.config.__isRetryRequest) {
              console.log("token expired -- ");
              reject("expired");
          }else{
            reject(err);  
          }
        })        
    });    
}


export const updateCalendar = async(postData) => {
  var base_url = await getBaseUrl();
  var token = await getToken();
  console.log("URL " , `${base_url}/calenderupdate`);
  console.log("Param ", postData);
  return new Promise(function(resolve, reject) {        
    axios
    .post(`${base_url}/calenderupdate`, postData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Indempotency-Key': generateKey()
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
      const error = err.response;
      if (error.status===401 && error.config && 
        !error.config.__isRetryRequest) {
          console.log("token expired -- ");
          reject("expired");
      }else{
        reject(err);  
      }
    })
  });
}

export const addCalendar = async(postData) => {
  var base_url = await getBaseUrl();
  var token = await getToken();  
  console.log("URL ", `${base_url}/calendaradd`);  
  console.log("Param " , postData);
  return new Promise(function(resolve, reject) {        
    axios
    .post(`${base_url}/calenderadd`, postData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Indempotency-Key': generateKey()
      }
    })
    .then((res) => {
      console.log("Response " , res.data);
      if(res.data == undefined){
        resolve("Failed");
        return;
      }
      if(res.data.status == "success"){
        resolve("Added to Calendar successfully");
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




