

import { TouchableOpacity, View ,ActivityIndicator, Dimensions, ScrollView } from 'react-native'
import React , { useState } from 'react'
import OfflineSyncType from './offine_sync_modal_view/OfflineSyncType';
import { AppText } from '../../../../../components/common/AppText';
import { whiteLabel } from '../../../../../constants/Colors';

export default function ViewOfflineSync(props) {

  const { typeLists, isSyncStart } = props;

  return (
    <View>

        <ScrollView style={{marginHorizontal:10, paddingTop:5 , maxHeight: Dimensions.get('screen').height * 0.8}}>
          {
            typeLists.map((item, index) => {
              return <OfflineSyncType
                  key={index}
                  item={item}                            
                  isSyncStart={isSyncStart}          
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
              isSyncStart ? <ActivityIndicator size="small" color={whiteLabel().actionFullButtonBackground} style={{marginRight:12}} /> :
              <AppText title="Sync All Items" size="big" color={whiteLabel().mainText} type="secondaryBold" />
            }
            
          </TouchableOpacity>
        </ScrollView>

    </View>
    

  )
}