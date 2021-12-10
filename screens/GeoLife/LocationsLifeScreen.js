import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function LocationsLifeScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Locations Life"
      });
    }
  })
  return (
    <SafeAreaView>
      <View>
        <Text>LocationsLifeScreen</Text>
      </View>
    </SafeAreaView>
  )
}