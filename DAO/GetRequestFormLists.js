import { baseURL, Strings } from "../constants";
import UrlResource from "./UrlResource";
import GetRequest from "./GetRequest";
import { ExecuteQuery } from "../sqlite/DBHelper";
import { getTokenData } from "../constants/Storage";

export function find(postData){
  
    return new Promise(function(resolve, reject) {
        
        GetRequest.call( UrlResource.Form.FormsList,  postData).then( async(res) => {

            if(res.status == Strings.Success && res.isConnected){
                resolve(res.data);            
            }else if(res.status == Strings.Success && !res.isConnected){
                
                const client_id = res.data.client_id;
                const business_unit_id = res.data.business_unit_id;
                const user_id = res.data.user_id;
                const user_type = await getTokenData("user_type");
                const role = await getTokenData("role");                
                let userTypeList = await fetchUserTypeIdFromDB(user_type);                
                var userTypeId = getUserTypeId(userTypeList);                
                
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

                    let data = getExcludeFormIds( assignmentsData , postData , locationCoreMasterData, customFieldsData , userTypeId, role , user_id);
                    let lists = await fetchDataFromDB(client_id, business_unit_id , postData, data.excludeFormIds, data.limitFormIds );
                    var isLocationId = hasLocationId(postData);
                    let response = await getData(lists );                    
                    resolve(response);

                }else{
                    reject();
                }  

            }else{
                reject(res.status);
            }

        }).catch((e) => {
            reject(e);
        });

    });  
}

