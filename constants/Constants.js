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
    DATE_FORMAT_SHORT_NAME: 'DD MMM YYYY',
    DATE_FORMAT_API: 'YYYY-MM-DD',
    DATE_FORMAT_LONG: 'ddd, DD MMM YYYY',
    DATE_FORMAT_DATE_TIME: 'DD MMM YYYY HH:mm',
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
    FORM_TYPE_PRODUCT_ISSUES: 'product_issues',
    FORM_TYPE_PRODUCT_RETURN: 'returns',
    FORM_TYPE_MULTI_SELECT_WITH_THOTO: 'multi_select_with_photo',
    FORM_TYPE_TIERED_MULTIPLE_CHOICE: 'tiered_multiple_choice',
    FORM_TYPE_FORMAT_PRICE: 'format_price',
    FORM_TYPE_BRAND_COMPETITOR_FACING: 'brand_competitor_facings',
    FORM_TYPE_FSU_CAMPAIGN: 'fsu_campaign',
    FORM_TYPE_POS_CAPTURE: 'pos_capture',
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
    ACTION_INPUT_BARCODE: 'ACTION_INPUT_BARCODE',
    ACTION_CLOSE: 'ACTION_CLOSE',
    ACTION_VIEW: 'ACTION_VIEW',
    ACTION_ACCEPT: 'ACTION_ACCEPT',
    ACTION_REMOVE: 'ACTION_REMOVE',
    ACTION_CHANGE_NETWORK: 'ACTION_CHANGE_NETWORK',
    ACTION_CHANGE_ITEM_PRICE: 'ACTION_CHANGE_ITEM_PRICE',
    ACTION_CHANGE_ITEM_PRICE_TYPE: 'ACTION_CHANGE_ITEM_PRICE_TYPE',
    ACTION_COMP: 'ACTION_COMP',
    ACTION_CHANGE_ITEM_FACING: 'ACTION_CHANGE_ITEM_FACING',
    ACTION_CHANGE_ITEM_PLACED: 'ACTION_CHANGE_ITEM_PLACED',
    ACTION_APPLY: 'ACTION_APPLY',
    ACTION_REFRESH : 'ACTION_REFRESH'
  },

  stockPrefix: {
    DEVICE: 'MSN: ',
    CONSUMABLE: 'Qty: ',
    SIM: 'ICCID: ',
    MSISDN: 'MSISDN: ',
    MSN: 'MSN: ',
    IMEI: 'IMEI: ',
    MSN_IMEI: 'MSN/IMEI: '
  },

  stockType: {
    DEVICE: 'Device',
    CONSUMABLE: 'Consumables',
    SIM: 'Sim',
    RETURN: 'RETURN',
  },

  networkType: {
    VODACOM: 'Vodacom',
    CELL: 'Cell C',
    TELKOM: 'Telkom',
  },

  stockDeviceType: {
    SELL_TO_TRADER: 'SELL_TO_TRADER',
    SWOP_AT_TRADER: 'SWOP_AT_TRADER',
    TARDER: 'TRADER',
    TRANSFER: 'TRANSFER',
  },

  debugMode: {
    NO_DEBUG: 0,
    DEBUG_UI_SCREEN: 1,
  },
  questionButtonType: {
    QUESTION_BUTTON_DONE: 'QUESTION_BUTTON_DONE',
    QUESTION_BUTTON_NEXT: 'QUESTION_BUTTON_NEXT',
    QUESTION_BUTTON_DISABLED: 'QUESTION_BUTTON_DISABLED',
  },
  tabType: {
    TAB_TYPE_BOTTOM_BAR: 'TAB_TYPE_BOTTOM_BAR',
  },
  modalType: {
    MODAL_TYPE_CENTER: 'MODAL_TYPE_CENTER',
    MODAL_TYPE_BOTTOM: 'MODAL_TYPE_BOTTOM',
    MODAL_TYPE_FULL: 'MODAL_TYPE_FULL',
    MODAL_TYPE_FULL_WITH_BOTTOM : 'MODAL_TYPE_FULL_WITH_BOTTOM'
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
  msisdnPrefix: '27',
  msisdnErrorMessage: 'MSISDN must be 11 digits',
  chooseReason: 'Please choose a reason before making a selection or scanning',
  features: {
    FEATURE_PRODUCT_CHANNELS: 'product_channels',
    FEATURE_OUTCOMES: 'outcomes',
  },

  deviceType: [    
    'Additional',
    'Primary'
  ],
  deviceTypeLabel : {
    PRIMARY : 'Primary Device',
    ADDITIONAL : 'Additional Device'
  },
  productFilterType:{
    PRODUCT_TYPE: 'product_type',
    BRAND: 'brand'
  },
  
  storageKey: {
    CHECKIN_SCHEDULE_ID: '@checkin_schedule_id',
    OFFLINE_SCHEDULE_CHECKINS: '@offline_schedule_checkins',
  },

};
