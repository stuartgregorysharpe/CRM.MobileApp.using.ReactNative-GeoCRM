import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import FormatPrice from '../../components/shared/FormatPrice';

import {Colors} from '../../constants';
import dummyData from '../../components/shared/FormatPrice/dummyData.json';
import FormatPriceView from '../../components/shared/FormatPrice/FormatPriceView';
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
      <FormatPriceView item={dummyData} />
    </SafeAreaView>
  );
}
