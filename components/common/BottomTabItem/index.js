import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SvgIcon from '../../SvgIcon'
import { AppText } from '../AppText'
import { Colors } from '../../../constants'
import { whiteLabel } from '../../../constants/Colors'

const BottomTabItem = ({item , onItemPressed}) => {
    if(!item) return null;
    
  return (
    <TouchableOpacity 
        onPress={onItemPressed}
        style={styles.container}>
        <SvgIcon icon={item?.name == 'Sales' ? item.activeIcon : item.inActiveIcon} width='20' height='20' />
        <AppText title={item.name} color={item?.name == 'Sales' ? whiteLabel().mainText : Colors.textGeyColor} style={{marginTop: Platform.OS == 'android' ? 5 : 8 }} ></AppText>
    </TouchableOpacity>
  )
}

export default BottomTabItem

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:'center', 
        alignItems:'center',
        paddingTop:7,
        paddingBottom:Platform.OS == 'ios' ? 7 : 4,
    }
})