import { getApiRequest } from "../actions/api.action";
import { checkConnectivity, getResponseMessage, saveOfflineSyncItems } from "./helper";
import { Strings } from "../constants";
import { getTokenData } from "../constants/Storage";
import { ExecuteQuery } from "../sqlite/DBHelper";
import UrlResource from "./UrlResource";

export function find(url, postData){
  
  return new Promise(function(resolve, reject) {

        checkConnectivity().then( async (isConnected) => {             
            if(isConnected){
                getApiRequest(url, postData)
                .then(async res => {                                     
                    resolve(res);
                })
                .catch(e => {
                    console.log("Error",e)
                    reject(e);
                });

            }else{
                
                var client_id = await getTokenData("client_id");
                var business_unit_id = await getTokenData("business_unit_id");                   
                
                var lists = await fetchDataFromDB(client_id, business_unit_id , url);                                
                resolve({status: Strings.Success , items: getData(lists, url)});
            }
        }).catch(e => {
            reject(e);
        });
  });
}


const fetchDataFromDB = async(client_id, business_unit_id , url) => {
    const query = generateQuery(url);    
    const res = await ExecuteQuery(query, [client_id, business_unit_id]);
    return res.rows ? res.rows : [];    
}

const generateQuery = (url) => {
    var query = ``;
    if(url == UrlResource.Form.Filter){
        query = `SELECT  form_type_id, form_type FROM form_types WHERE client_id = ? AND business_unit_id = ? AND delete_status = 0 ORDER BY form_type`;
    }else{
        
    }
    return query;
}

const getData = (lists , url) => {
    var tmp = [];
    if(url == UrlResource.Form.Filter){
        for(var i = 0; i < lists.length; i++){
            var element = lists.item(i);
            tmp.push(
                {
                    name: element.form_type,
                    id : element.form_type_id
                }
            );            
        }
        return [{filter_label:'Form Type' , field_type: 'dropdown' , options : tmp}];
    }else{

    }

}

export default {
  find,
};
