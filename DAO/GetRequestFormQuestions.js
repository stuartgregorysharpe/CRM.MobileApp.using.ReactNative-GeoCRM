import { getApiRequest } from "../actions/api.action";
import { checkConnectivity } from "./helper";
import { baseURL, Strings } from "../constants";
import { getTokenData } from "../constants/Storage";
import { ExecuteQuery } from "../sqlite/DBHelper";
import UrlResource from "./UrlResource";

export function find( postData){
  
  return new Promise(function(resolve, reject) {

        checkConnectivity().then( async (isConnected) => {
            if(isConnected){
                getApiRequest(UrlResource.Form.FormQuestions, postData)
                .then(async res => {
                    resolve(res);
                })
                .catch(e => {
                    console.log("Error",e)
                    reject(e);
                });

            }else{
                
                var client_id = await getTokenData("client_id");
                var business_unit_id = await getTokenData("business_unit_id");

                var lists = await fetchDataFromDB(postData);
                var questionsLists = await getFormQuestions( lists,  client_id, business_unit_id , postData);                
                resolve({status: Strings.Success , questions: questionsLists });

            }
        }).catch(e => {
            reject(e);
        });
  });
}

const fetchDataFromDB = async(postData) => {
    const query = generateQuery();    
    const res = await ExecuteQuery(query, [postData.form_id]);
    return res.rows ? res.rows : [];    
}

const fetchFieldDetailsFromDB = async(client_id, business_unit_id , question_tag) => {
    const query = generateFieldDataQuery();    
    const res = await ExecuteQuery(query, [client_id, business_unit_id, question_tag]);
    return res.rows ? res.rows : [];    
}

const fetchPrimaryDeviceFromDB = async(location_id) => {
    const query = generatePrimaryDeviceQuery();
    const res = await ExecuteQuery(query, [location_id]);
    return res.rows ? res.rows : [];
}

const fetchFieldValueFromCustomDB = async(custom_master_field_id, location_id) => {
    const query = generateFieldValueQuery();    
    const res = await ExecuteQuery(query, [custom_master_field_id, location_id]);
    return res.rows ? res.rows : [];    
}

const fetchFieldValueFromCoreDB = async(location_id) => {
    const query = generateFieldValueCoreQuery();
    const res = await ExecuteQuery(query, [location_id]);
    return res.rows ? res.rows : [];    
}


const fetchOptionsFromDB = async(form_question_id) => {
    const query = generateOptionQuery();        
    const res = await ExecuteQuery( query , [ form_question_id ]);
    return res.rows ? res.rows : [];
}

const fetchProductsFromDB = async(business_unit_id, client_id) => {
    const query = generateProductQuery();
    const res = await ExecuteQuery( query , [ business_unit_id, client_id ]);
    return res.rows ? res.rows : [];
}


const generateQuery = () => {

    var query = `SELECT ` +
                    `fq.form_question_id, ` +
                    `fq.client_id, ` +
                    `fqg.question_group, ` +
                    `fq.question_group_id, ` +
                    `fq.question_type, ` +
					`fq.question_text, ` +
					`fq.guide_info_title, ` +
					`fq.guide_info_image, ` +
					`fq.guide_info_text, ` +
					`NULL as value, ` +
					`fq.rule_characters, ` +
					`fq.rule_editable, ` +
					`fq.rule_compulsory, ` +
					`fq.add_prefix, ` +
					`fq.add_suffix, ` +
					`fq.preset_field, ` +
					`fq.optimize_image, ` +
					`fq.include_image, ` +
					`fq.segmentation_retailer, ` +
					`fq.segmentation_region, ` +
					`fq.segmentation_segment, ` +
					`fq.segmentation_placement_segment, ` +
					`fq.segmentation_category, ` +
					`fq.segmentation_product_group, ` +
					`fq.trigger_question_id, ` +
					`fq.trigger_question_answer, ` +
					`fq.trigger_question_condition, ` +
					`fqq.question_type as 'trigger_question_type', ` +
					`fq.question_tag ` +
				`FROM form_questions as fq ` +
				`LEFT JOIN form_question_groups as fqg ` +
				`ON fqg.question_group_id = fq.question_group_id ` +
				`LEFT JOIN form_questions as fqq ` +
				`ON fq.trigger_question_id = fqq.form_question_id AND fqq.delete_status = 0 ` +
				`WHERE ` +
					`fq.form_id = ? ` +
				`AND fq.delete_status = 0 ` +
				`AND fq.status = 'active' ` +
				`ORDER BY fq.field_order `;   
    return query;
}

