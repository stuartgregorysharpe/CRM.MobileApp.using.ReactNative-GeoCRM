import { ExecuteQuery } from "../../sqlite/DBHelper";



export const getRoleFieldFilters = async (role) => {
  
    let query  = `SELECT
                    lcfrf.custom_field_id,
                    lcfrf.value,
                    lcmf.core_field_name
                  FROM location_custom_field_role_filtering as lcfrf
                  LEFT JOIN locations_custom_master_fields as lcmf
                  ON lcfrf.custom_field_id = lcmf.custom_master_field_id
                  WHERE lcfrf.delete_status = 0
                  AND lcfrf.role = ?`;    
                  
    const res = await ExecuteQuery(query, [role]);
    var lists = res.rows ? res.rows : [];  
    var fieldFilters = {};  
    for (var i = 0; i < lists.length; i++) {    
      const subElement = lists.item(i);    
      if(fieldFilters[subElement.core_field_name] != undefined){
        fieldFilters = {
          ...fieldFilters,
          [subElement.core_field_name] : [ ...fieldFilters[subElement.core_field_name], subElement.value ]
        }
      }else{
        fieldFilters = {
          ...fieldFilters,
          [subElement.core_field_name] : [ subElement.value ]
        }
      }    
    }    
    return fieldFilters;
}


export const getRoleFilterWhere = (roleFieldFilters) => {
    var where = '';
    if(roleFieldFilters != undefined && roleFieldFilters != ''){        
        for(let key of Object.keys(roleFieldFilters)){
            if(key != '' && roleFieldFilters[key] != ''){
                console.log("roleFieldFilters[key]",roleFieldFilters[key])
                where = where + `lcmd.` + key + ` IN ('` + roleFieldFilters[key].join("','") + `') AND `;
            }
        }
    }
    return where;
}
  

