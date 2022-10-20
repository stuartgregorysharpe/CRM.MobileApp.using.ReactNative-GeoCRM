import { Constants, Strings } from "../constants";
import { getConvertedDate, getConvertedDateTime, getDateTime, getDateTimeFromBasketTime } from "../helpers/formatHelpers";
import { ExecuteQuery } from "../sqlite/DBHelper";
import GetRequest from "./GetRequest";

export function find(postData){
  
  return new Promise(function(resolve, reject) {

        GetRequest.call( "forms/form-submissions",  postData).then( async(res) => {

            if(res.status == Strings.Success && res.isConnected){
                resolve(res.data);            
            }else if(res.status == Strings.Success && !res.isConnected){
                
                const client_id = res.data.client_id;
                const business_unit_id = res.data.business_unit_id;
                const user_id = res.data.user_id;
                
                resolve({status:'error' , message: 'Feature available in online mode only'});
                // need to implement offline feature
                
                resolve([]);

            }else{
                reject(res.status);
            }
        }).catch((e) => {
            reject(e);
        });        
  });
}

export default {
  find,
};
