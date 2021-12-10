import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function WellBeingScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Well-being"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>WellBeingScreen</Text>
      </View>
    </SafeAreaView>
  )
}