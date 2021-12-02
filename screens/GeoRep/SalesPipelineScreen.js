import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function SalesPipelineScreen(props) {
  useEffect(() => {
    props.screenProps.setOptions({
      title: "Sales Pipeline"
    })
  });
  return (
    <SafeAreaView>
      <View>
        <Text>SalesPipelineScreen</Text>
      </View>
    </SafeAreaView>
  )
}