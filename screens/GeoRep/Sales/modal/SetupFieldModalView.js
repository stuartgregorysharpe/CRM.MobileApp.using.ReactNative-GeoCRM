import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SetupFieldContainer from '../containers/SetupFieldContainer'

const SetupFieldModalView = () => {
  return (
    <View style={styles.container}>
        <View style={{alignItems:'center', justifyContent:'center', top:0, bottom: 0 , backgroundColor:'red', flex:1 }}>
            <SetupFieldContainer />
        </View>        
    </View>
  )
}

export default SetupFieldModalView

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        height: Dimensions.get("screen").height - 50,
        top:0, 
        bottom: 0,
        right:0,
        left:0,
        marginTop: -20,
        zIndex:99999999999999,
        backgroundColor: 'rgba(0,0,0,0.35)',
        alignItems: 'center',
        justifyContent: 'center',

        //flex:1
    }
})