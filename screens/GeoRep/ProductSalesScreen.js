import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function ProductSalesScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Sales"
      });
    }
  });
  return (
    <SafeAreaView>
      <View>
        <Text>ProductSalesScreen</Text>
      </View>
    </SafeAreaView>
  )
}