import axios from 'axios';
import uuid from 'react-native-uuid';
import { getBaseUrl, getToken } from '../../constants/Storage';
import { generateKey } from '../../constants/Utils';

export const convertStringToByteArray = (str) => {
    String.prototype.encodeHex = function () {
      var bytes = [];
      for (var i = 0; i < this.length; ++i) {
      bytes.push(this.charCodeAt(i));
      }
      return bytes;
    };
   
    var byteArray = str.encodeHex();
    return byteArray
}


export const getSpeed = async (route, param) => {

    var token = await getToken();
    var baseUrl = await getBaseUrl();
    var url = `${baseUrl}/${route}`;
    console.log('Track URL : ', url);    
  
    const _start = new Date().getTime();

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
            var byteArray = convertStringToByteArray(JSON.stringify(res));
            console.log("byte alrray ", byteArray.length);
            const _end = new Date().getTime();
            const kbPerSecond = Math.floor((byteArray.length/1024)/((_end-_start)/1000));
            resolve(kbPerSecond);

        })
        .catch(err => {
          console.log(url, err);
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
