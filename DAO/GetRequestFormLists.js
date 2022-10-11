import { baseURL, Strings } from "../constants";
import UrlResource from "./UrlResource";
import GetRequest from "./GetRequest";
import { ExecuteQuery } from "../sqlite/DBHelper";

export function find(postData){
  
    return new Promise(function(resolve, reject) {
        
        GetRequest.call( UrlResource.Form.FormsList,  postData).then( async(res) => {

            if(res.status == Strings.Success && res.isConnected){
                resolve(res.data);            
            }else if(res.status == Strings.Success && !res.isConnected){
                
                const client_id = res.data.client_id;
                const business_unit_id = res.data.business_unit_id;                
                if(client_id && business_unit_id){

                    let assignmentLists = await fetchAssignmentDataFromDB(client_id, business_unit_id);                    
                    let assignmentsData = await getFormAssignmentsData(assignmentLists);                              
                    var locationCoreMasterData = {};
                    var customFieldsData = {};
                    
                    if(hasLocationId(postData)){
                        var coreQuery = generateCoreFieldDataQuery(hasLocationId(postData));
                        var customQuery = generateCustomFieldDataQuery(hasLocationId(postData));
                                            
                        let coreData = await fetchData(coreQuery);
                        let customData = await fetchData(customQuery);                        

                        locationCoreMasterData = getLocationCoreMasterData(coreData);
                        customFieldsData = getCustomFieldData(customData);

                    }                

                    let excludeIds = getExcludeFormIds( assignmentsData , postData , locationCoreMasterData, customFieldsData);
                    let lists = await fetchDataFromDB(client_id, business_unit_id , postData, excludeIds );
                    let response = await getData(lists);                    
                    resolve(response);

                }else{
                    reject();
                }

            }

        }).catch((e) => {
            reject(e);
        });

    });  
}

const getExcludeFormIds = (assignmentsData , postData , locationCoreMasterData, customFieldsData ) => {

    var excludeFormIds = [];
    assignmentsData.forEach((element, index) => {                                                
        for(let key of Object.keys(element)){
            var formId = key;                            
            for(let subKey of Object.keys(element[key])){
                var subElement = element[key][subKey];

                if(subKey == 'location_id'){
                    if(hasLocationId(postData) && !subElement.includes(hasLocationId(postData))){                   
                        excludeFormIds.push(formId);
                    }
                }

                if(subKey == 'region'){
                    if(locationCoreMasterData['region'] && !subElement.includes(locationCoreMasterData['region'])){                        
                        excludeFormIds.push(formId);
                    }
                }

                if(subKey == 'location_type'){
                    if(hasLocationType(postData) && !subElement.includes(hasLocationType(postData))){                        
                        excludeFormIds.push(formId);
                    }
                    
                    if(locationCoreMasterData['location_type'] ){
                        const locationTypes = subElement.split(",");
                        locationTypes.forEach((element) => {
                            if(!element.includes(locationCoreMasterData['location_type'])){                                
                                excludeFormIds.push(formId);
                            }                            
                        });                        
                    }
                }

                if(subKey == 'group'){
                    if(hasGroup(postData) && !subElement.includes(hasGroup(postData))){                    
                        excludeFormIds.push(formId);
                    }

                    if(locationCoreMasterData['group'] && !subElement.includes(locationCoreMasterData['group'])){
                        const groups = subElement.split(",");
                        groups.forEach((element) => {
                            if(!element.includes(locationCoreMasterData['group'])){                                
                                excludeFormIds.push(formId);
                            }   
                        });                        
                    }
                }

                if(subKey == 'group_split'){
                    	                        
                    if(hasGroupSplit(postData) && !subElement.includes(hasGroupSplit(postData))){                        
                        excludeFormIds.push(formId);
                    }

                    if(locationCoreMasterData['group_split'] && !subElement.includes(locationCoreMasterData['group_split'])){
                        const groupSplits = subElement.split(",");
                        groupSplits.forEach((element) => {
                            if(!element.includes(locationCoreMasterData['group_split'])){                                
                                excludeFormIds.push(formId);
                            }   
                        });
                    }
                }
                
                if(subKey == 'custom_field' && hasLocationId(postData)){
                    for(let customFieldKey of Object.keys(subElement)){                        
                        if(!subElement[customFieldKey].includes(customFieldsData[customFieldKey])){                            
                            excludeFormIds.push(formId);
                        }
                    }
                }

                if(subKey == 'checkin_type'){
                    if(hasCheckinTypeId(postData) && !subElement.includes(hasCheckinTypeId(postData))){
                        excludeFormIds.push(formId);
                    }
                }

                if(subKey == 'checkin_reason'){
                    if(hasCheckinReasonId(postData) && !subElement.includes(hasCheckinReasonId(postData))){
                        excludeFormIds.push(formId);
                    }
                }
                                
            }                            
        }
    });
        
    return excludeFormIds;
}


