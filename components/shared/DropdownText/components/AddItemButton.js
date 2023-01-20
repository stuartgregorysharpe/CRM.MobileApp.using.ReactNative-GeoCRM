import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SvgIcon from '../../../SvgIcon';
import { AppText } from '../../../common/AppText';
import Colors, { whiteLabel } from '../../../../constants/Colors';
import { Strings, Values } from '../../../../constants';

const AddItemButton = (props) => {

    const { title ,onPress , hasError } = props;
    console.log("hasError =>" , hasError)
    return (
        
        <View>
            <TouchableOpacity style={[styles.btnContainer, {borderColor: hasError ? whiteLabel().endDayText : 'transparent'}]} onPress={onPress}>            
                <SvgIcon icon="Pluse_Icon" width='15' height='15' style={{marginRight:5}}/>
                <AppText title={'Add ' + title}  color={Colors.whiteColor} size="medium" ></AppText>
                <SvgIcon icon="DoubleArrowWhite" width='15' height='15' style={{marginLeft:10}}/>            
            </TouchableOpacity>
            
            {
                hasError &&
                <Text style={{color:whiteLabel().endDayBackground, fontSize:12, marginLeft:5, marginTop:3}} >{Strings.CRM.Supplier_Compulsory}</Text>                
            }
            
        </View>
    )
}

export default AddItemButton

const styles = StyleSheet.create({

    btnContainer:{
        flexDirection:'row',
        backgroundColor:whiteLabel().actionFullButtonBackground,
        padding:5,
        alignItems:'center',
        borderRadius:5,
        borderWidth:1,
        borderColor:'transparent'
    }
})