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




export const loginWithEmail = async(email , password ) => {
  
  let postData = {email , password};

  return new Promise(function(resolve, reject) {        
    axios
    .post(`${baseURL}/authentication_api/Auth/login`, postData, {})
    .then( async (res) => {
      if(res.data == undefined){
        resolve(0);
        return;
      }
      console.log("login resonse" , res.data);

      if (res.data.success.message == 'User authenticated successfully') {        
        setToken(res.data.success.access_token);
        storeUserData(res.data.success.user);
        resolve(res);                
      }
    })
    .catch((err) => {
      console.log("err",err)
      const error = err.response;      
      if (error.status===400 && error.config && 
        !error.config.__isRetryRequest) {          
          reject("invalid");
      }else{
        reject(err);  
      }
    })

  });
}


export const Login = (email, password) => (dispatch) => {
  console.log("base url", baseURL);

  axios
    .post(`${baseURL}/authentication_api/Auth/login`, { email, password })
    .then( async (res) => {

      if (res.data.success.message == 'User authenticated successfully') {        
        setToken(res.data.success.access_token);
        storeUserData(res.data.success.user);        
        var filters = await getFilterData('@filter');
        dispatch({ type: MAP_FILTERS, payload: filters });
        dispatch({ type: CHANGE_USER_INFO, payload: res.data.success.user });
        dispatch({ type: CHANGE_ACCESS_TOKEN, payload: res.data.success.access_token });
        dispatch({ type: CHANGE_PROJECT_PAYLOAD, payload: jwt_decode(res.data.success.access_token) })
        dispatch({ type: CHANGE_LOGIN_STATUS, payload: "success" });

      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: CHANGE_LOGIN_STATUS, payload: "failure" });
    });
}