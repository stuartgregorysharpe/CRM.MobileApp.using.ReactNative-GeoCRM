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
            reject(e);
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
                            `ld.location_device_id, ` +
                            `ld.device_type, ` +
                            `ld.device_imei, ` +
                            `ld.device_msisdn, ` +
                            `ld.primary_device, ` +
                            `ld.unattached_device, ` +
                            `ld.device_msn, ` +
                            `ld.device_additional_imei, ` +
                            `pcmd.msn_required, ` +
                            `pcmd.additional_imei ` +
                        `FROM location_devices as ld ` +                        
                        `LEFT JOIN products_core_master_data AS pcmd  ON ld.device_type = pcmd.product_name ` + 
                        `WHERE ` +
                            `ld.client_id = ? ` +
                        `AND ld.business_unit_id = ? ` +
                        `AND ld.delete_status = 0 ` +
                        `AND ld.location_id = ? ` + 
                        `ORDER BY ld.primary_device DESC , ld.unattached_device ASC `;
    return query;
}

const getDeviceLists = (lists) => {
      
    var deviceLists  = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);        
        try{

            deviceLists.push({
                location_device_id: element.location_device_id.toString(),
                description: element.device_type,
                msn : element.device_msn,            
                imei : element.device_imei,
                additional_imei : element.device_additional_imei.toString(), 
                msisdn: element.device_msisdn,
                primary_device: element.primary_device?.toString(),
                unattached_device : element.unattached_device?.toString(),
                additional_imei_required : element.additional_imei?.toString(),
                msn_required: element.msn_required?.toString()
            })
        }catch(e){
            console.log("getDeviceList error =>" , e.toString());
        }        
    }
    
    return deviceLists;
}

export default {
  find,
};
