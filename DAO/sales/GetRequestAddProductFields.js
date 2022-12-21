
import { Strings } from "../../constants";
import { ExecuteQuery } from "../../sqlite/DBHelper";
import GetRequest from "../GetRequest";

export function find(postData){
  
  return new Promise(function(resolve, reject) {
    
        GetRequest.call("sales/add-product-fields",  postData).then( async(res) => {
            
            if(res.status == Strings.Success && res.isConnected){

                resolve(res.data);
            }else if(res.status == Strings.Success && !res.isConnected){
                
                const client_id = res.data.client_id;
                const business_unit_id = res.data.business_unit_id;
                const user_id = res.data.user_id;
                resolve({status: Strings.Success});      

            }
        }).catch((e) => {
            reject();
        });        
  });
}

const fetchDataFromDB = async(client_id, business_unit_id) => {
    const query = generateQuery();
    const res = await ExecuteQuery(query, [client_id, business_unit_id]);
    return res.rows ? res.rows : [];    
}

const generateQuery = () => {
    var query  = ``;                
    return query;
}

const getUserLists = (lists) => {
    
    var userLists  = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
    
    }
    return userLists;
}

export default {
  find,
};
