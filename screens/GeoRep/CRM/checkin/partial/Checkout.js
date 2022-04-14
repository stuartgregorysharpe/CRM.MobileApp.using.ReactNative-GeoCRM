
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, TextInput, Dimensions , ActivityIndicator ,RefreshControl } from 'react-native';
import { AppText } from '../../../../../components/common/AppText';


export default function Checkout(props) {
    
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.checkout}>                    
                    <AppText title="Check Out"></AppText>                    
                </View>
            </TouchableOpacity>     
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10
    },
    checkout:{
        borderRadius: 30,
        backgroundColor: "white"
    }
});
