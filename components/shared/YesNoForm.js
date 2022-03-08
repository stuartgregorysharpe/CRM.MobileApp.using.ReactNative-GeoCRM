import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';
import SvgIcon from '../SvgIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from './Button';

export const YesNoForm = ({item}) => {
    const [text,setText] = useState("");
    return (
        <View style={[style.card, {marginHorizontal:5 , marginVertical:3 }]}>
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1, paddingHorizontal:5}}>
                        <Text style={styles.titleStyle}> {item.question_text} </Text>
                    </View>
                    <Icon
                        name={`info-outline`}
                        size={25}
                        color={Colors.primaryColor}                            
                    />
                </View>

                <View style={{flexDirection:'row' , justifyContent:'center' , marginTop:10}}>
                    <Button title={'Yes'} onTaped={false} ></Button>
                    <Button btnStyle={{marginLeft:15}} title={'No'} onTaped={false}></Button>
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
        fontFamily: Fonts.secondaryBold
    },  
    inputStyle:{                
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        borderRadius:3,
        padding:10,
    }
})