import {
  PRODUCT_PRICE_LISTS,
  SALES_SETTING,
  SALES_SETUP,
  SALES_SET_REGRET,
} from './actionTypes';

export const setProductPriceLists = productPriceLists => ({
  type: PRODUCT_PRICE_LISTS,
  payload: productPriceLists,
});

export const setSalesSetting = salesSetting => ({
  type: SALES_SETTING,
  payload: salesSetting,
});

export const setSalesSetUp = salesSetUp => ({
  type: SALES_SETUP,
  payload: salesSetUp,
});

export const setRegret = regretItem => ({
  type: SALES_SET_REGRET,
  payload: regretItem,
});

// dispatch({type: CHECKIN, payload: false});

export const clearProductPriceLists = () => ({
  type: PRODUCT_PRICE_LISTS,
});
