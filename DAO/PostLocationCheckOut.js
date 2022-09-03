import { postApiRequest } from "../actions/api.action";
import { insertOfflineSyncItem } from "../sqlite/OfflineSyncItemsHelper";
import { checkConnectivity } from "./helper";
import uuid from 'react-native-uuid';
import { ExecuteQuery } from "../sqlite/DBHelper";

export function find(locationId, postData){
  
  return new Promise(function(resolve, reject) {

        checkConnectivity().then( async (isConnected) => {             
            if(isConnected){
                postApiRequest('location-info/check-out', postData)
                .then(async res => {
                    resolve(res);
                })
                .catch(e => {
                    reject();
                });

            }else{

                await insertToLocalDB(locationId, postData);
                resolve({});
            }
        }).catch(e => {
            reject();
        });
  });

}


const insertToLocalDB = async(locationId, postData) => {

    //uuid.v4(), item_type, item_label, item_sub_text,added_time, added_timezone , postData, url, method

    //     --- start created table ---  locations_core_master_data
    // LOG  CREATE TABLE Query:   CREATE TABLE IF NOT EXISTS locations_core_master_data ( location_id INTEGER PRIMARY KEY AUTOINCREMENT , timestamp NUMERIC NOT NULL, timestamp_timezone TEXT NOT NULL, delete_status INTEGER NOT NULL, business_unit_id INTEGER NOT NULL, client_id INTEGER NOT NULL, location_name TEXT NOT NULL, location_image TEXT NOT NULL, additional_image TEXT NOT NULL, location_unit_type TEXT NOT NULL, location_unit TEXT NOT NULL, street_address TEXT NOT NULL, suburb TEXT NOT NULL, city TEXT NOT NULL, state TEXT NOT NULL, country TEXT NOT NULL, pincode TEXT NOT NULL, location_type TEXT NOT NULL, [group] TEXT NOT NULL, group_split TEXT NOT NULL, region TEXT NOT NULL, assigned_user_ids TEXT NOT NULL, assigned_user_names TEXT NOT NULL, assigned_user_codes TEXT NOT NULL, unique_code TEXT NOT NULL, location_code TEXT NOT NULL, delivery_instructions TEXT NOT NULL, price_list TEXT NOT NULL, price_list_id INTEGER NOT NULL, payment_terms TEXT NOT NULL, balance_outstanding TEXT NOT NULL, comments TEXT NOT NULL, vat_number TEXT NOT NULL, custom_field_1 TEXT NOT NULL, custom_field_2 TEXT NOT NULL, latitude TEXT NOT NULL, longitude TEXT NOT NULL, status TEXT NOT NULL, creation_type TEXT NOT NULL, added_on NUMERIC NOT NULL, added_on_timezone TEXT NOT NULL, last_activity TEXT NOT NULL, geo_method TEXT NOT NULL, visited TEXT NOT NULL, geo_loc_updated TEXT NOT NULL, location_status TEXT NOT NULL, participant_id INTEGER NOT NULL, unsubscribe INTEGER NOT NULL, sage_id INTEGER NOT NULL, sage_log TEXT NOT NULL, sage_200_location_id TEXT NOT NULL, sage_200_route_name TEXT NOT NULL, sage_200_route_ranking TEXT NOT NULL, integration_ext_id INTEGER NOT NULL, cos_lat TEXT NOT NULL, sin_lat TEXT NOT NULL, cos_lng TEXT NOT NULL, sin_lng TEXT NOT NULL);


 
    var query = `SELECT * FROM locations_core_master_data WHERE location_id = ?`;    
    var res = await ExecuteQuery(query, [locationId]);

    if(res != undefined && res.rows.length > 0){
        var location_name = res[0].location_name;
        var address = getFullAddress(res[0]);

        var data = [
            uuid.v4(), 
            'checkin', 
            location_name.custom_field_name, 
            locationInfo.address,
            postData.checkin_time, 
            postData.user_local_data.time.time_zone , 
            postData, 
            'location-info/check-out', 
            'POST}'
        ];
await insertOfflineSyncItem(data);
    }

    
}

export default {
  find,
};
