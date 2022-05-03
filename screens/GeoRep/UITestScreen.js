import React, {useEffect} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {SKUCount} from '../../components/shared/SKUCount';

export default function UITestScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: 'UITest',
      });
    }
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <SKUCount />
      </View>
    </SafeAreaView>
  );
}
