import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';
import MultipleButton from './MultipleButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MultipleSelectForm = ({item , onPress ,onTouchStart }) => {
    const [text,setText] = useState("");
    return (
        <View style={[style.card, {marginHorizontal:5 , marginTop:10, marginBottom:5 }]}>
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1, paddingHorizontal:0}}>

                        <View style={{flexDirection:'row', marginBottom:10}}>
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
                        
                        <MultipleButton   onPress={ () =>{ onPress(item); console.log("ddd")} } text={ item.value ? item.value : 'Select Option'} ></MultipleButton>
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