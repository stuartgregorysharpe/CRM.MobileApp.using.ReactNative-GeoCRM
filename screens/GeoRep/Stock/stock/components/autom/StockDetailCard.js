import {View} from 'react-native';
import React from 'react';
import CardView from '../../../../../../components/common/CardView';
import {AppText} from '../../../../../../components/common/AppText';
import {getSubText} from '../../../../../../helpers/viewHelper';
import {whiteLabel} from '../../../../../../constants/Colors';

export default function StockDetailCard({item}) {
  return (
    <CardView
      style={{
        marginTop: 10,
        marginHorizontal: 10,
        borderColor: whiteLabel().borderColor,
        borderWidth: 1,
      }}>
      <View style={{padding: 5}}>
        <AppText
          size="medium"
          type="secondaryBold"
          title={item != undefined ? item.description : ''}
          color={whiteLabel().mainText}></AppText>
        <AppText
          title={getSubText(item)}
          color={whiteLabel().subText}></AppText>
      </View>
    </CardView>
  );
}
