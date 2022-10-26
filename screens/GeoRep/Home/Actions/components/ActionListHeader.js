import {View} from 'react-native';
import React from 'react';
import {Colors, Strings} from '../../../../../constants';
import {AppText} from '../../../../../components/common/AppText';
import {whiteLabel} from '../../../../../constants/Colors';

export default function ActionListHeader() {
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
            type="secondaryMedium"
            title={Strings.Description}
            color={whiteLabel().mainText}
            style={{fontSize: 12}}></AppText>
        </View>
        <View style={{flex: 2}}>
          <AppText
            type="secondaryMedium"
            title={Strings.Type}
            color={whiteLabel().mainText}
            style={{fontSize: 12}}></AppText>
        </View>
        <View style={{flex: 2}}>
          <AppText
            type="secondaryMedium"
            title={Strings.Due_Date}
            color={whiteLabel().mainText}
            style={{fontSize: 12}}></AppText>
        </View>
      </View>
      <View style={{height: 1, backgroundColor: Colors.blackColor}}></View>
    </View>
  );
}
