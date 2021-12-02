

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
                "user_email": "test@georep.com",
                "modules_nav_order": {
                    0: "home_geo",
                    1: "crm_locations",
                    2: "calendar",
                    3: "forms",
                    4: "content_library",
                    5: "product_sales",
                    6: "notifications",
                    7: "web_links",
                    8: "help",
                    9: "messages",
                    10: "offline_sync",
                    11: "recorded_sales",
                    12: "sales_pipeline",
                }
            },
            "geo_life": {
                "base_url": "south-africa.life.com",
                "project_custom_name": "Geo Life",
                "business_unit_id": "21",
                "client_id": "17",
                "user_type": "Admin",
                "user_id": "23",
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
                    10: "help",
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
                "user_email": "test@georep.com",
                "modules_nav_order": {
                    0: "crm_locations",
                    1: "sales_pipeline",
                    2: "content_library"
                }
            }
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state=initialState, action) => {
    switch(action.type) {
        default: 
            return state;
    }
}