import React, { useEffect , useState } from 'react';
import {  Text, View, StyleSheet ,TouchableOpacity, Dimensions } from 'react-native';
import SvgIcon from '../../../../components/SvgIcon';
import Colors, { whiteLabel } from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import { boxShadow, style } from '../../../../constants/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const FormListItem = ({ item,  onItemPress , onTouchStart , isSubmitted }) =>{
 
    return (
        <View style={[styles.container]}>
             <TouchableOpacity style={[style.card, boxShadow , (item.compulsory == "1" || item.compulsory == 1 ) && !isSubmitted ? {borderWidth:1, borderColor:Colors.redColor}:{} ]} onPress={onItemPress}>                
                <View style={{ flex: 1, flexDirection:'column', alignItems:'flex-start', paddingTop:3, paddingBottom:3 }}>
                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>                                                            
                        <Text style={styles.title}>{item.form_name}</Text>                        
                        {                            
                            item.guide_info !== undefined && ( item.guide_info.length != 0 ) &&
                            <TouchableOpacity onPress={() => {                                
                                onTouchStart("" ,  item.guide_info);
                            } }>
                                {/* JSON.stringify(item.guide_info) */}
                                <View 
                                    onTouchStart={(e) => {                                        
                                        }} >
                                    <Icon
                                        name={`info-outline`}
                                        size={25}
                                        color={whiteLabel().actionFullButtonBackground} 
                                    />
                                </View>
                            </TouchableOpacity>                        
                        }                        
                    </View>
                    {item && <Text style={styles.subTitile}>{item.form_type}</Text>}
                </View>

                {
                    (item.compulsory === "1" || isSubmitted) &&
                    <View>
                        {/* <SvgIcon icon="Forms_Red_Compulsory" width='18px' height='18px'/> */}
                        <View style={[ isSubmitted ?  styles.greenDotStyle : styles.redDotStyle , { marginRight:10}]}></View>
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
        color: Colors.blackColor
    },
    subTitile: {
        fontSize: 12,
        fontFamily: Fonts.secondaryMedium,
        color: whiteLabel().subText,
        marginTop: 4
    },
    number: {
        fontFamily: Fonts.secondaryMedium,
        fontSize: 14,
        color: whiteLabel().countBoxText
    },
    redDotStyle:{
        width:15,
        height:15,
        borderRadius:10,
        backgroundColor: Colors.selectedRedColor
    },
    greenDotStyle:{
        width:15,
        height:15,
        borderRadius:10,
        backgroundColor: Colors.green2Color
    }
       
});