import axios from 'axios';
import uuid from 'react-native-uuid';
import { Strings } from '../constants';
import { getBaseUrl, getToken, getLmsUrl } from '../constants/Storage';
import { generateKey } from '../constants/Utils';
import { convertStringToByteArray } from '../services/DownloadService/TrackNetSpeed';

export const dummyApiRequest = async (route, param, response) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(response);
    }, 1111);
  });
};

axios.defaults.timeout = 15000;

export const getApiRequest = async (route, param, isLms = false) => {
  var token = await getToken();
  var baseUrl = isLms ? await getLmsUrl() : await getBaseUrl();

  var url = `${baseUrl}/${route}`;
  console.log('API Call Log', url);
  if (route.includes('local_api_old')) {
    url = route;
  }
  //const _start = new Date().getTime();
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
        // var byteArray = convertStringToByteArray(JSON.stringify(res));
        // const _end = new Date().getTime();
        // const kbPerSecond = Math.floor((byteArray.length/1024)/((_end-_start)/1000));
        // console.log("GET api speed:  ", kbPerSecond);

        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == Strings) {
          resolve(res.data);
        } else {
          resolve(res.data);
        }
      })
      .catch(err => {
        console.log('get api request error => ', err?.message);        
        if(err != undefined){
          const error = err.response;          
          if (            
            error?.status === 401 &&
            error?.config &&
            !error?.config?.__isRetryRequest
          ) {
            reject('expired');
          } else if(error?.status === 400){
            reject('error_400')
          } else if(err?.message?.includes('Network Error')) {
            reject('network_error');
          } else if(err?.message?.includes('timeout')) {
            reject('timeout');
          }else{
            reject('error');
          }
        }else{
          reject('timeout');
        }
        
      });
  });
};

export const postApiRequest = async (route, postData, indempotencyKey , isLms = false) => {

  var token = await getToken();
  var baseUrl = isLms ? await getLmsUrl() : await getBaseUrl();
  
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
      'Indempotency-Key':
      indempotencyKey != null && indempotencyKey != undefined ? indempotencyKey : generateKey(),
    };
    axios
      .post(url, postData, {
        timeout: 15000,
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
        
        if(err != undefined){          
          console.log('postApiRequest error =>', err.response);
          if(err?.response != undefined){
            const error = err.response;
            if (
              error != undefined &&
              error.status != undefined &&
              error.status === 400
            ) {
              reject(error?.data?.error);          
            }else if (
              error.status === 401 &&
              error.config &&
              !error.config.__isRetryRequest
            ) {
              reject('expired');
            } else if(err?.message?.includes('Network Error')) {
              reject('network_error');
            } else if(err?.message?.includes('timeout')) {
              reject('timeout');
            }else{
              reject(err?.message);
            }            
          }else{            
            reject('timeout');
          }          
        }else{
          reject('timeout');
        }
        
      });
  });
};

export const postApiRequestMultipart = async (
  route,
  postData,
  indempotencyKey,
) => {
  
  var token = await getToken();
  var baseUrl = await getBaseUrl();

  var url = `${baseUrl}/${route}`;
  if (route.includes('local_api_old')) {
    url = route;
  }

  console.log(' multipart postApiRequest -- url', url);

  return new Promise(function (resolve, reject) {
    
    console.log('myforms', JSON.stringify(postData));    
    const key =  indempotencyKey != null && indempotencyKey != undefined ? indempotencyKey : generateKey();

    axios
      .post(url, postData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json, text/plain',
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': key,
        },
        timeout: 15000,
      })
      .then(res => {
        console.log('res', res.data);
        if (res.data.status && res.data.status === Strings.Success) {
          resolve(res.data);
        }
        resolve(0);
      })
      .catch(err => {
        console.log('api error: ', JSON.stringify(err));        
        const error = err.response;
        if (
          error != undefined &&
          error.status != undefined &&
          error.status === 400
        ) {
          reject(error?.data?.error);          
        } else if (
          error != undefined &&
          error.status != undefined &&
          error.status === 401 &&
          error.config &&
          !error.config.__isRetryRequest
        ) {
          reject('expired');
        } else if(err?.message?.includes('Network Error')) {
          reject('network_error');          
        } else if(err?.message?.includes('timeout')) {
          reject('timeout');
        }else{
          reject(err != undefined ? err : 'Undfined Error');
        }
      });
  });
};



export const postHmsMapRequest = async (route, postData, key) => {

  var token = await getToken();  
  var url = route;
  
  return new Promise(function (resolve, reject) {

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',      
      'key': key        
    };

    axios
      .post(url, postData, {
        headers: headers        
      })
      .then(res => {
        if (res.data && res.data.status === Strings.Success) {
          resolve(res.data);
        } else {
          resolve(res.data);
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err))
        const error = err.response;
        if (
          error.status === 401 &&
          error.config &&
          !error.config.__isRetryRequest
        ) {
          reject('expired');
        } else if(err?.message?.includes('Network Error')) {
          reject('network_error');
        } else if(err?.message?.includes('timeout')) {
          reject('timeout');
        } else {
          reject(err?.message);
        }
      });
  });
};