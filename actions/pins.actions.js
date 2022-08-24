import axios from "axios";
import jwt_decode from "jwt-decode";

export const getDynamicPins = async(token) => {

  var data = token != null ? jwt_decode(token) : null;
  var base_url = data.user_scopes.geo_rep.base_url;

  return new Promise(function(resolve, reject) {
      axios
      .get(`${base_url}/locations/location-dynamic-pins`, {
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
            reject("expired");
        }else{
          reject(err);  
        }
      })        

  });    
}


