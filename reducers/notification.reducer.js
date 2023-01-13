import {CHANGE_LOGIN_STATUS, CHANGE_USER_INFO} from '../actions/actionTypes';

const initialState = {
  type: null, // success, error
  title: null,
  message: null,
  options: null,
  visible: false,
  autoHide: true,
  buttonText: false,
  buttonAction: false,
  cancelButtonText: false,
  cancelButtonAction: false,
  cancelable: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        type: action.payload.type,
        title: action.payload.title,
        message: action.payload.message,
        options: action.payload.options,
        autoHide: action.payload.autoHide,
        visible: true,
        buttonText: action.payload.buttonText,
        buttonAction: action.payload.buttonAction,
        cancelButtonText: action.payload.cancelButtonText,
        cancelButtonAction: action.payload.cancelButtonAction,
        cancelable: action.payload.cancelable,
      };

    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        type: null,
        title: null,
        message: null,
        options: null,
        autoHide: true,
        visible: false,
      };
    default:
      return state;
  }
};
