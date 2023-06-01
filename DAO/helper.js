import NetInfo from "@react-native-community/netinfo";
import { Strings } from "../constants";
import { getLocalData, storeLocalValue } from "../constants/Storage";
import { ExecuteQuery } from "../sqlite/DBHelper";
import { insertOfflineSyncItem } from "../sqlite/OfflineSyncItemsHelper";
import { getDateTime } from "../helpers/formatHelpers";
import * as RNLocalize from 'react-native-localize';
import {generateKey} from '../constants/Utils';

export function checkConnectivity(){

    return new Promise( async function(resolve, reject) {   

        var isOnline = await getLocalData("@online");        
        
        if(isOnline === "0"){
            resolve(false);
        }else{
            NetInfo.addEventListener( async networkState => {
                try{
                    //console.log("GET NETWORK STATUS : " , networkState) ;
                    var isConnected = networkState.isConnected ;                    
                    resolve(isConnected);
                }catch(e){                    
                    reject(e);
                }            
            });
        }   
        
    });              
}

export function getFullAddress(element) {
  var address = element.street_address;
  if (element.suburb != '' && element.suburb != undefined) {
    address = address + ', ' + element.suburb;
  }
  if (element.city != '' && element.city != undefined) {
    address = address + ', ' + element.city;
  }
  if (element.state != '' && element.state != undefined) {
    address = address + ', ' + element.state;
  }
  if (element.country != '' && element.country != undefined) {
    address = address + ', ' + element.country;
  }
  if (element.pincode != '' && element.pincode != undefined) {
    address = address + ', ' + element.pincode;
  }
  return address;
}

const getItemLabel = (locationName, address, label) => {
  if (label != '') {
    return label;
  }
  return locationName;
};

const getItemSubLabel = (locationName, address, subLabel, type) => {
  if (subLabel != null && subLabel != '') {
    return subLabel;
  }
  if (type == 'form_submission' || type == 'leadfields' || type == 'location_info_update' ) {
    return locationName;
  }
  return address;
};

export function saveOfflineSyncItems(
  locationId,
  postData,
  type,
  url,
  itemLabel,
  itemSubLabel,
) {

  return new Promise(async function (resolve, reject) {
    try {
      var location_name = '';
      var address = '';

      if (locationId != 0) {
        var query = `SELECT * FROM locations_core_master_data WHERE location_id = ?`;
        var res = await ExecuteQuery(query, [locationId]);
        if (res != undefined && res.rows.length > 0) {
          location_name = res.rows.item(0).location_name;
          address = getFullAddress(res.rows.item(0));
        } else {
          console.log('No Location ID', locationId);
        }
      }

      var time_zone = '';
      try {
        time_zone = RNLocalize.getTimeZone();
      } catch (e) {}

      var added_time = getDateTime();
      var item_label = getItemLabel(location_name, address, itemLabel);
      var item_sub_text = getItemSubLabel(
        location_name,
        address,
        itemSubLabel,
        type,
      );
      var post_body = JSON.stringify(postData);

      console.log('typer', type);
      console.log("post_body",post_body)

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

export async function updateDevice ( device_imei ,device_msisdn , device_msn , device_additional_imei , location_device_id) {
  
  var query = `UPDATE location_devices SET device_imei = ? , device_msisdn = ?,  device_msn = ? , device_additional_imei = ? WHERE location_device_id = ?`;
  console.log("Query", query);
  var res = await ExecuteQuery(query, [ device_imei, device_msisdn , device_msn , device_additional_imei , location_device_id]);
  console.log("Save Result", res);
  
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
  }else if(type == "add_stock"){
      return Strings.Stock.Successfully_Stock_Submit;
  }else if(type == "sell_to_trader"){
      return Strings.Stock.Successfully_Sell_To_Trader
  }else if(type == "device_update"){
      return Strings.PostRequestResponse.Successfully_Device_Update;
  }else if(type == "location_info_update"){
    return Strings.PostRequestResponse.Successfully_Field_Updated;
  }else if(type == 'location_address_update'){
    return Strings.PostRequestResponse.Successfully_Location_Updated
  }
  return Strings.PostRequestResponse.Successfully_Checkin;    
}


export const getFieldOptionFilters = async (role) => {
  
  var query = `SELECT custom_field_id , value FROM location_custom_field_role_filtering WHERE delete_status = 0 AND role = ?`;
  const res = await ExecuteQuery(query, [role]);
  var lists = res.rows ? res.rows : [];  
  var fieldOption = {};  
  for (var i = 0; i < lists.length; i++) {    
    const subElement = lists.item(i);    
    if(fieldOption[subElement.custom_field_id] != undefined){
      fieldOption = {
        ...fieldOption,
        [subElement.custom_field_id] : [ ...fieldOption[subElement.custom_field_id], subElement.value ]
      }
    }else{
      fieldOption = {
        ...fieldOption,
        [subElement.custom_field_id] : [ subElement.value ]
      }
    }    
  }    
  return fieldOption;
}


