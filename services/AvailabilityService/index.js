import {gmsCheckAvailability} from './GmsAvailabilityService';
import {hmsCheckAvailability} from './HmsAvailabilityService';
import {Platform} from 'react-native';

export async function isHMSService() {
  if (Platform.OS == 'ios') return false;
  const isGmsAvailable = await gmsCheckAvailability();
  const isHmsAvailable = await hmsCheckAvailability();
  return isGmsAvailable == false && isHmsAvailable == true;
}
export default {
  isHMSService,
};
