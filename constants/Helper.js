import { Alert, Platform } from 'react-native';

import { CHANGE_LOGIN_STATUS } from '../actions/actionTypes';
import {
  clearNotification,
  showNotification,
} from '../actions/notification.action';
import { setToken } from './Storage';
import * as RNLocalize from 'react-native-localize';
import { Constants, Strings } from '.';
import HomeScreen from '../screens/GeoRep/Home/HomeScreen';
import CRMScreen from '../screens/GeoRep/CRM/CRMScreen';
import RepWebLinksScreen from '../screens/GeoRep/WebLinks/WebLinksScreen';
import CalendarScreen from '../screens/GeoRep/Calendar/CalendarScreen';
import FormsNavigator from '../screens/GeoRep/Forms/FormsNavigator';
import RepContentLibraryScreen from '../screens/GeoRep/ContentLibrary/ContentLibraryScreen';
import LifeContentLibraryScreen from '../screens/GeoLife/ContentLibraryScreen';
import CrmContentLibraryScreen from '../screens/GeoCRM/ContentLibraryScreen';
import NotificationsScreen from '../screens/GeoRep/NotificationsScreen';
import RepMessagesScreen from '../screens/GeoRep/MessagesScreen';
import RecordedSalesScreen from '../screens/GeoRep/RecordedSalesScreen';
import RepSalesPipelineScreen from '../screens/GeoRep/Pipeline/SalesPipelineScreen';
import Stock from '../screens/GeoRep/Stock/Stock';
import HomeLifeScreen from '../screens/GeoLife/HomeLifeScreen';
import AccessScreen from '../screens/GeoLife/AccessScreen';
import BusinessDirectoryScreen from '../screens/GeoLife/BusinessDirectoryScreen';
import ProductSales from '../screens/GeoRep/Sales/ProductSales';
import ProductSalesNavigator from '../screens/GeoRep/Sales/ProductSalesNavigator';
import LearningScreen from '../screens/GeoRep/Learning/Learning'

export const WHATS_APP_LINK =
  'https://wa.me/27608477174?text=Hi!%20I%20have%20a%20support%20request';
// OLD LINK : 'https://api.whatsapp.com/send?l=en&text=Hi!%20I%20have%20a%20support%20request&phone=27608477174%22';

