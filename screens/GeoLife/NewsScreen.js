import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function NewsScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "News"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>NewsScreen</Text>
      </View>
    </SafeAreaView>
  )
}