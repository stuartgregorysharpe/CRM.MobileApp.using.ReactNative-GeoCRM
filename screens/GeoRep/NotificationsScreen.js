import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function NotificationsScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Notifications"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>NotificationsScreen</Text>
      </View>
    </SafeAreaView>
  )
}