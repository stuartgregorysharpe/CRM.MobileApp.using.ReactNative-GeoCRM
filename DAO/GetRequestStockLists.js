import { Constants, Strings } from "../constants";
import { getConvertedDate, getConvertedDateTime, getDateTime, getDateTimeFromBasketTime } from "../helpers/formatHelpers";
import { ExecuteQuery } from "../sqlite/DBHelper";
import GetRequest from "./GetRequest";

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
                    resolve({status: Strings.Success , stock_items: getData(lists)});                                                       
                }else{
                    reject();
                }            

            }
        }).catch((e) => {
            reject();
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
            
            console.log("Sim Item  Description : " , element.description);
            console.log("Sim Item : " , simItem);

            simItems.push( {
                [element.description]:{
                    date: element.added_date,
                    items: [simItem]
                }
            });      

            // if (!simItems[element.description]) {
            //     simItems[element.description] = [];
            // }            
            // simItems[element.description].push({date: element.added_date , items: [simItem] });
            console.log("DDDD == " , simItems[element.description]);

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
