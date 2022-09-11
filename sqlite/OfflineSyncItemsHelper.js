
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

export const deleteOfflineSyncItem = async (db , id) => {    
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
            const query = `SELECT * FROM ${tableName} WHERE item_type=?`;
            await tx.executeSql(query, [item_type] , (tx, results) => {                
                resolve(results.rows);
            });
        });
    });
};

export const getOfflineSyncItemsInBasket = async(basketName) => {
    var basket = OfflineBaskets.find((item) => item.basketName == basketName);
    if(basket != undefined){
        var lists = [];
        var res = await getOfflineSyncItemByItemType(basket.itemTypes, 0 , lists);

        // basket.itemTypes.forEach(async (element) => {
        //     const offlineSyncItems = await getOfflineSyncItem(element);
        //     if (offlineSyncItems.length > 0) {
        //         for (var i = 0; i < offlineSyncItems.length; i++) {
        //             const item = offlineSyncItems.item(i);
        //             tmp.push({ label: item.item_label, subLabel: item.item_sub_text, time: getConvertedDateTime(item.added_time) });
        //             console.log("pushed ", tmp);
        //         }
        //     }
        // });

        return res;
    }
}

const getOfflineSyncItemByItemType = async(itemLists, index , lists) => {    
    var itemType = itemLists[index];
    
    if(itemType != undefined){
        const offlineSyncItems = await getOfflineSyncItem(itemType);
        if(offlineSyncItems.length > 0){                
            for(var i = 0; i < offlineSyncItems.length; i++){
                const item = offlineSyncItems.item(i);
                lists.push({label:item.item_label , subLabel: item.item_sub_text, time: getConvertedDateTime(item.added_time) } );                
            }                
        }
        if(index < itemLists.length - 1){
            return await getOfflineSyncItemByItemType(itemLists, index + 1 ,lists);
        }else{
            return lists;
        }
    }

}