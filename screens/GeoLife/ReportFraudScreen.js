import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function ReportFraudScreen(props) {
  useEffect(() => {
    props.screenProps.setOptions({
      title: "Report Fraud"
    })
  });
  return (
    <SafeAreaView>
      <View>
        <Text>ReportFraudScreen</Text>
      </View>
    </SafeAreaView>
  )
}