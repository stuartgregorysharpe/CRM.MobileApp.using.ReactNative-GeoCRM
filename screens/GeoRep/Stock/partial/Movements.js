import { View, Text , ScrollView , StyleSheet } from 'react-native'
import React from 'react'
import SvgIcon from '../../../../components/SvgIcon'
import Fonts from '../../../../constants/Fonts'

export default function Movements() {
  return (
    <ScrollView style={styles.container}>
        <SvgIcon style={styles.pickerIcon} icon="Faq" height='300' />
        <Text style={styles.faqTextStyle} >No movements currently available, Please check back at a later stage.</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
      flex:1,                                       
      paddingTop:10
  },

  faqTextStyle:{
      marginTop:10,
      marginHorizontal:10,
      fontSize:16,
      fontWeight:'700',
      fontFamily:Fonts.primaryBold,
      textAlign:'center'
  }
})