import {gmsCheckAvailability} from './GmsAvailabilityService';
import {hmsCheckAvailability} from './HmsAvailabilityService';
import {Platform} from 'react-native';

export async function isHMSService() {
  if (Platform.OS == 'ios') return false;
  const isGmsAvailable = await gmsCheckAvailability();
  const isHmsAvailable = await hmsCheckAvailability();
  return isGmsAvailable == false && isHmsAvailable == true;
  //return isHmsAvailable == true;
  //return true;
}
export default {
  isHMSService,
};

//{"destination": {"lat": 17.360589, "lng": 78.4740613}, "origin": {"lat": 41.754739, "lng": 123.420847}}

// {
//   "origin" : {
//       "lng" : "18.446078",
//       "lat" : "-33.704086"
//   },
//   "destination" : {
//       "lng" : "18.447496",
//       "lat" : "-33.727166"
//   }
// }

// {
//   "origin":{
//       "lng":123.420847,
//       "lat":41.754739
//   },
//   "destination":{
//       "lng":78.4740613,
//       "lat":17.360589
//   }
// }
