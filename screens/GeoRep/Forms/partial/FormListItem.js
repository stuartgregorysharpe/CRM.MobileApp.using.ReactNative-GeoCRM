import React, { useEffect , useState } from 'react';
import {  Text, View, StyleSheet ,TouchableOpacity, Dimensions } from 'react-native';
import SvgIcon from '../../../../components/SvgIcon';
import Colors, { whiteLabel } from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import { boxShadow, style } from '../../../../constants/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const FormListItem = ({ item,  onItemPress , onTouchStart}) =>{
        
    return (
        <View style={[styles.container]}>
             <TouchableOpacity style={[style.card, boxShadow , item.compulsory === "1" ? {borderWidth:1, borderColor:'red'}:{} ]} onPress={onItemPress}>                
                <View style={{ flex: 1, flexDirection:'column', alignItems:'flex-start', paddingTop:3, paddingBottom:3 }}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.title}>{item.form_name}</Text>                        
                        <View 
                            onTouchStart={(e) => {console.log('touchMove',e.nativeEvent); onTouchStart(e.nativeEvent , item.info_text);  }}
                        >
                            <Icon
                                name={`info-outline`}
                                size={25}
                                color={whiteLabel().helpText}                            
                            />
                        </View>                        
                    </View>
                    {item && <Text style={styles.subTitile}>{item.guide_text}</Text>}
                </View>

                {
                    item.compulsory === "1" &&
                    <View>
                        {/* <SvgIcon icon="Forms_Red_Compulsory" width='18px' height='18px'/> */}
                        <View style={[styles.redDotStyle , { marginRight:10}]}></View>
                    </View>
                }

                <View style={style.numberBox}>
                    <Text style={styles.number}>{item.question_count}</Text>
                </View>
                <SvgIcon icon="Angle_Left_form" width='20px' height='20px'/>
            </TouchableOpacity> 
                                                                        
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        // flex:1,
        position: 'relative'
    },
    title: {
        fontSize: 18,
        marginRight:5,
        fontFamily: Fonts.primaryBold,
        color: '#000'
    },
    subTitile: {
        fontSize: 12,
        fontFamily: Fonts.secondaryMedium,
        color: Colors.textColor,
        marginTop: 4
    },
    number: {
        fontFamily: Fonts.secondaryMedium,
        fontSize: 14,
        color: '#fff'
    },
    redDotStyle:{
        width:15,
        height:15,
        borderRadius:10,
        backgroundColor: Colors.selectedRedColor
    }
       
});