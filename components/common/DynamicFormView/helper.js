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
        tmpFormData[field.field_label] = value;
      }

    });
   
    return tmpFormData;
}

export function getFormStructureData (renderForms) {

    const dynamicFields = renderForms.map((field, index) => {

        var value = '';
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
        
        if( field.field_type == 'contact_email' ){       
          items = field.options;             
        }

        if(field.field_type == 'take_photo'){
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
            isHidden: false
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
            field_name : field.field_label,
            rule_characters: '<,10',
            add_prefix: 'R',
            add_suffix : '%'
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