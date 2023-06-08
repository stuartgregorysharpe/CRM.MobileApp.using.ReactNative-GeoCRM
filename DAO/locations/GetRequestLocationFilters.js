import { Strings } from "../../constants";
import { ExecuteQuery } from "../../sqlite/DBHelper";
import GetRequest from "../GetRequest";
import { getFieldOptionFilters } from "../helper";

export function find(postData){
  
  return new Promise(function(resolve, reject) {
      
        GetRequest.call("locations/location-filters",  postData).then( async(res) => {

            if(res.status == Strings.Success && res.isConnected){
                resolve(res.data);
            }else if(res.status == Strings.Success && !res.isConnected){

                const role = res.data.role;

                const items = await getItems();
                const fieldOptionFilters = await getFilters(role);
                resolve({status : Strings.Success , items : items , field_option_filters : fieldOptionFilters });

            }
            
        }).catch((e) => {
            reject(e);
        });        
  });
}

const fetchDataFromDB = async(query, param = []) => {        
    const res = await ExecuteQuery(query, param);        
    return res.rows ? res.rows : [];    
}

const generateCoreFieldFilterQuery = () => {
    let query = `SELECT custom_master_field_id, core_field_name, custom_field_name
                FROM locations_custom_master_fields
                WHERE delete_status = 0
                AND status = 'active'
                AND include_as_filter = 1
                AND (core_field_name != '' OR core_field_name IS NOT NULL)`;
    return query;
}

const generateOptionQuery = (core_field_name) => {
    let query = `SELECT ` + core_field_name + ` FROM locations_core_master_data
                   WHERE ` + core_field_name + ` != ''
                   GROUP BY ` + core_field_name;
    return query;
}

const generateCustomFieldFilterQuery = () => {
    let query  = `SELECT lcmf.custom_master_field_id, lcmf.custom_field_name, lcmfd.field_data,  CASE WHEN lcmf.field_type != "date"  THEN "dropdown"  ELSE lcmf.field_type END as "field_type"
                      FROM locations_custom_master_fields AS lcmf
                      JOIN locations_custom_master_field_data as lcmfd
                      ON lcmfd.custom_master_field_id = lcmf.custom_master_field_id
                      WHERE lcmf.delete_status = 0
                      AND lcmf.status = 'active'
                      AND lcmf.include_as_filter = 1
                      AND (lcmf.core_field_name = '' OR lcmf.core_field_name IS NULL)
                      GROUP BY lcmf.custom_master_field_id,lcmfd.field_data
                      ORDER BY lcmfd.field_data`;
    return query;
}


const getFilters = async(role) => {
    const filterOption = await getFieldOptionFilters(role);
    return filterOption;
}

const getItems = async () => {
    
    const coreQuery = generateCoreFieldFilterQuery();    
    const list = await fetchDataFromDB(coreQuery , []);    
    const coreFieldFiltersArray = await getCoreFilterArray(list);
   
    const customQuery = generateCustomFieldFilterQuery();    
    const customList = await fetchDataFromDB(customQuery, []);
    let customFieldFilterArray = await getCustomFilterArray(customList);                
    let finalItemsArray = [...customFieldFilterArray , ...coreFieldFiltersArray];        
    return finalItemsArray;

}

const checkExistElement = (customFilterArray , custom_master_field_id) => {
    var flag = false;
    customFilterArray.forEach(element => {        
        if(parseInt(element.custom_field_id) == parseInt(custom_master_field_id)) {
            flag = true;
        }
    });
    return flag;
}

const getCustomFilterArray = async(list) => {
    
    var customFilterArray = [];
    try{
        for(var i = 0; i < list.length; i++){
            const element = list.item(i);    
            if( !checkExistElement( customFilterArray , element.custom_master_field_id) ){
                const item = {
                    filter_label : element.custom_field_name,
                    field_type : 'dropdown',
                    custom_field_id : element.custom_master_field_id,
                    options : [element.field_data]
                }                
                customFilterArray.push(item);       
            }else{
                
                customFilterArray.forEach( (subElement ,index) => {
                    if(subElement.custom_field_id == element.custom_master_field_id){                
                        customFilterArray[index].options = [...customFilterArray[index].options , element.field_data];
                    }
                });                
            }
        }            
        return customFilterArray;
    }catch(e){
        console.log(e)
    }
    return [];
    

}

const getCoreFilterArray = async(list) => {
    var coreFieldFiltersArray  = [];
    for(var i = 0; i < list.length; i++){
        const element = list.item(i);        
        try{
            const core_field_name = element.core_field_name;             
            var options = [];
            if(core_field_name != ''){
                options = await getOptions(core_field_name);
                coreFieldFiltersArray.push({
                    filter_label : element.custom_field_name,
                    field_type : 'dropdown',
                    custom_field_id : element.custom_master_field_id,
                    options : options
                });
            }                        
        }catch(e){   
            console.log("core filed error", e)         
        }        
    }
    return coreFieldFiltersArray;
}


const getOptions = async(core_field_name) => {
    const query = generateOptionQuery(core_field_name);
    const list = await fetchDataFromDB(query, []);
    const options = [];
    for(var i = 0; i < list.length; i++){
        const element = list.item(i); 
        if( element[core_field_name] != undefined && element[core_field_name].trim() != ''){
            options.push(element[core_field_name]);
        }
        
    }
    return options;
}

export default {
  find,
};
