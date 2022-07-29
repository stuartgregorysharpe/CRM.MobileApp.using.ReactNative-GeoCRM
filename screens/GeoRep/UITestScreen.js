import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView} from 'react-native';

import {Colors} from '../../constants';
import TestLocationUI from '../../services/LocationService/TestLocationUI';
import HmsMap from '../../services/Map/HsmMap';
export default function UITestScreen({screenProps}) {
  const modalRef = useRef(null);
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: 'UITest',
      });
    }
  });
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.bgColor}}>
      <TestLocationUI />
    </SafeAreaView>
  );
}
