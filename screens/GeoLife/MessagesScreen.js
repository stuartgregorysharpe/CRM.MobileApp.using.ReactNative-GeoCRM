import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function MessagesScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Messages"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>MessagesScreen</Text>
      </View>
    </SafeAreaView>
  )
}