export function getPageNameByLinker(selectedProject, linker) {
  switch (linker) {
    case 'home_geo':
      return {
        linker: linker,
        name: 'Home',
        router: HomeScreen,
        activeIcon: 'Home_Black',
        inActiveIcon: 'Home_Black_Gray',
      };
    case 'crm_locations':
      return {
        linker: linker,
        name: 'CRM',
        router: CRMScreen,
        activeIcon: 'Location_Arrow',
        inActiveIcon: 'Location_Arrow_Gray',
      };
    case 'web_links':
      return {
        linker: linker,
        name: 'Web Links',
        router: RepWebLinksScreen,
        activeIcon: 'Travel_Explore',
        inActiveIcon: 'Travel_Explore_Gray',
      };
    case 'calendar':
      return {
        linker: linker,
        name: 'Calendar',
        router: CalendarScreen,
        activeIcon: 'Calendar_Event_Fill',
        inActiveIcon: 'Calendar_Event_Fill_Gray',
      };
    case 'forms':
      return {
        linker: linker,
        name: 'Forms',
        router: FormsNavigator,
        activeIcon: 'Form',
        inActiveIcon: 'Form_inactive',
      };
    case 'content_library':
      if (selectedProject === Constants.projectType.GEO_REP) {
        return {
          linker: linker,
          name: 'Content Library',
          router: RepContentLibraryScreen,
          activeIcon: 'Ballot',
          inActiveIcon: 'Ballot_Gray',
        };
      } else if (selectedProject === Constants.projectType.GEO_LIFE) {
        return {
          linker: linker,
          name: 'ContentLibrary',
          router: LifeContentLibraryScreen,
          activeIcon: 'Ballot',
          inActiveIcon: 'Ballot_Gray',
        };
      } else if (selectedProject === Constants.projectType.GEO_CRM) {
        return {
          linker: linker,
          name: 'ContentLibrary',
          router: CrmContentLibraryScreen,
          activeIcon: 'Ballot',
          inActiveIcon: 'Ballot_Gray',
        };
      }
    case 'product_sales':
      return {
        linker: linker,
        name: 'Sales',
        router: ProductSalesNavigator,
        activeIcon: 'Sale',
        inActiveIcon: 'Sale_Gray',
        // activeIcon: 'Shoping_Card',
        // inActiveIcon: 'Shoping_Card_Gray',
      };
    case 'notifications':
      return {
        linker: linker,
        name: 'Notifications',
        router: NotificationsScreen,
        activeIcon: 'Pipeline',
        inActiveIcon: 'Pipeline_Gray',
      };
    case 'messages':
      return {
        linker: linker,
        name: 'RepMessages',
        router: RepMessagesScreen,
        activeIcon: 'Pipeline',
        inActiveIcon: 'Pipeline_Gray',
      };
    case 'recorded_sales':
      return {
        linker: linker,
        name: 'RecordedSales',
        router: RecordedSalesScreen,
        activeIcon: 'Pipeline',
        inActiveIcon: 'Pipeline_Gray',
      };
    case 'sales_pipeline':
      return {
        linker: linker,
        name: 'Pipeline',
        router: RepSalesPipelineScreen,
        activeIcon: 'Pipeline',
        inActiveIcon: 'Pipeline_Gray',
      };
    case 'stock_module':
      return {
        linker: linker,
        name: 'Stock',
        router: Stock,
        activeIcon: 'Stock',
        inActiveIcon: 'Stock_Gray',
      };
    case 'home_life':
      return {
        linker: linker,
        name: 'Home',
        router: HomeLifeScreen,
        activeIcon: 'Home_Black',
        inActiveIcon: 'Home_Black_Gray',
      };
    case 'access':
      return {
        linker: linker,
        name: 'Access',
        router: AccessScreen,
        activeIcon: 'Access',
        inActiveIcon: 'Access_Gray',
      };
    case 'business_directory':
      return {
        linker: linker,
        name: 'Business',
        router: BusinessDirectoryScreen,
        activeIcon: 'Business_Directory',
        inActiveIcon: 'Business_Directory_Gray',
      };
    case 'help':
      return {
        linker: linker,
        name: 'Help',
        router: BusinessDirectoryScreen,
        activeIcon: 'Pipeline',
        inActiveIcon: 'Pipeline_Gray',
      };
    case 'news':
      return {
        linker: linker,
        name: 'News',
        router: BusinessDirectoryScreen,
        activeIcon: 'Pipeline',
        inActiveIcon: 'Pipeline_Gray',
      };
    case 'learning':
      return {
        linker: linker,
        name: 'Learning',
        router: LearningScreen,
        activeIcon: 'Learning',
        inActiveIcon: 'Learning_Gray',
      }
  }
}

export function notifyMessage(title, msg) {
  Alert.alert(title, msg, [
    // {
    //     text: 'ok',
    //     onPress: str => console.log('Entered string: ' + str),
    // },
    {
      text: 'Ok',
      onPress: () => console.log('Pressed Cancel!'),
      style: 'ok',
    },
  ]);
}

export function selectPicker(
  title,
  description,
  launchImageLibrary,
  launchCamera,
) {
  return Alert.alert(
    title,
    description,
    [
      // The "Yes" button
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary();
        },
      },
      // The "No" button
      {
        text: 'Camera',
        onPress: () => {
          launchCamera();
        },
      },
    ],
    { cancelable: true },
  );
}

export function notifyMsg(dispatch, title) {
  dispatch(
    showNotification({
      type: 'success',
      message: title,
      buttonText: 'Ok',
      buttonAction: () => {
        dispatch(clearNotification());
      },
    }),
  );
}

export function getTwoDigit(value) {
  if (value <= 9) {
    return '0' + value;
  }
  return String(value);
}

export function checkFeatureIncludeParamFromSession(features, param) {
  if (features !== undefined) {
    var res = features.includes(param);
    return res;
  } else {
    return false;
  }
}

export function getDistance(prelatlng, currentlatlng) {



  if (prelatlng.latitude === '' || prelatlng.longitude === '') {
    return 0;
  }
  const prevLatInRad = toRad(Number(prelatlng.latitude));
  const prevLongInRad = toRad(Number(prelatlng.longitude));
  const latInRad = toRad(currentlatlng.latitude);
  const longInRad = toRad(currentlatlng.longitude);
  
  const earthRadius = 6378137; // 3963 in mile

  return (
    // In mile
    earthRadius *
    Math.acos(
      Math.sin(prevLatInRad) * Math.sin(latInRad) +
      Math.cos(prevLatInRad) *
      Math.cos(latInRad) *
      Math.cos(longInRad - prevLongInRad),
    )
  );
}

const toRad = angle => {
  return (angle * Math.PI) / 180;
};

