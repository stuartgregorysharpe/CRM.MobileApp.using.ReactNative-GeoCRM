import { postApiRequest, postApiRequestMultipart } from "../actions/api.action";
import { checkConnectivity, getResponseMessage, saveOfflineSyncItems } from "./helper";
import { Strings } from "../constants";
import { jsonToFormData } from "../helpers/jsonHelper";

export function find(locationId, postData , type, url , itemLabel , itemSubLabel = ''){
  
  return new Promise(function(resolve, reject) {

        checkConnectivity().then( async (isConnected) => {             
            if(isConnected){
                if(type == "form_submission" || type === "leadfields"){                                                            
                    const submitFormData =  jsonToFormData(postData);
                    submitFormData.append("mode", "online");
                    postApiRequestMultipart(url, submitFormData)
                    .then(async res => {
                        resolve(res);
                    })
                    .catch(e => {
                        console.log( url + "api error: ",e)
                        reject(e);
                    });
                }else{
                    postApiRequest(url, {...postData, mode: 'online' })
                    .then(async res => {                    
                        resolve(res);
                    })
                    .catch(e => {
                        console.log("Error",e)
                        reject(e);
                    });
                }                
            }else{
                var res = await insertToLocalDB(locationId, postData, type, url , itemLabel , itemSubLabel);                
                var message = getResponseMessage(type , url);
                resolve({status: Strings.Success , message: message });
            }
        }).catch(e => {
            reject(e);
        });
  });
  
}

const insertToLocalDB = async(locationId, postData, type, url , itemLabel , itemSubLabel) => {    
    await saveOfflineSyncItems(locationId, postData, type , url , itemLabel , itemSubLabel);
}

export default {
  find,
};
