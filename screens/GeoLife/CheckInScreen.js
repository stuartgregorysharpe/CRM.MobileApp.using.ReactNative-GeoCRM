import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function CheckInScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Check In"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>CheckInScreen</Text>
      </View>
    </SafeAreaView>
  )
}