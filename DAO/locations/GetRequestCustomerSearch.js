import { Strings } from "../../constants";
import { ExecuteQuery } from "../../sqlite/DBHelper";
import GetRequest from "../GetRequest";
import { getFullAddress } from "../helper";

export function find(postData){
  
  return new Promise(function(resolve, reject) {
    
        GetRequest.call("locations/customer-search",  postData).then( async(res) => {

            if(res.status == Strings.Success && res.isConnected){
                resolve(res.data);            
            }else if(res.status == Strings.Success && !res.isConnected){
                
                const client_id = res.data.client_id;
                const business_unit_id = res.data.business_unit_id;
                const user_id = res.data.user_id;

                if(client_id && business_unit_id ){
                    var lists = await fetchDataFromDB(client_id, business_unit_id , postData.search_text); 
                    resolve({status: Strings.Success , items: getDeviceLists(lists)});                                                       
                }else{
                    reject();
                }
            }
        }).catch((e) => {
            reject(e);
        });        
  });
}

const fetchDataFromDB = async(client_id, business_unit_id , searchText) => {    
    const query = generateQuery(searchText);        
    const res = await ExecuteQuery(query, []);        
    return res.rows ? res.rows : [];    
}

const generateQuery = (search_text) => {
    
    var query = `SELECT ` +
                    `lcmd.location_id, ` +
                    `lcmd.location_name, ` +
                    `lcmd.street_address, ` +
                    `lcmd.suburb, ` +
                    `lcmd.city, ` +
                    `lcmd.pincode, ` +
                    `ld.msisdn ` +            
                `FROM locations_core_master_data as lcmd ` +
                `LEFT JOIN ( ` +
                    `SELECT ` +
                    `location_id, ` +
                    `device_msisdn as msisdn ` +
                    `FROM location_devices ` +
                    `WHERE ` +
                    `delete_status = 0 ` +
                    `AND primary_device = 1 ` +
                    `GROUP BY location_id ` +
                `) as ld ` +
                `ON lcmd.location_id = ld.location_id `;    
    if(search_text != null && search_text != undefined &&  search_text != ''){
        query += `WHERE lcmd.location_name LIKE '%` + search_text + `%'`;
    }
    query += `LIMIT 30`;
    return query;
}

const getDeviceLists = (lists) => {
      
    var deviceLists  = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);

        console.log("elemtn",element)
        var address = getFullAddress(element);

        deviceLists.push({
            location_id: element.location_id,
            name: element.location_name,
            address: address,
            msisdn: element.msisdn,
            distance: "Not calcuated"            
        })
    }
    return deviceLists;
}

export default {
  find,
};
