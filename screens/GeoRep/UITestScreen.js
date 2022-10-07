import 'react-native-reanimated';
import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Colors} from '../../constants';
import CustomerSalesHistoryContainer from './CRM/customer_sales/containers/CustomerSalesHistoryContainer';
export default function UITestScreen({screenProps}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.bgColor}}>
      <CustomerSalesHistoryContainer />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
