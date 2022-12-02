import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import CartView from '../components/CartView';

const CartContainer = props => {
  return (
    <View style={[styles.container, props.style]}>
      <CartView />
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
