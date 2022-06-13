
export const showNotification = ({ type, title, message, options, autoHide, buttonText, buttonAction ,cancelButtonText }) => ({
    type: 'SHOW_NOTIFICATION',
    payload: {
      type: type || null,
      title: title || null,
      message: message || null,
      options: options || {},
      autoHide : typeof autoHide != 'undefined' ? autoHide : (type && (["success","error"].indexOf(type) > -1) ? false : true),
      buttonText : typeof buttonText != 'undefined' ? buttonText : false,
      buttonAction : typeof buttonAction != 'undefined' ? buttonAction : false,
      cancelButtonText : typeof cancelButtonText != 'undefined' ? cancelButtonText : false,
    },
  });
  
  export const clearNotification = () => ({
    type: 'CLEAR_NOTIFICATION',
  });
