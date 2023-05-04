import { postApiRequest, postApiRequestMultipart } from "../actions/api.action";
import { checkConnectivity, getResponseMessage, saveOfflineSyncItems, updateDevice } from "./helper";
import { Strings } from "../constants";
import { jsonToFormData, jsonToFormDataWithSubKey } from "../helpers/jsonHelper";
import { showOfflineDialog } from "../constants/Helper";
import { clearLoadingBar, showLoadingBar } from "../actions/notification.action";

export function find(locationId, postData , type, url , itemLabel , itemSubLabel , indempotency = null , dispatch ){
  
    const nonImplementedApis = [
        "start_end_day",
        "update-stage-outcome",
        "reloop",
        "add-edit-contacts",
        "action-item-details",
        "transfer",
        "staging-accept",
        "calenderadd",
        "update-single",
        "delete-single",       
        "devices/delete-unattached-device",        
    ];

  return new Promise(function(resolve, reject) {

        checkConnectivity().then( async (isConnected) => {
            if(isConnected){

                if(dispatch != undefined && dispatch != null){
                    dispatch(showLoadingBar({'type' : 'loading'}));
                }

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
                        if(dispatch != undefined && dispatch != null){
                            dispatch(clearLoadingBar());
                        }
                        resolve(res);
                    })
                    .catch(e => {
                        console.log( url + "api error: ",e)
                        if(dispatch != undefined && dispatch != null){
                            dispatch(clearLoadingBar());
                        }
                        reject(e);
                    });
                }else{
                    postApiRequest(url, {...postData, mode: 'online' } , indempotency)
                    .then(async res => {                    
                        if(dispatch != undefined && dispatch != null){
                            dispatch(clearLoadingBar());
                        }
                        resolve(res);
                    })
                    .catch(e => {
                        if(dispatch != undefined && dispatch != null){
                            dispatch(clearLoadingBar());
                        }
                        console.log("Error",e)
                        reject(e);
                    });
                }                
            }else{                
                if(nonImplementedApis.includes(type)){                                   
                    resolve({status: "NOIMPLEMENT"});
                }else{                    
                    
                    var res = await insertToLocalDB(locationId, postData, type, url , itemLabel , itemSubLabel);         
                    if(type == 'device_update'){                                                
                        updateDevice(postData.imei , postData.msisdn , postData.msn , postData.additional_imei , postData.location_device_id);
                    }
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
