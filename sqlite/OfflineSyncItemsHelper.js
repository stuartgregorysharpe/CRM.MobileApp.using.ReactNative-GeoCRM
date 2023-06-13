
import { enablePromise} from 'react-native-sqlite-storage';
import { getConvertedDateTime } from '../helpers/formatHelpers';
import { createTable, getDBConnection } from './DBHelper';
import { OfflineBaskets, OfflineSyncITemTable } from './helper';

const tableName = 'offline_sync_items';

enablePromise(true);

export const createOfflineSyncItemTable = async () => {

    var db =  await getDBConnection();
    await createTable(db, OfflineSyncITemTable);
};

export const insertOfflineSyncItem = async (data) => {
        
    try{

        var db = await getDBConnection();    
        await db.transaction(async(tx) =>{
            try{            
                const query = `INSERT INTO ${tableName}(indempotency_key, item_type, item_label, item_sub_text,added_time, added_timezone , post_body, url, method ) VALUES(? ,? , ?,? ,? , ?, ? ,? , ?);`;
                console.log(" insert query ", query);
                var res = await tx.executeSql(query, data);
                return res;
            }catch(e){
                console.log("query error",e);
                return undefined;
            }
        });
        
    }catch(e) {
        console.log("transacton error" , e)
    }
    
};

export const deleteOfflineSyncItem = async (id) => {    

    var db = await getDBConnection();
    await db.transaction(async(tx) => {
        const query = `DELETE FROM ${tableName} WHERE id=?`;
        await tx.executeSql(query, [id]);
    });
};


export const getAllOfflineSyncItem = async ( item_type ) => {
    var db = await getDBConnection();
    return new Promise(async function (resolve, reject) {
        await db.transaction(async(tx) =>{            
            const query = `SELECT * FROM ${tableName}`;
            await tx.executeSql(query, [] , (tx, results) => {                
                resolve(results.rows);
            });
        });
    });
};

export const getOfflineSyncItem = async ( item_type ) => {
    var db = await getDBConnection();
    return new Promise(async function (resolve, reject) {
        await db.transaction(async(tx) =>{            
            const query = `SELECT * FROM ${tableName} WHERE item_type=? ORDER BY id`;            
            await tx.executeSql(query, [item_type] , (tx, results) => {                
                resolve(results.rows);
            });
        });
    });
};


export const getOfflineSyncItems = async ( item_types ) => {
    var db = await getDBConnection();
    var itemTypes = `(`;
    item_types.forEach( (element , index) => {
        if(index == 0){
            itemTypes += `'` + element + `'`;
        }else{
            itemTypes += `, '` + element + `'`;
        }        
    });
    itemTypes += `)`;
    

    return new Promise(async function (resolve, reject) {
        await db.transaction(async(tx) =>{            
            const query = `SELECT * FROM ${tableName} WHERE item_type IN ${itemTypes}`;
            console.log("Query", query);

            await tx.executeSql(query, [] , (tx, results) => {                
                resolve(results.rows);
            });
        });
    });
};


export const getOfflineSyncItemsInBasket = async(basketName) => {
    var basket = OfflineBaskets.find((item) => item.basketName == basketName);
    if(basket != undefined){
        var lists = [];
        var offlineSyncItemsInBascket = await getOfflineSyncItems(basket.itemTypes);
        if(offlineSyncItemsInBascket.length > 0){                
            for(var i = 0; i < offlineSyncItemsInBascket.length; i++){
                const item = offlineSyncItemsInBascket.item(i);
                lists.push({label:item.item_label , subLabel: item.item_sub_text, itemType: item.item_type,  time: getConvertedDateTime(item.added_time) } );                
            }
        }        
        return lists;
    }else{
        return [];
    }
    
}
