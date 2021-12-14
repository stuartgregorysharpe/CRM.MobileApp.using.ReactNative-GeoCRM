import { CHANGE_BOTTOM_TAB_LIST } from "../actions/actionTypes";

const initialState = {
  payload: {
    "iss": "universal_api.georep.com", // Issuer
    "iat": 2345232623523, //time of issue
    "exp": 2435252545353, //expiry of access token
    "universal_user_id": "242412",
    "external_jwt": "fsdf3dffdws2fdsfwsdf28dnjnf2f9sd", //JWT for accessing external systems (Flash APIs)
    "default_project": "geo_rep",
    "user_scopes": {
      "geo_rep": {
        "base_url": "south-africa.georep.com",
        "project_custom_name": "Geo Rep",
        "business_unit_id": "25",
        "client_id": "10",
        "user_type": "Super Admin",
        "user_id": "15",
        "user_name": "Jack Reacher",
        "user_email": "test@georep.com",
        "modules_nav_order": {
          0: "crm_locations",
          1: "web_links",
          2: "calendar",
          3: "content_library",
          4: "offline_sync",
          5: "support",

          // 0: "home_geo",
          // 1: "crm_locations",
          // 2: "web_links",
          // 3: "calendar",
          // 4: "forms",
          // 5: "content_library",
          // 6: "product_sales",
          // 7: "notifications",
          // 8: "messages",
          // 9: "offline_sync",
          // 10: "recorded_sales",
          // 11: "sales_pipeline",
          // 12: "support",
        }
      },
      "geo_life": {
        "base_url": "south-africa.life.com",
        "project_custom_name": "Geo Life",
        "business_unit_id": "21",
        "client_id": "17",
        "user_type": "Admin",
        "user_id": "23",
        "user_name": "Jack Reacher",
        "user_email": "test@georep.com",
        "modules_nav_order": {
          0: "home_life",
          1: "news",
          2: "locations_life",
          3: "check_in",
          4: "access",
          5: "club",
          6: "flashbook",
          7: "business_directory",
          8: "content_library",
          9: "forms",
          10: "support",
          11: "loyalty_cards",
          12: "lunch_orders",
          13: "messages",
          14: "profile",
          15: "report_fraud",
          16: "web_links",
          17: "well_being",
        }
      },
      "geo_crm": {
        "base_url": "crm.georep.com",
        "project_custom_name": "Geo CRM",
        "business_unit_id": "23",
        "client_id": "19",
        "user_type": "Mobile",
        "user_id": "37",
        "user_name": "Jack Reacher",
        "user_email": "test@georep.com",
        "modules_nav_order": {
          0: "crm_locations",
          1: "sales_pipeline",
          2: "content_library"
        }
      }
    }
  },
  selectProject: 'geo_rep'
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state=initialState, action) => {
  switch(action.type) {
    case CHANGE_BOTTOM_TAB_LIST: 
      return {
        ...state,
        selectProject: action.payload
      }
    default: 
      return state;
  }
}