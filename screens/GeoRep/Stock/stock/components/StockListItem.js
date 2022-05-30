import {View, Text} from 'react-native';
import React from 'react';
import {Colors} from '../../../../../constants';
import {AppText} from '../../../../../components/common/AppText';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

export default function StockListItem({item}) {
  return (
    <View style={{marginHorizontal: 15}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          marginBottom: 3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex: 3}}>
          <AppText
            size="big"
            type="secondaryBold"
            title={item.description}
            style={{fontSize: 12.5}}></AppText>
          <AppText
            type="secondaryMedium"
            title={item.stock_type === 'Consumables' ? item.qty : item.serial}
            color={Colors.disabledColor}
            style={{fontSize: 10.4}}></AppText>
        </View>
        <View style={{flex: 2}}>
          <AppText
            type="secondaryMedium"
            title={item.stock_type}
            color={Colors.blackColor}
            style={{fontSize: 10.4}}></AppText>
        </View>
        <View style={{flex: 2, alignItems: 'flex-end'}}>
          <AppText
            type="secondaryMedium"
            title={item.added_date}
            color={Colors.blackColor}
            style={{fontSize: 10.4}}></AppText>
        </View>
      </View>
      <View style={{height: 1, backgroundColor: Colors.greyColor}}></View>
    </View>
  );
}
