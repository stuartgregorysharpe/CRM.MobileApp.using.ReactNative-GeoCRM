import { postApiRequest, postApiRequestMultipart } from "../actions/api.action";
import { checkConnectivity, getResponseMessage, saveOfflineSyncItems } from "./helper";
import { Strings } from "../constants";
import { objectToFormData } from "../constants/Helper";
import { jsonToFormData } from "../helpers/jsonHelper";

export function find(locationId, postData , type, url , itemLabel){
  
  return new Promise(function(resolve, reject) {

        checkConnectivity().then( async (isConnected) => {             
            if(isConnected){
                if(type == "form_submission" || type === "leadfields"){                                                            
                    const submitFormData =   type === "leadfields" ? postData : jsonToFormData(postData);
                    submitFormData.append("mode", "online");
                    postApiRequestMultipart(url, submitFormData)
                    .then(async res => {
                        resolve(res);
                    })
                    .catch(e => {
                        console.log("Error",e)
                        reject();
                    });
                }else{
                    postApiRequest(url, {...postData, mode: 'online' })
                    .then(async res => {                    
                        resolve(res);
                    })
                    .catch(e => {
                        console.log("Error",e)
                        reject();
                    });
                }                
            }else{
                var res = await insertToLocalDB(locationId, postData, type, url , itemLabel);            
                resolve({status: Strings.Success , message: getResponseMessage(type , url)});
            }
        }).catch(e => {
            reject(e);
        });
  });
  
}

const insertToLocalDB = async(locationId, postData, type, url , itemLabel) => {    
    await saveOfflineSyncItems(locationId, postData, type , url , itemLabel);
}

export default {
  find,
};
