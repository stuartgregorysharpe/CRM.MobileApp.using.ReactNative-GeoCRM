import { postApiRequest } from "../actions/api.action";
import { checkConnectivity, getResponseMessage, saveOfflineSyncItems } from "./helper";
import { Strings } from "../constants";

export function find(locationId, postData , type, url){
  
  return new Promise(function(resolve, reject) {

        checkConnectivity().then( async (isConnected) => {             
            if(isConnected){
                postApiRequest(url, postData)
                .then(async res => {                    
                    resolve(res);
                })
                .catch(e => {
                    console.log("Error",e)
                    reject();
                });

            }else{

                var res = await insertToLocalDB(locationId, postData, type, url);            
                resolve({status: Strings.Success , message: getResponseMessage(type , url)});
            }
        }).catch(e => {
            reject(e);
        });
  });
  
}

const insertToLocalDB = async(locationId, postData, type, url) => {    
    await saveOfflineSyncItems(locationId, postData, type , url);
}

export default {
  find,
};
