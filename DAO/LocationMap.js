import { getApiRequest } from "../actions/api.action";
import { Strings } from "../constants";
import { getFilterData, getTokenData, getUserId } from "../constants/Storage";
import { ExecuteQuery } from "../sqlite/DBHelper";
import { checkConnectivity } from "./helper";


export function find(currentLocation, box){
  
  return new Promise(function(resolve, reject) {

        checkConnectivity().then( async (isConnected) => {            
            if(isConnected){
                var user_id = await getUserId();
                var filters = await getFilterData('@filter');
                var zoom_bounds = box.map(item => item).join(',');                
                var params = {
                    user_id: user_id,
                    filters: filters,
                    current_latitude: currentLocation.latitude,
                    current_longitude: currentLocation.longitude,
                    zoom_bounds: zoom_bounds,
                };
                
                getApiRequest("locations/location-map" , params).then((res) => {                    
                    if (res.status == Strings.Success) {
                        resolve(res);                        
                    } else {
                        reject()
                    }
                }).catch( e => {    
                    console.log("error", e)                
                    reject()
                });      
            }else{
                var client_id = await getTokenData("client_id");
                var business_unit_id = await getTokenData("business_unit_id");                
                var locationName = await getLocationName(client_id, business_unit_id);                
                var locations = await getLocations(client_id, business_unit_id, box);
                if(locations != '' && locations != undefined){
                    console.log("get location ", locations)
                    var tmp = [];
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
                    console.log("resu", tmp.length);
                    resolve({locations:tmp, polygons:[]});
                }else{
                    reject()
                }                                            

            }
        }).catch(e => {
            reject();
        });
  });

}

const getLocationName = async (client_id, business_unit_id) => {

    const tableName = 'locations_custom_master_fields';
    const locationNameQuery = `SELECT custom_field_name FROM ${tableName} WHERE delete_status = 0 AND client_id = ? AND business_unit_id = ? AND core_field_name = "location_name"`;
    console.log(locationNameQuery)
    console.log(client_id)
    console.log(business_unit_id)
    var res = await ExecuteQuery(locationNameQuery, [client_id, business_unit_id]);    
    if(res.rows.length > 0){
        console.log("success" , res.rows.item(0).custom_field_name);
        return res.rows.item(0).custom_field_name;
    }
    return '';
}

const getLocations = async (client_id, business_unit_id, box) => {


    // if($bounds) {                
    //     WHERE (CASE WHEN '.$bounds_SouthLat.' < '.$bounds_NorthLat.' 
    //             THEN lcmd.latitude BETWEEN '.$bounds_SouthLat.' AND '.$bounds_NorthLat.'
    //             ELSE lcmd.latitude BETWEEN '.$bounds_NorthLat.' AND '.$bounds_SouthLat.'
    //                 END) 
    //             AND
    //             (CASE WHEN '.$bounds_WestLong.' < '.$bounds_EastLong.'
    //             THEN lcmd.longitude BETWEEN '.$bounds_WestLong.'  AND '.$bounds_EastLong.'
    //             ELSE lcmd.longitude BETWEEN '.$bounds_EastLong.' AND '.$bounds_WestLong.'
    //             END
    //           )
    // }       
    console.log("Box", box)
    //box = [-118.38929833844306, 34.10509329000358, -118.29835468903185, 34.224029109571276];
    
    var where = ``;
    if(box != undefined){
        console.log("box.length", box.length)
        if(box.length == 4){
            var westLong = box[0];
            var soundLat = box[1];
            var eastLong = box[2];
            var northLat = box[3];            
            where = `(CASE WHEN '${soundLat}' < '${northLat}' THEN lcmd.latitude BETWEEN '${soundLat}' AND '${northLat}' ELSE lcmd.latitude BETWEEN '${northLat}' AND '${soundLat}' END) AND ` + 
            `(CASE WHEN '${westLong}' < '${eastLong}' THEN lcmd.longitude BETWEEN '${westLong}' AND '${eastLong}' ELSE lcmd.longitude BETWEEN '${eastLong}' AND '${westLong}' END ) AND`;

        }        
    }
    //where = ``;

    const query0 = `SELECT crm_campaign_id FROM crm_campaigns WHERE business_unit_id = ? AND client_id = ?`;    
    const query = `SELECT cdl.location_id, lcmd.location_name, lcmd.latitude,lcmd.longitude, ldp.png_file, ldp.pin_name, ldp.dynamic_pin_id ` +
                `FROM crm_disposition_locations AS cdl LEFT JOIN locations_core_master_data AS lcmd ON lcmd.location_id = cdl.location_id LEFT JOIN locations_dynamic_pins AS ldp ON ldp.dynamic_pin_id = cdl.dynamic_pin_id ` + 
                `WHERE ${where} lcmd.delete_status = 0 AND cdl.campaign_id IN (${query0}) ` + 
                `ORDER BY lcmd.location_id DESC`;
    console.log("query", query)
//business_unit_id, client_id

    try{
        var res = await ExecuteQuery(query, [business_unit_id, client_id]); 
        console.log("RES", res.rows)
        console.log("RESSS", res.rows.length)
        if( res != undefined  && res.rows.length > 0){
            console.log("success xx" , res.rows.item(0));        
            console.log("success xx" , res.rows.length);
            return res.rows;
        }else{            
            return '';
        }
        
    }catch(e){
        return '';
    }        
}

export default {
  find,
};
