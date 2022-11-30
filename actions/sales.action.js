import { PRODUCT_PRICE_LISTS } from "./actionTypes";

export const setProductPriceLists = (productPriceLists) => ({
  type: PRODUCT_PRICE_LISTS,
  payload: productPriceLists ,
});

// dispatch({type: CHECKIN, payload: false});


export const clearProductPriceLists = () => ({
  type: PRODUCT_PRICE_LISTS,
});
