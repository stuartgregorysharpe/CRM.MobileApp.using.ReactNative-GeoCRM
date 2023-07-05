import { Strings } from "../../constants";
import GetRequest from "../GetRequest";

export function find(offlineDBVersion, basket){
  
  return new Promise(function(resolve, reject) {
        
        GetRequest.call(`database/sync-tables?offline_db_version=${offlineDBVersion}&sync_basket=` + basket, {}).then((res) => {

            if(res.status == Strings.Success && res.isConnected){                
                resolve(res.data);            
            }else if(res.status == Strings.Success && !res.isConnected){
                resolve('offline');
            }

        }).catch((err) => {
            reject(err);
        });        
  });
}


export default {
  find,
};
