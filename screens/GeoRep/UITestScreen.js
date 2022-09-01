import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import {Colors} from '../../constants';
import dummyData from '../../components/shared/FSUCampaign/dummyData.json';
import FSUCampaign from '../../components/shared/FSUCampaign';
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
      <FSUCampaign item={dummyData} />
    </SafeAreaView>
  );
}
