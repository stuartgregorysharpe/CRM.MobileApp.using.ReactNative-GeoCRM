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
import {Colors} from '../../constants';
import TrendChartView from './Touchpoint/components/TrendChartView';
import LeaderboardContainer from './Touchpoint/containers/LeaderboardContainer';
import TouchpointContainer from './Touchpoint/containers/TouchpointContainer';
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
      <TouchpointContainer
        historyNavigationParam={{isHistoryDetail: true, historyId: 1}}
      />
    </SafeAreaView>
  );
}
