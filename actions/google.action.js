import { getGeocoding } from "./location.action";
import Geolocation from 'react-native-geolocation-service';

import { CHANGE_CURRENT_LOCATION } from "./actionTypes";

export async function reverseGeocoding (currentLocation, customMasterFields) {
    
    return await getGeocoding(currentLocation.latitude, currentLocation.longitude)
    .then((res) => {
      if(res.results != null && res.results.length > 0 && res.results[0].address_components.length > 0){        
        var address_components = res.results[0].address_components;
        console.log("address co m", address_components);
        var tmp = [ ...customMasterFields ];

        console.log("customMasterFields",customMasterFields);
        tmp.forEach((element) => {
          address_components.forEach((item) =>{
                        
            
            if(item.types.includes("street_number") && element.core_field_name == "street_address" || item.types.includes("route")  && element.core_field_name == "street_address" ){
              if(item.types.includes("street_number")){
                element.value = '';
              }
              element.value += element.value === '' ? item.long_name : " " + item.long_name ;
            }  

            if( (item.types.includes("neighborhood") || item.types.includes("sublocality_level_1") ||  item.types.includes("sublocality") ) && element.core_field_name == "suburb"  ){
              element.value = item.long_name;
            }
            if( ( item.types.includes("administrative_area_level_2") || item.types.includes("locality") )  && element.core_field_name == "city"  ){
              element.value = item.long_name;
            }
            if( item.types.includes("administrative_area_level_1")  && element.core_field_name == "state"  ){
              element.value = item.long_name;
            }
            if( (item.types.includes("country") && item.types.includes("political") ) && element.core_field_name == "country" ){
              element.value = item.long_name;
            }
            if( item.types.includes("postal_code") && ( element.core_field_name == "pincode" )  ){
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

export const updateCurrentLocation = () => (dispatch, getState) => {
  // update current location
  console.log("enter");

  Geolocation.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;
      dispatch({type: CHANGE_CURRENT_LOCATION, payload: {latitude: latitude,longitude: longitude } });            
      
    },
    error => {
      console.log("locatin - error")
      console.log(error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 15000},
  );

}



