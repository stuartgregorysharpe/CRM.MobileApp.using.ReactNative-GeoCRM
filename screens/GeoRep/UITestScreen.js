import React, {useEffect} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import SKUSelect from '../../components/shared/SKUSelect';
import dummyData from '../../components/shared/SKUSelect/dummyData.json';
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
        <SKUSelect
          key={'sku_count_form'}
          questionType={Constants.questionType.FORM_TYPE_SKU_COUNT}
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
