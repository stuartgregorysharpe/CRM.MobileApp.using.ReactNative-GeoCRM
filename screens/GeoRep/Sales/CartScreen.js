import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import BackButtonHeader from '../../../components/Header/BackButtonHeader';
import {Colors} from '../../../constants';
import CartContainer from './containers/CartContainer';

const CartScreen = props => {
  const navigation = props.navigation;

  useEffect(() => {
    refreshHeader();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshHeader();
    });
    return unsubscribe;
  }, [navigation]);

  const canGoBack = props.screenProps?.canGoBack();
  const refreshHeader = () => {
    if (props.screenProps) {
      props.screenProps.setOptions({
        headerTitle: () => {
          return (
            <BackButtonHeader title={'Cart'} navigation={props.navigation} />
          );
        },
        tabBarStyle: {
          height: 50,
          paddingBottom: Platform.OS == 'android' ? 5 : 0,
          backgroundColor: Colors.whiteColor,
        },
      });
    }
  };

  return <CartContainer {...props} />;
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
});

export default CartScreen;
