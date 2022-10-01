
export function formDataToJsonString(formData) {
    var object = {};
    console.log("DDee",formData)
    formData.forEach(function(value, key){
        console.log("DDD", value, key)
        object[key] = value;
    });
    var json = JSON.stringify(object);
    return json;
}

export function jsonToFormData(data) {
    const formData = new FormData();    
    buildFormData(formData, data);    
    return formData;
}

function buildFormData(formData, data, parentKey) {

  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
    //buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
  });

    // if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    //   Object.keys(data).forEach(key => {
    //     buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    //   });
    // } else {
    //   const value = data == null ? '' : data;  
    //   formData.append(parentKey, value);
    // }
}
