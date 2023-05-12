import {
  SLIDE_STATUS,
  SUB_SLIDE_STATUS,
  CHANGE_PROFILE_STATUS,
  CHANGE_MORE_STATUS,
  SHOW_MORE_COMPONENT,
  CHANGE_LIBRARY_CHILD_STATUS,
  CHANGE_CURRENT_LOCATION,
  BACK_ICON_STATUS,
  CHANGE_DISPOSITION_INFO,
  CHANGE_LOCATION_ACTION,
  CHANGE_BOTTOM_TAB_ACTION,
  LOCATION_CONFIRM_MODAL_VISIBLE,
  CHANGE_SYNC_START,  
} from '../actions/actionTypes';

const initialState = {
  backIconStatus:false,
  crmSlideStatus: false,
  subSlideStatus: false,
  showProfile: 1,
  showMoreScreen: 1,
  visibleMore: '',
  showLibraryChild: false,
  currentLocation: {},
  statusDispositionInfo: false,
  locationAction: null,
  bottomTabAction: null,
  locationConfirmModalVisible: false,
  syncStart: true,  
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state=initialState, action) => {
  switch(action.type) {
   
    case CHANGE_SYNC_START:
      return {
        ...state,
        syncStart: action.payload
      }
    case BACK_ICON_STATUS:
      return {
        ...state,
        backIconStatus: action.payload 
      }
    case SLIDE_STATUS:
      return {
        ...state,
        crmSlideStatus: action.payload 
      }
    case SUB_SLIDE_STATUS:
      return {
        ...state,
        subSlideStatus: action.payload 
      }
    case CHANGE_PROFILE_STATUS:
      return {
        ...state,
        showProfile: action.payload
      }
    case CHANGE_MORE_STATUS: 
      return {
        ...state,
        showMoreScreen: action.payload
      }
    case SHOW_MORE_COMPONENT:
      return {
        ...state,
        visibleMore: action.payload
      }
    case CHANGE_LIBRARY_CHILD_STATUS:
      return {
        ...state,
        showLibraryChild: action.payload
      }
    case CHANGE_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload
      }
    case CHANGE_DISPOSITION_INFO:
      return {
        ...state,
        statusDispositionInfo: action.payload
      }
    case CHANGE_LOCATION_ACTION:
      return {
        ...state,
        locationAction: action.payload
      }
    case CHANGE_BOTTOM_TAB_ACTION:
      return {
        ...state,
        locationAction: action.payload
      }
    case LOCATION_CONFIRM_MODAL_VISIBLE:
      return {
        ...state,
        locationConfirmModalVisible: action.payload
      }
    default: 
      return state;
  }
}