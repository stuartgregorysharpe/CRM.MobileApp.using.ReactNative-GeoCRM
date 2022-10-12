import { getApiRequest } from "../actions/api.action";
import { Strings } from "../constants";
import { getTokenData } from "../constants/Storage";
import { ExecuteQuery } from "../sqlite/DBHelper";
import { checkConnectivity } from "./helper";

export function find(features){
  
  return new Promise(function(resolve, reject) {

        checkConnectivity().then( async (isConnected) => { 
            console.log("is connected", isConnected)
            if(isConnected){
                getApiRequest("locations/location-pin-key", {}).then((res) => {
                    console.log("success", res)
                    if(res.status === Strings.Success){
                        resolve(res.items);
                    }else{
                        resolve([]);
                    }                    
                }).catch((e) => {
                    console.log("error",e)
                    reject(e);
                })
            }else{
                var client_id = await getTokenData("client_id");
                var business_unit_id = await getTokenData("business_unit_id");
                var query = '';
                if(features.includes("disposition_fields")){
                    query = generateDispositionQuery(); 
                }else{
                    query = generateQuery();
                }
                                
                var pins = await fetchDataFromDB(query, business_unit_id, client_id);
                resolve(getResponse(pins));                                

            }
        }).catch(e => {
            reject(e);
        });
  });

}

const generateDispositionQuery = () => {

    var query  = `SELECT ` + 
                  `CASE WHEN cdo.outcome_name IS NOT NULL  ` + 
                  `THEN cdo.outcome_name  ` + 
                  `WHEN (cdo.outcome_name IS NULL AND cds.stage_name IS NOT NULL)  ` + 
                  `THEN cds.stage_name  ` + 
                  `ELSE ldp.location_status  ` + 
                  `END as "label", ` + 
                  `ldp.png_file as "pin_image", ` + 
                  `ldp.pin_name, ` + 
                  `ldp.dynamic_pin_id as "pin_id", ` + 
                  `ldp.svg_code ` + 
                  `FROM locations_dynamic_pins AS ldp ` + 
                `LEFT JOIN crm_disposition_outcomes as cdo ` + 
                `ON ldp.outcome_id = cdo.disposition_outcome_id ` + 
                `LEFT JOIN crm_disposition_stages as cds ` + 
                `ON ldp.stage_id = cds.disposition_stage_id ` + 
                `WHERE ` + 
                `ldp.delete_status = 0 ` + 
                `AND ldp.business_unit_id = ? ` + 
                `AND ldp.client_id = ? ` + 
                `ORDER BY ldp.stage_id `;        
    return query;              
}

const generateQuery = () => {
    var query  =  `SELECT ` + 
                  `location_status as "label",  ` + 
                  `png_file as pin_image,  ` + 
                  `dynamic_pin_id as "pin_id", ` + 
                  `svg_code ` + 
                  `FROM locations_dynamic_pins ` + 
                  `WHERE ` + 
                  `delete_status = 0 ` + 
                  `AND business_unit_id = ? ` + 
                  `AND client_id = ? ` + 
                  `ORDER BY stage_id `;
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

const getResponse = (pins) => {
    var tmp = [];
    if(pins != '' && pins != undefined){        
        for(var i = 0; i < pins.length; i++){
            var element = pins.item(i);                        
            tmp.push(
                {
                    label: element.label,
                    pin_image : element.pin_image,                                
                    pin_id: element.pin_id,
                    svg_code: element.svg_code                                
                }
            );                    
        }        
    }
    return tmp;
}

export default {
  find,
};
