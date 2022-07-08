import { View } from 'react-native'
import React from 'react'
import Colors, { whiteLabel } from '../../../../../constants/Colors'
import { AppText } from '../../../../../components/common/AppText'

export default function ReturnListHeader() {
  return (
    
        <View style={{marginHorizontal:15}}>
            <View style={{flexDirection:'row' , marginTop:15, marginBottom:3, justifyContent:'center', alignItems:'center'}}>
                <View style={{flex:3}}>                                    
                    <AppText type="secondaryMedium" title={"Description"} color={whiteLabel().mainText}  style={{fontSize:12}} ></AppText>
                </View>
                <View style={{flex:2}}>
                    <AppText type="secondaryMedium" title={"Reason"} color={whiteLabel().mainText} style={{fontSize:12}}></AppText>
                </View>
                <View  style={{flex:2, alignItems:'flex-end'}}>
                    <AppText type="secondaryMedium" title={"Added Date"} color={whiteLabel().mainText} style={{fontSize:12}}></AppText>
                </View>
            </View>
            <View style={{height:1,  backgroundColor:Colors.blackColor}}></View>            
        </View>
  )
}
