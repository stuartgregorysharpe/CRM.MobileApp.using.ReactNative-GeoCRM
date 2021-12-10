import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function CRMLocationsScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "CRM"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>CRMLocationsScreen</Text>
      </View>
    </SafeAreaView>
  )
}