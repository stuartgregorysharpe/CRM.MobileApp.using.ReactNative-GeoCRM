import { postApiRequest, postApiRequestMultipart } from "../actions/api.action";
import { checkConnectivity, getResponseMessage, saveOfflineSyncItems } from "./helper";
import { Strings } from "../constants";
import { jsonToFormData, jsonToFormDataWithSubKey } from "../helpers/jsonHelper";
import { showOfflineDialog } from "../constants/Helper";

export function find(locationId, postData , type, url , itemLabel , itemSubLabel , indempotency = null){
  
    const nonImplementedApis = [
        "start_end_day",
        "update-stage-outcome"
    ];

  return new Promise(function(resolve, reject) {

        checkConnectivity().then( async (isConnected) => {
            if(isConnected){
                if( 
                    type == "form_submission" || 
                    type === "leadfields" || 
                    type === "sell_to_trader" ||
                    type === "transaction-submit"
                ){                                        
                    var submitFormData;
                    if(type === "transaction-submit"){                        
                        submitFormData = jsonToFormDataWithSubKey(postData);
                    }else{
                        submitFormData =  jsonToFormData(postData);
                    }                    
                    submitFormData.append("mode", "online");
                    
                    console.log("submit form data", JSON.stringify(submitFormData));

                    postApiRequestMultipart(url, submitFormData , indempotency)
                    .then(async res => {
                        resolve(res);
                    })
                    .catch(e => {
                        console.log( url + "api error: ",e)
                        reject(e);
                    });
                }else{
                    postApiRequest(url, {...postData, mode: 'online' } , indempotency)
                    .then(async res => {                    
                        resolve(res);
                    })
                    .catch(e => {
                        console.log("Error",e)
                        reject(e);
                    });
                }                
            }else{                
                if(nonImplementedApis.includes(type)){                                   
                    resolve({status: "NOIMPLEMENT"});
                }else{                    
                    var res = await insertToLocalDB(locationId, postData, type, url , itemLabel , itemSubLabel);                
                    var message = getResponseMessage(type , url);
                    resolve({status: Strings.Success , message: message });
                }                
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
