export function getFormData  (renderForms) {
    const dynamicFields = renderForms.map((field, index) => {
        return {
            [field.field_name] : ''
        }
    });
    return dynamicFields;
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
          }
          field = {
            ...field,
            items: items,            
          };
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