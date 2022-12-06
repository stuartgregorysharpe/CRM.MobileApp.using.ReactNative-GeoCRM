import { PRODUCT_PRICE_LISTS, SALES_SETTING } from "./actionTypes";

export const setProductPriceLists = (productPriceLists) => ({
  type: PRODUCT_PRICE_LISTS,
  payload: productPriceLists ,
});


export const setSalesSetting = (salesSetting) => ({
  type : SALES_SETTING,
  payload: salesSetting
});


// dispatch({type: CHECKIN, payload: false});


export const clearProductPriceLists = () => ({
  type: PRODUCT_PRICE_LISTS,
});
