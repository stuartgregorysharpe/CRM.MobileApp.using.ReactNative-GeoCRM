
import {Alert} from 'react-native';

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

