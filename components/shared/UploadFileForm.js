import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';
import SvgIcon from '../SvgIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const UploadFileForm = (props) => {
    const {item , onPress ,onTouchStart , onClose} = props;
    const isShowInfoIcon = item.guide_info !== undefined && item.guide_info.length != 0
    const isQuesionAnswered =  item.value != null && item.value != ""
    const isCompulsory = !isQuesionAnswered && item && item.rule_compulsory === '1';

    const haveImage = () => {
        if(item.value === null || item.value === undefined || item.value.length === 0){
            return false;
        }
        return true;
    }
    return (
        <View style={[style.card,  isCompulsory  ? style.compulsoryStyle :{}, {marginHorizontal:5 , marginVertical:3 }]}>
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1, paddingHorizontal:5}}>
                        <Text style={styles.titleStyle}> {item.question_text} </Text>
                    </View>
                    
                    {
                        isShowInfoIcon &&
                        <TouchableOpacity onPress={() =>  onTouchStart('' , item.guide_info) }>
                            <View>
                                <Icon
                                    name={`info-outline`}
                                    size={25}
                                    color={whiteLabel().mainText}                    
                                />
                            </View>
                        </TouchableOpacity>
                    }
                    
                </View>
                
                <View style={{flexDirection:'row' , justifyContent:'center' , marginTop:10}}>
                    <TouchableOpacity style={[style.buttonStyle]} onPress={() => {onPress()} }>
                        <View style={[styles.inputStyle , haveImage() ?  {backgroundColor : whiteLabel().actionFullButtonBackground } : {} ]} >                        
                            <Text style={[styles.textStyle, haveImage() ?  {color : whiteLabel().actionFullButtonText } : {} ]} >{'Upload File'}</Text>
                            {
                                haveImage() ?<SvgIcon icon="Question_Btn_Done" width='20px' height='20px' /> : <SvgIcon icon="File_Download" width='20px' height='20px' />
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