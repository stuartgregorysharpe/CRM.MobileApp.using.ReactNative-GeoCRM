import AvailabilityService from '../AvailabilityService';
import Constants from '../Constants';
import GmsLocationService from './GmsLocationService';
import HmsLocationService from './HmsLocationService';
export function getLocationService(serviceType) {
  if (serviceType == Constants.serviceType.GMS_SERVICE) {
    return GmsLocationService;
  } else if (serviceType == Constants.serviceType.HMS_SERVICE) {
    return HmsLocationService;
  }
  if (AvailabilityService.isHMSService()) return HmsLocationService;
  return GmsLocationService;
}

export default {
  getLocationService,
};
