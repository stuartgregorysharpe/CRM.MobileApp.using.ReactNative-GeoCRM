
import { enablePromise} from 'react-native-sqlite-storage';
import { createTable, getDBConnection } from './DBHelper';
import { OfflineSyncITemTable } from './helper';

const tableName = 'offline_sync_items';

enablePromise(true);

export const createOfflineSyncItemTable = async () => {

    var db =  await getDBConnection();
    await createTable(db, OfflineSyncITemTable);
};

export const insertOfflineSyncItem = async (data) => {
        
    var db = await getDBConnection();    
    await db.transaction(async(tx) =>{
        try{            
            const query = `INSERT INTO ${tableName}(indempotency_key, item_type, item_label, item_sub_text,added_time, added_timezone , post_body, url, method ) VALUES(? ,? , ?,? ,? , ?, ? ,? , ?);`;
            console.log(" insert query ", query);
            await tx.executeSql(query, data);
        }catch(e){
            console.log("query error",e)
        }
    });    
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
