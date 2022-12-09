import { PRODUCT_PRICE_LISTS, SALES_SETTING, SALES_SETUP } from "./actionTypes";

export const setProductPriceLists = (productPriceLists) => ({
  type: PRODUCT_PRICE_LISTS,
  payload: productPriceLists ,
});


export const setSalesSetting = (salesSetting) => ({
  type : SALES_SETTING,
  payload: salesSetting
});


export const setSalesSetUp = (salesSetUp) => ({
  type : SALES_SETUP,
  payload: salesSetUp
});


// dispatch({type: CHECKIN, payload: false});


export const clearProductPriceLists = () => ({
  type: PRODUCT_PRICE_LISTS,
});