const getExcludeFormIds = (assignmentsData , postData , locationCoreMasterData, customFieldsData , userTypeId, role , userId ) => {

    var excludeFormIds = [];
    var limitFormIds = [];              

    assignmentsData.forEach((element, index) => {                                                
        for(let key of Object.keys(element)){

            var formId = key;           
            limitFormIds.push(formId);

            for(let type of Object.keys(element[key])){
                
                var subElement = element[key][type];                                
                
                if(type == 'location_id'){
                    if(hasLocationId(postData) && !subElement.includes(hasLocationId(postData))){                   
                        excludeFormIds.push(formId);
                    }
                }

                if(type == 'region'){
                    if(locationCoreMasterData['region'] && !subElement.includes(locationCoreMasterData['region'])){                        
                        excludeFormIds.push(formId);
                    }
                }
                
                if(type == 'location_type'){
                    if(hasLocationType(postData) && !subElement.includes(hasLocationType(postData))){                        
                        excludeFormIds.push(formId);
                        // Need to check this part with @Clinton
                    }
                
                    if(locationCoreMasterData['location_type'] ){
                        const locationTypes = locationCoreMasterData['location_type'].split(",");
                        locationTypes.forEach((element) => {
                            if(!subElement.includes(element)){  
                                excludeFormIds.push(formId);
                            }                            
                        });                        
                    }
                }

                if(type == 'group'){
                    if(hasGroup(postData) && !subElement.includes(hasGroup(postData))){                    
                        excludeFormIds.push(formId);
                    }

                    if(locationCoreMasterData['group']){
                        const groups = locationCoreMasterData['group'].split(",");
                        groups.forEach((element) => {
                            if(!subElement.includes(element)){  
                                excludeFormIds.push(formId);
                            }   
                        });                        
                    }
                }

                if(type == 'group_split'){
                    	                        
                    if(hasGroupSplit(postData) && !subElement.includes(hasGroupSplit(postData))){                        
                        excludeFormIds.push(formId);
                    }

                    if(locationCoreMasterData['group_split']){
                        const groupSplits = locationCoreMasterData['group_split'].split(",");
                        groupSplits.forEach((element) => {
                            if(!subElement.includes(element)){                                
                                excludeFormIds.push(formId);
                            }   
                        });
                    }
                }
                
                // -------------  Added New Part  --------------- //
                if(type == 'location_status'){
                    if(locationCoreMasterData['location_status'] != '' && locationCoreMasterData['location_status'] != undefined){
                        const locationStatusSplits = locationCoreMasterData['location_status'].split(",");
                        locationStatusSplits.forEach((element) => {
                            
                            if(!subElement.includes(element)){
                                excludeFormIds.push(formId);
                            }   
                        });                       
                    }
                }

                if(type == 'custom_field' && hasLocationId(postData)){
                    for(let customFieldKey of Object.keys(subElement)){                        
                        if(!subElement[customFieldKey].includes(customFieldsData[customFieldKey])){                            
                            excludeFormIds.push(formId);
                        }
                    }
                }

                if(type == 'checkin_type'){
                    if(hasCheckinTypeId(postData) && !subElement.includes(hasCheckinTypeId(postData))){
                        excludeFormIds.push(formId);
                    }
                }

                if(type == 'checkin_reason'){
                    if(hasCheckinReasonId(postData) && !subElement.includes(hasCheckinReasonId(postData))){
                        excludeFormIds.push(formId);
                    }
                }

                if(type == 'role'){
                    if(!subElement.includes(role)){
                        excludeFormIds.push(formId);
                    }
                }

                if( type == 'user_type'){                    
                    if(!subElement.includes(userTypeId.toString())){                        
                        excludeFormIds.push(formId);
                    }
                }

                if( type == 'user'){                    
                    if(!subElement.includes(userId)){
                        excludeFormIds.push(formId);                        
                    }
                }

                if( type == 'valid_start_date') {
                    
                    const today = new Date().getTime();                          
                    if(subElement[0] && subElement[0] != undefined){
                        if(today < new Date(subElement[0]).getTime()) {
                            excludeFormIds.push(formId);
                        }
                    }
                    
                }

                if( type == 'valid_end_date') {
                    const today = new Date()                    
                    if(subElement[0] && subElement[0] != undefined){
                        if(today > new Date(subElement[0]).getTime()) {
                            excludeFormIds.push(formId);
                        }
                    }
                    
                }

                if(type == 'available_specific_days') {
                    var weekdays = [];
                    weekdays[0] = "Sunday";
                    weekdays[1] = "Monday";
                    weekdays[2] = "Tuesday";
                    weekdays[3] = "Wednesday";
                    weekdays[4] = "Thursday";
                    weekdays[5] = "Friday";
                    weekdays[6] = "Saturday";
                    
                    //Get today's day name (E.g. "Friday")
                    const today = new Date()
                    todayName= weekdays[ today.getDay() ]
                  
                    if(!subElement.includes(todayName)) {
                      excludeFormIds.push(formId);
                    }
                }
                                
            }                            
        }
    });
        
    console.log("excludeFormIds",excludeFormIds)
    return {excludeFormIds: excludeFormIds, limitFormIds :limitFormIds};
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

const fetchDataFromDB = async(client_id, business_unit_id , postData, excludeFormIds , limitFormIds ) => {    
    const query = generateListQuery(postData, excludeFormIds , limitFormIds)    
    const res = await ExecuteQuery(query, [client_id, business_unit_id]);    
    return res.rows ? res.rows : [];    
}

const fetchUserTypeIdFromDB = async( user_type ) => {
    const query = generateUserTypeId()
    const res = await ExecuteQuery(query, [user_type]);    
    return res.rows ? res.rows : [];    
}

const generateAssignemtnQuery = () => {
    
    var query = `SELECT fs.form_assignment_id, ` + 
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
                        `f.delete_status = 0 AND fs.delete_status = 0`;                        
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

const generateListQuery = (postData , excludeFormIds , limitFormIds) => {
    
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
        if(hasLocationId(postData)){
            query = query + ` AND f.form_id IN (` + limitFormIds.toString() + `)`;
        }

        query = query + ` ORDER BY f.form_name`;

    return query;          
}

const generateCountQuery = (form_id) => {
    var query = `SELECT count(form_question_id) as cnt  FROM form_questions WHERE delete_status = 0 AND status = 'active' AND form_id = `  + form_id;
    return query;
}

const generateUserTypeId = () => {
    var query  = `SELECT user_type_id FROM local_user_types WHERE project_id = 2 AND user_type = ?`;
    return query;
}

const getData = async(lists) => {
    var tmp = [];
    
    for(var i = 0; i < lists.length; i++){

        var element = lists.item(i);        
        var guideInfoPath = '';
        let guideInfoData = [];
        if(element.guide_info_image || element.guide_info_title || element.guide_info_text){
            guideInfoData = {};
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
                form_id: element.form_id.toString(),
                form_name : element.form_name,
                form_type: element.form_type,
                form_type_id: element.form_type_id.toString(),
                guide_info: guideInfoData,
                question_count: countRes && countRes.length > 0 ? countRes.item(0).cnt.toString() : "0",
                compulsory:  element.compulsory ? element.compulsory.toString() : '0',
                location_required: element.location_required.toString()
            }
        );            
    }
    return {forms:tmp , status:Strings.Success };

}

const getFormAssignmentsData = async(lists) => {
    var tmp = [];

    let values = {};
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);                        

        if(element.assignment_type === 'custom_field'){                        
            
            // const objKey = `[${element.form_id}][${element.assignment_type}][${element.custom_field_id}]`; 

            if (values[element.form_id]) {                
                if (values[element.form_id][element.assignment_type]) {
                    if(values[element.form_id][element.assignment_type][element.custom_field_id]){
                        values[element.form_id][element.assignment_type][element.custom_field_id] = [...values[element.form_id][element.assignment_type][element.custom_field_id], element.assignment_value];
                    }else{
                        values[element.form_id][element.assignment_type][element.custom_field_id] = [element.assignment_value];
                    }                    
                } else {
                    values[element.form_id][element.assignment_type] = {
                        [element.custom_field_id] : [element.assignment_value]
                    };
                }
            } else {
                values[element.form_id] = {
                    [element.assignment_type] : {
                        [element.custom_field_id] : [element.assignment_value]
                    }
                };                 
            }
            
            // var singleObj = {
            //     [element.form_id] : {
            //         [element.assignment_type] : {
            //             [element.custom_field_id] : element.assignment_value
            //         }
            //     }
            // };                        
            // tmp.push(singleObj);
        }else{
            // const objKey = `[${element.form_id}][${element.assignment_type}]`; 
            
            if (values[element.form_id]) {
                if (values[element.form_id][element.assignment_type]) {
                    values[element.form_id][element.assignment_type] = [...values[element.form_id][element.assignment_type], element.assignment_value];
                } else {
                    values[element.form_id][element.assignment_type] = [element.assignment_value];
                }
            } else {
                values[element.form_id] = {
                    [element.assignment_type] : [element.assignment_value]
                };   
                // var singleObj = {
                //     [element.form_id] : {
                //         [element.assignment_type] : element.assignment_value
                //     }
                // };
            }
            
            // {"13" : {
            //     "user" : ["107","101"]
            //     "data" : ["107","101"]
            // }}

            /*
            {form_id:13, ass_type: "user", ass_value:"107"}
            {form_id:13, ass_type: "user", ass_value:"101"}
            {form_id:1, ass_type: "data", ass_value:"101"}
             */

            // tmp.push(singleObj);       
        } 
    }
    /*
    {
        "13": {"user": [1, 2]},
        "14";
    }
    */
   const res_array = Object.keys(values).map(key => {
       return {
           [key]: values[key]
       };
   });
    return res_array;
}

const getLocationCoreMasterData = (lists) => {
    var tmp = {};
    for(var i = 0; i < lists.length; i++){
        var element = lists.item(i);        
        tmp = element;// {region: element.region, location_type: element.location_type , group: element.group, group_split: element.group_split};
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

const getUserTypeId = (lists) => {
    var userTypeId = '';
    for(var i = 0; i < lists.length; i++){        
        var element = lists.item(i);    
        userTypeId = element.user_type_id;
    }
    return userTypeId;
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
