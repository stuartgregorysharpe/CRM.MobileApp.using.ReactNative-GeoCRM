import React, { } from 'react';
import {  Text, View, StyleSheet ,TouchableOpacity} from 'react-native';
import Colors, { whiteLabel } from '../../../../../../constants/Colors';
import Fonts from '../../../../../../constants/Fonts';
import { AppText } from '../../../../../../components/common/AppText';

export const HistoryListItem = ({ item, isStart, isEnd , onItemPress , index}) =>{

    return (
        <View style={[styles.container]} key={index}> 

            <View style={{ alignItems:'center', justifyContent:'center' , marginRight:10}}>
                <View style={styles.blueDotStyle}></View>
                <View style={{width:1, backgroundColor:whiteLabel().fieldBorder, height:20, position:'absolute', height:70 , top:isStart?20:0 , bottom: isEnd ? -30: 0 }}></View>
            </View>

            <TouchableOpacity style={{flexDirection:'column', flex:1}} onPress={onItemPress}>     
                <View style={{ flex: 1, flexDirection:'row', alignItems:'flex-start', paddingTop:3, paddingBottom:3, }}>
                    <View style={{flexDirection:'row'}}>
                        <AppText size="medium"  type="title" title={item.title}></AppText>                                                
                    </View>
                    <View style={{alignItems:'flex-end', flex:1}}>
                        <Text style={styles.dateStyle}>{item.date}</Text>
                    </View>                
                </View>
                
                <View >
                    <Text style={styles.subTitile}>{item.text}</Text>                
                </View>

            </TouchableOpacity> 
                                                                        
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        position: 'relative',
        paddingTop:5,
        paddingBottom:5,
        flexDirection:'row'
    },
    dateStyle: {        
        marginRight:5,
        fontSize:13,
        fontFamily: Fonts.secondaryRegular,
        color: whiteLabel().mainText
    },
    subTitile: {
        fontSize: 12,
        fontFamily: Fonts.secondaryMedium,
        color: whiteLabel().subText,
        marginTop: 4
    },
    blueDotStyle: {
        width:10,
        height:10,
        borderRadius:5,        
        backgroundColor: whiteLabel().fieldBorder
    }
       
});