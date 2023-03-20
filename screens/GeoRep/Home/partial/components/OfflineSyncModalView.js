

import { TouchableOpacity, View ,ActivityIndicator, Dimensions, ScrollView } from 'react-native'
import React , { useRef } from 'react'
import OfflineSyncType from './offine_sync_modal_view/OfflineSyncType';
import { AppText } from '../../../../../components/common/AppText';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import AlertDialog from '../../../../../components/modal/AlertDialog';
import AlertModal from '../../../../../components/modal/AlertModal';
import { Strings } from '../../../../../constants';

const OfflineSyncModalView = props =>  {

  const { typeLists, isSyncStart , processValue, totalValue , syncBtnTitle , isActive , offlineStatus } = props;

  const alertModalRef = useRef();


  return (
    <View>
        <ScrollView style={{marginHorizontal:10, paddingTop:5 , maxHeight: Dimensions.get('screen').height * 0.8}}>

          <AlertModal 
            ref={alertModalRef}            
          />

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
              if(offlineStatus){
                if(alertModalRef.current){
                  alertModalRef.current.alert(Strings.This_Function_Not_Available);
                }
                return;
              }
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
