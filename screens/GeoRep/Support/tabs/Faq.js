import { SafeAreaView } from "react-native-safe-area-context";
import WebView from 'react-native-webview';
import React, { useEffect, useState, Fragment } from 'react';
import { Image,  View, StyleSheet, ScrollView , Text, Dimensions} from 'react-native';
import Images from "../../../../constants/Images";
import Fonts from "../../../../constants/Fonts";
import SvgIcon from "../../../../components/SvgIcon";


export default function Faq(props) {

    useEffect(() => {        
    }, []);

    return(
        <ScrollView style={styles.container}>
             <SvgIcon style={styles.pickerIcon} icon="Faq" height='300' />
             <Text style={styles.faqTextStyle} >The FAQ section is currently being developed  please check back at a later stage.</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,                                       
        paddingTop:10
    },
    faqTextStyle:{
        marginTop:10,
        fontSize:16,
        fontWeight:'700',
        fontFamily:Fonts.primaryBold,
        textAlign:'center'
    }
})
