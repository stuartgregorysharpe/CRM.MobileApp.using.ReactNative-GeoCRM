import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function LunchOrdersScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Lunch Orders"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>LunchOrdersScreen</Text>
      </View>
    </SafeAreaView>
  )
}