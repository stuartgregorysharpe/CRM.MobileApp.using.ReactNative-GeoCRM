import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function HomeLifeScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Home"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>HomeLifeScreen</Text>
      </View>
    </SafeAreaView>
  )
}