import { getJsonData, getLocalData } from "../../../../constants/Storage";
import { GetRequestFormListsDAO, GetRequestLocationDevicesDAO, GetRequestLocationFieldsDAO } from "../../../../DAO";

export const checkCompulsoryForm = async ( isCheckin , locationId ) => {

    return new Promise( async function(resolve, reject) {    

        var param = {
            location_id: locationId,
        };
        if (isCheckin) {
            const checkin_type_id = await getLocalData('@checkin_type_id');
            const checkin_reason_id = await getLocalData('@checkin_reason_id');
            if (checkin_type_id && checkin_reason_id != '') {
                param.checkin_type_id = checkin_type_id;
            }
            if (checkin_reason_id && checkin_reason_id != '') {
                param.checkin_reason_id = checkin_reason_id;
            }
        }
        
        GetRequestFormListsDAO.find(param)
        .then( async res => {
                    
            var formLists = [...res.forms];
            const formIds = await getJsonData('@form_ids');
            var flag = false;

            formLists.forEach(element => {
            if (
                element.compulsory === '1' &&
                (formIds == null ||
                (formIds != null && !formIds.includes(element.form_id)))
            ) {
                flag = true;
            }
            });

            resolve(flag);

        })
        .catch(e => {
            reject(0);
            
        });
        
    });
    
};


export const checkCompulsoryDevice = async ( locationId ) => {

    return new Promise( async function(resolve, reject) {    

        let param = {
            location_id: locationId
        }; 

        GetRequestLocationDevicesDAO.find(param).then((res) => {            
            const deviceList = [...res.devices];
            var flag = false;
                        
            deviceList.forEach(element => {
                if(element.unattached_device == '0'){
                    if( 
                        element.additional_imei_required == '1' && element.additional_imei == null ||
                        element.additional_imei_required == '1' && element.additional_imei == '' ||
                        element.imei == null || 
                        element.imei == '' || 
                        element.msisdn == null || 
                        element.msisdn == '' || 
                        (element.msn_required == '1' && element.msn == null) || 
                        (element.msn_required == '1' && element.msn == '') ) {
                            flag = true;
                    }
                }                
            });
            resolve(flag);
        }).catch((e) => {
            resolve([]);
        })
        
    });

}


export const checkCompulsoryLocationFields = async ( locationId ) => {
    
    return new Promise( async function(resolve, reject) {    

        var params = {location_id: locationId};

        GetRequestLocationFieldsDAO.find(params).then((res) => {            
            var flag = false;
            const customMasterFields = [...res.custom_master_fields];
            customMasterFields.forEach(element => {
                if(element.rule_compulsory == '1' && ( element.value == '' || element.value == null) ){
                    flag = true;
                }
            });
            console.log("checkCompulsoryLocationFields" , flag)
            resolve(flag);
        }).catch((e) => {
            resolve(false);
        });

    });

}
