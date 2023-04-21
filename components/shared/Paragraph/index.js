import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppText } from '../../common/AppText'

const Paragraph = ({ title }) => {
  return (
    <View style={{alignItems:'center' , justifyContent:'center', marginHorizontal:0 , marginVertical:10}}>
        <AppText 
            size="medium" 
            title={title} 
            style={{textAlign:'center'}}>  
        </AppText>
    </View>
  )
}

export default Paragraph

const styles = StyleSheet.create({})