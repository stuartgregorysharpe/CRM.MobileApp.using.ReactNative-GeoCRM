import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AddActionItemModal from './CRM/action_items/modals/AddActionItemModal';
import UpdateActionItemModal from './CRM/action_items/modals/UpdateActionItemModal';
import ActionItemsModal from './CRM/action_items/modals/ActionItemsModal';
import SKUScanView from '../../components/shared/SKUSelect/components/SKUScanView';
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
        <SKUScanView />
      </View>
    </SafeAreaView>
  );
}
