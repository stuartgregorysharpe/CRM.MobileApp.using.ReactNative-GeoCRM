import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function HelpScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Help"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>HelpScreen</Text>
      </View>
    </SafeAreaView>
  )
}