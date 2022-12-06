import React, {useState, useEffect , useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import { Constants } from '../../../../constants';
import CartView from '../components/CartView';
import TransactionSubmitModal from '../modal/TransactionSubmitModal';

const CartContainer = props => {

  const transactionSubmitModalRef = useRef(null);

  const onTransactionSubmitModalClosed = ({ type, value}) => {
    if(type == Constants.actionType.ACTION_DONE){
      transactionSubmitModalRef.current.hideModal();
    }
  }
  
  return (
    <View style={[styles.container, props.style]}>

      <TransactionSubmitModal         
        hideClear
        ref={transactionSubmitModalRef}
        onButtonAction={onTransactionSubmitModalClosed}
      />

      <CartView 
        onNext={() => {
          if(transactionSubmitModalRef.current)
            transactionSubmitModalRef.current.showModal();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
});

export default CartContainer;
