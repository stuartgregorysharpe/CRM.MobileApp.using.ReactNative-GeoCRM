import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import FormSubmitFeedbackContainer from '../../components/shared/FormSubmitFeedback/containers/FormSubmitFeedbackContainer';

import dummyData from '../../components/shared/FormSubmitFeedback/dummyData.json';
import FormSubmitFeedbackModal from '../../components/shared/FormSubmitFeedback/modals/FormSubmitFeedbackModal';
import TrendChartView from './Touchpoint/components/TrendChartView';
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
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        style={{marginLeft: 12, marginTop: 12}}
        onPress={() => {
          modalRef.current.showModal();
        }}>
        <Text>Open modal</Text>
      </TouchableOpacity>
      <TrendChartView />
    </SafeAreaView>
  );
}
