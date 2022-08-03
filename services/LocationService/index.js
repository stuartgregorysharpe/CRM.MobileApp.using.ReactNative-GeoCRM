import AvailabilityService from '../AvailabilityService';
import Constants from '../Constants';
import GmsLocationService from './GmsLocationService';
import HmsLocationService from './HmsLocationService';
export async function getLocationService(serviceType) {
  if (serviceType == Constants.serviceType.GMS_SERVICE) {
    return GmsLocationService;
  } else if (serviceType == Constants.serviceType.HMS_SERVICE) {
    return HmsLocationService;
  }
  const isHMS = await AvailabilityService.isHMSService();
  if (isHMS) return HmsLocationService;
  return GmsLocationService;
}

export default {
  getLocationService,
  GmsLocationService,
  HmsLocationService,
};
