import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AddActionItemModal from './CRM/action_items/modals/AddActionItemModal';
import ActionItemsModal from './CRM/action_items/modals/ActionItemsModal';
export default function UITestScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: 'UITest',
      });
    }
  });
  const addActionItemModalRef = useRef(null);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            addActionItemModalRef.current.showModal();
          }}>
          <Text>{'Add Action '}</Text>
        </TouchableOpacity>
        <ActionItemsModal ref={addActionItemModalRef} locationId={'1354'} />
      </View>
    </SafeAreaView>
  );
}
