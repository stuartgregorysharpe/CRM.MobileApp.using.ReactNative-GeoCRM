
import { openDatabase } from 'react-native-sqlite-storage';
import { getJsonData } from '../constants/Storage';

var db = null;
export const getDBConnection = async () => {
    try{
      if(db && db != null) {          
          return db
      }
      db = await openDatabase(
        { name: 'MainDB',       
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
  //console.log("CREATE Table Formats" , JSON.stringify(tables));
  try{      
      await tables.reduce(async (a, table) => {        
        await a;        
        await handleTable(table);
      }, Promise.resolve());
  }catch(e) {
    console.log("exception ", e)
  }
};

export const handleTable = async (table) => {

  var tableName = table.table_name;
  var query0 = `PRAGMA table_info(${tableName});`;
  var res = await ExecuteQuery(query0,[]);  

  if(res?.rows?.length != table?.fields?.length){ // table was updated.

    console.log("res.rows.length" , res?.rows?.length, table?.fields?.length)

      if(res.rows.length != 0){
        try{          
          var deleteQyery = `DROP TABLE IF EXISTS ${tableName}`;
          console.log("drop table :  => " , deleteQyery)
          await db.transaction(async(tx) =>{            
            await tx.executeSql(deleteQyery);
          });
        }catch(e){
          console.log("delete table error", e)
        }
      }
      
      var fields = table.fields;
      var indexKeys = table.index_keys;
      console.log(" --- start created table --- " , tableName);
            

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
      console.log("CREATE TABLE Query:  ", query1);
      try{
        await db.transaction(async(tx) =>{            
          await tx.executeSql(query1);
        });
      }catch(e){
        console.log("create table error", e)
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
          try{
            await db.transaction(async(tx) =>{            
              await tx.executeSql(query2);
            });
          }catch(e){
            console.log("create inddex error", e)
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

export const deleteRecords = async (tableName , records) => {

    var primaryQuery = `SELECT l.name FROM pragma_table_info("${tableName}") as l WHERE l.pk = 1;`;
    var primaryKey = '';
    try{
      var res = await ExecuteQuery(primaryQuery,[]);
      var lists = res.rows ? res.rows : [];
      for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);      
        primaryKey = element.name;
        console.log("primary key ====> ", primaryKey)
      }
    }catch(e){
      console.log("error", e);
    }    

    var tmp = await Promise.all(            
      await records.map(async (element, index) => {                        
        var query = '';
        // for(let key of Object.keys(element)){                 
        //   if(key.endsWith("_id")){
        //     if(query == '' && element[key] != null && element[key] != ""){
        //       query = key + ' = ' + element[key];
        //     }else if(element[key] != null && element[key] != ""){
        //       query = query + " AND " + key + ' = ' + element[key];
        //     }
        //   }          
        // }        
        if(primaryKey != ''){          
          var deleteQuery = `DELETE FROM ${tableName} WHERE ${primaryKey} = ${element[primaryKey]}`;
          try{            
            var res = await ExecuteQuery(deleteQuery,[]);              
          }catch(e){
            console.log("error ", e)
          } 
        }
        return ''; 
      })

    );    
    return tmp;    
}

export const handleRecords = async ( tableName, records) => {
  
  var query = '';
  var fields = '';
  var values = '';  

  try{
    
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

      if(values != ''){
        query = `INSERT INTO ${tableName} ${fields} VALUES ${values};`;                
        try{
          if(db != null){    
            await db.transaction(async(tx) =>{            
              await tx.executeSql(query);
            });
          }    
        }catch(e){
          console.log("error occure", e);
        }
      }else{
        console.log('No data to insert' , tableName , fields);
      }           
  }catch(e){
    console.log(e);
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
                                        
          if(key === "svg_code" ){
            body2 = `'${value}'`;
          }else if(value.includes(`"`) && value.includes(`'`)){
            body2 = `'${value.replace(`'`,``)}'`;
          }else if(value.includes('"')){
            body2 = `'${value}'`;
          }else{
            body2 = `"${value}"`;
          }
        }else {  
          if(key === "svg_code" ){
            body2 =  body2 + `, ` + `'${value}'`;
          }else if(value.includes(`"`) && value.includes(`'`)){            
            body2 = body2 + `, ` + `'${value.replace(`'`,``)}'`;
          }else if(value.includes('"')){
            body2 =  body2 + `, ` + `'${value}'`;
          }else{
            body2 =  body2 + `, ` + `"${value}"`;
          }
          
        }
        index = index + 1;
      }    
      return `(${body2})`;      
}

export async function getLocationInfoFromLocal (locationId) {

  if(locationId != 0){
    var query = `SELECT * FROM locations_core_master_data WHERE location_id = ?`; 
    var location_name = '';
    var address = '';
    try{

      var res = await ExecuteQuery(query, [locationId]);
      if( res != null && res != undefined  && res.rows.length > 0){
          location_name = res.rows.item(0).location_name;
          address = getFullAddress(res.rows.item(0));          
          console.log("Adsf", address);
      }else{
          const checkinLocation =  await getJsonData("@checkin_location");
          if(checkinLocation != null){
            return {name: checkinLocation.location_name.value, address: checkinLocation.address, location_id: locationId , type: 'from_local'};
          }            
      }      
    }catch(e){
      console.log(" excute error :", e);
      return {name: location_name , address:  address , location_id: locationId , type:'from_table'};
    }
    
    return {name: location_name , address:  address , location_id: locationId , type:'from_table'};

  }else{
    console.log("BBB")
  }

}

export function getFullAddress (element){

  var address = element.street_address;
  if(element.suburb != '' && element.suburb != undefined){
      address = address + ", " + element.suburb;
  }
  if(element.city != '' && element.city != undefined){
      address = address + ", " + element.city;
  }
  if(element.state != '' && element.state != undefined){
      address = address + ", " + element.state;
  }
  if(element.country != '' && element.country != undefined){
      address = address + ", " + element.country;
  }
  if(element.pincode != '' && element.pincode != undefined){
      address = address + ", " + element.pincode;
  }
  return address;
}




