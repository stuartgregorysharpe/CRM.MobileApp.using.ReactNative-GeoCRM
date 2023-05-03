
import axios from "axios";
import { getBaseUrl, getToken } from "../constants/Storage";
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




