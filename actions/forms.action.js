
import axios from "axios";
import { getBaseUrl, getToken } from "../constants/Storage";

export const getFormLists = async(form_type_id, location_id , filters) => {    
    var base_url = await getBaseUrl();
    var token = await getToken();    
    var form_type_id = filters.form_type.map(item => item).join(',');  
    console.log("form type id" , form_type_id);

    return new Promise(function(resolve, reject) {        
        console.log(`https://www.dev.georep.com/local_api_old/forms/forms-list?form_type_id=${form_type_id}`)                
        axios
        .get(`https://www.dev.georep.com/local_api_old/forms/forms-list?form_type_id=${form_type_id}`, {
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
            console.log("res length",res.data.forms.length)
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
                
        console.log('https://www.dev.georep.com/local_api_old/forms/forms-filters');
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



export const getFormQuestions = async(form_id) => {

  var base_url = await getBaseUrl();
  var token = await getToken();

  return new Promise(function(resolve, reject) {        
      console.log(`https://dev.georep.com/local_api_old/forms/form-questions?form_id=xxx`) 
      axios
      .get(`https://dev.georep.com/local_api_old/forms/form-questions?form_id=${form_id}`, {
        params: {},
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then((res) => {          
        if (res.data == undefined) {            
          resolve([]);
        }          
        if(res.data.status == "success"){
          console.log("res length",res.data.questions.length)
          resolve(res.data.questions);
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
