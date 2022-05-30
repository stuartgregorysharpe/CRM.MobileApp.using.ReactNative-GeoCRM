import axios from "axios";
import { baseURL } from "../constants";
import { getBaseUrl, getFilterData, getToken, setToken, storeUserData } from "../constants/Storage";
import jwt_decode from "jwt-decode";

export const checkEmail = async(email) => {    
  return new Promise(function(resolve, reject) {          
    axios
      .post(`${baseURL}/authentication_api/Auth/check_aad_login`, { email })
      .then((res) => {        
        resolve(res);
      })
      .catch((err) => {
        reject(err);
    });
   
  });
}


export const loginWithEmail = async(email , password ) => {
  
  let postData = {email , password};

  return new Promise(function(resolve, reject) {        
    axios
    .post(`${baseURL}/authentication_api/Auth/login`, postData, {})
    .then( async (res) => {            
      if(res.data.status === "failed"){
        console.log("login resonse" , res.data);
        resolve(res.data);        
      }else if (res.data.success.message === "User authenticated successfully") {
        console.log("login resonse success" , res.data);
        setToken(res.data.success.access_token);
        storeUserData(res.data.success.user);
        var data =  jwt_decode(res.data.success.access_token) ;
        console.log("Data"  , JSON.stringify(data));
        resolve(res.data);

      }
    })
    .catch((err) => {
      console.log("err",err)      
    })

  });
}