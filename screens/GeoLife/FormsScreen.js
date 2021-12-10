import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function FormsScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Forms"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>FormsScreen</Text>
      </View>
    </SafeAreaView>
  )
}