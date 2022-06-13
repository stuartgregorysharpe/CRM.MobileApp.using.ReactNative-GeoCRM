import { View } from 'react-native'
import React from 'react'
import { SubmitButton } from '../../../../../../components/shared/SubmitButton'

export default function SimView() {
  return (
    <View style={{flexDirection:'row', marginTop:15}}>
      
      <SubmitButton svgIcon={'Check_List'} title="View List" style={{flex:1}}></SubmitButton>

      <SubmitButton svgIcon={"QR_SCAN"} title="Scan  ICCID" style={{flex:1, marginLeft:10}}  ></SubmitButton>

    </View>
  )
}