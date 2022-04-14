import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, TextInput, SectionList, Dimensions, Linking, BackHandler } from 'react-native';
import Colors from '../../constants/Colors';
import { style } from "../../constants/Styles";

export function TopTab(props) {

    const { headers , tabIndex,  onTabClicked}  = props;

    console.log("tabIndex", tabIndex)
    return (
        <View style={[style.tabContainer]}>

            {
                headers.map((item, index) => {
                    return (
                        <TouchableOpacity style={style.tabItem} onPress={() => {                            
                            onTabClicked(index);                            
                        }}>
                            <Text style={[style.tabText, tabIndex === index ? style.tabActiveText : {}]}> {item} </Text>
                            <View style={{height:2, width:'100%', backgroundColor: tabIndex === index ? Colors.primaryColor : Colors.bgColor }}></View>
                        </TouchableOpacity>
                    )
                })
            }

        </View>
    );
}