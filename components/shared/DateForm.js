import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';
import SvgIcon from '../SvgIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from './Button';
import { color } from 'react-native-reanimated';

export const DateForm = ({item , onPress ,onTouchStart}) => {
    const [text,setText] = useState("");
    return (
        <View style={[style.card,  item.rule_compulsory === "1" ? style.compulsoryStyle :{}, {marginHorizontal:5 , marginVertical:3 }]}>
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1, paddingHorizontal:5}}>
                        <Text style={styles.titleStyle}> {item.question_text} </Text>
                    </View>
                    <View
                        onTouchStart={(e) => { onTouchStart(e.nativeEvent , item.guide_text);  }} >
                            <Icon
                                name={`info-outline`}
                                size={25}
                                color={whiteLabel().mainText}                    
                            />
                    </View>
                </View>

                <View style={{flexDirection:'row' , justifyContent:'center' , marginTop:10}}>
                    <TouchableOpacity style={[style.buttonStyle]} onPress={() => {onPress()} }>
                        <View style={[styles.inputStyle , item.value  !== null ?  {backgroundColor : whiteLabel().actionFullButtonBackground } : {} ]} > 
                            <Text style={[styles.textStyle, item.value  !== null ?  {color : whiteLabel().actionFullButtonText } : {} ]} >{'Select Date'}</Text>
                            {
                                item.value !== null ?<SvgIcon icon="Question_Btn_Done" width='20px' height='20px' /> : <SvgIcon icon="Question_Calendar" width='20px' height='20px' />
                            }
                            
                        </View> 
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,        
        paddingVertical:3
    },
    titleStyle:{
        textAlign:'center',
        paddingVertical:5,
        color: Colors.blackColor,
        fontSize:15,
        fontFamily: Fonts.secondaryMedium
    },  
   
    buttonStyle:{

    },

    inputStyle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:whiteLabel().actionOutlineButtonBorder,
        borderRadius:20,
        paddingVertical:7,
        paddingHorizontal:10
    },
    textStyle:{
        marginHorizontal:10,
        color:whiteLabel().actionOutlineButtonText,
        fontFamily:Fonts.primaryRegular
    }
})