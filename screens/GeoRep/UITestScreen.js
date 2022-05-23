import React, {useEffect} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import ActionItemsContainer from './CRM/action_items/containers/ActionItemsContainer';
import AddActionFormContainer from './CRM/action_items/containers/AddActionFormContainer';

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
        <AddActionFormContainer />
      </View>
    </SafeAreaView>
  );
}
