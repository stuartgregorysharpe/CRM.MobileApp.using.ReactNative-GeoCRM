import NetInfo from "@react-native-community/netinfo";
import { Strings } from "../constants";
import { getLocalData } from "../constants/Storage";
import { ExecuteQuery } from "../sqlite/DBHelper";
import { insertOfflineSyncItem } from "../sqlite/OfflineSyncItemsHelper";
import uuid from 'react-native-uuid';
import { getDateTime } from "../helpers/formatHelpers";
import * as RNLocalize from 'react-native-localize';
import { formDataToJsonString } from "../helpers/jsonHelper";
import { generateKey } from "../constants/Utils";

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
  
export function saveOfflineSyncItems(locationId , postData , type, url ,itemLabel , itemSubLabel){

    return new Promise( async function(resolve, reject) {   
        try{            
            var query = `SELECT * FROM locations_core_master_data WHERE location_id = ?`;                                          
            var res = await ExecuteQuery(query, [locationId]);
            
            var location_name = '';
            var address = '';
            if( res != undefined  && res.rows.length > 0){
                location_name = res.rows.item(0).location_name;
                address = getFullAddress(res.rows.item(0));
            }else{
                console.log("No Location ID", locationId)            
            }         
            var time_zone = '';
            try {
                time_zone = RNLocalize.getTimeZone();
            } catch (e) {}
            
            var added_time = getDateTime();                
            var item_label = location_name;
            var item_sub_text = address;
            var post_body = JSON.stringify(postData);

            if(type == "form_submission" || type == "leadfields"){
                item_label = itemLabel;
                item_sub_text = itemSubLabel != "" ? itemSubLabel : location_name;
            }  
                                    
            var data = [
                generateKey(),  //indempotency_key, 
                type, //item_type
                item_label, // item_label
                item_sub_text , // item_sub_text
                added_time,  // added_time
                time_zone ,  // added_timezone
                post_body, // post_body
                url, 
                'POST'
            ];                
            console.log("SAVE DATA: " , data);
            var res = await insertOfflineSyncItem(data);                   
            resolve(res);                
            
                            
        }catch(e){
            console.log("save offline item" , e);
            reject(e);
        }
    });              
}

export function getResponseMessage (type , url) {
    if(type ==  'checkin'){
        return Strings.PostRequestResponse.Successfully_Checkin;
    }else if(type == 'checkout'){
        return Strings.PostRequestResponse.Successfully_Checkout;
    }else if(type == 'location-feedback' && url == 'locations-info/location-feedback'){
        return Strings.PostRequestResponse.Successfully_Feedback;
    }else if(type == "form_submission"){
        return Strings.PostRequestResponse.Successfully_Form_Submit;
    }
    return Strings.PostRequestResponse.Successfully_Checkin;    
}