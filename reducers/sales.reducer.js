import {
  PRODUCT_PRICE_LISTS,
  SALES_SETTING,
  SALES_SETUP,
  SALES_SET_REGRET,
  SALES_SET_SEARCH_TEXT,
} from '../actions/actionTypes';

const initialState = {
  productPriceLists: [],
  salesSetting: null,
  salesSetUp: null,
  regret: null,
  searchText: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_PRICE_LISTS:
      return {
        ...state,
        productPriceLists: action.payload,
      };

    case SALES_SETTING:
      return {
        ...state,
        salesSetting: action.payload,
      };

    case SALES_SETUP:
      return {
        ...state,
        salesSetUp: action.payload,
      };
    case SALES_SET_REGRET: {
      return {
        ...state,
        regret: action.payload,
      };
    }
    case SALES_SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    default:
      return state;
  }
};
