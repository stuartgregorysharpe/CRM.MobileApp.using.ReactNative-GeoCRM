import { PRODUCT_PRICE_LISTS } from "../actions/actionTypes";


const initialState = {
  productPriceLists: []  
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_PRICE_LISTS: 
      return {
        ...state,
        productPriceLists: action.payload
      } 
  
    default:
      return state;
  }
}
