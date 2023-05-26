import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, Constants} from '../../../../../constants';
import {AppText} from '../../../../../components/common/AppText';
import {whiteLabel} from '../../../../../constants/Colors';
import {getSubText} from '../../../../../helpers/viewHelper';
import StagingShipmentItem from '../../staging/components/StagingShipmentItem';

export default function StockListItem({onItemPressed, item}) {
  const {stock_type} = item;
  let description = item.description;
  if (stock_type == Constants.stockType.SIM) {
    description = item.network;
  }
  const subText = getSubText(item);
  const addedDate = item.added_date;

  return (
    <TouchableOpacity onPress={onItemPressed}>
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
              title={description}
              style={{fontSize: 12.5}}></AppText>
            <AppText
              type="secondaryMedium"
              title={subText}
              color={whiteLabel().subText}
              style={{fontSize: 10.4}}></AppText>
          </View>

          <View style={{flex: 2}}>
            <AppText
              type="secondaryMedium"
              title={stock_type}
              style={{fontSize: 10.4}}></AppText>
          </View>

          <View style={{flex: 2, alignItems: 'flex-end'}}>
            <AppText
              type="secondaryMedium"
              title={addedDate}
              style={{fontSize: 10.4}}></AppText>
          </View>
          
        </View>
        <View style={{height: 1, backgroundColor: Colors.greyColor}}></View>
      </View>
    </TouchableOpacity>
  );
}
