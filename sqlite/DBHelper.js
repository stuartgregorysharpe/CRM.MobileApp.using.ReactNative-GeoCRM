
import { value } from 'react-native-extended-stylesheet';
import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

var db = null;
export const getDBConnection = async () => {
    try{
      if(db && db != null) {
          console.log("alread created db")
          return db
      }
      db = await openDatabase(
        { name: 'MainDB', 
        //createFromLocation : "/data/mydbfile.sqlite"},
        location: 'default' },
        () => { },
        error => { console.log(error); }
      );
      return db
    }catch(e){
      console.log("Error" , e);
      return null;
    } 
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

export const createTable = async (db , tables ) => {
  console.log("dddd");
  try{            
      console.log("Total tables length", tables.length);
      await tables.reduce(async (a, table) => {        
        await a;        
        await handleTable(table);
      }, Promise.resolve());
  }catch(e) {
    console.log("exception ", e)
  }
};


const handleTable = async (table) => {

  var tableName = table.table_name;
  var query0 = `PRAGMA table_info(${tableName});`;        
  var res = await ExecuteQuery(query0,[]);

  if(res.rows.length != table.fields.length){ // table was updated.      

      var fields = table.fields;
      var indexKeys = table.index_keys;

      console.log(" --- start created db ---")
      var query1 = `CREATE TABLE IF NOT EXISTS ${tableName} (`  
      fields.forEach((element, index) => {
        var isPrimary = false;
        var check = indexKeys.find(item => item.type === 'PRIMARY');
        if(check && check.fields){
          if(check.fields.includes(element.name)){
            isPrimary = true;
          }
        }
        var item = `, ${element.name} ${element.type} NOT NULL`;
        if( index === 0 ){
          if(isPrimary){
            item = ` ${element.name} ${element.type} PRIMARY KEY AUTOINCREMENT `
          }else{
            item = ` ${element.name} ${element.type} NOT NULL`;
          }              
        }
        if(element.name === 'group' || element.name === 'default'){
          item = `, [${element.name}] ${element.type} NOT NULL`;
        }        
        query1 = query1 + item;
      });
      query1 = query1 + ");";  
      console.log("query 1", query1);
      try{
        await db.transaction(async(tx) =>{            
          await tx.executeSql(query1);
        });
      }catch(e){
        console.log("query 1 error", error)
      }
            
      await indexKeys.forEach(async(element, index) => {
        if(element.type === "INDEX" && element.key_name != ''){
          var fieldsLists = '';
          element.fields.forEach((subElement, k) => {
            if(k === element.fields.length - 1 ){
              fieldsLists = fieldsLists + subElement;
            }else{
              fieldsLists = fieldsLists + subElement + ", ";
            }        
          })
          var query2 = `CREATE INDEX ${tableName}_${element.key_name} ON ${tableName}(${fieldsLists})`;
          console.log("query 2", query2)
          try{
            await db.transaction(async(tx) =>{            
              await tx.executeSql(query2);
            });
          }catch(e){
            console.log("query 2 error", e)
          }
          
        }
      });      
  }else{
    console.log("table was not updated" , tableName);
  }
}


export const getCount = async(tableName) => {
   
  var query = `SELECT * FROM ${tableName};`;
  console.log("query", query);
  try{
    var res = await ExecuteQuery(query,[]);        
  }catch(e){
    console.log("error", e)
  }  
  return res;
    
}

export const truncateTable = async(tableName) => {
   
  var query = `DELETE FROM locations_custom_master_fields;`;
  var query2 = `DELETE FROM locations_core_master_data;`;
  var query3 = `DELETE FROM locations_custom_master_field_data;`;
  
  console.log("query", query);
  try{
    var res = await ExecuteQuery(query,[]);        
    var res2 = await ExecuteQuery(query2,[]);        
    var res3 = await ExecuteQuery(query3,[]);        

  }catch(e){
    console.log("error", e)
  }  
  return res;
    
}


export const handleRecords = async ( tableName, records) => {

  //var index = 0;
  var query = '';
  var fields = '';
  var values = '';

  var tmp = await Promise.all(
    await records.map(async (element, index) => {              
        if(index === 0){
          fields = await getFields(element);
        }
        return  await getInsertValues(element);
              
    })
  );

  tmp.forEach((element, index) => {
    if(index === 0){
      values = element;
    }else{
      values = values + ", " + element;
    }
  })

  query = `INSERT INTO ${tableName} ${fields} VALUES ${values};`;  
  try{
    if(db != null){
      console.log(" run query ", query);
      await db.transaction(async(tx) =>{            
        await tx.executeSql(query);
      });
    }    
  }catch(e){
    console.log("error occure", e);
  }  
}

export const getFields = async (element ) => {        
  var body1 = '';
  var index = 0;  
  for(let key of Object.keys(element)){

    if(key === 'group' || key === "default"){
      key = '[' + key + ']';
    }

    if(index === 0){
      body1 = key;      
    }else {
      body1 = body1 + ", " + key;      
    }
    index = index + 1;
  }          
  var tmp = `(${body1})`;  
  return tmp;
}

export const getInsertValues = async ( element ) => {            
  
      var body2 = '';
      var index = 0;

      for(let key of Object.keys(element)){       
        var value = `""`;
        if(element[key] != '' , element[key] != null){
          value = element[key];
        }

        if(index === 0){
          body2 = `'${value}'`;
        }else {  
          body2 = body2 + ", '" + `${value}` + "'";
        }
        index = index + 1;
      }    
      return `(${body2})`;      
}




