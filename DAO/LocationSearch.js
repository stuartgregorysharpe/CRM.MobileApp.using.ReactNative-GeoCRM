import { getApiRequest } from "../actions/api.action";
import { Strings } from "../constants";
import { getTokenData, getUserId } from "../constants/Storage";
import { checkConnectivity } from "./helper";
import { ExecuteQuery } from "../sqlite/DBHelper";
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

                getApiRequest("locations/location-search-list", param).then((res) => {
                    if(res.status === Strings.Success){
                        resolve(res.items);
                    }else{
                        resolve([]);
                    }                    
                }).catch((e) => {
                    console.log("error",e)
                    reject();
                })
            }else{
              
                
                var client_id = await getTokenData("client_id");
                var business_unit_id = await getTokenData("business_unit_id");
                
                var query = '';
                console.log("current location", currentLocation)
                query = generateQuery(currentLocation.latitude, currentLocation.longitude, searchKey, pageNumber , features);
                console.log("query", query);
                var locations;
                if(features.includes("disposition_fields")){
                  locations = await fetchDataFromDB(query, null , null);
                }else{
                  locations = await fetchDataFromDB(query, client_id , business_unit_id);
                }
                console.log("locations", locations);
                resolve(getResponse(locations));

            }
        }).catch(e => {
            reject();
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
      console.log("RES",res)
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



const generateQuery = (latitude, longitude , searchText , pageNumber, features) => {
  
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
                  `WHERE lcmd.delete_status = 0 ${searchWhere} ${distanceOrder} LIMIT 50 OFFSET ${offset}`;

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
                    `WHERE  ` + 
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
