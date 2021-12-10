import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function ProfileScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Profile"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>ProfileScreen</Text>
      </View>
    </SafeAreaView>
  )
}