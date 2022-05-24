import axios from 'axios';
import uuid from 'react-native-uuid';
import {getBaseUrl, getToken} from '../constants/Storage';
import FormData from 'form-data';

export const getApiRequest = async (route, param) => {
  var token = await getToken();
  var baseUrl = await getBaseUrl();

  var url = `${baseUrl}/${route}`;
  if (route.includes('local_api_old')) {
    url = route;
  }
  return new Promise(function (resolve, reject) {
    axios
      .get(url, {
        params: param,
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': uuid.v4(),
        },
      })
      .then(res => {
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == 'success') {
          resolve(res.data);
        } else {
          resolve(res.data);
        }
      })
      .catch(err => {
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

export const postApiRequest = async (route, postData) => {
  var token = await getToken();
  var baseUrl = await getBaseUrl();

  var url = `${baseUrl}/${route}`;
  if (route.includes('local_api_old')) {
    url = route;
  }

  return new Promise(function (resolve, reject) {
    axios
      .post(url, postData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': uuid.v4(),
        },
      })
      .then(res => {
        if (res.data.status === 'success') {
          resolve(res.data);
        }
        resolve(0);
      })
      .catch(err => {
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

export const postApiRequestMultipart = async (route, postData) => {
  var token = await getToken();
  var baseUrl = await getBaseUrl();

  var url = `${baseUrl}/${route}`;
  if (route.includes('local_api_old')) {
    url = route;
  }

  return new Promise(function (resolve, reject) {
    axios
      .post(url, postData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
          'Indempotency-Key': uuid.v4(),
        },
      })
      .then(res => {
        if (res.data.status && res.data.status === 'success') {
          resolve(res.data);
        }
        resolve(0);
      })
      .catch(err => {
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
