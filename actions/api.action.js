import axios from 'axios';
import uuid from 'react-native-uuid';
import {getBaseUrl, getToken} from '../constants/Storage';
import Strings from '../constants/Strings';
import { generateKey } from '../constants/Utils';
export const dummyApiRequest = async (route, param, response) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(response);
    }, 1000);
  });
};


export const getApiRequest = async (route, param) => {
  
  var token = await getToken();
  var baseUrl = await getBaseUrl();

  var url = `${baseUrl}/${route}`;
  console.log('API Call Log', url);
  if (route.includes('local_api_old')) {
    url = route;
  }
  
  return new Promise(function (resolve, reject) {
    axios
      .get(url, {
        params: param,
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': generateKey(),
        },
      })
      .then(res => {
                
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == Strings.Success) {        
          resolve(res.data);
        } else {
          resolve(res.data);
        }
      })
      .catch(err => {
        console.log(url, err)
        const error = err.response;
        if (
          error.status === 401 &&
          error.config &&
          !error.config.__isRetryRequest
        ) {
          reject('expired');
        } else {
          reject('error');
        }
      });
  });
};

export const postApiRequest = async (route, postData , indempotencyKey) => {
  var token = await getToken();
  var baseUrl = await getBaseUrl();

  var url = `${baseUrl}/${route}`;
  if (route.includes('local_api_old')) {
    url = route;
  }
  console.log('postApiRequest -- url', url);  
  return new Promise(function (resolve, reject) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      'Indempotency-Key': indempotencyKey != undefined ? indempotencyKey : generateKey(),
    };
    axios
      .post(url, postData, {
        headers: headers,
      })
      .then(res => {
        
        if (res.data && res.data.status === Strings.Success) {
          resolve(res.data);
        } else {
          resolve(res.data);
        }
      })
      .catch(err => {
        console.log('postApiRequest -- error', err);
        const error = err.response;
        if (
          error.status === 401 &&
          error.config &&
          !error.config.__isRetryRequest
        ) {
          reject('expired');
        } else {
          reject(err);
        }
      });
  });
};

export const postApiRequestMultipart = async (route, postData , indempotencyKey) => {
  var token = await getToken();
  var baseUrl = await getBaseUrl();

  var url = `${baseUrl}/${route}`;
  if (route.includes('local_api_old')) {
    url = route;
  }

  return new Promise(function (resolve, reject) {
    console.log('url', url);
    console.log('myforms', JSON.stringify(postData));
    axios
      .post(url, postData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': indempotencyKey != undefined ? indempotencyKey : generateKey(),
        },
      })
      .then(res => {
        console.log('res', res.data);
        if (res.data.status && res.data.status === Strings.Success) {
          resolve(res.data);
        }
        resolve(0);
      })
      .catch(err => {
        //console.log('api error: ', JSON.stringify(err));
        console.log("----" ,err)
        const error = err.response;
        if (error != undefined && error.status != undefined && error.status === 400){
          console.log("error 400", error)
        }else if (
          error != undefined && error.status != undefined && error.status === 401 &&
          error.config &&
          !error.config.__isRetryRequest
        ) {
          reject('expired');
        } else {
          console.log("Error---", err)
          reject(err != undefined ? err : 'Undfined Error');
        }
      });
  });
};
