import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';
import MultipleButton from './MultipleButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const SingleSelectForm = ({item , onPress ,onTouchStart}) => {
    const [text,setText] = useState("");
    const isShowInfoIcon = item.guide_info !== undefined && item.guide_info.length != 0
    const isQuesionAnswered = item.value != null && item.value != ""
    const isCompulsory = !isQuesionAnswered && item && item.rule_compulsory === '1';

    return (
        <View style={[style.card,  isCompulsory  ? style.compulsoryStyle :{}, {marginHorizontal:5 , marginTop:10, marginBottom:5 }]}>
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1, paddingHorizontal:0}}>

                        <View style={{flexDirection:'row', marginBottom:10}}>
                            <View style={{flex:1, paddingHorizontal:5}}>
                                <Text style={styles.titleStyle}> {item.question_text} </Text>
                            </View>

                            {
                                isShowInfoIcon && 
                                <View
                                    onTouchStart={(e) => { onTouchStart(e.nativeEvent , item.guide_info);  }} >
                                        <Icon
                                            name={`info-outline`}
                                            size={25}
                                            color={whiteLabel().mainText}                    
                                        />
                                </View>                
                            }
                            
                        </View>                        
                        
                        <MultipleButton   onPress={ () =>{ onPress(item); } } text={ item.value ? item.value : 'Select Option'} ></MultipleButton>

                    </View>                    
                </View>
                                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,                
    },
    titleStyle:{        
        paddingVertical:5,
        color: Colors.blackColor,
        fontSize:15,
        fontFamily: Fonts.secondaryMedium
    },      
})