const generateFieldDataQuery = () => {
    var query  = `SELECT ` + 
                      `custom_master_field_id, ` + 
                      `core_field_name, ` + 
                      `field_tag, ` + 
                      `field_type ` + 
                    `FROM locations_custom_master_fields ` + 
                    `WHERE ` + 
                      `client_id = ? ` + 
                    `AND business_unit_id = ? ` + 
                    `AND delete_status = 0 ` + 
                    `AND status = 'active' ` + 
                    `AND field_tag = ? ` + 
                    ` LIMIT 1 `;
    return query;
}

const generateFieldValueQuery = () => {    
    var query = `SELECT field_data FROM locations_custom_master_field_data WHERE custom_master_field_id = ? AND location_id = ? LIMIT 1`;
    return query;
}

const generateFieldValueCoreQuery = () => {
    var query  =  `SELECT * FROM locations_core_master_data WHERE location_id = ? LIMIT 1`;
    return query;
}

const generateOptionQuery = () => {
    var query = `SELECT  preset_data FROM form_question_presets WHERE form_question_id = ? AND delete_status = 0`;
    return query;
}

const generateProductQuery = () => {
    var query  = `SELECT pcmd.product_id, pcmd.product_name, pt.product_type, pcmd.brand, pcmd.barcode, pcmd.sku_code ` + 
                          `FROM products_core_master_data as pcmd ` + 
                          `LEFT JOIN product_type as pt ` + 
                          `ON pt.product_type_id = pcmd.product_type_id ` + 
                          `WHERE ` + 
                            `pcmd.business_unit_id = ? ` + 
                          `AND ` + 
                            `pcmd.client_id = ? ` + 
                          `AND  ` + 
                            `pcmd.delete_status = 0 `;
    return query;
}

const generatePrimaryDeviceQuery = () => {
    var query  = `SELECT device_msisdn  FROM location_devices WHERE primary_device = 1 AND location_id = ?`;    
    return query;
}


const getFormQuestions = async(lists , client_id, business_unit_id , postData ) => {

    var tmp = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        const question_tag = element.question_tag;
        var fieldData = '';

        if(postData.location_id != undefined){
            if( question_tag != undefined && question_tag != ""){        
                if(question_tag === "msisdn"){
                    var primaryDeivce = await fetchPrimaryDeviceFromDB(postData.location_id);
                    fieldData = await getPrimaryDeviceData( primaryDeivce );                    
                }else{
                    console.log(question_tag , client_id , business_unit_id);
                    var fieldDataLists = await fetchFieldDetailsFromDB(client_id, business_unit_id, question_tag);                    
                    fieldData = await getFieldData(fieldDataLists , postData);
                    console.log("field value => " , fieldData);

                }                
            }
        }
        
        // Guide Info
        var guideInfoData = [];
        if(element.guide_info_title != '' || element.guide_info_image != null || element.guide_info_text ){
            var guideImagePath = ''
            if(element.guide_info_image != ''){
                guideImagePath = baseURL +  `/common/assets/guide_info_images/` + element.guide_info_image;
            }
            guideInfoData["title"] = element.guide_info_title;
            guideInfoData["image"] = guideImagePath;
            guideInfoData["text"]  = element.guide_info_text;
        }
        // Get Options        
        var optionLists = await fetchOptionsFromDB(element.form_question_id);        
        var optionsData = getOptionData(optionLists);        

        // Trigger Data
        var trigger = [];
        if(element.trigger_question_type != ""){
            var triggerOptions = [];
            var triggerFieldType = '';
            var triggerAnswer = '';
            if(element.trigger_question_type == 'multiple' || element.trigger_question_type == 'multi_select'){
                triggerFieldType = "dropdown";
                triggerAnswer = element.trigger_question_answer.split(",");
            }else if(element.trigger_question_type == 'numbers'){
                triggerFieldType = "numbers";
                triggerAnswer = element.trigger_question_answer;
            }else{
                triggerFieldType = "text";
                triggerAnswer = element.trigger_question_answer;
            }
            trigger = {question_id: element.trigger_question_id , type: triggerFieldType , condition: element.trigger_question_condition, answer:  triggerAnswer };            
        }

        var bodyRes = {
            form_question_id: element.form_question_id,
            question_group : element.question_group,
            question_group_id : element.question_group_id,
            question_type : element.question_type,
            question_text : element.question_text,
            guide_info : guideInfoData,
            rule_compulsory: element.rule_compulsory.toString(),
            trigger: trigger,         
            value: fieldData,
        };

        const questionType =  element.question_type;
        if(questionType == "yes_no" || questionType == "take_photo"){
            var include_image = [];
            if(element.include_image != "") {
                include_image = element.include_image.split(',');
            }
            var optimize = element.optimize_image;
            tmp.push(
                {
                    ...bodyRes,
                    include_image: include_image,
                    optimize: "",                    
                    rule_characters: element.rule_characters,
                    rule_editable: element.rule_editable.toString(),       
                    add_prefix: element.add_prefix,
                    add_suffix: element.add_suffix,
                    question_tag: element.question_tag,
                    options: optionsData                    

                }
            );       
        }else if(questionType == "email_pdf" ){
            tmp.push(
                { ...bodyRes }
            );
        }else if(questionType == "products" ){
            
            var productLists = await fetchProductsFromDB(business_unit_id, client_id);            
            var productsResults = getProductsData(productLists);  
            if(productsResults.length == 3){
                tmp.push({
                    ...bodyRes,
                    product_types: productsResults[1],
                    brands: productsResults[2],
                    products: productsResults[0]
                })
            }          
            
        }else if(questionType == "sku_select" || questionType == "sku_count" || questionType == "sku_shelf_share" || questionType == "product_issues" 
            || questionType == "format_price" || questionType == "brand_competitor_facings" || questionType == "fsu_campaign" 
            || questionType == "tiered_multiple_choice" || questionType == "returns" ){

        }else{
            tmp.push({
                ...bodyRes,
                include_image: [],
                optimize: "0",                
                rule_characters: element.rule_characters,
                rule_editable: element.rule_editable.toString(),
                add_prefix: element.add_prefix,
                add_suffix: element.add_suffix,
                question_tag: element.question_tag,
                options:  optionsData
            })
        }                 
    }
    return tmp;
}

