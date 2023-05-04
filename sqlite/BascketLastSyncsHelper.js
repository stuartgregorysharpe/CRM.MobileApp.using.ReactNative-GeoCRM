
import { enablePromise} from 'react-native-sqlite-storage';
import { getDBConnection } from './DBHelper';

const tableName = 'sync_basket_last_syncs';

enablePromise(true);

export const createBascketLastSync = async (db) => {
    await db.transaction(async(tx) =>{
        const query = `CREATE TABLE IF NOT EXISTS ${tableName}(id INTEGER PRIMARY KEY AUTOINCREMENT, sync_basket TEXT NOT NULL , timestamp TEXT NOT NULL, timezone TEXT NOT NULL );`;
        await tx.executeSql(query);
    });
};

export const insertBascketLastSync = async (sync_basket, timestamp, timezone) => {
    var db = await getDBConnection();
    var check = await getBascketLastSyncTableData(sync_basket);
    await db.transaction(async(tx) =>{
        try{
            if(check.length == 0 ){            
                const query = `INSERT INTO ${tableName}(sync_basket, timestamp, timezone) VALUES(? ,? , ?);`;
                await tx.executeSql(query, [sync_basket, timestamp, timezone]);
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

export const getBascketLastSyncTableData = async ( sync_basket ) => {
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


export const getTableRecords = async ( table ) => {
    var db = await getDBConnection();
    return new Promise(async function (resolve, reject) {
        await db.transaction(async(tx) => {            
            const query = `SELECT * FROM ${table}`;
            await tx.executeSql(query, [] , (tx, results) => {                
                resolve(results.rows);
            });
        });
    });
};
