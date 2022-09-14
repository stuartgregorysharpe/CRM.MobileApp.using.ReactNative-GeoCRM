import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SvgIcon from '../../../SvgIcon';
import { AppText } from '../../../common/AppText';
import Colors from '../../../../constants/Colors';
import { Values } from '../../../../constants';

const AddItemButton = (props) => {

    const { title ,onPress } = props;
    return (
        
        <TouchableOpacity style={styles.btnContainer} onPress={onPress}>            
            <SvgIcon icon="Pluse_Icon" width='15' height='15' style={{marginRight:5}}/>
            <AppText title={'Add ' + title}  color={Colors.whiteColor} ></AppText>
            <SvgIcon icon="DoubleArrowWhite" width='15' height='15' style={{marginLeft:10}}/>
        </TouchableOpacity>
    )
}

export default AddItemButton

const styles = StyleSheet.create({

    btnContainer:{
        flexDirection:'row',
        backgroundColor:Colors.primaryColor,
        padding:5,
        alignItems:'center',
        borderRadius:5,
    }
})