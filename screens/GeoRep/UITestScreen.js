import React, {useEffect} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import SKUCount from '../../components/shared/SKUCount';
import SKUCountForm from '../../components/shared/SKUCount/SKUCountForm';
import dummyData from '../../components/shared/SKUCount/dummyData.json';
import {Constants} from '../../constants';
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
        <SKUCount
          key={'sku_count_form'}
          item={dummyData}
          onFormAction={({type, value}) => {
            if (type == Constants.actionType.ACTION_FORM_SUBMIT) {
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}
