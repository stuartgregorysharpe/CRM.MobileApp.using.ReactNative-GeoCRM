import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, TextInput, SectionList, Dimensions, Linking, BackHandler } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import { style } from "../../constants/Styles";

export function TopTab(props) {

    const { headers , tabIndex, textStyle,  onTabClicked}  = props;    
    return (
        <View style={[style.tabContainer]}>
            {
                headers.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} style={style.tabItem} onPress={() => {                            
                            onTabClicked(index);                            
                        }}>
                            <Text style={[style.tabText, tabIndex === index ? style.tabActiveText : {} , textStyle ]}> {item} </Text>
                            <View style={{height:2, width:'100%', marginTop: 0, backgroundColor: tabIndex === index ? whiteLabel().activeTabUnderline : Colors.whiteColor }}></View>
                        </TouchableOpacity>
                    )
                })
            }

        </View>
    );
}