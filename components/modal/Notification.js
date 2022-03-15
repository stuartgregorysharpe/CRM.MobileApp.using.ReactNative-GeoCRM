import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Modal, View, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../../actions/notification.action';
import { SubmitButton } from '../shared/SubmitButton';


export const Notification = ({}) => {

  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.visible) {      
      if(notification.autoHide === true)
      setTimeout(() => dispatch(clearNotification()), 2000);
    }
  }, [notification]);

  const containerStyle = useMemo(
    () => (notification.type === 'success' ? styles.fullScreen : 
          (notification.type === 'fullScreen' || notification.type == 'error' || notification.type == 'error_card' || notification.type == 'error_signin' || notification.type == 'oop' ? styles.fullScreen : styles.danger) 
    ),
    [notification],
  );

  const marginTop = useMemo(
    () =>
      notification.options && notification.options.marginTop
        ? notification.options.marginTop
        : null,
    [notification],
  );

  const alignStyle = useMemo(
    () =>
      notification.options && notification.options.align === 'right'
        ? styles.alignRight
        : styles.alignLeft,
    [notification],
  );

  return (
    <Modal
      animationType="fade"
      visible={notification.visible}
      onBackdropPress={() => dispatch(clearNotification())}
      transparent={true}>
      <View
        style={[
          styles.notify,
          containerStyle,
          marginTop && {
            marginTop: marginTop,
          },
        ]}>
        <SubmitButton title={"ok"}></SubmitButton>                
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  notify: {
    zIndex: 101,
    padding: 20,
    paddingTop: 50,
    marginTop: Platform.OS === 'iOS' ? 20 : 0,
  },

  success: {
    backgroundColor: '#5cc771',
  },
  danger: {
    backgroundColor: '#e02865',
  },

  fullScreen : {
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },

  fullScreenWrapper : {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    flexGrow : 1
  },

  alignLeft: {
    textAlign: 'left',
  },
  alignRight: {
    textAlign: 'right',
  },
  alignCenter: {
    textAlign: 'center'
  },

  notifyTitle: {
    textAlign: 'right',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },

  notifyText: {
    textAlign: 'right',
    fontSize: 16,
    color: 'white',
  },

  paddingTop : {
    paddingTop: 10
  }
});
