
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
  } catch (e) {
    // error reading value
  }
}

export const storePinSvg = async ( type,  value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(type, jsonValue)
  } catch (e) {
    console.log("error", e);
  }
}
export const getPinSvg = async (type) => {
  try {
    const jsonValue = await AsyncStorage.getItem(type)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
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
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
}

export const getBaseUrl = async () => {
  try {
    var token = await getToken();
    var data = token != null ? jwt_decode(token) : null;
    var base_url = data.user_scopes.geo_rep.base_url;
    return base_url;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export const getUserId = async () => {
  try {
    var token = await getToken();
    var data = token != null ? jwt_decode(token) : null;
    var base_url = data.user_scopes.geo_rep.user_id;
    return base_url;
  } catch (e) {
    console.log(e);
    return null;
  }
}


export const getPolygonFillColorTransparency = async () =>{
  
  try {
    var token = await getToken();
    var data = token != null ? jwt_decode(token) : null;
    var code = data.user_scopes.geo_rep.polygon_fillColor_transparency;
    console.log("xxxx", code);
    if (code !== undefined) {      
      return "" + parseFloat(code) * 100;
    } else {
      return "50"
    }
  } catch (e) {    
    return "50"
  }

}


export const getMapMinZoomLevel = async () =>{
  
  try {
    var token = await getToken();
    var data = token != null ? jwt_decode(token) : null;
    var map_min_zoom_level = data.user_scopes.geo_rep.map_min_zoom_level;
    //console.log("featuers", features);
    if (map_min_zoom_level !== undefined) {
      return parseInt(map_min_zoom_level);      
    } else {
      return 8;
    }
  } catch (e) {    
    return 8;
  }

}

export const checkFeatureIncludeParam = async (param) => {
  try {
    var token = await getToken();
    var data = token != null ? jwt_decode(token) : null;
    var features = data.user_scopes.geo_rep.features;
    //console.log("featuers", features);
    if (features !== undefined) {
      var res = features.includes(param);
      return res;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const storeFilterData = async (type, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(type, jsonValue)
  } catch (e) {
    console.log("error", e);
  }
}

export const clearFilterData = async (type) => {
  try {
    let value = {
      stage_id: [],
      outcome_id: [],
      dispositions: [],
      customs: []
    };
    if (type === '@form_filter') {
      value = {
        form_type: [],
      };
    }
    if (type === '@pipeline_filter') {
      value = {
        opportunity_status_id: [],
        opportunity_fields: [],
        campaign_id: ''
      }
    }
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(type, jsonValue)
  } catch (e) {
    console.log("error", e);
  }
}

export const getFilterData = async (type) => {
  try {
    let initialParam = {
      stage_id: [],
      outcome_id: [],
      dispositions: [],
      customs: []
    };
    if (type === '@form_filter') {
      initialParam = {
        form_type: []
      };
    }
    if (type === '@pipeline_filter') {
      initialParam = {
        opportunity_status_id: [],
        opportunity_fields: [],
        campaign_id: ''
      }
    }
    const jsonValue = await AsyncStorage.getItem(type)
    return jsonValue != null && jsonValue !== '' ? JSON.parse(jsonValue) : initialParam;
  } catch (e) {
    // error reading value
  }
}


export const storeCurrentDate = async (value) => {
  try {
    await AsyncStorage.setItem('@current_date', String(value))
  } catch (e) {
    // saving error
  }
}

export const getCurrentDate = async () => {
  try {
    const value = await AsyncStorage.getItem('@current_date')
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
}

export const storeLocationLoop = async (value) => {
  try {

    var date = new Date().getDate();
    var month = new Date().getMonth();
    await storeCurrentDate(month.toString() + date.toString());

    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@location_loop', jsonValue)
  } catch (e) {
    console.log("error", e);
  }
}

export const getLocationLoop = async () => {
  try {
    let initialVal = [];
    const jsonValue = await AsyncStorage.getItem('@location_loop')
    return jsonValue != null && jsonValue !== '' ? JSON.parse(jsonValue) : initialVal;
  } catch (e) {

  }
}

export const getPipelineFilterData = async () => {
  try {
    let initialParam = {
      stage_id: [],
      outcome_id: [],
      dispositions: [],
      customs: [],
      opportunity_status_id: [],
      opportunity_fields: [],
      campaign_id: ''
    };
    const jsonValue = await AsyncStorage.getItem('@pipeline_filter')
    return jsonValue != null && jsonValue !== '' ? JSON.parse(jsonValue) : initialParam;
  } catch (e) {
    // error reading value
  }
}

export const storePipelineFilterData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@pipeline_filter', jsonValue)
  } catch (e) {
    console.log("error", e);
  }
}

export const clearPipelineFilterData = async () => {
  try {
    let value = {
      stage_id: [],
      outcome_id: [],
      dispositions: [],
      customs: [],
      opportunity_status_id: [],
      opportunity_fields: [],
      campaign_id: ''
    };
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@pipeline_filter', jsonValue)
  } catch (e) {
    console.log("error", e);
  }
}

