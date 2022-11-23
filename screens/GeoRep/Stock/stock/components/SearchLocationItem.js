import {View, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import {Colors} from '../../../../../constants';
import {AppText} from '../../../../../components/common/AppText';
import { whiteLabel } from '../../../../../constants/Colors';
import { useSelector } from 'react-redux';

export default function SearchLocationItem({ onItemPressed , item}) {

  const features = useSelector(state => state.selection.payload.user_scopes.geo_rep.features);
  const isMSISDN = features.includes("msisdn");
  
  return (
    <TouchableOpacity onPress={onItemPressed}>
      <View style={{marginHorizontal: 15,}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 3}}>
            <AppText
              size="big"
              type="secondaryBold"
              title={item.name}
              style={{fontSize: 12.5}}></AppText>
            <AppText
              type="secondaryMedium"
              title={"Address: " + item.address}
              color={whiteLabel().subText}
              style={{fontSize: 10.4}}></AppText>
            {
              isMSISDN && 
              <AppText
                type="secondaryMedium"
                title={"MSISDN: " + item.msisdn}
                color={whiteLabel().subText}
                style={{fontSize: 10.4}}></AppText>
            }

          </View>
        
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <AppText
              type="secondaryMedium"
              title={item.distance}              
              style={{fontSize: 10.4}}></AppText>
          </View>

        </View>
        <View style={{height: 1, backgroundColor: Colors.greyColor}}></View>
      </View>
    </TouchableOpacity>
  );
}
