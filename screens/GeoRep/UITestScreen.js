import React, {useEffect} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import SelectInputView from '../../components/common/SelectInput/components/SelectInputView';
import SelectItem from '../../components/common/SelectInput/components/SelectItem';
import SingleSelectList from '../../components/common/SelectInput/components/SingleSelectList';
import SingleSelectContainer from '../../components/common/SelectInput/containers/SingleSelectContainer';
import CSingleSelectInput from '../../components/common/SelectInput/CSingleSelectInput';
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
