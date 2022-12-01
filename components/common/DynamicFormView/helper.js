export function getFormData  (renderForms) {

    const tmpFormData = {};
    renderForms.forEach(field => {
      var value = '';
      if ( field.field_type == 'price' && field.tax_types != undefined) {
        value = {value: value , type: field.selected_tax_type};
      }

      tmpFormData[field.field_name] = value;
    });
   
    return tmpFormData;
}

export function getFormStructureData (renderForms) {

    const dynamicFields = renderForms.map((field, index) => {

        var value = '';
        if ( field.field_type == 'price' && field.tax_types != undefined) {
          var items = [];
          if (field.tax_types != undefined && field.tax_types != '') {
            field.tax_types.forEach(element => {
              items.push({label: element, value: element});
            });
            value = {value: value , type: field.selected_tax_type};
          }
          field = {
            ...field,
            items: items,
          };
        }

        if(field.field_type == 'take_photo'){
          field = {
            ...field,
            maxSize: 1
          }
        }
  
        return {
          ...field,
          key: index,        
          initial_value: '',
          editable: true,
          is_required: true,          
          value: value,
        };
    });

    return dynamicFields;
}