import React, {useEffect, useState, useImperativeHandle} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Colors, Constants, Fonts, Images, Values} from '../../constants';
import {whiteLabel} from '../../constants/Colors';
import KeyboardManager from 'react-native-keyboard-manager';


const CModal = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    hideClose,
    hideClear,
    hideDivider,
    closableWithOutsideTouch,
    modalType,
    clearText,
    isKeyboardManager = true,
  } = props;

  const _modalType = modalType || Constants.modalType.MODAL_TYPE_CENTER;
  const isCenterModal = _modalType == Constants.modalType.MODAL_TYPE_CENTER;
  const isBottomModal = _modalType == Constants.modalType.MODAL_TYPE_BOTTOM;
  const isFullModal = _modalType == Constants.modalType.MODAL_TYPE_FULL;
  const isFullWithBottomModal =
    _modalType == Constants.modalType.MODAL_TYPE_FULL_WITH_BOTTOM;

  useImperativeHandle(ref, () => ({
    showModal: () => {
      setIsVisible(true);

      if(isKeyboardManager)
        KeyboardManager.setEnable(false);

      if (props.onShowModal) {
        props.onShowModal(true);
      }
    },

    hideModal: () => {
      setIsVisible(false);
      if(isKeyboardManager)
        KeyboardManager.setEnable(true);
    },
  }));

  const onClose = () => {
    if (props.onClose) {
      props.onClose();
    }
    setIsVisible(false);
    if(isKeyboardManager)
      KeyboardManager.setEnable(true);
  };

  const onClear = () => {
    if (props.onClear) {
      props.onClear();
    }
    setIsVisible(false);
    if(isKeyboardManager)
      KeyboardManager.setEnable(true);
  };

  return (
    <View style={[props.style]}>
      <Modal
        animationType="fade"
        transparent
        visible={isVisible}
        onRequestClose={onClose}>
        <View
          style={[
            isCenterModal && styles.dim,
            isBottomModal && styles.bottomModalDim,
            isFullModal && styles.fullModalDim,
            isFullWithBottomModal && styles.fullWithBottomModalDim,
            
          ]}>
          {closableWithOutsideTouch && (
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
          )}

          <KeyboardAvoidingView
            behavior="padding"
            style={[
              isCenterModal && styles.modalContainer,
              isBottomModal && styles.bottomModalContainer,
              isFullModal && styles.fullModalContainer,
              isFullWithBottomModal && styles.fullWithBottomModalContainer,

            ]}>
            <View style={styles.bodyContainer}>
              {!isFullModal && !hideDivider && (
                <TouchableOpacity onPress={onClose}>
                  <View style={styles.modalHandler} />
                </TouchableOpacity>
              )}

              {!hideClose && (
                <TouchableOpacity
                  style={styles.closeIconContainer}
                  onPress={onClose}>
                  <Image
                    source={Images.iconClose}
                    style={styles.closeIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}

              {(props.title || props.icon) && (
                <View
                  style={[
                    styles.titleContainer,
                    {marginTop: hideDivider ? 10 : 5},
                    props.titleContainer,
                  ]}>
                  <View
                    style={{
                      flex: 1,
                      marginRight: 50,
                      alignItems:
                        props.headerType === 'center' ? 'center' : 'flex-start',
                    }}>
                    {props.title && (
                      <Text
                        style={[
                          styles.title,
                          {
                            color:
                              props.headerType === 'center'
                                ? whiteLabel().mainText
                                : Colors.blackColor,
                          },
                        ]}>
                        {props.title}
                      </Text>
                    )}
                  </View>

                  {!hideClear && (
                    <TouchableOpacity
                      style={styles.clearButtonContainer}
                      onPress={onClear}>
                      <Text style={styles.clearText}>
                        {clearText || 'Clear'}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {props.customRightHeaderView}
                </View>
              )}
              {props.children}
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  dim: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  fullWithBottomModalDim: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    //height: Dimensions.get("screen").height - (Platform.OS === 'android' ? 120 : 120),
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  modalContainer: {
    margin: 32,
    position: 'absolute',
    flex: 1,
    backgroundColor: Colors.bgColor,
    borderWidth: 0,
    justifyContent: 'center',
    borderRadius: 8,
    width: 300,
    zIndex: 500,
  },
  bottomModalDim: {
    position: 'absolute',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  fullModalDim: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.bgColor,
  },
  bottomModalContainer: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 500,
    overflow: 'hidden',
    backgroundColor: Colors.bgColor,
    paddingBottom: Platform.OS === 'android' ? 0 : 25,
  },
  fullModalContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  fullWithBottomModalContainer: {
    position: 'absolute',
    alignSelf: 'stretch',
    width: '100%',
    height: '100%',
  },

  title: {
    fontFamily: Fonts.secondaryBold,
    fontSize: Values.fontSize.medium,
    color: Colors.blackColor,
    marginLeft: 12,
    flex: 1,
  },

  titleContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingLeft: 5,
    paddingRight: 15,
    //paddingRight: 50,
  },
  titleIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 16,
    height: 16,
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
  modalHandler: {
    height: 4,
    width: 90,
    marginVertical: 8,
    backgroundColor: Colors.grey2,
  },
  clearButtonContainer: {
    position: 'absolute',
    right: 20,
  },
  clearText: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.secondaryRegular,
    color: Colors.redColor,
  },
});
export default CModal;
