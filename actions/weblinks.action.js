
import axios from "axios";
import { getBaseUrl } from "../constants/Storage";

export const getWebLinks = async(token, params) => {
    var base_url = await getBaseUrl();    
    return new Promise(function(resolve, reject) {                       
        console.log("axis", `${base_url}/weblinks`);
        console.log("token", token);
        axios
        .get(`${base_url}/weblinks`, {
          params: params,
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then((res) => {      
          console.log("suc")  ;
          if (res.data == undefined) {            
            resolve([]);
          }
          
          if(res.data.status == "success"){
            resolve(res.data.weblinks);
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
