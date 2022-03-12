import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';
import SvgIcon from '../SvgIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Button = ({btnStyle, title , onTaped , onClick }) => {
    
    const [isclicked, setIsClicked] = useState(onTaped);

    useEffect(() =>{
        setIsClicked(onTaped);
    },[onTaped]);

    return (
        <TouchableOpacity style={[style.buttonStyle , btnStyle]} onPress={() => { onClick()} }> 
            <View style={ !isclicked?  [styles.inputStyle] : [styles.inputStyle , styles.selectedStyle ] }>
                <Text style={ isclicked ? [style.textStyle, {color: whiteLabel().actionFullButtonText }] : [style.textStyle] }>{title}</Text>
                {
                    isclicked &&  <View style={{marginLeft:10}}><SvgIcon icon="Yes_No_Button_Check" width='15px' height='15px' /></View>
                }
            </View> 
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,        
        paddingVertical:3
    },
    buttonStyle:{
        flex:1,
        alignItems:'center',        
        alignContent:'center',
        paddingVertical:5,
        
        color: Colors.blackColor,
        fontSize:15,
        fontFamily: Fonts.secondaryBold,        
    },  
    inputStyle:{         
        flexDirection:'row',
        alignItems:'center',                  
        justifyContent:'center',        
        borderColor: whiteLabel().actionOutlineButtonText, 
        paddingVertical:5,
        paddingRight:33,
        paddingLeft:33,
        borderRadius:15,
        borderWidth:2,        
    },

    selectedStyle:{
        paddingLeft:20,
        paddingRight:20,
        backgroundColor : whiteLabel().actionFullButtonBackground
    },

    textStyle:{
        textAlign:'center',
        fontSize:14,
        fontFamily:Fonts.primaryMedium,
        color:Colors.blackColor
    }

 
})