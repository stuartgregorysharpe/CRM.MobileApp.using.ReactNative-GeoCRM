import React, {useEffect} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import SelectInputView from '../../components/common/SelectInput/components/SelectInputView';
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
        <SelectInputView
          description="Select UI"
          showDescription={true}
          text={'Fantasy UI'}
          style={{marginTop: 10}}
        />
      </View>
    </SafeAreaView>
  );
}
