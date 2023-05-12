import {Constants} from '../constants';

export function getSubText(item) {
  
  if (item.stock_type == Constants.stockType.DEVICE) {
    return Constants.stockPrefix.MSN_IMEI + item.serial;
  } else if (item.stock_type == Constants.stockType.CONSUMABLE) {
    return Constants.stockPrefix.CONSUMABLE + item.qty;
  } else if (item.stock_type == Constants.stockType.SIM) {
    if (item.items) {
      return `Qty: ${item.items.length}`;
    }
    return '';
  }
}
