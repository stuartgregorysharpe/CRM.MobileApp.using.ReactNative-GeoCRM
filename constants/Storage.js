
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
export const storeUserData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@user', jsonValue)
    } catch (e) {      
      console.log("error", e);
    }
}

export const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
}

export const setToken = async (value) => {
    try {
      await AsyncStorage.setItem('@token', String(value))
    } catch (e) {
      // saving error
    }
}

export const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if(value !== null) {
          return value;        
      }
    } catch(e) {
        return null;      
    }
}

export const getBaseUrl = async () => {  
  try{
    var token = await getToken();  
    var data = token != null ? jwt_decode(token) : null;
    var base_url =  data.user_scopes.geo_rep.base_url;
    return base_url;
  }catch(e) {
    console.log(e);
    return null;
  }  
}

export const getUserId = async () => {  
  try{
    var token = await getToken();  
    var data = token != null ? jwt_decode(token) : null;
    var base_url =  data.user_scopes.geo_rep.user_id;
    return base_url;
  }catch(e) {
    console.log(e);
    return null;
  }
}

export const getOpenReplaceCheckin = async () => {  
  try{
    var token = await getToken();  
    var data = token != null ? jwt_decode(token) : null;
    var features =  data.user_scopes.geo_rep.features;    
    return features.includes("open_replace_checkin") ;    
  }catch(e) {
    console.log(e);
    return false;
  }  
}

export const getCalendarAdd = async () => {  
  try{
    var token = await getToken();  
    var data = token != null ? jwt_decode(token) : null;
    var features =  data.user_scopes.geo_rep.features;    
    return features.includes("calendar_add") ;    
  }catch(e) {
    console.log(e);
    return false;
  }  
}

export const getCalendarOptimize = async () => {  
  try{
    var token = await getToken();  
    var data = token != null ? jwt_decode(token) : null;
    var features =  data.user_scopes.geo_rep.features;    
    console.log("my features", features);
    var res =  features.includes("calendar_optimize") ;        
    return res;
  
  }catch(e) {
    console.log(e);
    return false;
  }  
}


export const storeFilterData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@filter', jsonValue)
  } catch (e) {      
    console.log("error", e);
  }
}
export const clearFilterData = async () => {
  try {
    let value = {
      stage_id : [],
      outcome_id : [],
      dispositions : [],
      customs : []
    };
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@filter', jsonValue)
  } catch (e) {      
    console.log("error", e);
  }
}

export const getFilterData = async () => {
  try {
    let initialParam = {
      stage_id : [],
      outcome_id : [],
      dispositions : [],
      customs : []
    };
    const jsonValue = await AsyncStorage.getItem('@filter')
    return jsonValue != null && jsonValue !== '' ? JSON.parse(jsonValue) : initialParam;
  } catch(e) {
    // error reading value
  }
}
