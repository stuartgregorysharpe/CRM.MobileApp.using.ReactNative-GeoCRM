import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function OfflineSyncScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Sync"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>OfflineSyncScreen</Text>
      </View>
    </SafeAreaView>
  )
}