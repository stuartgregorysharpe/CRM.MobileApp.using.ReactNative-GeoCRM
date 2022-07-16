
import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

var db = null;
export const getDBConnection = async () => {
    if(db) {
        console.log("alread created db")
        return db
    }
    db = await openDatabase(
        { name: 'MainDB', location: 'default' },
        () => {} ,
        error => { console.log(error)}
    );
    return db
};


export const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(sql, params, (trans, results) => {
        resolve(results);
      },
        (error) => {
          reject(error);
        });
    });
});
