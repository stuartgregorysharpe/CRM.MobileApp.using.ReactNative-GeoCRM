import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function FlashbookScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "FlashBook"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>FlashbookScreen</Text>
      </View>
    </SafeAreaView>
  )
}