
import Geolocation from 'react-native-geolocation-service';
import axios from "axios";
import { CHANGE_CURRENT_LOCATION } from "./actionTypes";


export async function reverseGeocoding (currentLocation, customMasterFields) {
    
    return await getGeocoding(currentLocation.latitude, currentLocation.longitude)  
    .then((res) => {
      if(res.results != null && res.results.length > 0 && res.results[0].address_components.length > 0){        
        var address_components = res.results[0].address_components;
        console.log("address co m", address_components);
        var tmp = [ ...customMasterFields ];

        console.log("customMasterFields",customMasterFields);
        var establishment = "";

        tmp.forEach((element) => {          
          address_components.forEach((item) =>{                            
            if(item.types.includes("  ") || item.types.includes("point_of_interest") ){
              establishment = item.long_name;
            }
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
          });

          if(element.core_field_name === "street_address" && (element.value === "" || element.value === null || element.value === undefined)){
            console.log("establishment",establishment)
            element.value = establishment;
          }

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

export async function parseCoordinate (address) {    
  return await getCoordinate(address)
  .then((res) => {
    console.log("parse coo", res);
    if(res.results != null && res.results.length > 0 && res.results[0].address_components.length > 0){        
      var geometry = res.results[0].geometry;
      console.log("geomoetry", geometry.location);
      if(geometry.location && geometry.location.lat && geometry.location.lng){
        var response = {
          latitude: geometry.location.lat,
          longitude: geometry.location.lng
        }
        console.log("response", response);
        return response;
      }
      return null;
    }
  })
  .catch((e) => {
    console.log(e);
    return [];
  })
}

export const getGeocoding = async (latitude, longitude) => {
  return new Promise(function (resolve, reject) {
    console.log("url", `https://maps.googleapis.com/maps/api/geocode/json?result_type=street_address&latlng=${latitude},${longitude}&key=AIzaSyBtgcNrNTOftpHM44Qk9BVzhUdKIZEfvJw`);
    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBtgcNrNTOftpHM44Qk9BVzhUdKIZEfvJw`, {
        headers: {}
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      })
  });
}


export const getCoordinate = async (address) => {
  return new Promise(function (resolve, reject) {
    // 
    console.log("url", `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBtgcNrNTOftpHM44Qk9BVzhUdKIZEfvJw`);
    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBtgcNrNTOftpHM44Qk9BVzhUdKIZEfvJw`, {
        headers: {}
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      })
  });
}


export const updateCurrentLocation = () => (dispatch, getState) => {
  // update current location
  console.log("enter");
  Geolocation.getCurrentPosition(
    position => {
      console.log("altitudeAccuracy" , position);
      const {latitude, longitude ,accuracy} = position.coords;
      dispatch({type: CHANGE_CURRENT_LOCATION, payload: {latitude: latitude,longitude: longitude , accuracy: accuracy } });      
    },
    error => {
      console.log("locatin - error")
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    // {   
    //   accuracy: {
    //     android: 'high',
    //     ios: 'best',
    //   },
    //   enableHighAccuracy: true, 
    //   forceRequestLocation: true,
    //   timeout: 15000 ,  maximumAge: 2000 , distanceFilter: 2 
    // },
  );
}



