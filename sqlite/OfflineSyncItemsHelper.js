
import { enablePromise} from 'react-native-sqlite-storage';
import { getDBConnection } from './DBHelper';

const tableName = 'offline_sync_items';

enablePromise(true);


export const createBascketLastSync = async (db) => {
    await db.transaction(async(tx) =>{
        const query = `CREATE TABLE IF NOT EXISTS ${tableName}(id INTEGER PRIMARY KEY AUTOINCREMENT, indempotency_key TEXT NOT NULL ` + 
                        `, item_type TEXT NOT NULL , item_label TEXT NOT NULL  , item_sub_text TEXT NOT NULL , added_time TEXT NOT NULL ` + 
                        `, added_timezone TEXT NOT NULL , post_body TEXT NOT NULL , url TEXT NOT NULL , method TEXT NOT NULL , timestamp TEXT NOT NULL, timezone TEXT NOT NULL );`;
        await tx.executeSql(query);
    });
};

export const insertOfflineSyncItem = async (data) => {
    var db = await getDBConnection();
    var check = await getBascketLastSyncTableData(sync_basket);
    await db.transaction(async(tx) =>{
        try{
            if(check.length == 0 ){            
                const query = `INSERT INTO ${tableName}(indempotency_key, item_type, item_label, item_sub_text,added_time, added_timezone , post_body, url, method ) VALUES(? ,? , ?,? ,? , ?,? ,? , ?);`;
                await tx.executeSql(query, data);
            }else{            
                const query = `UPDATE ${tableName} SET timestamp = ? , timezone = ? WHERE id=${check.item(0).id};`;                
                await tx.executeSql(query, [timestamp , timezone ]);
            }        
        }catch(e){
            console.log("query error",e)
        }
    });    
};

export const deleteBascketLastSyncsTable = async (db , id) => {    
    await db.transaction(async(tx) => {
        const query = `DELETE FROM ${tableName} WHERE id=?`;
        await tx.executeSql(query, [id]);
    });
};

export const getOfflineSyncItem = async ( sync_basket ) => {
    var db = await getDBConnection();
    return new Promise(async function (resolve, reject) {
        await db.transaction(async(tx) =>{            
            const query = `SELECT * FROM ${tableName} WHERE sync_basket=?`;
            await tx.executeSql(query, [sync_basket] , (tx, results) => {                
                resolve(results.rows);
            });
        });
    });
};
