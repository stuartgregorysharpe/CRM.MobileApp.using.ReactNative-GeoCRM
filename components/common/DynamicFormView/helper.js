export function getFormData  (renderForms , page) {
    const tmpFormData = {};
    renderForms.forEach(field => {
      var value = '';
      if ( field.field_type == 'price' && field.tax_types != undefined) {
        value = {value: value , type: field.selected_tax_type};
      }
      if(page == "add_product"){
        tmpFormData[field.field_name] = value;
      }else{
        tmpFormData[field.field_id] = value;
      }

    });
   
    return tmpFormData;
}

export function getFormStructureData (renderForms , page) {

    const dynamicFields = renderForms.map((field, index) => {

        var value = '';
        var isClickable = false;
        var items = [];
        if ( field.field_type == 'price' && field.tax_types != undefined) {
          
          if (field.tax_types != undefined && field.tax_types != '') {       
            items = getDropdownItems(field.tax_types);
            value = {value: value , type: field.selected_tax_type};
          }
        }

        if ( ( field.field_type == 'multiple' || field.field_type == 'multi_select' ) && field.options != undefined) {
          items = getDropdownItems(field.options);          
        }
        
        if( field.field_type == 'contact_email' || field.field_type == 'contact_select' ){     

          items = field.options;       
          if(items == undefined || items.length == 0){
            isClickable = true;
          }
          //isClickable = true;          
        }

        if( page == "add_product" && field.field_type == 'take_photo'){
          field = {
            ...field,
            maxSize: 1
          }
        }
  
        if(items.length > 0){
          field = {
            ...field,
            items: items,
          };
        }

        if(field.field_name != undefined){
          return {
            ...field,
            key: index,        
            initial_value: '',        
            editable: true,
            is_required: true,          
            value: value,
            isHidden: false,
            isClickable: isClickable
          };
        }else{
          return {
            ...field,
            key: index,        
            initial_value: '',        
            editable: true,
            is_required: true,          
            value: value,
            isHidden: false,
            field_name : field.field_id,
            rule_characters: '<,10',            
            add_prefix: field?.add_prefix != undefined ? field.add_prefix : 'R',
            add_suffix : field?.add_suffix != undefined ? field.add_suffix : '%',
            isClickable: isClickable
          };
        }       
    });
    return dynamicFields;
}

export function getDropdownItems (options) {
  if(options != undefined && options instanceof Array){
    
    var items = [];
    options.forEach(element => {
      items.push({label: element, value: element});
    });
    return items;    
  }
  return [];
}