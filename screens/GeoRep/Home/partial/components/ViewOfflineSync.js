

import { TouchableOpacity, View ,ActivityIndicator } from 'react-native'
import React , { useState } from 'react'
import OfflineSyncType from './offine_sync_modal_view/OfflineSyncType';
import { AppText } from '../../../../../components/common/AppText';
import { whiteLabel } from '../../../../../constants/Colors';

export default function ViewOfflineSync(props) {

  const { typeLists, detailLists ,isStart } = props;

  return (
    <View style={{marginHorizontal:10, paddingTop:5}}>      
      {
        typeLists.map((item, index) => {
          return <OfflineSyncType
              key={index}
              item={item}
              lists={detailLists}            
              onItemSelected={(item) => {            
              }}
            >
          </OfflineSyncType>
        })
      }

      <TouchableOpacity style={{alignItems:'center' , marginVertical:10}} onPress={() => {
          if(props.startSync){            
            props.startSync();
          }
      }}>
        {
          isStart ? <ActivityIndicator size="small" color={whiteLabel().actionFullButtonBackground} style={{marginRight:12}} /> :
          <AppText title="Sync All Items" size="big" color={whiteLabel().mainText} type="secondaryBold" />
        }
        
      </TouchableOpacity>
    </View>

  )
}