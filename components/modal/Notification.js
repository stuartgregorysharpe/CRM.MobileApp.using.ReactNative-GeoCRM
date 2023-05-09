import React, {useEffect, useMemo} from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Platform,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {clearNotification} from '../../actions/notification.action';
import Colors, {whiteLabel} from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {style} from '../../constants/Styles';
import {SubmitButton} from '../shared/SubmitButton';

export const Notification = ({}) => {
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.notificationVisible) {
      
      if (notification.autoHide === true)
        setTimeout(() => dispatch(clearNotification()), 2000);
    }
  }, [notification.notificationVisible]);

  const containerStyle = useMemo(
    () =>
      notification.type === 'success'
        ? styles.fullScreen
        : notification.type === 'fullScreen' ||
          notification.type == 'error' ||
          notification.type == 'error_card' ||
          notification.type == 'error_signin' ||
          notification.type == 'oop'
        ? styles.fullScreen
        : styles.danger,
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
  const cancelButtonStyle = notification.cancelButtonAction
    ? styles.button
    : styles.cancelButton;
  const onClose = () => {
    if (notification?.cancelable) {
      dispatch(clearNotification());
    }
  };
  
  return (
    <Modal
      animationType="fade"
      visible={notification.notificationVisible}
      onBackdropPress={() => onClose()}
      onRequestClose={() => {
        onClose();
      }}
      transparent={true}>
      <View
        style={[
          styles.centeredView,
          {
            backgroundColor:
              Platform.OS === 'android' ? '#00000025' : '#00000065',
          },
        ]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <View style={styles.modalView}>
          {notification.title != undefined && (
            <Text style={styles.title}>{notification.title}</Text>
          )}

          <Text style={styles.message}>{notification?.message}</Text>
          <View style={styles.divider}></View>

          {!notification.cancelButtonText && (
            <TouchableHighlight
              underlayColor="#DDDDDD"
              style={{
                alignItems: 'center',
                borderBottomEndRadius: 7,
                borderBottomLeftRadius: 7,
              }}
              onPress={() => {
                if (notification.buttonAction) {
                  notification.buttonAction();
                } else {
                  dispatch(clearNotification());
                }
              }}>
              <Text style={styles.button}>{notification.buttonText}</Text>
            </TouchableHighlight>
          )}
          
          {notification.cancelButtonText && (
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableHighlight
                underlayColor="#DDDDDD"
                style={{
                  alignItems: 'center',
                  borderBottomLeftRadius: 7,
                  flex: 1,
                }}
                onPress={() => {
                  if (notification.cancelButtonAction) {
                    notification.cancelButtonAction();
                  } else {
                    dispatch(clearNotification());
                  }
                }}>
                <Text style={cancelButtonStyle}>
                  {notification.cancelButtonText}
                </Text>
              </TouchableHighlight>

              <TouchableHighlight
                underlayColor="#DDDDDD"
                style={{
                  alignItems: 'center',
                  borderBottomEndRadius: 7,
                  flex: 1,
                }}
                onPress={() => {
                  if (notification.buttonAction) {
                    notification.buttonAction();
                  } else {
                    dispatch(clearNotification());
                  }
                }}>
                <Text style={styles.button}>{notification.buttonText}</Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      </View>

      {/* <View
        style={[
          styles.notify,
          containerStyle,
          marginTop && {
            marginTop: marginTop,
            alignItems:'center'
          },
        ]}>

        <View style={{marginBottom:20}}>
          <Text style={styles.notifyText}>
            Token is expired . Please login again.
          </Text>
        </View>

        <SubmitButton title={"Go To Login"} onSubmit={() =>{
          if(notification.buttonAction) {notification.buttonAction();}
        }}></SubmitButton>                
      </View> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  notify: {
    zIndex: 999999999999,
    padding: 20,
    paddingTop: 50,
    marginTop: Platform.OS === 'iOS' ? 20 : 0,
    justifyContent: 'center',
  },

  success: {
    backgroundColor: '#5cc771',
  },
  danger: {
    backgroundColor: '#e02865',
  },

  fullScreen: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  fullScreenWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },

  alignLeft: {
    textAlign: 'left',
  },
  alignRight: {
    textAlign: 'right',
  },
  alignCenter: {
    textAlign: 'center',
  },

  notifyTitle: {
    textAlign: 'right',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },

  notifyText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    zIndex: 9999999999,
  },

  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 7,
    padding: 0,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  title: {
    textAlign: 'center',
    fontFamily: Fonts.secondaryBold,
    fontSize: 16,
    color: Colors.primaryColor,
    paddingTop: 15,
  },

  message: {
    textAlign: 'center',
    fontFamily: Fonts.secondaryBold,
    fontSize: 16,
    color: '#000',
    padding: 10,
  },

  button: {
    fontFamily: Fonts.secondaryBold,
    fontSize: 16,
    color: whiteLabel().mainText,
    padding: 10,
  },
  cancelButton: {
    fontFamily: Fonts.secondaryBold,
    fontSize: 16,
    color: Colors.disabledColor,
    padding: 10,
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
  },
});
