
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, TextInput, Dimensions , ActivityIndicator ,RefreshControl } from 'react-native';
import { postApiRequest } from '../../../../../actions/api.action';
import { AppText } from '../../../../../components/common/AppText';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import moment from 'moment-timezone';
import { getPostParameter } from '../../../../../constants/Consts';
import { storeLocalValue } from '../../../../../constants/Storage';
import {useSelector} from 'react-redux';
import { Notification } from '../../../../../components/modal/Notification';
import { useDispatch } from 'react-redux';
import { clearNotification, showNotification } from '../../../../../actions/notification.action';

export default function Checkout(props) {    

    const { location_id ,goBack } = props;
    const dispatch = useDispatch();
    const currentLocation = useSelector(state => state.rep.currentLocation);
    var currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    const _callCheckOut = () => {        
        var userParam = getPostParameter(currentLocation);
        let postData = {
            location_id: location_id,
            checkout_time: currentTime,
            user_local_data: userParam.user_local_data
        };
        
        postApiRequest("location-info/check-out",  postData).then((res) => {            
            goBack(res);
        }).catch((e) => {
            console.log("che e",e)
        }); 
    }
    
    return (
        <View style={styles.container}>
            {/* <Notification/> */}
            <TouchableOpacity style={{flex:1}} onPress={() => {_callCheckOut()}}>
                <View style={styles.checkout}>                    
                    <AppText color={whiteLabel().mainText} style={{fontWeight:'700'}} size="medium" title="Check Out"></AppText>
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{flex:1 , marginLeft:20}}>
                <View style={styles.pause}>    
                    <AppText color={whiteLabel().headerText} size="medium" title="Pause"></AppText>
                    <View style={{width:3, height:12,backgroundColor:'white' ,  marginLeft:15}}></View>
                    <View style={{width:3, height:12,backgroundColor:'white' ,  marginLeft:3}}></View>
                </View>
            </TouchableOpacity>
            */}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        paddingHorizontal:10,
        marginBottom:10
    },
    checkout:{
        borderRadius: 30,
        backgroundColor: "white",
        padding:10,
        alignItems:'center'
    },
    pause:{
        borderRadius: 30,
        backgroundColor: "white",
        padding:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:whiteLabel().headerBackground,
        flexDirection:'row',
        borderColor:whiteLabel().headerText,
        borderWidth:1
    }
});
