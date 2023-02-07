
import { View ,StyleSheet } from 'react-native'
import React , {useEffect, useState } from 'react'
import { AppText } from '../../../common/AppText'
import { ActivityIndicator } from 'react-native-paper';
import { whiteLabel } from '../../../../constants/Colors';

export default function LoadingBarContainer(props) {
    
    const { description } = props;
    return (
        <View style={{alignSelf:'stretch', alignItems:'center', paddingVertical:15}}>
            <AppText size="big" title={'Please Wait...'}></AppText>
            {/* <AppText size="medium" style={{marginBottom:10}} title={description? description : 'your form is being submitted'}></AppText> */}

            <View style={[styles.divider, {marginTop:10}]}></View>
            <ActivityIndicator style={{marginTop:10}}  color={whiteLabel().mainText} />

        </View>
    )
}

const styles = StyleSheet.create({
    divider:{
        height:1,
        width: '100%',
        backgroundColor:'#eee',        
    }
})