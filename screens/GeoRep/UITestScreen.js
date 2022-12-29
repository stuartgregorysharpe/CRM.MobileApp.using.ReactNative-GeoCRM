import 'react-native-reanimated';
import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Colors} from '../../constants';
import OrderDetailContainer from './Home/Orders/containers/OrderDetailContainer';
export default function UITestScreen({screenProps}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.bgColor}}>
      <OrderDetailContainer />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
