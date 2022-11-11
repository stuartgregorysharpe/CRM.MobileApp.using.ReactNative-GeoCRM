import { Strings } from "../../constants";
import { ExecuteQuery } from "../../sqlite/DBHelper";
import GetRequest from "../GetRequest";


export function find(postData){
  
  return new Promise(function(resolve, reject) {
    
        GetRequest.call("locations/location-devices",  postData).then( async(res) => {

            if(res.status == Strings.Success && res.isConnected){
                resolve(res.data);            
            }else if(res.status == Strings.Success && !res.isConnected){
                
                const client_id = res.data.client_id;
                const business_unit_id = res.data.business_unit_id;
                const user_id = res.data.user_id;

                if(client_id && business_unit_id && postData.location_id){
                    var lists = await fetchDataFromDB(client_id, business_unit_id , postData.location_id); 
                    resolve({status: Strings.Success , devices: getDeviceLists(lists)});                                                       
                }else{
                    reject();
                }
            }
        }).catch((e) => {
            reject();
        });        
  });
}

const fetchDataFromDB = async(client_id, business_unit_id , location_id) => {    
    const query = generateQuery();    
    const res = await ExecuteQuery(query, [client_id, business_unit_id , location_id]);    
    return res.rows ? res.rows : [];    
}

const generateQuery = () => {
    var query = `SELECT ` +
                            `location_device_id, ` +
                            `device_type, ` +
                            `device_imei, ` +
                            `device_msisdn, ` +
                            `primary_device ` +
                        `FROM location_devices ` +
                        `WHERE ` +
                            `client_id = ? ` +
                        `AND business_unit_id = ? ` +
                        `AND delete_status = 0 ` +
                        `AND location_id = ? ` +
                        `ORDER BY primary_device DESC `;
    return query;
}

const getDeviceLists = (lists) => {
      
    var deviceLists  = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        deviceLists.push({
            location_device_id: element.location_device_id,
            description: element.device_type,
            imei: element.device_imei,
            msisdn: element.device_msisdn,
            primary_device: element.primary_device
        })
    }
    return deviceLists;
}

export default {
  find,
};
