
import axios from "axios";
import RNFS, { DownloadFileOptions, DocumentDirectoryPath, downloadFile } from 'react-native-fs';
import { baseURL } from "../constants";
import { getToken } from "../constants/Storage";


export function getContentLibrary(base_url, token, params) {
  return new Promise(function (resolve, reject) {
    axios
      .get(`${base_url}/contentlibrary`, {
        params: params,
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then((res) => {
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == "success") {
          resolve(res.data.folders);
        } else {
          resolve([]);
        }

      })
      .catch((err) => {
        const error = err.response;
        if (error.status === 401 && error.config &&
          !error.config.__isRetryRequest) {
          reject("expired");
        } else {
          reject(err);
        }
      })

  });
}

export function downloadPDF(url, fileName, ext) {

  return new Promise(function (resolve, reject) {
    //ExternalDirectoryPath
    const path = Platform.OS === 'ios' ? `${RNFS.DocumentDirectoryPath}/${fileName}.${ext}` : `${RNFS.ExternalDirectoryPath}/${fileName}.${ext}`;
    const headers = {
      'Accept': 'application/pdf',
      'Content-Type': 'application/pdf',
      'Authorization': `Bearer [token]`
    }
    //Define options
    const options: RNFS.DownloadFileOptions = {
      fromUrl: encodeURI(url),
      toFile: path,
      headers: headers
    }
    //Call downloadFile
    const response = RNFS.downloadFile(options);
    resolve(response.promise);

  });

}

export const getContentFeeds = async (params) => {
  var token = await getToken();
  return new Promise(function (resolve, reject) {

    axios
      .get(`${baseURL}/local_api_phase_2/ContentFeed/fetch${params}`, {
        headers: {
          Authorization: 'token ' + token,
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      .then((res) => {
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == "success") {
          resolve(res.data.data);
        } else {
          resolve([]);
        }

      })
      .catch((err) => {
        console.log("content feed error", err);
      })

  });
}

export const updateContentFeed_post = async (params, id) => {
  var token = await getToken();
  return new Promise(function (resolve, reject) {
    axios
      .put(`${baseURL}/local_api_phase_2/ContentFeed/update/${id}`, params, {
        headers: {
          Authorization: 'token ' + token,
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      },)
      .then((res) => {
        console.log("res", res.data);
        if (res.data == undefined) {
          resolve([]);
        }
        if (res.data.status == "success") {
          resolve(res.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        const error = err.response;
        if (error.status === 401 && error.config &&
          !error.config.__isRetryRequest) {
          reject("expired");
        } else {
          reject(err);
        }
      })

  });
}

