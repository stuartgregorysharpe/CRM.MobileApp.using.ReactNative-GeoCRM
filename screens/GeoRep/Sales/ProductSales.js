import { View, Text, Image, Dimensions ,ScrollView } from 'react-native'
import React from 'react'
import Images from '../../../constants/Images';

export default function ProductSales() {
  return (
    <ScrollView style={{paddingTop:20}}>
        <Image        
            style={{width: Dimensions.get("window").width, height:Dimensions.get("window").width * 1.65 }}
            source={Images.tmpSale}
        />
    </ScrollView>
  )
}