export function isInsidePoly(lat, lon, multiPolycoords) {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

  var x = lat,
    y = lon;

  var inside = false;
  multiPolycoords.map(poly => {
    vs = poly;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i].latitude,
        yi = vs[i].longitude;
      var xj = vs[j].latitude,
        yj = vs[j].longitude;

      var intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
  });
  return inside;
}

export function expireToken(dispatch, e , alertModalRef) {
  var message = '';

  if(typeof e === 'object'){
    console.log("object error", JSON.stringify(e));
    message = 'Error. Please Contact the Support';
  }else if (e === 'expired') {
    console.log('token EXPIRED !!!!!');
    message = 'Access has expired, please login again';
  } else if (e === 'timeout') {
    message = 'Submission timed out due to limited connectivity. Please try again with stronger connectivity, or switch to Offline mode. Contact support if you have further questions.';
  } else if (e === 'error_400' ){
    message = 'Request 400 Error';
  }else{
    message = e;
  }
  
  if(Platform.OS === 'android'){
    showModal(dispatch , e , message , alertModalRef);
  }else{
    setTimeout(() => {
      showModal(dispatch , e , message , alertModalRef);
    }, 500)
  }

}

export function showModal (dispatch , e , message,  alertModalRef) {
  if(alertModalRef && alertModalRef.current){    
    var type = e;
    if(typeof e === 'object'){
      type = 'error';
    }
    console.log("message  ==>", type)
    alertModalRef.current.alert(message, Strings.Ok , type === 'expired' ? true : false );
  }else{
    dispatch(
      showNotification({
        type: 'success',
        message: message,
        buttonText: 'Ok',
        buttonAction: () => {
          if (e === 'expired') {            
            goToLogin(dispatch);
          }
          dispatch(clearNotification());
        },
      }),
    );
  }

}

export function goToLogin( dispatch ) {
  setToken(null);
  dispatch({ type: CHANGE_LOGIN_STATUS, payload: 'logout' });
}

export function getErrorMessage (e) {
  var message = '';
  if (e === 'expired') {    
    message = 'Access has expired, please login again';
  } else if (e === 'timeout') {
    message = 'Submission timed out due to limited connectivity. Please try again with stronger connectivity, or switch to Offline mode. Contact support if you have further questions.';
  }
  return message;
}

export function showOfflineDialog(dispatch) {
  dispatch(
    showNotification({
      type: Strings.Success,
      message: Strings.This_Function_Not_Available,
      buttonText: 'Ok',
      buttonAction: () => {
        dispatch(clearNotification());
      },
    }),
  );
}

export function getPostParameter(location) {
  var time_zone = RNLocalize.getTimeZone();

  return {
    user_local_data: {
      time_zone: time_zone,
      latitude:
        location && location.latitude != undefined ? location.latitude : 0,
      longitude:
        location && location.longitude != undefined ? location.longitude : 0,
    },
  };

  return {};
}

export function objectToFormData(obj, rootName, ignoreList) {
  var formData = new FormData();

  function appendFormData(data, root) {
    if (!ignore(root)) {
      root = root || '';
      if (data instanceof File) {
        formData.append(root, data);
      } else if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
          appendFormData(data[i], root + '[' + i + ']');
        }
      } else if (typeof data === 'object' && data) {
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            if (root === '') {
              appendFormData(data[key], key);
            } else {
              appendFormData(data[key], root + '[' + key + ']');
            }
          }
        }
      } else {
        if (data !== null && typeof data !== 'undefined') {
          formData.append(root, data);
        }
      }
    }
  }

  function ignore(root) {
    return (
      Array.isArray(ignoreList) &&
      ignoreList.some(function (x) {
        return x === root;
      })
    );
  }

  appendFormData(obj, rootName);

  return formData;
}

export function getFileFormat(path) {
  const words = path.split('/');
  const ext = words[words.length - 1].split('.');
  return {
    uri: path,
    type: 'image/' + ext[1],
    name: words[words.length - 1],
  };
}


export function getFileFormatList(paths) {

  var uris = [];
  var types = [];
  var names = [];
  paths.forEach((path) => {
    const words = path.split('/');
    const ext = words[words.length - 1].split('.');
    uris.push(path);
    types.push('image/' + ext[1]);
    names.push(words[words.length - 1]);
  });

  return {
    uri: uris,
    type: types,
    name: names,
  };


}



export function numberFieldValidator(numberText) {
  var numberRegex = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/;
  return numberRegex.test(numberText);
}

export function integerFieldValidator(numberText) {
  var numberRegex = /^\d*$/;
  return numberRegex.test(numberText);
}
