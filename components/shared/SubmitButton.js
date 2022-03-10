import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';
import SvgIcon from '../SvgIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

export const SubmitButton = ({  title, onSubmit }) => {
    
    return (
        <TouchableOpacity style={styles.submitButton} onPress={() => { onSubmit() }}>
          <Text style={[styles.submitButtonText]}>
            {title}
          </Text>
          <FontAwesomeIcon style={styles.submitButtonIcon} size={25} color={ whiteLabel().actionFullButtonText } icon={ faAngleDoubleRight } />
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    container:{
        flex:1,        
        paddingVertical:3,        
    },
    submitButtonText: {
        color: whiteLabel().actionFullButtonText,
        fontSize: 15,
        fontFamily: Fonts.secondaryBold
    },

    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,        
        borderRadius: 7,
        backgroundColor: whiteLabel().actionFullButtonBackground,        
    },
 
    submitButtonIcon: {
        position: 'absolute',
        right: 10
    },

      
})