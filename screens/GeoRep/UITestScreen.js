import 'react-native-reanimated';
import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Colors} from '../../constants';
import CustomerSalesHistoryContainer from './CRM/customer_sales/containers/CustomerSalesHistoryContainer';
import PosCapture from '../../components/shared/PosCapture';
import item from '../../components/shared/PosCapture/dummyData.json';
export default function UITestScreen({screenProps}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.bgColor}}>
      <PosCapture
        questionType={item.question_type}
        item={item}
        onFormAction={({type, value, item}) => {}}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
