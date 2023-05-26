import { Constants } from "../../../../../constants";


  export const getLabel = (deviceType) => {
      
        if (deviceType === Constants.stockType.DEVICE) {
        return 'Device';
        }
        if (deviceType === Constants.stockType.CONSUMABLE) {
        return 'Product';
        }
        if (deviceType === Constants.stockType.SIM) {
        return 'Network';
        }
        return '';
};

export const getModalMessage = (deviceType) => {
    if (deviceType == '') {
      return 'Please complete compulsory fields.';
    }
    if (
      deviceType == Constants.stockType.DEVICE ||
      deviceType == Constants.stockType.CONSUMABLE
    ) {
      return 'Please complete compulsory fields.';
    } else {
      return 'No sims scanned/selected.';
    }
};
