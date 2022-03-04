import React, { useEffect , useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet ,TouchableOpacity, Dimensions } from 'react-native';
import SvgIcon from '../../../../components/SvgIcon';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import { boxShadow, style } from '../../../../constants/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const FormListItem = ({ item,  onItemPress , onTouchStart}) =>{

    
    return (
        <View style={[styles.container]}>
             <TouchableOpacity style={[style.card, boxShadow , item.compulsory === "1" ? {borderWidth:1, borderColor:'red'}:{} ]} onPress={onItemPress}>                
                <View style={{ flex: 1, flexDirection:'column', alignItems:'flex-start', paddingTop:10, paddingBottom:10 }}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.title}>{item.form_name}</Text>                        
                        <View 
                            onTouchStart={(e) => {console.log('touchMove',e.nativeEvent); onTouchStart(e.nativeEvent , item.info_text);  }}
                        >
                            <Icon
                                name={`info-outline`}
                                size={25}
                                color={Colors.primaryColor}                            
                            />
                        </View>                        
                    </View>
                    {item && <Text style={styles.subTitile}>{item.guide_text}</Text>}
                </View>

                {
                    item.compulsory === "1" &&
                    <View style={{marginRight:3}}>
                        <SvgIcon icon="Forms_Red_Compulsory" width='18px' height='18px'/>
                    </View>
                }

                <View style={style.numberBox}>
                    <Text style={styles.number}>{item.question_count}</Text>
                </View>
                <SvgIcon icon="Angle_Left" width='20px' height='20px' />
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
   
});