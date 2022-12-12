import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SvgIcon from '../../SvgIcon'
import { AppText } from '../AppText'
import { Colors } from '../../../constants'
import { whiteLabel } from '../../../constants/Colors'

const BottomTabItem = ({item , onItemPressed}) => {
    if(!item) return null;
    console.log("ite",item)
  return (
    <TouchableOpacity 
        onPress={onItemPressed}
        style={styles.container}>
        <SvgIcon icon={item.inActiveIcon} width='20' height='20' />
        <AppText title={item.name} color={Colors.textGeyColor} ></AppText>
    </TouchableOpacity>
  )
}

export default BottomTabItem

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    }
})