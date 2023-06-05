import { getApiRequest } from "../actions/api.action";
import { checkConnectivity } from "./helper";
import { Strings } from "../constants";
import { getTokenData } from "../constants/Storage";

export function call( url, postData){
  
  return new Promise(function(resolve, reject) {

        checkConnectivity().then( async (isConnected) => {             
            if(isConnected){                
                getApiRequest(url, postData)
                .then(async res => {                          
                    resolve({status: Strings.Success , isConnected:isConnected, data: res});
                })
                .catch(e => {        
                    console.log("get api call log", e);                                
                    reject(e);
                });

            }else{                
                
                var client_id = await getTokenData("client_id");
                var business_unit_id = await getTokenData("business_unit_id");
                var user_id = await getTokenData("user_id");
                var role = await getTokenData("role");
                
                console.log("Offline Api : " , url);
                resolve({status: Strings.Success , isConnected: isConnected, data:{client_id:client_id, business_unit_id:business_unit_id , user_id: user_id , role: role } });
            }
        }).catch(e => {
            reject(e);
        });
  });
}


export default {
  call,
};
