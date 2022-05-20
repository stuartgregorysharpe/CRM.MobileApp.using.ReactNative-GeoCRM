import React, {useEffect  , useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import SKUCount from '../../components/shared/SKUCount';
import SKUSelect from '../../components/shared/SKUSelect';
import LastScanResultView from '../../components/shared/SKUSelect/components/LastScanResultView';
import SKUScanContainer from '../../components/shared/SKUSelect/components/SKUScanView';
import dummyData from '../../components/shared/SKUCount/dummyData.json';
import SKUSelectForm from '../../components/shared/SKUSelect/SKUSelectForm';
import {Constants} from '../../constants';
export default function UITestScreen({screenProps}) {
  const [item, setItem] = useState(null)
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: 'UITest',
      });
    }
    setItem(dummyData);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <SKUCount
          item={item}
          formIndex={2}
          onFormAction={({type, value, item}) => {
            console.log('type', type);
            console.log('value', value);
          }}
        />
      </View>
    </SafeAreaView>
  );
}
