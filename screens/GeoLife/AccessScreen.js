import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function AccessScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Access Control"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>AccessScreen</Text>
      </View>
    </SafeAreaView>
  )
}