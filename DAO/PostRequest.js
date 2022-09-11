import { postApiRequest } from "../actions/api.action";
import { checkConnectivity, getResponseMessage, saveOfflineSyncItems } from "./helper";
import { Strings } from "../constants";

export function find(locationId, postData , type, url){
  
  return new Promise(function(resolve, reject) {

        checkConnectivity().then( async (isConnected) => {             
            if(isConnected){
                postApiRequest(url, postData)
                .then(async res => {
                    console.log("Api success" , res);
                    resolve(res);
                })
                .catch(e => {
                    console.log("Error",e)
                    reject();
                });

            }else{
                await insertToLocalDB(locationId, postData, type, url);
                console.log(getResponseMessage(type))
                resolve({status: Strings.Success , message: getResponseMessage(type)});
            }
        }).catch(e => {
            reject();
        });
  });
}

const insertToLocalDB = async(locationId, postData, type, url) => {    
    await saveOfflineSyncItems(locationId, postData, type , url);    
}

export default {
  find,
};
