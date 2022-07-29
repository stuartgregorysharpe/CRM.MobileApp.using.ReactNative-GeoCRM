import {gmsCheckAvailability} from './GmsAvailabilityService';
import {hmsCheckAvailability} from './HmsAvailabilityService';

export async function isHMSService() {
  const isGmsAvailable = await gmsCheckAvailability();
  const isHmsAvailable = await hmsCheckAvailability();
  return isHmsAvailable;
  return isGmsAvailable == false && isHmsAvailable == true;
}
export default {
  isHMSService,
};
