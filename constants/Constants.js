export default {
  projectType: {
    GEO_REP: 'geo_rep',
    GEO_LIFE: 'geo_life',
    GEO_CRM: 'geo_crm',
  },
  homeStartEndType: {
    START_MY_DAY: 'start_my_day',
    END_MY_DAY: 'end_my_day',
  },
  dateFormat: {
    DATE_FORMAT_DATE_PICKER: 'YYYY/MM/DD',
    DATE_FORMAT_SHORT: 'MM/DD/YYYY',
    DATE_FORMAT_API: 'YYYY-MM-DD',
    DATE_FORMAT_LONG: 'ddd, DD MMM YYYY',
  },
  questionType: {
    FORM_TYPE_SKU_COUNT: 'sku_count',
    FORM_TYPE_SKU_SHELF_SHARE: 'sku_shelf_share',
    FORM_TYPE_SKU_SELECT: 'sku_select',
    FORM_TYPE_YES_NO: 'yes_no',
    FORM_TYPE_TEXT: 'text',
    FORM_TYPE_HEADING: 'heading',
    FORM_TYPE_PARAGRAH: 'paragraph',
    FORM_TYPE_MULTIPLE: 'multiple',
    FORM_TYPE_MULTI_SELECT: 'multi_select',
    FORM_TYPE_NUMBERS: 'numbers',
    FORM_TYPE_EMAIL_PDF: 'email_pdf',
    FORM_TYPE_PRODUCTS: 'products',
    FORM_TYPE_PRODUCT_ISSUES: 'product_issues'
  },

  actionType: {
    ACTION_INFO: 'ACTION_INFO',
    ACTION_NEXT: 'ACTION_NEXT',
    ACTION_COUNT: 'ACTION_COUNT',
    ACTION_CHECK: 'ACTION_CHECK',
    ACTION_FORM_SUBMIT: 'ACTION_FORM_SUBMIT',
    ACTION_FORM_CLEAR: 'ACTION_FORM_CLEAR',
    ACTION_SELECT_ALL: 'ACTION_SELECT_ALL',
    ACTION_DONE: 'ACTION_DONE',
    ACTION_CAPTURE: 'ACTION_CAPTURE',
    ACTION_ADD: 'ACTION_ADD',
    ACTION_CLOSE: 'ACTION_CLOSE',
    ACTION_VIEW: 'ACTION_VIEW',
    ACTION_REMOVE: 'ACTION_REMOVE',
    ACTION_CHANGE_NETWORK : 'ACTION_CHANGE_NETWORK'
  },

  stockPrefix: {
    DEVICE: 'IMEI: ',
    CONSUMABLE: 'Qty: ',
    SIM: 'ICCID: ',
    MSISDN: 'MSISDN: '
  },

  stockType: {
    DEVICE : "Device",
    CONSUMABLE : "Consumables",
    SIM: "Sim",
    RETURN: "RETURN"
  },

  networkType: {
    VODACOM: "Vodacom",
    CELL : "Cell C",
    TELKOM: "Telkom"
  },
  

  stockDeviceType : {
    SELL_TO_TRADER: 'SELL_TO_TRADER',
    SWOP_AT_TRADER: 'SWOP_AT_TRADER',
    TARDER: 'TRADER',
    TRANSFER: 'TRANSFER'
  },  

  debugMode: {
    NO_DEBUG: 0,
    DEBUG_UI_SCREEN: 1,
  },
  questionButtonType: {
    QUESTION_BUTTON_DONE: 'QUESTION_BUTTON_DONE',
    QUESTION_BUTTON_NEXT: 'QUESTION_BUTTON_NEXT',
  },
  tabType: {
    TAB_TYPE_BOTTOM_BAR: 'TAB_TYPE_BOTTOM_BAR',
  },
  modalType: {
    MODAL_TYPE_CENTER: 'MODAL_TYPE_CENTER',
    MODAL_TYPE_BOTTOM: 'MODAL_TYPE_BOTTOM',
    MODAL_TYPE_FULL: 'MODAL_TYPE_FULL',
  },
  userType: {
    USER_TYPE_SUPER_ADMIN: 'Super Admin',
    USER_TYPE_ADMIN: 'Admin',
  },
  buttonType: {
    BUTTON_TYPE_SUMBIT: 'submit',
    BUTTON_TYPE_FORM_LINK: 'form_link',
    BUTTON_TYPE_CHECKIN_LINK: 'checkin_link',
  },
  actionItemType: {
    ACTION_ITEM_TYPE_ACTION: 'Action',
    ACTION_ITEM_TYPE_TASK: 'Task',
    ACTION_ITEM_TYPE_RED_FLAG_CHURN: 'red_flag_churn',
    ACTION_ITEM_TYPE_RED_FLAG_DECLINE: 'red_flag_decline',
  },
  barcodePrefix : "27"
};
