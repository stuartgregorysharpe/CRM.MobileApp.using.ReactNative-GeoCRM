import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import {Colors} from '../../constants';
import StockStagingContainer from './Stock/staging/StockStagingContainer';
export default function UITestScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: 'UITest',
      });
    }
  });
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.bgColor}}>
      <StockStagingContainer />
    </SafeAreaView>
  );
}
