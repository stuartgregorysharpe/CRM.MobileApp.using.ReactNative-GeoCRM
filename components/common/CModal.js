import React, {
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Colors, Constants, Fonts, Images, Values} from '../../constants';

const CModal = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const {hideClose, hideClear, closableWithOutsideTouch, modalType, clearText} =
    props;
  const _modalType = modalType || Constants.modalType.MODAL_TYPE_CENTER;
  const isCenterModal = _modalType == Constants.modalType.MODAL_TYPE_CENTER;
  const isBottomModal = _modalType == Constants.modalType.MODAL_TYPE_BOTTOM;
  const isFullModal = _modalType == Constants.modalType.MODAL_TYPE_FULL;
  useImperativeHandle(ref, () => ({
    showModal: () => {
      setIsVisible(true);
      if (props.onShowModal) {
        props.onShowModal(true);
      }
    },
    hideModal: () => {
      setIsVisible(false);
    },
  }));
  const onClose = () => {
    if (props.onClose) {
      props.onClose();
    }
    setIsVisible(false);
  };
  const onClear = () => {
    if (props.onClear) {
      props.onClear();
    }
    setIsVisible(false);
  };
  return (
    <View style={[props.style]}>
      <Modal 
      animationType="fade"
      transparent visible={isVisible} onRequestClose={onClose}>
        <View
          style={[
            isCenterModal && styles.dim,
            isBottomModal && styles.bottomModalDim,
            isFullModal && styles.fullModalDim,
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

          <View
            style={[
              isCenterModal && styles.modalContainer,
              isBottomModal && styles.bottomModalContainer,
              isFullModal && styles.fullModalContainer,
            ]}>
            <View style={styles.bodyContainer}>
              {!isFullModal && <View style={styles.modalHandler} />}

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
                <View style={styles.titleContainer}>
                  {props.title && (
                    <Text style={styles.title}>{props.title}</Text>
                  )}
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
          </View>
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
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
    flex: 1,
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
    backgroundColor: Colors.bgColor,
  },
  fullModalContainer: {
    position: 'absolute',
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
    paddingHorizontal: 15,
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
  clearText: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.secondaryRegular,
    color: Colors.redColor,
  },
});
export default CModal;
