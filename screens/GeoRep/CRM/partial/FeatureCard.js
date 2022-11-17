import React from 'react';
import { View, Text,TouchableOpacity , StyleSheet } from 'react-native';
import SvgIcon from '../../../../components/SvgIcon';
import Colors, { whiteLabel } from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';

export function FeatureCard({ icon = '', title = '', actionTitle = '', onAction , isFormCompulsory }) {
    return (
        <TouchableOpacity onPress={onAction}>
            <View style={[styles.container, isFormCompulsory ? styles.compusoryStyle : {} ]}>                
                <View style={styles.headerContainer}>
                    <SvgIcon icon={icon} width='13px' height='13px' />
                    <View style={{flex:1}}>
                        <Text style={ styles.titleStyle }>{title}</Text>
                    </View>                    
                </View>                
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{flex:1}}>
                        <Text numberOfLines={1} style={{      
                            fontFamily: Fonts.primaryMedium,
                            fontSize: 9.8,                                                     
                            color: whiteLabel().helpText, alignContent: 'center', alignItems: 'baseline'
                        }}> {actionTitle} </Text>
                    </View>
                    <SvgIcon icon={'Arrow_feature_Card'} width='13px' height='13px' />
                </View>            
            </View>
        </TouchableOpacity>        
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        backgroundColor: Colors.whiteColor, 
        borderRadius: 5, elevation: 2, 
        padding: 7 ,
        shadowColor: '#808080',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: Platform.OS == 'ios' ? 0.1 : 0.8,
        elevation: 1,        
    },
    headerContainer:{ 
        flexDirection: 'row', alignItems: 'center' , 
        justifyContent:'flex-start' , flex:1 , 
        marginTop:5 
    },
    titleStyle:{ 
        marginLeft:3, 
        fontFamily: Fonts.primaryBold, 
        fontSize: 12,
        color:  Colors.blackColor 
    },
    compusoryStyle: {
        borderColor:'red', 
        borderWidth:1
    }
    
})