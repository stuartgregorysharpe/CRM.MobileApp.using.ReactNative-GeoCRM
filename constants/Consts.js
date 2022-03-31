
import {Alert} from 'react-native';
import { CHANGE_LOGIN_STATUS } from '../actions/actionTypes';
import { clearNotification, showNotification } from '../actions/notification.action';
import { setToken } from './Storage';

export const WHATS_APP_LINK = "https://api.whatsapp.com/send?l=en&text=Hi!%20I%20have%20a%20support%20request&phone=27608477174%22";


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

export function getTwoDigit(value){
    if(value <= 9){
        return "0" + value;
    }
    return String(value);
}

export function getDistance (prelatlng, currentlatlng) {
    
    if(prelatlng.latitude === "" || prelatlng.longitude === ""){
        return 0;
    }
    const prevLatInRad = toRad(Number(prelatlng.latitude));
    const prevLongInRad = toRad(Number(prelatlng.longitude));
    const latInRad = toRad(currentlatlng.latitude);
    const longInRad = toRad(currentlatlng.longitude);
    return (
      // In mile      
      3963 *
      Math.acos(
        Math.sin(prevLatInRad) * Math.sin(latInRad) +
          Math.cos(prevLatInRad) * Math.cos(latInRad) * Math.cos(longInRad - prevLongInRad),
      )
    );
}
  
const toRad = (angle) => {
    return (angle * Math.PI) / 180;
}

export function isInsidePoly  (lat, lon, multiPolycoords) {
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
    


export function expireToken ( dispatch , e ) {
  if(e === "expired"){    
    console.log("token EXPIRED !!!!!")                        
    dispatch(showNotification({ type: 'success', message: "Access has expired, please login again", buttonText: 'Exit', 
    buttonAction : () => {
      console.log("action button")
      setToken(null);
      dispatch(clearNotification());
      dispatch({type: CHANGE_LOGIN_STATUS, payload: "logout"});      
      
    } }));
  }
}

    