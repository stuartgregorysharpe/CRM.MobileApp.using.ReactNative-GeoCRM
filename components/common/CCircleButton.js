import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppText } from './AppText';
import { whiteLabel } from '../../constants/Colors';
import SvgIcon from '../SvgIcon';

export default function CCircleButton(props) {
    const { onClick , title , icon , style } = props;
    return (
        <TouchableOpacity onPress={() => onClick()}>
            <View style={[styles.borderStyle , style]}>
                <AppText type="secondaryMedium" title={title} color={whiteLabel().mainText} ></AppText>
                {
                    icon && 
                    <SvgIcon style={{marginLeft:5}} icon={icon} width='20' height='15' />
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    borderStyle:{
        flexDirection:'row',
        alignItems:'center',
        borderRadius: 30, 
        borderWidth:1,
        borderColor: whiteLabel().fieldBorder,
        padding: 5
    }
})