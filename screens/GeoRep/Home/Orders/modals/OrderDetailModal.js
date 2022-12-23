import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import CModal from '../../../../../components/common/CModal';
import {Colors, Constants, Fonts, Values} from '../../../../../constants';
import OrderDetailContainer from '../containers/OrderDetailContainer';

const OrderDetailModal = React.forwardRef((props, ref) => {
  const {item} = props;
  const title = `Details: # ${item?.order_number}`;
  const onBack = () => {
    ref.current.hideModal();
  };
  return (
    <CModal
      ref={ref}
      title={title}
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      closableWithOutsideTouch
      hideClear
      titleContainer={{marginBottom: 10}}
      customRightHeaderView={
        <TouchableOpacity style={styles.clearButtonContainer} onPress={onBack}>
          <Text style={styles.backText}>{'Back'}</Text>
        </TouchableOpacity>
      }
      {...props}>
      <OrderDetailContainer {...props} />
    </CModal>
  );
});

const styles = StyleSheet.create({
  backText: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.secondaryRegular,
    color: Colors.redColor,
  },
  clearButtonContainer: {
    position: 'absolute',
    right: 20,
  },
});
export default OrderDetailModal;
