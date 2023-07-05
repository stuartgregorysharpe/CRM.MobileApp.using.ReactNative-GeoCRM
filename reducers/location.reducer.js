import {
  STATUS_PIN_KEY,
  STATUS_LOCATION_MAP,  
  STATUS_LOCATION_SEARCH_LISTS,
  STATUS_LOCATION_INFO,
  CHANGE_PIN_KEY,
  CHANGE_LOCATION_MAP,
  CHANGE_LOCATION_FILTERS,
  CHANGE_LOCATION_SEARCH_LISTS,
  STATUS_DISPOSITION_FIELDS_UPDATE,
  LOCATION_ID_CHANGED,
  LOCATION_LOOP_LISTS,
  CHANGE_POLYGONS,
  CHECKIN,
  LOCATION_CHECK_OUT_COMPULSORY_DEVICE,
  LOCATION_CHECK_OUT_COMPULSORY,
  LOCATION_CHECK_OUT_COMPULSORY_LOCATION_FIELD,
} from '../actions/actionTypes';

const initialState = {
  statusPinKeys: 'request',
  statusLocationMaps: 'request',  
  statusLocationSearchLists: 'request',
  statusLocationInfo: 'request',
  statusLocationLeadfields: 'request',
  locationPins: [],
  locationMaps: [],
  locationFilters: [],
  locationSearchLists: [],
  locationInfo: {},
  locationLeadfields: {},
  statusStageOutcomeUpdate: 'init',
  statusLocationInfoUpdate: 'init',
  locationId: 0,
  loopLists: [],
  checkIn: false,
  checkinScheduleId: 0,
  compulsoryDevice : false,
  compulsoryForm: false , 
  compulsoryLocationField: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case CHECKIN:
      return {
        ...state,
        checkIn: action.payload,
        checkinScheduleId:
          action.scheduleId !== undefined
            ? action.scheduleId
            : state.checkinScheduleId,
      };
    case LOCATION_LOOP_LISTS:
      return {
        ...state,
        loopLists: action.payload,
      };
    case LOCATION_ID_CHANGED:
      return {
        ...state,
        locationId: action.payload,
      };
    case STATUS_PIN_KEY:
      return {
        ...state,
        statusPinKeys: action.payload,
      };
    case STATUS_LOCATION_MAP:
      return {
        ...state,
        statusLocationMaps: action.payload,
      };

    case STATUS_LOCATION_SEARCH_LISTS:
      return {
        ...state,
        statusLocationSearchLists: action.payload,
      };
    case STATUS_LOCATION_INFO:
      return {
        ...state,
        statusLocationInfo: action.payload,
      };
    case CHANGE_PIN_KEY:
      return {
        ...state,
        locationPins: action.payload,
      };
    case CHANGE_LOCATION_MAP:
      return {
        ...state,
        locationMaps: action.payload,
      };
    case CHANGE_POLYGONS:
      return {
        ...state,
        polygons: action.payload,
      };
    case CHANGE_LOCATION_FILTERS:
      return {
        ...state,
        locationFilters: action.payload,
      };
    case CHANGE_LOCATION_SEARCH_LISTS:
      return {
        ...state,
        locationSearchLists: action.payload,
      };
    case STATUS_DISPOSITION_FIELDS_UPDATE:
      return {
        ...state,
        statusLocationInfoUpdate: action.payload,
      };

    case LOCATION_CHECK_OUT_COMPULSORY: 
      return {
        ...state,
        compulsoryForm: action.payload
      };

    case LOCATION_CHECK_OUT_COMPULSORY_DEVICE:
      return {
        ...state,
        compulsoryDevice: action.payload,
      };

    case LOCATION_CHECK_OUT_COMPULSORY_LOCATION_FIELD:
      return {
        ...state,
        compulsoryLocationField: action.payload,
      };
      
    default:
      return state;
  }
};
