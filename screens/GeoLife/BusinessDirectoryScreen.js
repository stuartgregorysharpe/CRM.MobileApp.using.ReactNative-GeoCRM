import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function BusinessDirectoryScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Business Directory"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>BusinessDirectoryScreen</Text>
      </View>
    </SafeAreaView>
  )
}