import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';
import SvgIcon from '../SvgIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from './Button';

export const YesNoForm = ({item , onTouchStart}) => {

    const [isYes, setIsYes] = useState(false);
    const [isNo, setIsNo] = useState(false);

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

                <View style={{flexDirection:'row' , justifyContent:'center' , marginTop:10}}>
                    <Button title={'Yes'} onTaped= {isYes} onClick={() => {
                        setIsYes(true);
                        setIsNo(false);
                    }} ></Button>
                    <Button btnStyle={{marginLeft:15}} title={'No'} onTaped={isNo} 
                    onClick={() =>{
                        setIsYes(false);
                        setIsNo(true);
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