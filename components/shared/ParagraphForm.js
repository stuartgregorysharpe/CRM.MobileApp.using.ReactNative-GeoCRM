import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const ParagraphForm = ({item}) => {
    const [text,setText] = useState("");
    


    return (
        <View style={[{paddingHorizontal:10}, {marginHorizontal:0 , marginVertical:0 }]}>
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1, paddingHorizontal:0}}>
                        <Text style={styles.titleStyle}> {item.question_text.trim()} </Text>
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
        flex:1,
        flexShrink:1,        
        flexWrap:'wrap',
        color: Colors.blackColor,        
        fontFamily: Fonts.secondaryMedium
    },      
})