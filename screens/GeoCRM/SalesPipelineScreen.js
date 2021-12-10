import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function SalesPipelineScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Pipeline"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>SalesPipelineScreen</Text>
      </View>
    </SafeAreaView>
  )
}