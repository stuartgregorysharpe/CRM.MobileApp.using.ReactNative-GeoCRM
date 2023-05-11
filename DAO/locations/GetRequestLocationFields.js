import { Strings } from "../../constants";
import { ExecuteQuery } from "../../sqlite/DBHelper";
import GetRequest from "../GetRequest";

export function find(postData){
  
  return new Promise(function(resolve, reject) {
    
        GetRequest.call("locations/location-fields",  postData).then( async(res) => {

            if(res.status == Strings.Success && res.isConnected){
                resolve(res.data);
            }else if(res.status == Strings.Success && !res.isConnected){
                
                const client_id = res.data.client_id;
                const business_unit_id = res.data.business_unit_id;
                const user_id = res.data.user_id;

                if(client_id && business_unit_id ){
                    const query = generateQuery();
                    var lists = await fetchDataFromDB(query);
                    resolve({status: Strings.Success , custom_master_fields: await getCustomMasterFields(lists , postData.location_id)});                                                       
                }else{
                    reject();
                }
            }
        }).catch((e) => {
            reject(e);
        });        
  });
}

const fetchDataFromDB = async(query , params = [] ) => {    
    //const query = generateQuery();
    const res = await ExecuteQuery(query,  params);        
    return res.rows ? res.rows : [];    
}

const generateQuery = () => {
    const query = `SELECT
                    *
                 FROM locations_custom_master_fields
                 WHERE delete_status = 0
                 AND status = 'active'`;
    return query;
}

const generateLocationUnitPresetOptionsQuery = () => {
    const preset_results = `SELECT 
                            unit
                            FROM location_unit_field_options
                            ORDER BY unit`;
    return preset_results;
}

const getLocationUnitPresetOptions = async () => {
    const query = generateLocationUnitPresetOptionsQuery();
    const lists = await fetchDataFromDB(query);    
    var options  = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        try{
            options.push(element.unit);
        }catch(e){
            console.log("location field preset option error =>" , e.toString());
        }
    }    
    return options;
}

const getPresetOptionsQuery = () => {
    const query  = `SELECT
                    preset_data
                    FROM locations_field_presets
                    WHERE custom_master_field_id = ?
                    AND delete_status = 0
                    ORDER BY preset_data`;
    return query;
}

const getPresetOptions = async(field) => {
    const query = getPresetOptionsQuery();
    const lists = await fetchDataFromDB(query , [field.custom_master_field_id]);    
    var options  = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        try{
            options.push(element.preset_data);
        }catch(e){
            console.log("preset option error =>" , e.toString());
        }
    }    
    return options;
}

const getTriggerQuestionQuery = () => {
    const query  = `SELECT
                                *
                            FROM locations_custom_master_fields
                            WHERE custom_master_field_id = ?`;
    return query;
}
const getTriggerQuestionData = async(field) => {
    const query = getTriggerQuestionQuery();
    const lists = await fetchDataFromDB(query , [field.trigger_field_id]);    
    var triggerFieldData = [];
    var options = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        var type = 'text';
        if(element.field_type == 'numbers'){
            type = 'numbers';
        }
        if( element.field_type == 'dropdown' || 
            element.field_type == 'mutliple' || 
            element.field_type == 'multi_select'){
            type = 'dropdown';
            options = element.trigger_field_answer.split(',');
        }
        triggerFieldData = {
            trigger_field_id: field.trigger_field_id.toString() , 
            type : type  , 
            trigger_condition : field.trigger_field_condition , 
            answer: field.trigger_field_answer
        };
    }    
    return triggerFieldData;
}

const getDropDownValues = async (locationId) => {    
    const dataValueDropdown = `SELECT
                            location_unit_type
                            FROM locations_core_master_data
                            WHERE location_id = ?`
    const lists = await fetchDataFromDB(dataValueDropdown , [locationId]);
    var dropdown = '';
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        dropdown = element.location_unit_type;
    }
    return dropdown;
}

const getDataValue = async ( locationId ) => {
    const query = `SELECT
                location_unit
                FROM locations_core_master_data
                WHERE location_id = ?`;
    const lists = await fetchDataFromDB(query , [locationId]);
    var datavalue = '';
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        datavalue = element.location_unit;
    }
    return datavalue;
}

const getDataValueCore = async ( field,  locationId ) => {
    const query = `SELECT `
        + field + 
        ` FROM locations_core_master_data
        WHERE location_id = ?`    
    const lists = await fetchDataFromDB(query , [locationId]);        
    var datavalue = '';
    for(var i = 0; i < lists.length; i++){
        try{
            var element = lists.item(i);            
            if(field.includes('[group]')){
                datavalue = element.group;
            }else{
                datavalue = element[field];
            }
            
        }catch(e){
            console.log("getDataValueCore error ", element, e.toString());
        }        
    }
    return datavalue != undefined ? datavalue : '';
}

