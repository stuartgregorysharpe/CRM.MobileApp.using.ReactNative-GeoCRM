import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function RecordedSalesScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Recorded Sales"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>RecordedSalesScreen</Text>
      </View>
    </SafeAreaView>
  )
}