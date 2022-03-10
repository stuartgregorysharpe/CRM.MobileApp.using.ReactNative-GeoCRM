import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const HeadingForm = ({item}) => {
    const [text,setText] = useState("");
    return (
        <View style={[{paddingHorizontal:10}, {marginHorizontal:0 , marginVertical:3 }]}>
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1, paddingHorizontal:0}}>
                        <Text style={styles.titleStyle}> {item.question_text} </Text>
                    </View>                    
                </View>
                                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,        
        paddingVertical:0
    },
    titleStyle:{        
        paddingVertical:5,
        color: Colors.blackColor,
        fontSize:15,
        fontFamily: Fonts.primaryBold
    },      
})