
import axios from "axios";

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
          reject(err);          
        })
    });    
}


export function postSupportEmail(base_url, token, params)
{        
    return new Promise(function(resolve, reject) {
        axios        
        .post(`${base_url}/supportmail`, params, {
            headers: {
              Authorization: 'Bearer ' + token,
              'Indempotency-Key': params.indempotency_key
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
            console.log(err);           
          reject(err);          
        })        

    });    
}

