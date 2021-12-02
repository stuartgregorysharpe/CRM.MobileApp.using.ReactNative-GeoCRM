import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function NotificationsScreen(props) {
  useEffect(() => {
    props.screenProps.setOptions({
      title: "Notifications"
    })
  });
  return (
    <SafeAreaView>
      <View>
        <Text>NotificationsScreen</Text>
      </View>
    </SafeAreaView>
  )
}