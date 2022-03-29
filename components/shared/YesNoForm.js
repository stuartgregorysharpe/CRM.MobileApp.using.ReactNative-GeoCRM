import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from './Button';

export const YesNoForm = ({item , onTouchStart , onPress }) => {

    const [isYes, setIsYes] = useState(item.value !== null && item.value === "yes" ? true:false);
    const [isNo, setIsNo] = useState(item.value !== null && item.value === "no" ? true:false);
    
    return (
        <View style={[style.card, item.rule_compulsory === "1" ? style.compulsoryStyle :{}, {marginHorizontal:5 , marginVertical:3 }]}>
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1, paddingHorizontal:5}}>
                        <Text style={styles.titleStyle}> {item.question_text} </Text>
                    </View>
                    <View
                        onTouchStart={(e) => { onTouchStart(e.nativeEvent , item.guide_info);  }} >
                            <Icon
                                name={`info-outline`}
                                size={25}
                                color={whiteLabel().mainText}                    
                            />
                    </View>
                </View>

                <View style={{flexDirection:'row' , justifyContent:'center' , marginTop:10}}>
                    <Button title={'Yes'} onTaped= {item.value !== null && item.value === "yes" ? true:false} onClick={() => {
                        setIsYes(true);
                        setIsNo(false);
                        onPress("yes");
                    }} ></Button>
                    <Button btnStyle={{marginLeft:15}} title={'No'} onTaped={item.value !== null && item.value === "no" ? true:false} 
                    onClick={() =>{
                        setIsYes(false);
                        setIsNo(true);
                        onPress("no");
                    }}
                    ></Button>
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
    inputStyle:{                
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        borderRadius:3,
        padding:10,
    }
})