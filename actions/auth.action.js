import axios from "axios";
import jwt_decode from "jwt-decode";

import { 
  CHANGE_LOGIN_STATUS, 
  CHANGE_USER_INFO, 
  CHANGE_PROJECT_PAYLOAD,
  CHANGE_ACCESS_TOKEN,
  FILTERS,
  MAP_FILTERS
} from "./actionTypes";
import { baseURL } from "../constants";
import { getBaseUrl, getFilterData, getToken, setToken, storeUserData } from "../constants/Storage";


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
      console.log("ddd", res.data);
      
      if(res.data.status === "failed"){
        console.log("login resonse" , res.data);
        resolve(res.data);        
      }else if (res.data.success.message === "User authenticated successfully") {
        console.log("login resonse success" , res.data);
        setToken(res.data.success.access_token);
        storeUserData(res.data.success.user);
        resolve(res.data);
      }
    })
    .catch((err) => {
      console.log("err",err)      
    })

  });
}