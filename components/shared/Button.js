import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';
import SvgIcon from '../SvgIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Button = ({btnStyle, title ,onTaped }) => {
    const [text,setText] = useState("");
    const [isclicked, setIsClicked] = useState(false);

    return (
        <TouchableOpacity style={[style.buttonStyle , btnStyle]} onPress={() => setIsClicked(!isclicked) }> 
            <View style={ isclicked?  [styles.inputStyle] : [styles.inputStyle , {backgroundColor : Colors.primaryColor} ] }>
                <Text style={ !isclicked ? [style.textStyle, {color:Colors.whiteColor}] : [style.textStyle] }>{title}</Text>
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
        alignItems:'center',                  
        width: Dimensions.get("window").width * 0.2,
        borderColor: Colors.primaryColor,                
        paddingVertical:5,
        borderRadius:15,
        borderWidth:2,        
    },

    textStyle:{
        textAlign:'center',
        fontSize:14,
        fontFamily:Fonts.primaryMedium,
        color:Colors.blackColor
    }
 
})