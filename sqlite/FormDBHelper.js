
import { enablePromise} from 'react-native-sqlite-storage';

const tableName = 'formTable';

enablePromise(true);

export const createTable = async (db) => {
    await db.transaction(async(tx) =>{        
        const query = `CREATE TABLE IF NOT EXISTS ${tableName}(id INTEGER PRIMARY KEY AUTOINCREMENT, formId INTEGER NOT NULL , indempotencyKey TEXT NOT NULL, formQuestions TEXT NOT NULL );`;
        await tx.executeSql(query);
    });
};


export const insertTable = async (db , formId, formQuestions, indempotencyKey) => {
    var check = await getFormTableData(db, formId);    

    await db.transaction(async(tx) =>{        
        if(check.length == 0 ){
            const query = `INSERT INTO ${tableName}(formId, indempotencyKey, formQuestions) VALUES(? ,? , ?);`;
            await tx.executeSql(query, [formId, indempotencyKey, JSON.stringify(formQuestions)]);
        }else{                       
            indempotencyKey = check.item(0).indempotencyKey != '' ? check.item(0).indempotencyKey : indempotencyKey;            
            const query = `UPDATE ${tableName} SET formQuestions = ? , indempotencyKey = ? WHERE formId=${formId};`;            
            await tx.executeSql(query, [JSON.stringify(formQuestions) , indempotencyKey ]);
        }        
    });
};

export const getFormTableData = async (db , formId) => {

    return new Promise(async function (resolve, reject) {
        await db.transaction(async(tx) =>{            
            const query = `SELECT * FROM ${tableName} WHERE formId=?`;
            await tx.executeSql(query, [formId] , (tx, results) => {                
                resolve(results.rows);
            });
        });
    });
};

export const deleteFormTable = async (db , formId) => {    
    await db.transaction(async(tx) => {
        const query = `DELETE FROM ${tableName} WHERE formId=?`;
        await tx.executeSql(query, [formId]);
    });
};


export const deleteAllFormTable = async (db) => {
    await db.transaction(async(tx) =>{        
        const query = `DELETE FROM ${tableName}`;
        await tx.executeSql(query);
    });
};
