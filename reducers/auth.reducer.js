import { CHANGE_LOGIN_STATUS, CHANGE_OFFLINE_STATUS, CHANGE_USER_INFO } from "../actions/actionTypes";
import { setToken } from "../constants/Storage";

const initialState = {
  loginStatus: "logout",
  userInfo: {},
  offlineStatus: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state=initialState, action) => {
  switch(action.type) {
    
    case CHANGE_OFFLINE_STATUS:
      return {
        ...state,
        offlineStatus: action.payload
      }

    case CHANGE_LOGIN_STATUS:      
      return {
        ...state,
        loginStatus: action.payload
      }

    case CHANGE_USER_INFO:
      return {
        ...state,
        userInfo: action.payload
      }
      
    default: 
      return state;
  }
}
