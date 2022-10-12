import { Constants, Strings } from "../constants";
import { getConvertedDate} from "../helpers/formatHelpers";
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
                    resolve({status: Strings.Success , stock_items: getData(lists)});                    
                }else{
                    reject();
                }
            }else{
                reject(res.status);
            }
        }).catch((e) => {
            reject(e);
        });
  });
}


const fetchDataFromDB = async(business_unit_id, client_id, user_id  , postData) => {
    const query = generateQuery(postData);    
    const res = await ExecuteQuery(query, [client_id, business_unit_id , client_id, business_unit_id , user_id ]);
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
					`LEFT JOIN( ` + 
						`SELECT ` + 
						`	* ` + 
						`FROM ` + 
							`( ` + 
							`SELECT ` + 
								`stock_module_item_id, ` + 
								`return_reason, ` + 								
								`added_date AS "return_date" ` + 
							`FROM ` + 
								`stock_module_history ` + 
							`WHERE ` + 
								`client_id = ? ` + 
								 `AND delete_status = 0  ` + 
								 `AND action_type = "return" ` + 
								`AND business_unit_id = ? ` + 
							`ORDER BY ` + 
								`added_date ` + 
							`DESC ` + 
							`) AS sh ` + 
					`GROUP BY ` + 
						`stock_module_item_id ` + 
					`) AS rd ` + 
					`ON ` + 
						`smi.stock_module_item_id = rd.stock_module_item_id ` + 
					`WHERE ` + 
						`smi.client_id = ? ` + 
						`AND smi.business_unit_id = ? ` + 
						`AND smi.user_id = ? ` + 
						`AND smi.delete_status = 0  ` + 
						`AND smi.stock_status = "returned" `;
    return query;
}


const getData = (lists) => {
    var tmp = [];    
    var simItems  = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        
        if(element.type == Constants.stockType.DEVICE || element.type == Constants.stockType.CONSUMABLE){
            if(element.type == Constants.stockType.DEVICE) {
                serial = element.device_serial_number;
                qty = "";
            }
            if(element.type == Constants.stockType.CONSUMABLE) {
                serial = "";
                qty = element.consumables_quantity;
            }
            
            tmp.push(
                {
                    stock_item_id: element.stock_module_item_id,
                    description : element.description,
                    stock_type : element.type,
                    added_date : getConvertedDate(element.added_date),
                    serial : serial,
                    qty : qty
                }
            );                 
        }
        
        if(element.type == Constants.stockType.SIM){
            
            var simItem = {
                stock_item_id: element.stock_module_item_id,
                iccid: element.sim_iccid,
                box: element.sim_box,
                innerbox : element.sim_innerbox,
                brick : element.sim_brick,
                kit : element.sim_kit                
            }

            simItems.push( {
                [element.description]:{
                    date: element.added_date,
                    items: [simItem]
                }
            });            
        }                 
    }
    
    simItems.forEach((item) => {
        Object.keys(item).forEach(key => {
            tmp.push({
                stock_type : Constants.stockType.SIM,
                network: key,
                date: item[key].date,
                items: item[key].items,
            })        
        });    
    });    

    return tmp;
}

export default {
  find,
};
