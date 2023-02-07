import { stat } from 'react-native-fs';
import {CHANGE_LOGIN_STATUS, CHANGE_USER_INFO} from '../actions/actionTypes';

const initialState = {
  type: null, // success, error
  title: null,
  message: null,
  options: null,
  visible: false,
  notificationVisible: false,
  loadingBarVisible: false,
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

    case 'SHOW_LOADING_BAR':
      return {
        ...state,
        type: action.payload.type,
        title: action.payload.title,
        loadingBarVisible: true,
      };

    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        type: action.payload.type,
        title: action.payload.title,
        message: action.payload.message,
        options: action.payload.options,
        autoHide: action.payload.autoHide,
        notificationVisible: true,        
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
        notificationVisible: false,        
      };

    case 'CLEAR_LOADING_BAR':
      return {
        ...state,
        type: null,
        title: null,
        loadingBarVisible: false
      }
    default:
      return state;
  }
};
