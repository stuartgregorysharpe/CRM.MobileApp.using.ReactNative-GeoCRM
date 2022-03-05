
import axios from "axios";
import { getBaseUrl, getToken } from "../constants/Storage";

export const getFormLists = async(form_type_id, location_id) => {    
    var base_url = await getBaseUrl();
    var token = await getToken();    
    return new Promise(function(resolve, reject) {        
        console.log(`${base_url}/forms/forms-list`)        
        //https://www.dev.georep.com/local_api_old/forms/forms-list        

        axios
        .get('https://www.dev.georep.com/local_api_old/forms/forms-list', {
          params: {form_type_id: form_type_id, location_id: location_id},
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then((res) => {          
          if (res.data == undefined) {            
            resolve([]);
          }          
          if(res.data.status == "success"){
            resolve(res.data.forms);
          }else{
            resolve([]);
          }
        })
        .catch((err) => {        
          console.log("load list4", err);
          reject(err);          
        })        

    });    
}



export const getFormFilters = async() => {    
    var base_url = await getBaseUrl();
    var token = await getToken();    
    return new Promise(function(resolve, reject) {        
                
        axios
        .get('https://www.dev.georep.com/local_api_old/forms/forms-filters', {          
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then((res) => {          
          if (res.data == undefined) {            
            resolve([]);
          }          
          if(res.data.status == "success"){              
            resolve(res.data.items);
          }else{
            resolve([]);
          }
        })
        .catch((err) => {        
          console.log("load list4", err);
          reject(err);          
        })        

    });    
}


