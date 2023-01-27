export const showNotification = ({
  type,
  title,
  message,
  options,
  autoHide,
  buttonText,
  buttonAction,
  cancelButtonText,
  cancelButtonAction,
  cancelable,
}) => ({
  type: 'SHOW_NOTIFICATION',
  payload: {
    type: type || null,
    title: title || null,
    message: message || null,
    options: options || {},
    autoHide:
      typeof autoHide != 'undefined'
        ? autoHide
        : type && ['success', 'error'].indexOf(type) > -1
        ? false
        : true,
    buttonText: typeof buttonText != 'undefined' ? buttonText : false,
    buttonAction: typeof buttonAction != 'undefined' ? buttonAction : false,
    cancelButtonAction:
      typeof cancelButtonAction != 'undefined' ? cancelButtonAction : false,
    cancelButtonText:
      typeof cancelButtonText != 'undefined' ? cancelButtonText : false,
    cancelable: typeof cancelable != 'undefined' ? cancelable : false,
  },
});

export const clearNotification = () => ({
  type: 'CLEAR_NOTIFICATION',
});

export const showLoadingBar = ({
  type,
  title
}) => ({
  type: 'SHOW_LOADING_BAR',
  payload: {
    type: type || null,
    title: title || null,
  }
});

export const clearLoadingBar = () => ({
  type: 'CLEAR_LOADING_BAR',
});
