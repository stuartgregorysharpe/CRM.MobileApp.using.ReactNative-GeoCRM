import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Animated, ScrollView, SectionList, Dimensions, Linking, BackHandler } from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

export function AppText(props){
    
    const { title , style , type , size  , color } = props;
        

    const getFontType = (type) =>{
        if(type === "big"){
            return Fonts.secondaryBold;
        }else if(type === "secondaryBold"){
            return Fonts.secondaryBold;
        }else if(type === "secondaryMedium"){
            return Fonts.secondaryMedium;
        }else if(type === "secondaryRegular"){
            return Fonts.secondaryRegular;
        }else if( type === "primaryMedium"){
            return Fonts.primaryMedium;            
        }
        else{
            return Fonts.secondaryMedium;
        }
    }

    return (
        <Text style={
                [styles.textStyle,  
                    {   
                        fontFamily: getFontType(type),
                        fontSize: size === "big" ? 16 : size === "medium" ? 14 : 12,
                        color: color != undefined ? color: Colors.textColor,                        
                    },
                    style 
                ]
            }>
                {title}
        </Text>
    );
}

const styles = StyleSheet.create({    
    textStyle: {        
        fontSize: 14,
        color:Colors.textColor,
        fontFamily: Fonts.secondaryRegular
        //fontWeight:'700'
        //textAlign:'center'
    },

})