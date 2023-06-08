import axios from "axios";
import { baseURL } from "../constants";
import { getBaseUrl, getFilterData, getToken, setToken, storeUserData } from "../constants/Storage";
import jwt_decode from "jwt-decode";
import { generateKey } from "../constants/Utils";

export const checkEmail = async (email) => {
  return new Promise(function (resolve, reject) {
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


export const loginWithEmail = async (email, password) => {

  let postData = { email, password };

  return new Promise(function (resolve, reject) {
    axios
      .post(`${baseURL}/authentication_api/Auth/login`, postData, {})
      .then(async (res) => {
        console.log("res",res)
        if (res.data.status === "failed") {
          console.log("login resonse", res.data);
          resolve(res.data);
        } else if (res.data.success.message === "User authenticated successfully") {
          console.log("login resonse success", res.data);
          setToken(res.data.success.access_token);
          storeUserData(res.data.success.user);
          resolve(res.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })

  });
}

export const deviceTokenPostApi = async (postBody, indempotencyKey) => {
  var token = await getToken();
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
    'Indempotency-Key':
      indempotencyKey != undefined ? indempotencyKey : generateKey(),
  };
  console.log("Firebase url", `${baseURL}/authentication_api/users/firebase-id-update`);
  return new Promise(function (resolve, reject) {
    axios
      .post(`${baseURL}/authentication_api/users/firebase-id-update`, postBody, {
        headers: headers,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log("d_error", JSON.stringify(err));
        reject(err);
      });

  });
}