
import axios from "axios";
import { getBaseUrl, getToken } from "../constants/Storage";
import uuid from 'react-native-uuid';

export function getCalendar(base_url, token, period)
{    
    return new Promise(function(resolve, reject) {    
        console.log("lnk", `${base_url}/calendar?period=${period}`);          
        axios
        .get(`${base_url}/calendar?period=${period}`, {
          params: {},
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then((res) => {          
          if (res.data == undefined) {            
            resolve([]);
          }          
          if(res.data.status == "success"){
            resolve(res.data.items);
          }else{
            resolve([]);
          }
        })
        .catch((err) => {                  
          reject(err);          
        })        

    });    
}

export const updateCalendar = async(postData) => {
  var base_url = await getBaseUrl();
  var token = await getToken();  
  console.log("post date");
  console.log(postData);
  return new Promise(function(resolve, reject) {        
    axios
    .post(`${base_url}/calenderupdate`, postData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Indempotency-Key': uuid.v4()
      }
    })
    .then((res) => {
      if(res.data == undefined){
        resolve(0);
        return;
      }
      resolve(1);      
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    })

  });
}


