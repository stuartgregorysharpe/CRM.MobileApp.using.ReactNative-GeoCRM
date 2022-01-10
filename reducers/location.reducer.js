import {
  STATUS_PIN_KEY,
  STATUS_LOCATION_MAP,
  STATUS_LOCATION_FILTERS,
  STATUS_LOCATION_SEARCH_LISTS,
  STATUS_LOCATION_INFO,
  CHANGE_PIN_KEY,
  CHANGE_LOCATION_MAP,
  CHANGE_LOCATION_FILTERS,
  CHANGE_LOCATION_SEARCH_LISTS,
  CHANGE_LOCATION_INFO,
  STATUS_STAGE_OUTCOME_UPDATE,
  STATUS_DISPOSITION_FIELDS_UPDATE,
  STATUS_LOCATION_LEADFIELDS,
  CHANGE_LOCATION_LEADFIELDS
} from "../actions/actionTypes";

const initialState = {
  statusPinKeys: 'request',
  statusLocationMaps: 'request',
  statusLocationFilters: 'request',
  statusLocationSearchLists: 'request',
  statusLocationInfo: 'request',
  statusLocationLeadfields: 'request',
  locationPins: [],
  locationMaps: [],
  locationFilters: [],
  locationSearchLists: [],
  locationInfo: {},
  locationLeadfields: {},
  statusStageOutcomeUpdate:'init',
  statusLocationInfoUpdate: 'init',
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case STATUS_PIN_KEY:
      return {
        ...state,
        statusPinKeys: action.payload
      }
    case STATUS_LOCATION_MAP:
      return {
        ...state,
        statusLocationMaps: action.payload
      }
    case STATUS_LOCATION_FILTERS:
      return {
        ...state,
        statusLocationFilters: action.payload
      }
    case STATUS_LOCATION_SEARCH_LISTS:
      return {
        ...state,
        statusLocationSearchLists: action.payload
      }
    case STATUS_LOCATION_INFO:
      return {
        ...state,
        statusLocationInfo: action.payload
      }
    case CHANGE_PIN_KEY:
      return {
        ...state,
        locationPins: action.payload
      }
    case CHANGE_LOCATION_MAP:
      return {
        ...state,
        locationMaps: action.payload
      }
    case CHANGE_LOCATION_FILTERS:
      return {
        ...state,
        locationFilters: action.payload
      }
    case CHANGE_LOCATION_SEARCH_LISTS:
      return {
        ...state,
        locationSearchLists: action.payload
      }
    case CHANGE_LOCATION_INFO:
      console.log("changed location info");
      return {
        ...state,
        locationInfo: action.payload,
        statusLocationInfo: "success"
      }
    case STATUS_STAGE_OUTCOME_UPDATE:
      return {
        ...state,
        statusStageOutcomeUpdate: action.payload
      }
   case STATUS_DISPOSITION_FIELDS_UPDATE:
      return {
         ...state,
         statusLocationInfoUpdate: action.payload
      }
    case STATUS_LOCATION_LEADFIELDS:
      return {
          ...state,
          statusLocationLeadfields: action.payload
      }
    case CHANGE_LOCATION_LEADFIELDS:
      return {
          ...state,
          locationLeadfields: action.payload
      }
    default:
      return state;
  }
}
