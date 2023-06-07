import { getApiRequest } from "../../actions/api.action";
import { Strings } from "../../constants";
import { getTokenData } from "../../constants/Storage";
import { checkConnectivity, getFullAddress } from "../helper";
import { ExecuteQuery } from "../../sqlite/DBHelper";
import { getRoleFieldFilters, getRoleFilterWhere } from "./helper";
export function find(currentLocation , filters, pageNumber, searchKey , features){
    
    return new Promise(function(resolve, reject) {

        checkConnectivity().then( async (isConnected) => { 

            if(isConnected){                            
                var param = {                  
                  filters: filters,
                  current_latitude: currentLocation.latitude,
                  current_longitude: currentLocation.longitude,
                  page_nr: pageNumber,
                  search_text: searchKey,
                };
                console.log("api param => ", param)
                getApiRequest("locations/location-search-list", param).then((res) => {
                    console.log("location-search-list Api result count => ", res.items.length);
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
                var role = await getTokenData("role");
                
                var query = await generateQuery(currentLocation.latitude, currentLocation.longitude, searchKey, pageNumber , features , role);
                console.log("query", query);
                
                var locations;
                if(features.includes("disposition_fields")){
                  locations = await fetchDataFromDB(query, null , null);
                }else{
                  locations = await fetchDataFromDB(query, client_id , business_unit_id);
                }
                
                resolve(getResponse(locations));
                
            }
        }).catch(e => {
            reject(e);
        });
    });
}

const fetchDataFromDB = async (query , client_id , business_unit_id) => {
  try{
      var res;
      if(client_id != null && business_unit_id != null){
        res = await ExecuteQuery(query, [client_id , business_unit_id]);   
      }else{
        res = await ExecuteQuery(query, []);   
      }      
      if( res != undefined  && res.rows.length > 0){            
          return res.rows;
      }else{
          return '';
      }      
  }catch(e){
      console.log(e)
      return '';
  }   
}



const getResponse = (locations) => {
  var tmp = [];
  if(locations != '' && locations != undefined){        
      for(var i = 0; i < locations.length; i++){

          var element = locations.item(i);      
          var address = getFullAddress(element);                     
                    
          tmp.push(
              {
                  location_id: element.location_id,
                  name : element.location_name,                                
                  address: address,
                  coordinates: {latitude: element.latitude, longitude: element.longitude },
                  distance:  (Math.acos(element.distance) * 3959).toFixed(2) + " mi" , // 6371 km
                  //3959
                  status: element.status,
                  status_text_color: element.status_text_color
              }
          );                    
      }
  }
  return tmp;
}



const generateQuery = async(latitude, longitude , searchText , pageNumber, features , role) => {
  
  var distance = '';
  var distanceOrder = '';

  if(latitude != null && latitude != undefined && longitude != null && longitude != undefined){
    var value1 = Math.sin(latitude * Math.PI / 180);
    var value2 = Math.cos(latitude * Math.PI / 180);
    var value3 = Math.cos(longitude * Math.PI / 180);
    var value4 = Math.sin(longitude * Math.PI / 180);
    distance =  `(${value1} * sin_lat + ${value2} * cos_lat * (cos_lng * ${value3} + sin_lng * ${value4} )) as "distance" , `;
    distanceOrder = `ORDER BY distance DESC`;
  }   
  
  const roleFieldFilters = await getRoleFieldFilters(role);
    
  const roleFilterWhere = getRoleFilterWhere(roleFieldFilters);

  
  var searchWhere = ``;
  if(searchText != null &&  searchText != undefined &&  searchText != ''){
    searchWhere = ` AND lower(lcmd.location_name) LIKE '%${searchText}%'`;
  }

  var offset = pageNumber * 50;  
  
  var query = '';
  if(features.includes("disposition_fields")){

    query = `SELECT ` + 
                      `${distance}` + 
                      `cdl.location_id, ` + 
                      `lcmd.location_name, ` + 
                      `lcmd.location_status, ` + 
                      `lcmd.street_address, ` + 
                      `lcmd.suburb, ` + 
                      `lcmd.city, ` + 
                      `lcmd.pincode, ` + 
                      `lcmd.latitude, ` + 
                      `lcmd.longitude, ` + 
                      `CASE WHEN cdl.outcome_id IS NULL AND cdl.stage_id IS NOT NULL  ` + 
                        `THEN cds.stage_name  ` + 
                      `WHEN(cdl.outcome_id IS NULL AND cdl.stage_id IS NULL)  ` + 
                        `THEN "New Lead"  ` + 
                      `ELSE printf('%s: %s', cds.stage_name, cdo.outcome_name )  ` + 
                      `END AS "status", ` + 
                      `CASE WHEN cdl.outcome_id IS NULL AND cdl.stage_id IS NOT NULL  ` + 
                        `THEN cds.assigned_color  ` + 
                      `WHEN(cdl.outcome_id IS NULL AND cdl.stage_id IS NULL)  ` + 
                        `THEN "#E3E924"  ` + 
                      `ELSE cdo.assigned_color  ` + 
                      `END AS "status_text_color" ` + 
                  `FROM crm_disposition_locations AS cdl ` + 
                  `LEFT JOIN locations_core_master_data AS lcmd ` + 
                  `ON lcmd.location_id = cdl.location_id ` + 
                  `LEFT JOIN crm_disposition_outcomes AS cdo ` + 
                  `ON cdl.outcome_id = cdo.disposition_outcome_id ` + 
                  `LEFT JOIN crm_disposition_stages AS cds ` + 
                  `ON cdl.stage_id = cds.disposition_stage_id ` +                   
                  `WHERE ${roleFilterWhere} lcmd.delete_status = 0 ${searchWhere} ${distanceOrder} LIMIT 50 OFFSET ${offset}`;

  }else{

    var query  = `SELECT ` + 
                      `${distance}` + 
                      `lcmd.location_id, ` + 
                      `lcmd.location_name, ` + 
                      `lcmd.location_status, ` + 
                      `lcmd.street_address, ` + 
                      `lcmd.suburb, ` + 
                      `lcmd.city, ` + 
                      `lcmd.pincode, ` + 
                      `lcmd.latitude, ` + 
                      `lcmd.longitude, ` + 
                      `ldp.location_status as "status", ` + 
                      `ldp.status_color as "status_text_color" ` + 
                    `FROM locations_core_master_data AS lcmd ` + 
                    `LEFT JOIN locations_dynamic_pins as ldp ` + 
                    `ON lcmd.location_status = ldp.location_status ` + 
                    `WHERE  ${roleFilterWhere} ` + 
                      `lcmd.delete_status = 0 ` + 
                    `AND lcmd.client_id = ? ` + 
                    `AND lcmd.business_unit_id = ? ` + 
                    `${searchWhere} ${distanceOrder} LIMIT 50 OFFSET ${offset}`;
  
  }
  
  return query;
}




export default {
  find,
};
