import { getApiRequest } from "../../actions/api.action";
import { Strings } from "../../constants";
import { getFilterData, getTokenData, getUserId } from "../../constants/Storage";
import { ExecuteQuery } from "../../sqlite/DBHelper";
import GetRequest from "../GetRequest";
import { checkConnectivity } from "../helper";
import { getRoleFieldFilters, getRoleFilterWhere } from "./helper";

export function find(currentLocation, box ,features){
  
  return new Promise( async function(resolve, reject) {

        var user_id = await getUserId();
        var filters = await getFilterData('@filter');
        var zoom_bounds = box.map(item => item).join(',');                

        var postData = {
            user_id: user_id,
            filters: filters,
            current_latitude: currentLocation.latitude,
            current_longitude: currentLocation.longitude,
            zoom_bounds: zoom_bounds,
        };
        
        GetRequest.call("locations/location-map",  postData).then( async(res) => {

            if(res.status == Strings.Success && res.isConnected){
                resolve(res.data);        
            }else if(res.status == Strings.Success && !res.isConnected){
                
                const client_id = res.data.client_id;
                const business_unit_id = res.data.business_unit_id;
                const user_id = res.data.user_id;
                const role = res.data.role;
                console.log("client_id : busi: role", client_id, business_unit_id , role)
                if(client_id && business_unit_id ){                                        
                    var locationName = await getLocationName(client_id, business_unit_id);                
                    var locations = await getLocations(client_id, business_unit_id, box ,features , role);
                    resolve(getResponse( locationName, locations));                    
                }else{
                    reject('No Cilent  ID');
                }
            }
        }).catch((e) => {
            reject(e);
        });   
        

        
  });

}

const getLocationName = async (client_id, business_unit_id) => {

    const tableName = 'locations_custom_master_fields';
    const locationNameQuery = `SELECT custom_field_name FROM ${tableName} WHERE delete_status = 0 AND client_id = ? AND business_unit_id = ? AND core_field_name = "location_name"`;    
    var res = await ExecuteQuery(locationNameQuery, [client_id, business_unit_id]);    
    if(res.rows.length > 0){    
        return res.rows.item(0).custom_field_name;
    }
    return '';
}

const getLocations = async (client_id, business_unit_id, box ,features , role) => {
        
    var where = ``;
    if(box != undefined){
    
        if(box.length == 4){
            var westLong = box[0];
            var soundLat = box[1];
            var eastLong = box[2];
            var northLat = box[3];            
            where = `(CASE WHEN '${soundLat}' < '${northLat}' THEN lcmd.latitude BETWEEN '${soundLat}' AND '${northLat}' ELSE lcmd.latitude BETWEEN '${northLat}' AND '${soundLat}' END) AND ` + 
            `(CASE WHEN '${westLong}' < '${eastLong}' THEN lcmd.longitude BETWEEN '${westLong}' AND '${eastLong}' ELSE lcmd.longitude BETWEEN '${eastLong}' AND '${westLong}' END ) AND`;

        }        
    }

    const roleFieldFilters = await getRoleFieldFilters(role);
    
    const roleFilterWhere = getRoleFilterWhere(roleFieldFilters);

    const query = generateQuery(features , roleFilterWhere ,  where);    

    console.log("query", query);

    try{
        var res;
        if(features.includes("disposition_fields")){
            res = await ExecuteQuery(query, [business_unit_id, client_id]);         
        }else{
            res = await ExecuteQuery(query, [business_unit_id, client_id , client_id, business_unit_id]);         
        }

        if( res != undefined  && res.rows.length > 0){            
            return res.rows;
        }else{            
            return '';
        }
        
    }catch(e){
        return '';
    }        
}


const generateQuery = (features , roleFilterWhere , where) => {
    var query = ``;
    if(features.includes("disposition_fields")){

        const query0 = `SELECT crm_campaign_id FROM crm_campaigns WHERE business_unit_id = ? AND client_id = ?`;    
        query = `SELECT cdl.location_id, lcmd.location_name, lcmd.latitude,lcmd.longitude, ldp.png_file, ldp.pin_name, ldp.dynamic_pin_id ` +
                    `FROM crm_disposition_locations AS cdl LEFT JOIN locations_core_master_data AS lcmd ON lcmd.location_id = cdl.location_id LEFT JOIN locations_dynamic_pins AS ldp ON ldp.dynamic_pin_id = cdl.dynamic_pin_id ` + 
                    `WHERE ${roleFilterWhere} ${where} lcmd.delete_status = 0 AND cdl.campaign_id IN (${query0}) ` + 
                    `ORDER BY lcmd.location_id DESC`;
                            
    }else{
        console.log("disposition disabled");
        try{

            query   = `SELECT ` + 
                            `lcmd.location_id, ` + 
                            `lcmd.location_name, ` + 
                            `lcmd.latitude, ` + 
                            `lcmd.longitude, ` + 
                            `ldp.png_file, ` + 
                            `ldp.pin_name, ` + 
                            `ldp.dynamic_pin_id ` + 
                          `FROM locations_core_master_data AS lcmd ` + 
                          `LEFT JOIN locations_dynamic_pins AS ldp ` + 
                          `ON lcmd.location_status = ldp.location_status  ` + 
                             `AND ldp.business_unit_id = ? ` + 
                             `AND ldp.client_id = ? ` + 
                          `WHERE ${roleFilterWhere} ${where} ` + 
                            `lcmd.delete_status = 0 ` + 
                          `AND lcmd.client_id = ? ` + 
                          `AND lcmd.business_unit_id = ? `;

        }catch(e){
            console.log(e)
        }
    }
    return query;
}





const getResponse = (locationName, locations) => {
    var tmp = [];
    if(locations != '' && locations != undefined){                            
        for(var i = 0; i < locations.length; i++){
            var element = locations.item(i);
            tmp.push(
                {
                    location_id: element.location_id,
                    location_name : {custom_field_name : locationName, value : element.location_name},
                    coordinates : {latitude: element.latitude , longitude: element.longitude},
                    pin_image: element.png_file,
                    pin_name: element.pin_name,
                    pin_id: element.dynamic_pin_id
                }
            );                    
        }                
    }
    return {locations:tmp, polygons:[]};
}

export default {
  find,
};
