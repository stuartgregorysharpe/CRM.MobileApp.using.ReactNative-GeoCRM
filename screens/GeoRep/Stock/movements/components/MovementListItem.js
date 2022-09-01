import { View } from 'react-native'
import React from 'react'
import { Colors } from '../../../../../constants'
import { AppText } from '../../../../../components/common/AppText'

export default function MovementListItem({item}) {

  return (    
    <View style={{marginHorizontal:15}}>
        <View style={{flexDirection:'row' , marginTop:15, marginBottom:3, justifyContent:'center', alignItems:'center'}}>
            <View style={{flex:3}}>    
                <AppText size="big" type="secondaryBold" title={item.description} style={{fontSize:12.5}}></AppText>
                <AppText type="secondaryMedium" title={item['sub-text']} color={Colors.disabledColor}  style={{fontSize:10.4}} ></AppText>
            </View>
            <View style={{flex:2}}>
                <AppText type="secondaryMedium" title={item.action} color={Colors.disabledColor} style={{fontSize:10.4}}></AppText>
            </View>
            <View style={{flex:2}}>
                <AppText type="secondaryMedium" title={item.type} color={Colors.disabledColor} style={{fontSize:10.4}}></AppText>
            </View>
            <View style={{flex:2, alignItems:'flex-end'}}>
                <AppText type="secondaryMedium" title={item.date} color={Colors.disabledColor} style={{fontSize:10.4}}></AppText>
            </View>                        
        </View>
        <View style={{height:1,  backgroundColor:Colors.greyColor}}></View>
    </View>

  )
}