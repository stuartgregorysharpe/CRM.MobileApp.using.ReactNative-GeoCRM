import { PRODUCT_PRICE_LISTS, SALES_SETTING, SALES_SETUP } from "../actions/actionTypes";


const initialState = {
  productPriceLists: [] ,
  salesSetting: null,
  salesSetUp: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_PRICE_LISTS: 
      return {
        ...state,
        productPriceLists: action.payload
      } 
  
    case SALES_SETTING : 
      return {
        ...state,
        salesSetting: action.payload
    } 

    case SALES_SETUP : 
      return {
        ...state,
        salesSetUp: action.payload
    }

    default:
      return state;
  }
}
