import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Animated, ScrollView, SectionList, Dimensions, Linking, BackHandler } from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

export function AppText(props){
    
    const { title , style , type , size  , color } = props;
    
    return (
        <Text style={
                [styles.textStyle, style , 
                    {   
                        fontFamily: type === "title" ? Fonts.secondaryBold :Fonts.secondaryMedium ,
                        fontSize: size === "big" ? 16 : size === "medium" ? 14 : 12,
                        color: color != undefined ? color: Colors.textColor
                    }
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
        //textAlign:'center'
    },

})