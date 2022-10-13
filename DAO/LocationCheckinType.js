import { getApiRequest } from "../actions/api.action";
import { Strings } from "../constants";
import { getTokenData } from "../constants/Storage";
import { ExecuteQuery } from "../sqlite/DBHelper";
import { checkConnectivity } from "./helper";

export function find(features){
  
  return new Promise(function(resolve, reject) {

        checkConnectivity().then( async (isConnected) => { 
            
            if(isConnected){
                getApiRequest("locations/checkin-types", {}).then((res) => {                    
                    if(res.status === Strings.Success){
                        resolve(res.checkin_types);
                    }else{
                        resolve([]);
                    }
                }).catch((e) => {            
                    reject(e);
                })
            }else{
                var client_id = await getTokenData("client_id");
                var business_unit_id = await getTokenData("business_unit_id");
                var query = '';
                if(features.includes("checkin_types")){
                    query = generateCheckinTypeQuery();                     
                    var checkinTypes = await fetchDataFromDB(query, business_unit_id, client_id);                    
                    resolve(getResponse(checkinTypes, business_unit_id, client_id));                                
                }else{
                    resolve([]);
                }                
            }
        }).catch(e => {
            reject(e);
        });
  });
}

const generateCheckinTypeQuery = () => {

    var query = `SELECT ` + 
                    `checkin_type_id,checkin_type, ` + 
                    `trigger_reasons_ids ` + 
                    `FROM checkin_type ` + 
                    `WHERE  ` + 
                        `business_unit_id = ? ` + 
                    `AND client_id = ? ` + 
                    `AND delete_status = 0 `;    
    return query;
}

const generateReasonQuery = (ids) => {

    var query  = `SELECT ` + 
                        `checkin_type_reasons_id, ` + 
                        `reason ` + 
                      `FROM checkin_type_reasons ` + 
                      `WHERE ` + 
                        `business_unit_id = ? ` + 
                      `AND client_id = ? ` + 
                      `AND delete_status = 0 ` + 
                      `AND checkin_type_reasons_id IN (${ids}) `;
    return query;    
}



const fetchDataFromDB = async (query , business_unit_id, client_id) => {
    try{
        var res = await ExecuteQuery(query, [business_unit_id, client_id]);                 
        if( res != undefined  && res.rows.length > 0){            
            return res.rows;
        }else{
            return '';
        }
        
    }catch(e){
        return '';
    }   
}



const getResponse = async (checkinTypes , business_unit_id, client_id ) => {

    var tmp = [];
    
    if(checkinTypes != '' && checkinTypes != undefined){
        for(var i = 0; i < checkinTypes.length; i++){
            var element = checkinTypes.item(i);
            var reasonArray = [];            
            var ids = element.trigger_reasons_ids.replaceAll('\"','').split(",");            
            var query = generateReasonQuery(ids);                         
            var reasons = await fetchDataFromDB(query, business_unit_id, client_id);
            if(reasons != '' && reasons != undefined){                
                for(var j = 0; j < reasons.length; j++){
                    var reasonItem = reasons.item(j);                                        
                    reasonArray.push({reason: reasonItem.reason, reason_id: reasonItem.checkin_type_reasons_id});
                }
            }

            tmp.push(
                {
                    checkin_type: element.checkin_type,
                    checkin_type_id : element.checkin_type_id,
                    checkin_reasons : reasonArray
                }
            ); 

        }
    }                                        
    return tmp;
}

export default {
  find,
};