const fetchAssignmentDataFromDB = async(client_id, business_unit_id) => {
    const query = generateAssignemtnQuery();
    const res = await ExecuteQuery(query, [client_id, business_unit_id]);
    return res.rows ? res.rows : [];    
}

const fetchData = async(query) => {    
    const res = await ExecuteQuery(query, []);
    return res.rows ? res.rows : [];    
}

const fetchDataFromDB = async(client_id, business_unit_id , postData, excludeFormIds ) => {
    const query = generateListQuery(postData, excludeFormIds)
    const res = await ExecuteQuery(query, [client_id, business_unit_id]);
    return res.rows ? res.rows : [];    
}

const generateAssignemtnQuery = () => {
    
    var query = `SELECT ` + 
                        `fs.form_id, ` + 
                        `fs.assignment_type, ` + 
                        `fs.custom_field_id, ` + 
                        `fs.assignment_value ` + 
                      `FROM ` + 
                        `form_assignments as fs ` + 
                      `LEFT JOIN forms as f ` + 
                      `ON fs.form_id = f.form_id ` + 
                      `WHERE ` + 
                        `f.client_id = ? ` + 
                      `AND ` + 
                        `f.business_unit_id = ? ` + 
                      `AND ` + 
                        `f.delete_status = 0 `;                        
    return query;
}

const generateCoreFieldDataQuery = (location_id) => {
    var query  = `SELECT * FROM locations_core_master_data WHERE location_id = ` + location_id ;
    return query;
}

const generateCustomFieldDataQuery = (location_id) => {
    var query  = `SELECT custom_master_field_id,  field_data  FROM locations_custom_master_field_data WHERE location_id = ` + location_id;
    return query;
}

const generateListQuery = (postData , excludeFormIds) => {
    
    var query  = `SELECT ` + 
          `f.form_id, ` + 
          `f.form_name, ` + 
          `ft.form_type, ` + 
          `f.form_type_id, ` + 
          `f.guide_info_title, ` + 
          `f.guide_info_image, ` + 
          `f.guide_info_text, ` + 
          `f.compulsory, ` + 
          `f.location_required ` +
        `FROM forms as f ` +
        `LEFT JOIN form_types as ft ` +
        `ON ft.form_type_id = f.form_type_id ` +
        `WHERE ` + 
            `f.client_id = ? ` + 
        `AND ` + 
            `f.business_unit_id = ? ` +           
        `AND ` + 
          `f.delete_status = 0 ` + 
        `AND  ` + 
          `f.status = 'active' `;
        
          if(hasHomeTypeId(postData)){
              query = query + ` AND ft.form_type_id = ` + hasHomeTypeId(postData);
          }
          
          if(hasAddLead(postData) && hasAddLead(postData) == 1){
            query = query + ` AND f.include_add_lead = 1`;
          }

          if(excludeFormIds.length > 0){
            query = query + ` AND f.form_id NOT IN (` + excludeFormIds.toString() + `)`;
          }

    return query;          
}

