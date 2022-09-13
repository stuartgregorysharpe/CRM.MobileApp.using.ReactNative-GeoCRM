import NetInfo from "@react-native-community/netinfo";
import { Strings } from "../constants";
import { getLocalData } from "../constants/Storage";
import { ExecuteQuery } from "../sqlite/DBHelper";
import { insertOfflineSyncItem } from "../sqlite/OfflineSyncItemsHelper";
import uuid from 'react-native-uuid';
import { getDateTime } from "../helpers/formatHelpers";

export function checkConnectivity(){

    return new Promise( async function(resolve, reject) {
   
        var isOnline = await getLocalData("@online");        
        console.log("isOnline",isOnline)
        if(isOnline === "0"){
            resolve(false);
        }else{
            NetInfo.addEventListener(networkState => {
                try{                    
                    var isConnected = networkState.isConnected;
                    resolve(isConnected);
                }catch(e){
                    reject(e);
                }            
            });
        }   
        
    });              
}


export function getFullAddress (element){

    var address = element.street_address;
    if(element.suburb != '' && element.suburb != undefined){
        address = address + ", " + element.suburb;
    }
    if(element.city != '' && element.city != undefined){
        address = address + ", " + element.city;
    }
    if(element.state != '' && element.state != undefined){
        address = address + ", " + element.state;
    }
    if(element.country != '' && element.country != undefined){
        address = address + ", " + element.country;
    }
    if(element.pincode != '' && element.pincode != undefined){
        address = address + ", " + element.pincode;
    }

    return address;
}
  


export function saveOfflineSyncItems(locationId , postData , type, url){

    return new Promise( async function(resolve, reject) {
   
        try{            
            var query = `SELECT * FROM locations_core_master_data WHERE location_id = ?`;                                          
            var res = await ExecuteQuery(query, [locationId]);            
            if( res != undefined  && res.rows.length > 0){
                var added_time = getDateTime();
                var location_name = res.rows.item(0).location_name;
                var address = getFullAddress(res.rows.item(0));                
                var data = [
                    uuid.v4(), 
                    type, 
                    location_name, 
                    address,
                    added_time, 
                    postData.user_local_data.time_zone , 
                    JSON.stringify(postData), 
                    url, 
                    'POST'
                ];                
                var res = await insertOfflineSyncItem(data);                   
                resolve(res);                
            }else{
                resolve(undefined)
                //reject("No location info in the locations_core_master_data table");
            }
                            
        }catch(e){
            console.log("error" , e);
            reject(e);
        }        
    });              
}

export function getResponseMessage (type) {
    if(type ==  'checkin'){
        return Strings.PostRequestResponse.Successfully_Checkin;
    }else if(type == 'checkout'){
        return Strings.PostRequestResponse.Successfully_Checkout;
    }
}