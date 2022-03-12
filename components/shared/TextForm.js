import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Text, Dimensions ,Keyboard } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';
import SvgIcon from '../SvgIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const TextForm = ({item , type , onTouchStart}) => {
    const [text,setText] = useState("");
    return (
        <View style={[style.card, {marginHorizontal:5 , marginVertical:3 }]}>
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
                
                <View style={styles.inputContainer}>

                    {
                        item.add_prefix !== '' &&
                        <Text style={{color:whiteLabel().helpText, fontSize:16 , marginLeft:5}}> {item.add_prefix} </Text>
                    }
                    
                    <TextInput
                        style={styles.inputStyle}
                        placeholder= {type === 'numeric' ? 'Insert value...' : 'Answer here...' }
                        placeholderTextColor={whiteLabel().helpText}
                        keyboardType={type === "numeric" ? 'decimal-pad' : 'default'}
                        autoCapitalize="sentences"
                        returnKeyType={type === "numeric" ? 'done' : 'default'}        
                        multiline
                        onChangeText={text => setText(text)}
                        value={text}
                        onSubmitEditing={()=>{
                            if(type === "numeric"){
                                Keyboard.dismiss();
                            }                        
                        }}
                    />
                    {
                        item.add_suffix !== '' &&
                        <Text style={{color:whiteLabel().helpText, fontSize:16 , marginRight:5}}> {item.add_suffix} </Text>
                    }
                    
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
    inputContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',        
        alignItems:'center',
        borderColor: whiteLabel().fieldBorder,
        borderWidth: 1,
        borderRadius:3,
    },
    inputStyle:{                           
        flex:1,
        paddingTop:10,
        paddingLeft:5,
        paddingBottom:10,        
        color: whiteLabel().inputText
    }
})