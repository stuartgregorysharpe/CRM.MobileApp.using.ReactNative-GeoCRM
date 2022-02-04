import { getGeocoding } from "./location.action";


export async function reverseGeocoding (currentLocation, customMasterFields) {
    
    return await getGeocoding(currentLocation.latitude, currentLocation.longitude)
    .then((res) => {
      if(res.results != null && res.results.length > 0 && res.results[0].address_components.length > 0){        
        var address_components = res.results[0].address_components;
        console.log("address co m", address_components);
        var tmp = [ ...customMasterFields ];
        tmp.forEach((element) => {
          address_components.forEach((item) =>{
            if(item.types.includes("street_number") && element.field_name == "Street Address" || item.types.includes("route")  && element.field_name == "Street Address" ){
              element.value = item.long_name;
            }
            if( (item.types.includes("neighborhood") || item.types.includes("sublocality_level_1") ||  item.types.includes("sublocality") ) && element.field_name == "Suburb"  ){
              element.value = item.long_name;
            }
            if( ( item.types.includes("administrative_area_level_2") || item.types.includes("locality") )  && element.field_name == "City"  ){
              element.value = item.long_name;
            }
            if( item.types.includes("administrative_area_level_1")  && element.field_name == "State"  ){
              element.value = item.long_name;
            }
            if( (item.types.includes("country") && item.types.includes("political") ) && element.field_name == "Country" ){
              element.value = item.long_name;
            }
            if( item.types.includes("postal_code") && element.field_name == "Pincode"  ){
              element.value = item.long_name;
            }
          })          
        });

        console.log("tmp" , tmp);
        return tmp;
      }
    })
    .catch((e) => {
      console.log(e);
      return [];
    })
  }
