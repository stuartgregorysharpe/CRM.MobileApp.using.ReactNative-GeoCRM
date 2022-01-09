import axios from "axios";
import jwt_decode from "jwt-decode";

import { 
  CHANGE_LOGIN_STATUS, 
  CHANGE_USER_INFO, 
  CHANGE_PROJECT_PAYLOAD,
  CHANGE_ACCESS_TOKEN
} from "./actionTypes";
import { baseURL } from "../constants";
import { setToken, storeUserData } from "../constants/Storage";

export const Login = (email, password) => (dispatch) => {
  axios
    .post(`${baseURL}/authentication_api/Auth/login`, { email, password })
    .then((res) => {
      if (res.data.success.message == 'User authenticated successfully') {
        
        setToken(res.data.success.access_token);
        storeUserData(res.data.success.user);
        
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