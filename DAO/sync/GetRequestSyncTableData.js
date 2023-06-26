import { Strings } from "../../constants";
import GetRequest from "../GetRequest";

export function find(offlineDBVersion, tableName , pageNumber , lastSyncedParam){
  
  return new Promise(function(resolve, reject) {
        
        GetRequest.call(`database/sync-table-data?offline_db_version=${offlineDBVersion}&table=${tableName}&page=${pageNumber}${lastSyncedParam}`, {}).then((res) => {

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
