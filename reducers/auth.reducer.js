import { CHANGE_LOGIN_STATUS, CHANGE_USER_INFO } from "../actions/actionTypes";

const initialState = {
  loginStatus: "logout",
  userInfo: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state=initialState, action) => {
  switch(action.type) {
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
