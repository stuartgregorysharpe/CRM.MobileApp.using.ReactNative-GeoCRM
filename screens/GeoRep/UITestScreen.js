import 'react-native-reanimated';
import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Colors} from '../../constants';

import CartContainer from './Sales/containers/CartContainer';
export default function UITestScreen({screenProps}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.bgColor}}>
      <CartContainer />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
