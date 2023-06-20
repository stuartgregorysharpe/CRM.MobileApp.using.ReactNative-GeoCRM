import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppText } from '../../../common/AppText'
import { style } from '../../../../constants/Styles'
import Strings from '../../../../constants/Strings'
import Colors, { whiteLabel } from '../../../../constants/Colors'


const CheckinRingFenceView = (props) => {

  const { distance } = props;

  const onContinue = () => {
    if(props.onContinue)
        props.onContinue()
  }

  const onUpdate = () => {
    if(props.onUpdate)
        props.onUpdate()
  }

  const onCancel = () => {    
    if(props.onCancel)
        props.onCancel()
  }

  return (
    <View style={styles.container}>
        <AppText title={Strings.Out_Of_Ring_Fence} type="secondaryBold" style={styles.titleStyle}></AppText>        
        <AppText title={'You are ' + distance + ' away from the geo-coordinates stored for this location'} style={styles.description}></AppText>
        {/* Math.round(distance/10) / 100 */}
        <View style={[style.divider]}></View>
        <TouchableOpacity onPress={onContinue}>
            <AppText title={Strings.Continue_With_Checkin} style={style.buttonText}></AppText>
        </TouchableOpacity>
        

        <View style={style.divider}></View>
        <TouchableOpacity onPress={onUpdate}>
            <AppText title={Strings.Update_Geo_Coordinates} style={style.buttonText}></AppText>
        </TouchableOpacity>

        <View style={style.divider}></View>
        <TouchableOpacity onPress={onCancel}>
            <AppText title={Strings.Cancel} style={[style.buttonText , {color: Colors.disabledColor}]}></AppText>
        </TouchableOpacity>

    </View>
  )
}

export default CheckinRingFenceView

const styles = StyleSheet.create({
  
    container : {
        marginTop:20, 
        alignItems:'center'
    },

    titleStyle :{
        fontSize: 16,        
        color: whiteLabel().mainText
    },
    description: {
        fontSize: 14,
        textAlign:'center',        
        marginHorizontal:20,
        marginTop:10,
        marginBottom:10
    }
})