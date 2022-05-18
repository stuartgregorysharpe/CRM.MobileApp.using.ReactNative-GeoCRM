import React, {useEffect} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import ActionItemsContainer from './CRM/action_items/ActionItemsContainer';

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
        <ActionItemsContainer locationId={'1358'} />
      </View>
    </SafeAreaView>
  );
}