const getDataValueCoreEmpty = async ( field,  locationId ) => {
    const query  = `SELECT
                    field_data
                FROM locations_custom_master_field_data
                WHERE custom_master_field_id = ?
                AND location_id = ?
                AND delete_status = 0`;      
    const lists = await fetchDataFromDB(query , [ field.custom_master_field_id  , locationId]);    
    var datavalue = '';
    for(var i = 0; i < lists.length; i++){
        try{
            var element = lists.item(i);
            datavalue = element.field_data;
        }catch(e){
            console.log("getDataValueCoreEmpty error ", element, e.toString());
        }        
    }
    return datavalue;
}

const getDropdownTextPresetOptions = async(field) => {
    const query = `SELECT
                    preset_data
                    FROM locations_dropdown_input_presets
                    WHERE custom_master_field_id = ?
                    AND delete_status = 0`;
    const lists = await fetchDataFromDB(query , [field.custom_master_field_id]);    
    const preset_options = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        preset_options.push(element.preset_data);
    }
    return preset_options;
}

const getDropdownTextDataValue = async(field , locationId) => {
    const query  = `SELECT
                                        dropdown_option,
                                        input_text
                                        FROM location_dropdown_text_data
                                        WHERE custom_master_field_id = ?
                                        AND delete_status = 0
                                        AND location_id = ?
                                        ORDER BY dropdown_option`;
    const lists = await fetchDataFromDB(query , [ field.custom_master_field_id , locationId]);    
    var dataValue = [];    
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);        
        dataValue.push({option : element.dropdown_option , input: element.input_text});    
    }
    return dataValue;    
}

const getCustomMasterFields = async(lists , locationId) => {
      
    var finalResultSetData  = [];
    for(var i = 0; i < lists.length; i++){
        var field = lists.item(i);
        
        var preset_options = '';
        var triggerFieldData = [];
        var options = [];
        var dataValueDropdown = "";
        var dataValue = '';

        // Check if field is location_unit
        if(field.core_field_name == "location_unit") {
            // Fetch location_unit preset options
            preset_options =  await getLocationUnitPresetOptions();                        
        } else if (field.preset_field == 1) {
            preset_options = await getPresetOptions(field);
        }

        // Check if field has triggers configured
        if(field.trigger_field_id != 0) {                                    
            triggerFieldData = await getTriggerQuestionData(field);            
        }

        // Fetch data for core fields from locations_core_master_data
        if( field?.core_field_name != undefined && field?.core_field_name != '' ) {            
            if(field.core_field_name == 'location_unit') {
                dataValueDropdown = await getDropDownValues(locationId);                
                dataValue = await getDataValue(locationId);

            } else {
                const field_name = field.core_field_name;                
                dataValue = await getDataValueCore(field_name == 'group' ? `[group]` : field_name, locationId);
            }
        }

        // Fetch non core fields data from locations_custom_master_field_data
        if( field?.core_field_name === undefined || field.core_field_name === '') {
            dataValue = await getDataValueCoreEmpty( field,  locationId);
        }
        
        // Fetch preset options for dropdown_text field
        if(field.field_type == 'dropdown_text') {
            preset_options = await getDropdownTextPresetOptions(field);
            dataValue =  await getDropdownTextDataValue(field , locationId);                                                                                                                        
        }
        
        if(field.field_type == 'multi_select') {     
            if(dataValue != undefined && dataValue != '' &&   dataValue != 'undefined' ) {
                dataValue = dataValue.split(',')
            }
        }

        // Create different body structure for location_unit field
        var finalFieldData = {
            custom_master_field_id: field.custom_master_field_id.toString(),
            field_type : field.field_type,
            field_name : field.custom_field_name,
            core_field_name :  field.core_field_name,            
            value : dataValue ,
            rule_characters : field.rule_characters ,
            rule_editable : field.rule_editable.toString(),
            rule_compulsory : field.rule_compulsory.toString() ,
            add_prefix : field.add_prefix ,
            add_suffix : field.add_suffix,
            preset_field : field.preset_field.toString(),
            preset_options : preset_options
        };

        if(field.core_field_name == 'location_unit') {
            finalFieldData = {
                ...finalFieldData,
                dropdown_value : dataValueDropdown
            }            
        }
        
        if( triggerFieldData != undefined ) {
            finalFieldData = {
                ...finalFieldData,
                trigger : triggerFieldData
            }            
        }
        
        if(field.field_type == 'dropdown_text') {
            finalFieldData = {
                ...finalFieldData,
                input_label : field.dropdown_input_label
            }               
        }
        
        finalResultSetData.push(finalFieldData);
    }
    return finalResultSetData;
}

export default {
  find,
};
