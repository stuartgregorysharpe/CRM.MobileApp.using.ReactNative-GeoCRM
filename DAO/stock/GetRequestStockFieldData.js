import { Constants, Strings } from "../../constants";
import { ExecuteQuery } from "../../sqlite/DBHelper";
import GetRequest from "../GetRequest";

export function find(postData){
  
  return new Promise(function(resolve, reject) {

        GetRequest.call( "stockmodule/stock-field-data",  postData).then( async(res) => {
            
            if(res.status == Strings.Success && res.isConnected){
                resolve(res.data);            
            }else if(res.status == Strings.Success && !res.isConnected){
                
                const client_id = res.data.client_id;
                const business_unit_id = res.data.business_unit_id;
                const user_id = res.data.user_id;
                
                if(client_id && business_unit_id && user_id && postData.action){
                    if(postData.action == 'add_stock'){  
                        var lists = await fetchDataFromDB(business_unit_id, client_id);
                        var stockTypes = getData(lists);                        
                        resolve({status: Strings.Success , stock_types: stockTypes });
                    }else{
                        reject("no_add_stock");
                    }                
                }else{
                    reject("no_action");
                }                
            }
        }).catch((e) => {
            reject(e);
        });        
  });
}


const fetchDataFromDB = async(business_unit_id, client_id, ) => {
    const query = generateQuery();        
    const res = await ExecuteQuery(query, [business_unit_id, client_id]);    
    return res.rows ? res.rows : [];    
}

const generateQuery = () => {

    var query  = `SELECT ` + 
                        `product_id, ` + 
                        `product_name, ` + 
                        `product_tag, ` + 
                        `additional_imei, ` + 
                        `msn_required ` + 
                    `FROM ` + 
                        `products_core_master_data ` + 
                    `WHERE ` + 
                        `business_unit_id = ? ` + 
                    `AND client_id = ? ` + 
                    `AND delete_status = 0 ` + 
                    `AND status = 'active' ` + 
                    `AND product_tag IN ('Device','Consumables','Sim') `;
    return query;

}

const getData = (lists) => {
    var tmp = [];    
    var stock_types  = {
        [Constants.stockType.DEVICE]: [],
        [Constants.stockType.CONSUMABLE]: [],
        [Constants.stockType.SIM]: []
    };
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);        
        
        try{
            if(element.product_tag == Constants.stockType.DEVICE){
                const devicedata = {
                    label : element.product_name,
                    product_id : element.product_id,
                    additional_imei : element.additional_imei.toString(),
                    msn_required : element.msn_required.toString(),
                }                        
                stock_types = {                    
                    [Constants.stockType.DEVICE]: [...stock_types[Constants.stockType.DEVICE], devicedata],
                    [Constants.stockType.CONSUMABLE] : [...stock_types[Constants.stockType.CONSUMABLE]],
                    [Constants.stockType.SIM] : [...stock_types[Constants.stockType.SIM]]
                }                
            }

            if(element.product_tag == Constants.stockType.CONSUMABLE){
                const devicedata = {
                    label : element.product_name,
                    product_id : element.product_id
                }                        
                stock_types = {
                    [Constants.stockType.DEVICE] : stock_types[Constants.stockType.DEVICE],
                    [Constants.stockType.CONSUMABLE]: [...stock_types[Constants.stockType.CONSUMABLE], devicedata],
                    [Constants.stockType.SIM] : stock_types[Constants.stockType.SIM]
                }
            }

            if(element.product_tag == Constants.stockType.SIM){
                const devicedata = {
                    label : element.product_name,
                    product_id : element.product_id,                 
                }                
                stock_types = {
                    [Constants.stockType.DEVICE] : stock_types[Constants.stockType.DEVICE],
                    [Constants.stockType.CONSUMABLE] : stock_types[Constants.stockType.CONSUMABLE],
                    [Constants.stockType.SIM]: [...stock_types[Constants.stockType.SIM], devicedata]
                }
            }

        }catch(e){
            console.log("e== ", e)
        }                

    }
    return stock_types;
}

export default {
  find,
};