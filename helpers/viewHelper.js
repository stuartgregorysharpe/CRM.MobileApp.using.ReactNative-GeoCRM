import { Constants } from "../constants";

  export function getSubText  (item){      
    if(item.stock_type == Constants.stockType.DEVICE){
      return Constants.stockPrefix.DEVICE + item.serial;
    }else if(item.stock_type == Constants.stockType.CONSUMABLE){
      return Constants.stockPrefix.CONSUMABLE + item.qty;
    }else if(item.stock_type == Constants.stockType.SIM){
      return Constants.stockPrefix.SIM + item.serial;
    }
  }

