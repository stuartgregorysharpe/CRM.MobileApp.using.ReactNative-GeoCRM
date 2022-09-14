

import { TouchableOpacity, View ,ActivityIndicator, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import OfflineSyncType from './offine_sync_modal_view/OfflineSyncType';
import { AppText } from '../../../../../components/common/AppText';
import Colors, { whiteLabel } from '../../../../../constants/Colors';

const OfflineSyncModalView = props =>  {

  const { typeLists, isSyncStart , processValue, totalValue , syncBtnTitle ,isActive} = props;

  return (
    <View>
        <ScrollView style={{marginHorizontal:10, paddingTop:5 , maxHeight: Dimensions.get('screen').height * 0.8}}>
          {
            typeLists.map((item, index) => {
              return <OfflineSyncType
                  key={index}
                  item={item}                            
                  isSyncStart={isSyncStart}        
                  processValue={processValue}
                  totalValue={totalValue}
                  onItemSelected={(item) => {            
                  }}
                >
              </OfflineSyncType>
            })
          }

          <TouchableOpacity style={{alignItems:'center' , marginVertical:10}} onPress={() => {
              if(props.startSync && isActive){ 
                props.startSync();
              }
            }}>
              
            {
              isSyncStart ? <ActivityIndicator size="small" color={whiteLabel().actionFullButtonBackground} style={{marginRight:12}} /> :
              <AppText title={syncBtnTitle} size="big" color={isActive? whiteLabel().mainText : Colors.greyColor} type="secondaryBold" />
            }
            
          </TouchableOpacity>
        </ScrollView>

    </View>
    
  )
}

export default OfflineSyncModalView;