const getPrimaryDeviceData = async(lists) => {
    var value = '';
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        value = element.device_msisdn;
    }
    return value;
}

const getFieldData = async(lists , postData)  => {
    var tmp = {};
    var value = '';
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        console.log("element => ", element)
        if(element.core_field_name != null && element.core_field_name != ""){ 
            var fieldValueCoreLists = await fetchFieldValueFromCoreDB(postData.location_id);
            value = getFieldValueCore(fieldValueCoreLists , element.field_type, element.core_field_name);            
        }else if(element.custom_master_field_id != null && element.custom_master_field_id != ""){            
            var fieldValueLists = await fetchFieldValueFromCustomDB(element.custom_master_field_id , postData.location_id);
            value = getFieldValue(fieldValueLists);
        }else{
            if( element.field_type == 'multiple' || element.field_type == 'multi_select' || element.field_type == 'dropdown'){
                value = element.core_field_name.split(",");
            }else if(element.field_type ==  'text' || element.field_type == 'numbers') {
                value = element.core_field_name;
            }
        }
    }    
    return value;
}

const getFieldValue = (lists) => {
    var value = '';
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);        
        if(element.field_type == "multiple" || element.field_type == "multi_select" || element.field_type == "dropdown"){
            value =  element.field_data.split(",");
        }
        if(element.field_type == "text" || element.field_type == "numbers"){
            value =  element.field_data;
        }
    }
    return value;
}

const getFieldValueCore = (lists , fieldType, keyValue) => {

    /*if( element.field_type == 'multiple' || element.field_type == 'multi_select' || element.field_type == 'dropdown'){
        value = element.core_field_name.split(",");
    }else if(element.field_type ==  'text' || element.field_type == 'numbers') {
        value = element.core_field_name;
    }*/

    var value = '';
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        console.log("DDD =>" , element)
        console.log("DDD =>" , element[keyValue])
        if(fieldType == "multiple" || fieldType == "multi_select" || fieldType == "dropdown"){
            value =  element[keyValue].split(",");
        }
        if(fieldType == "text" || fieldType == "numbers"){
            value =  element[keyValue];
        }
    }
    return value;
}

const getOptionData = (lists) => {
    var tmp = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        tmp.push(element.preset_data);
    }
    return tmp;
}

const getProductsData  = (lists) => {
    var productRes = [];
    var product_types =[];
    var brands = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);                

        if(!product_types.includes(element.product_type)) {
            product_types.push(element.product_type);
        }
         
        if(!brands.includes(element.brand)) {
            brands.push(element.brand);
        }
       
        productRes.push({
            product_id: element.product_id,
            lable: element.product_name,
            product_type: element.product_type,
            brand: element.brand,
            barcode: element.barcode,
            product_code: element.sku_code
        });
    }
    return [productRes, product_types, brands];
}

export default {
  find,
};
