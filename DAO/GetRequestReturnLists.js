import { Strings } from "../constants";
import { ExecuteQuery } from "../sqlite/DBHelper";
import GetRequest from "./GetRequest";

export function find(postData){
  
  return new Promise(function(resolve, reject) {

        GetRequest.call("stockmodule/returns-list",  postData).then( async(res) => {

            if(res.status == Strings.Success && res.isConnected){
                resolve(res.data);
            }else if(res.status == Strings.Success && !res.isConnected){
                
                const client_id = res.data.client_id;
                const business_unit_id = res.data.business_unit_id;
                const user_id = res.data.user_id;

                if(client_id && business_unit_id && user_id){                                  
                    var lists = await fetchDataFromDB(business_unit_id, client_id,  user_id , postData);                    
                    resolve({status: Strings.Success , return_items: getReturnLists(lists)});                    
                }else{
                    reject();
                }
            }
        }).catch((e) => {
            reject(e);
        });
  });
}


const fetchDataFromDB = async(business_unit_id, client_id, user_id  , postData) => {
    const query = generateQuery(postData);    
    const res = await ExecuteQuery(query, [client_id, business_unit_id , user_id ]);
    return res.rows ? res.rows : [];    
}

const generateQuery = (postData) => {

    var query  = `SELECT ` +
						`smi.description, ` +
						`smi.device_serial_number, ` +
						`smi.stock_module_item_id, ` +
						`rd.return_reason, ` +
						`rd.return_date ` +
					`FROM ` +
						`stock_module_items AS smi ` +
					`LEFT JOIN stock_module_returns_view AS rd ` +
					`ON ` +
						`smi.stock_module_item_id = rd.stock_module_return_view_id ` +
					`WHERE ` +
						`smi.client_id = ? ` +
						`AND smi.business_unit_id = ? ` +
						`AND smi.user_id = ? ` +
						`AND smi.delete_status = 0  ` +
						`AND smi.stock_status = "returned"`;
    return query;
}


const getReturnLists = (lists) => {
    var tmp = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);           
        tmp.push({
            stock_item_id: element.stock_module_item_id,
            description: element.description,
            serial: element.device_serial_number,
            reason: element.return_reason,
            date: element.return_date
        });                 
    }
        
    return tmp;
}

export default {
  find,
};
