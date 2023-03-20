import {
  PRODUCT_PRICE_LISTS,
  SALES_SETTING,
  SALES_SETUP,
  SALES_SET_REGRET,
  SALES_SET_SEARCH_TEXT,
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
export const setSalesSearchText = searchText => ({
  type: SALES_SET_SEARCH_TEXT,
  payload: searchText,
});
// dispatch({type: CHECKIN, payload: false});

export const clearProductPriceLists = () => ({
  type: PRODUCT_PRICE_LISTS,
});
