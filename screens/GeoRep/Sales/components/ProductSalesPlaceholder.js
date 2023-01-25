import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SvgIcon from '../../../../components/SvgIcon'

const ProductSalesPlaceholder = () => {
  return (
    <View style={{alignSelf:'stretch'  }} > 
        <SvgIcon icon='Product_Sales_Item' style={{marginTop:-3}} width={Dimensions.get("screen").width} height={Dimensions.get("screen").width * 0.315} />
        <SvgIcon icon='Product_Sales_Item' style={{marginTop:-3}} width={Dimensions.get("screen").width} height={Dimensions.get("screen").width * 0.315} />
        <SvgIcon icon='Product_Sales_Item' style={{marginTop:-3}} width={Dimensions.get("screen").width} height={Dimensions.get("screen").width * 0.315} />
        <SvgIcon icon='Product_Sales_Item' style={{marginTop:-3}} width={Dimensions.get("screen").width} height={Dimensions.get("screen").width * 0.315} />
        <SvgIcon icon='Product_Sales_Item' style={{marginTop:-3}} width={Dimensions.get("screen").width} height={Dimensions.get("screen").width * 0.315} />
    </View>
  )
}

export default ProductSalesPlaceholder

const styles = StyleSheet.create({})