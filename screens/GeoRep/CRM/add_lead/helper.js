import { getLocalData, getTokenData } from "../../../../constants/Storage";
import * as RNLocalize from 'react-native-localize';
import { getTimeStamp } from "../../../../helpers/formatHelpers";
import RNFS from 'react-native-fs';

export function getFormData() {
    return {        
        contact_name: '',
        contact_surname: '',
        contact_cell: '',
        contact_email: '',        
    };
}

export function getFormStructureData() {

    return [
        {
            key:1,
            field_type: 'text',
            field_name: 'contact_name',
            initial_value: '',
            editable: "1",
            is_required: true,
            field_label: 'Name',
            value: ''
        },
        {
            key:2,
            field_type: 'text',
            field_name: 'contact_surname',
            initial_value: '',
            editable: "1",
            is_required: true,
            field_label: 'Surname',
            value: ''
        },
        {
            key:3,
            field_type: 'text',
            field_name: 'contact_cell',
            initial_value: '',
            editable: "1",
            is_required: true,
            field_label: 'Mobile Number',
            value: ''
        },
        {
            key:4,
            field_type: 'text',
            field_name: 'contact_email',
            initial_value: '',
            editable: "1",
            is_required: true,
            field_label: 'Email',
            value: ''
        }
    ];
}

export function getAddLeadLocationName(leadForms , customMasterFields) {

    var item =  leadForms.find(item => item.core_field_name === 'location_name');
    if(item != undefined){
        return customMasterFields[item.custom_master_field_id];
    }
    return '';    
}

export function getAddLeadStreetAddress(leadForms , customMasterFields) {
    var item =  leadForms.find(item => item.core_field_name === 'street_address');
    if(item != undefined){
        return customMasterFields[item.custom_master_field_id];
    }
    return '';    
}



export async function getLeadFieldsPostJsonData ( isCurrentLocation, currentLocation , leadForms , customMasterFields , primaryData , selectedLists , simList , add_location_id) {

    try{        
        var lat = await getLocalData('@latitude');
        var lon = await getLocalData('@longitude');
  
        var time_zone = '';
        try {
          time_zone = RNLocalize.getTimeZone();
        } catch (e) {}
          
        var postDataJson = {          
            'add_location_id':add_location_id,
            'use_current_geo_location': isCurrentLocation,
            'user_local_data[time_zone]': time_zone,
            'user_local_data[latitude]': currentLocation.latitude != null
            ? currentLocation.latitude
            : lat != null
            ? lat
            : '0',
            'user_local_data[longitude]': currentLocation.longitude != null
            ? currentLocation.longitude
            : lon != null
            ? lon
            : '0',
            'coordinates[latitude]': currentLocation.latitude != null
            ? currentLocation.latitude
            : lat != null
            ? lat
            : '0',
            'coordinates[longitude]': currentLocation.longitude != null
            ? currentLocation.longitude
            : lon != null
            ? lon
            : '0',            
        }
        
        

        Object.keys(customMasterFields).forEach((key, index) => {
			if (key != undefined && key != '') {
				var check = leadForms.find(item => item.custom_master_field_id == key);
				if (check != null && check != undefined) {

					if(customMasterFields[key] != undefined && customMasterFields[key] != ''){

                        postDataJson = {
                            ...postDataJson,
                            [`custom_master_fields[${index}][custom_master_field_id]`] : key
                        };						

						if (check.field_type == 'multi_select') {
							customMasterFields[key].forEach((element , subIndex) => {
                                postDataJson = {
                                    ...postDataJson,
                                    [`custom_master_fields[${index}][value][${subIndex}]`] : element
                                };							
							});
						}else if (check.field_type == 'dropdown_text') {
							customMasterFields[key].forEach((element , subIndex) => {
                                postDataJson = {
                                    ...postDataJson,
                                    [`custom_master_fields[${index}][value][${subIndex}][option]`] : element.option,
                                    [`custom_master_fields[${index}][value][${subIndex}][input]`] : element.input
                                };								
							});
						}else if (check.field_type == 'dropdown_input') {

                            postDataJson = {
                                ...postDataJson,
                                [`custom_master_fields[${index}][dropdown_value]`] : customMasterFields[key].value,
                                [`custom_master_fields[${index}][value]`] : customMasterFields[key].secondValue
                            };
							
						} else {

                            postDataJson = {
                                ...postDataJson,
                                [`custom_master_fields[${index}][value]`] : customMasterFields[key]
                            };

						}

					}          
				}
			}
		});


        Object.keys(primaryData).forEach((key, index) => {
			if (key != undefined && key != '') {
                postDataJson = {
                    ...postDataJson,
                    [`contact[${key}]`] : primaryData[key]
                };				
			}
		});
                
        if(selectedLists != undefined && selectedLists instanceof Array && selectedLists.length > 0){  
            postDataJson = await getJsonWithFile(postDataJson , selectedLists);            
        }

        if(simList != undefined && simList instanceof Array && simList.length > 0){  
            postDataJson = await getJsonWithUnattachedDevices(postDataJson , simList);                    
        }

        return postDataJson;
        
                                
    }catch(e) {
      console.log("json err" , e)
    }


}

async function getJsonWithFile ( json, selectedLists) {
      
    var postDataJson = {...json};
    if(selectedLists != undefined && selectedLists instanceof Array && selectedLists.length > 0){
        for( var index = 0; index < selectedLists.length ; index++){            
            var item =  selectedLists[index];
            var res = await RNFS.exists(item.signature);
            console.log("with" , res)
            if (res) {
                postDataJson = {
                    ...postDataJson,
                    [`allocated_devices[${index}][stock_item_id]`] : item.stock_item_id,
                    [`allocated_devices[${index}][assigned_msisdn]`] : item.msisdn,
                    [`allocated_devices[${index}][received_by]`] : item.received,
                    [`allocated_devices[${index}][primary_device]`] : item.primary_device,
                    [`allocated_devices_signature[${item.stock_item_id}]`] : {uri: item.signature, type: 'image/png', name: 'sign.png'}
                };	
            }
        }
    }
    return postDataJson;    
}



async function getJsonWithUnattachedDevices ( json, simLists) {
      
    var postDataJson = {...json};
    console.log("simLists",simLists)
    if(simLists != undefined && simLists instanceof Array && simLists.length > 0){
        for( var index = 0; index < simLists.length ; index++){            
            var item =  simLists[index];
            postDataJson = {
                ...postDataJson,
                [`unattached_devices[${index}][assigned_msisdn]`] : item                
            };	
        }
    }
    return postDataJson;    
}