const generateCountQuery = (form_id) => {
    var query = `SELECT count(form_question_id) as cnt  FROM form_questions WHERE delete_status = 0 AND status = 'active' AND form_id = `  + form_id;
    return query;
}

const getData = async(lists) => {
    var tmp = [];
    
    for(var i = 0; i < lists.length; i++){

        var element = lists.item(i);
        var guideInfoPath = '';
        var guideInfoData = {};
        if(element.guide_info_image || element.guide_info_title || element.guide_info_text){
            if(element.guide_info_image){
                guideInfoPath = baseURL + "/guide_info_images/" + element.guide_info_image
            }            
            guideInfoData['title'] = element.guide_info_title;
            guideInfoData['image'] = guideInfoPath
            guideInfoData['text']  = element.guide_info_text
        }

        var query = generateCountQuery(element.form_id);
        var countRes = await fetchData(query);

        tmp.push(
            {
                form_id: element.form_id,
                form_name : element.form_name,
                form_type: element.form_type,
                form_type_id: element.form_type_id,
                guide_info: guideInfoData,
                question_count: countRes && countRes.length > 0 ? countRes.item(0).cnt : 0,
                compulsory: element.compulsory,
                location_required: element.location_required
            }
        );            
    }
    return {forms:tmp , status:Strings.Success };

}

const getFormAssignmentsData = async(lists) => {
    var tmp = [];
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        
        if(element.assignment_type === 'custom_field'){                        
            
            const objKey = `[${element.form_id}][${element.assignment_type}][${element.custom_field_id}]`; 
            
            var singleObj = {
                [element.form_id] : {
                    [element.assignment_type] : {
                        [element.custom_field_id] : element.assignment_value
                    }
                }
            };                        
            tmp.push(singleObj);
        }else{
            const objKey = `[${element.form_id}][${element.assignment_type}]`; 
            var singleObj = {
                [element.form_id] : {
                    [element.assignment_type] : element.assignment_value
                }
            };                       
            tmp.push(singleObj);       
        }     
    }
    return tmp;
}

const getLocationCoreMasterData = (lists) => {
    var tmp = {};
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);        
        tmp = {region: element.region, location_type: element.location_type , group: element.group, group_split: element.group_split};
        break;
    }
    return tmp;
}

const getCustomFieldData = (lists) => {
    var tmp = {};
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);
        tmp = {[element.custom_master_field_id]: element.field_data};
    }
    return tmp;
}     

const hasLocationId = (postData) => {
    var check = postData.location_id && postData.location_id != undefined ? true : false;
    if(check){
        return postData.location_id;
    }else{
        return false;
    }    
}

const hasLocationType = (postData) => {
    var check = postData.location_type && postData.location_type != undefined ? true : false;
    if(check){
        return postData.location_type;
    }else{
        return false;
    }    
}

const hasGroup = (postData) => {
    var check = postData.group && postData.group != undefined ? true : false;
    if(check){
        return postData.group;
    }else{
        return false;
    }    
}


const hasGroupSplit = (postData) => {
    var check = postData.group_split && postData.group_split != undefined ? true : false;
    if(check){
        return postData.group_split;
    }else{
        return false;
    }    
}

const hasCheckinTypeId = (postData) => {
    var check = postData.checkin_type_id && postData.checkin_type_id != undefined ? true : false;
    if(check){
        return postData.checkin_type_id;
    }else{
        return false;
    }    
}

const hasCheckinReasonId = (postData) => {
    var check = postData.checkin_reason_id && postData.checkin_reason_id != undefined ? true : false;
    if(check){
        return postData.checkin_reason_id;
    }else{
        return false;
    }
}

const hasHomeTypeId = (postData) => {
    var check = postData.form_type_id && postData.form_type_id != undefined ? true : false;
    if(check){
        return postData.form_type_id;
    }else{
        return false;
    }
}


const hasAddLead = (postData) => {
    var check = postData.add_lead && postData.add_lead != undefined ? true : false;
    if(check){
        return postData.add_lead;
    }else{
        return false;
    }    
}


export default {
  find,
};
