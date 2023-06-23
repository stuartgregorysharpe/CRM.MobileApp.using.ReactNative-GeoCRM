import { Constants, Strings } from "../../constants";
import { getConvertedDate } from "../../helpers/formatHelpers";
import { ExecuteQuery } from "../../sqlite/DBHelper";
import GetRequest from "./../GetRequest";
import { getOfflineSyncItem } from '../../sqlite/OfflineSyncItemsHelper'

export function find(postData){
  
  return new Promise(function(resolve, reject) {

        GetRequest.call( "stockmodule/stock-list",  postData).then( async(res) => {

            if(res.status == Strings.Success && res.isConnected){
                resolve(res.data);            
            }else if(res.status == Strings.Success && !res.isConnected){
                
                const client_id = res.data.client_id;
                const business_unit_id = res.data.business_unit_id;
                const user_id = res.data.user_id;

                if(client_id && business_unit_id && user_id){                    
                    var lists = await fetchDataFromDB(business_unit_id, client_id, user_id  , postData);                                   
                    var offlineItems = await getOfflineSyncItem('sell_to_trader');
                    resolve({status: Strings.Success , stock_items: getData(lists , offlineItems)});                                                       
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
    const res = await ExecuteQuery(query, [business_unit_id, client_id , user_id]);
    return res.rows ? res.rows : [];    
}

const generateQuery = (postData) => {
    var query = `SELECT ` + 
          `stock_module_item_id, ` + 
          `description, ` + 
          `type, ` + 
          `device_serial_number, ` + 
          `consumables_quantity, ` + 
          `added_date, ` + 
          `sim_iccid, ` + 
          `sim_box, ` + 
          `sim_innerbox, ` + 
          `sim_brick, ` + 
          `sim_kit ` + 
        `FROM stock_module_items ` + 
        `WHERE ` + 
          `business_unit_id = ? ` + 
        `AND client_id = ? ` + 
        `AND user_id = ? ` + 
        `AND delete_status = 0 ` + 
        `AND stock_status = 'stock_on_hand'`;

        if(postData != null && postData.stock_type != undefined){
            if(postData.stock_type == "Device"){
                query = query + ' AND type = "Device" ';      
            }
        }
        query = query + ` ORDER BY type DESC `;        
    return query;
}

const getDiscount = ( offlineItems ,  stock_type, stock_item_id) => {
    
    var count = 0;
    for(var i = 0; i < offlineItems.length; i++){
        var element = offlineItems.item(i);        
        if(element.item_label === stock_type){
            const body =  JSON.parse(element.post_body);
            if(stock_type === Constants.stockType.CONSUMABLE || stock_type === Constants.stockType.DEVICE){
                if(parseInt(body.stock_item_id) == parseInt(stock_item_id)){
                    if(stock_type === Constants.stockType.CONSUMABLE){
                        count = count +  parseInt(body.sell_quantity);
                    }else{    
                        return 1;
                    }                
                }
            }else{
                Object.keys(body).forEach(key => {                    
                    if(key.includes("stock_item_ids")){
                        console.log("keysss ==" , stock_item_id , body[key])
                        if(body[key] === stock_item_id.toString()){                                                        
                            count = 1;
                        }
                    }
                });
            }            
                   
        }
    }
    return count;
}

const getData = (lists , offlineItems) => {
    var tmp = [];    
    var simItems  = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);

        var qty = 0;
        if(element.type == Constants.stockType.DEVICE || element.type == Constants.stockType.CONSUMABLE){
            if(element.type == Constants.stockType.DEVICE) {
                serial = element.device_serial_number;
                qty = "";
            }
            if(element.type == Constants.stockType.CONSUMABLE) {
                serial = "";
                qty = element.consumables_quantity;
            }                        
            var discountCount = 0 ;            
            discountCount = getDiscount(offlineItems , element.type, element.stock_module_item_id);
            console.log("discountCount == ", discountCount , element.stock_module_item_id , element.type )  
            if( !(discountCount == 1 &&  element.type != Constants.stockType.CONSUMABLE) ){
                tmp.push(
                    {
                        stock_item_id: element.stock_module_item_id,
                        description : element.description,
                        stock_type : element.type,
                        added_date : getConvertedDate(element.added_date),
                        serial : serial,
                        qty :  qty != "" ? parseInt(qty) - discountCount : ''
                    }
                );  
            }
                           
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
                    
            var discountCount = getDiscount(offlineItems , Constants.stockType.SIM , element.stock_module_item_id);            
            if(discountCount == 0){
                simItems.push( {
                    [element.description]:{
                        date: element.added_date,
                        items: [simItem]
                    }
                });      
            }                        
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
