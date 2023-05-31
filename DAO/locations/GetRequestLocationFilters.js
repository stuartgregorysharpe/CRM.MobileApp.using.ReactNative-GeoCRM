import { Strings } from "../../constants";
import { ExecuteQuery } from "../../sqlite/DBHelper";
import GetRequest from "../GetRequest";

export function find(postData){
  
  return new Promise(function(resolve, reject) {
    
        GetRequest.call("locations/location-filters",  postData).then( async(res) => {

            if(res.status == Strings.Success && res.isConnected){
                resolve(res.data);
            }else if(res.status == Strings.Success && !res.isConnected){
                
                const client_id = res.data.client_id;
                const business_unit_id = res.data.business_unit_id;
                const user_id = res.data.user_id;

                if(client_id && business_unit_id && postData.location_id){
                    let lists = await fetchDataFromDB(client_id, business_unit_id , postData.location_id);                     
                    let items = getItems(lists);
                    let fieldOptionFilters = await getFieldOptionFilters();
                    resolve({status: Strings.Success , items: items , field_option_filters :  fieldOptionFilters });                                                       
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
    var query = ``;
    return query;
}

const getFieldOptionFilters = async() => {
    return {}
}

const getItems = (lists) => {
      
    var itemList  = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);        
        try{
            itemList.push({});
        }catch(e){
            
        }        
    }

    return itemList;
}

export default {
  find,
};
