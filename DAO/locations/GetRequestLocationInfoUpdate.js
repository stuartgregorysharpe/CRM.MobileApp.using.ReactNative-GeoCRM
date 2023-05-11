import { Strings } from "../../constants";
import { ExecuteQuery } from "../../sqlite/DBHelper";
import GetRequest from "../GetRequest";

export function find(postData){
  
  return new Promise(function(resolve, reject) {
    
        GetRequest.call("locations/location_info_update_fields_v2",  postData).then( async(res) => {

            if(res.status == Strings.Success && res.isConnected){
                resolve(res.data);            
            }else if(res.status == Strings.Success && !res.isConnected){
                
                const client_id = res.data.client_id;
                const business_unit_id = res.data.business_unit_id;
                const user_id = res.data.user_id;

                if(client_id && business_unit_id ){
                    var lists = await getLocationFieldsData(); 
                    const accuracy_distance_measure = await getAccuracyMeasure();
                    const coreFieldData = await getCoreFieldData(postData.location_id);
                    const custom_master_fields = await getCustomMasterFields(lists , coreFieldData);
                    resolve({ 
                        status: Strings.Success , 
                        custom_master_fields: custom_master_fields , 
                        accuracy_distance_measure : accuracy_distance_measure
                    }); 
                }else{
                    reject();
                }
            }
        }).catch((e) => {
            reject(e);
        });        
  });
}

const fetchDataFromDB = async(query , params = []) => {        
    const res = await ExecuteQuery(query, params );        
    return res.rows ? res.rows : [];    
}

const generateAccuracyMeasureQuery = () => {    
    const query = `SELECT accuracy_distance_measure FROM client_admin`;
    return query;
}

const getAccuracyMeasure = async () =>{
    const query = generateAccuracyMeasureQuery();
    const lists = await fetchDataFromDB(query , []);
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        return element.accuracy_distance_measure;
    }
    return 'm'
}

const generateCoreFieldDataQuery = () => {
    const query  = `SELECT
                  location_unit_type,
                  location_unit,
                  location_name,
                  street_address,
                  suburb,
                  city,
                  state,
                  country,
                  pincode
                 FROM locations_core_master_data
                 WHERE location_id = ?`;
    return query;
}

const generateLocationFieldsQuery = () => {
    const query = `SELECT
                    custom_master_field_id,
                    core_field_name,
                    custom_field_name,
                    field_type,
                    "" as "value",
                    rule_characters,
                    "1" as rule_editable,
                    add_prefix,
                    add_suffix,
                    rule_compulsory,
                    preset_field
                  FROM locations_custom_master_fields
                  WHERE delete_status = 0
                  AND status = 'active'
                  AND core_field_name IN ('location_unit','location_name',
                                          'street_address','suburb','city',
                                          'state','country','pincode')`;
    return query;
}

const generatePresetOptions1 = () => {
    var query = `SELECT unit FROM location_unit_field_options ORDER BY unit`;    
    return query;
}

const generatePresetOptions2 = () => {
    var query = `SELECT preset_data
                            FROM locations_field_presets
                            WHERE custom_master_field_id = field.custom_master_field_id
                            AND delete_status = 0
                            ORDER BY preset_data`;
    return query;
}

const getPresetOptions1 = async ()  => {
    const query = generatePresetOptions1();
    const lists = await fetchDataFromDB(query , []);
    var options = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        options.push(element.unit);
    }
    return options;
}

const getPresetOptions2 = async () => {
    const query = generatePresetOptions2();
    const lists = await fetchDataFromDB(query , []);
    var options = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        options.push(element.locations_field_presets);
    }
    return options;
}
 
const getLocationFieldsData = async () => {
    const query = generateLocationFieldsQuery();
    const lists = await fetchDataFromDB(query , []);
    return lists;
}

const getCoreFieldData = async(locationId) => {
    const query = generateCoreFieldDataQuery();
    const lists = await fetchDataFromDB(query , [locationId]);
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        return {
            location_unit_type : element.location_unit_type,
            location_unit : element.location_unit,
            location_name: element.location_name,
            street_address: element.street_address,
            suburb : element.suburb,
            city : element.city,
            state : element.state,
            country : element.country,
            pincode : element.pincode
        };     
    }
    return {};
}

const getCustomMasterFields = async(lists , coreFieldData) => {

    var customMasterFields  = [];
    for(var i = 0; i < lists.length; i++){
        var field = lists.item(i);
        var preset_options = '';

        if(field.core_field_name == "location_unit") {
            // Fetch location_unit preset options
            preset_options = await getPresetOptions1();            
        } else if (field.preset_field == 1) {
            preset_options = await getPresetOptions2();
        }
        
        var item = {
            custom_master_field_id : field.custom_master_field_id.toString(),
            field_type : field.field_type,
            core_field_name : field.core_field_name ,
            field_name : field.custom_field_name ,            
            rule_characters : field.rule_characters,
            rule_editable : field.rule_editable,
            rule_compulsory : field.rule_compulsory.toString(),
            add_prefix : field.add_prefix,
            add_suffix : field.add_suffix,
            preset_field : field.preset_field.toString(),
            preset_options : preset_options
        };

        if(field.core_field_name == 'location_unit') {
            item = {
                ...item,
                dropdown_value: coreFieldData.location_unit_type,
                value : coreFieldData.location_unit
            }                     
        } else {
            item = {
                ...item,
                value : coreFieldData[field.core_field_name]
            }
        }        
        customMasterFields.push(item);
    }
    return customMasterFields;
}

export default {
  find,
};
