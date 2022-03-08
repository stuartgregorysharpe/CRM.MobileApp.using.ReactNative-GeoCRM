
import React, { useEffect , useState } from 'react';
import { SafeAreaView, Text, View, Dimensions, StyleSheet ,FlatList ,TouchableOpacity , Image } from 'react-native';
import { whiteLabel } from '../../../../../constants/Colors';

export const GroupTitle = ({title}) =>{
    return (
        <View style={styles.container}>
            <Text style={styles.groupTitleStyle}>{title}</Text>
            <View style={styles.divider}></View>
        </View>
    );
}

const styles = StyleSheet.create({    
    container:{
        flex:1,        
        paddingHorizontal:10,
        paddingVertical:5,
    },
    groupTitleStyle:{
        fontSize:16,
        color:whiteLabel().mainText,
    },
    divider:{
        height:1,
        marginTop:5,
        backgroundColor:whiteLabel().mainText
    }
});