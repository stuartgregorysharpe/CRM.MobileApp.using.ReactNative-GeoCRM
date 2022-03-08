import React , {useState, useEffect } from "react";
import {View, TouchableOpacity  ,  Text , StyleSheet} from 'react-native';
import SvgIcon from "../../../../components/SvgIcon";
import Colors, {whiteLabel} from "../../../../constants/Colors";
import Fonts from "../../../../constants/Fonts";

export function CrmCalendarSelection({ isDraw, onClickList , onClickDraw, onClickCancel, onClickAddToCalendar}) {

    return (
        <View style={styles.container}>            
            <View>
                  <TouchableOpacity                     
                    style={[styles.buttonTextStyle, {backgroundColor: Colors.skeletonColor }]} 
                    onPress={()=> {                                            
                      onClickCancel()
                    }}>
                    <Text style={[styles.buttonText, {color: Colors.whiteColor}]}>{'Cancel'}</Text>
                  </TouchableOpacity>
            </View>

            <View style={{marginLeft:5}}>
                  <TouchableOpacity                     
                    style={[styles.buttonTextStyle, {backgroundColor: Colors.bgColor , borderColor:Colors.skeletonColor, borderWidth:2 }]} 
                    onPress={()=> {
                        onClickList()                                            
                    }}>
                    <Text style={[styles.buttonText, {color: Colors.blackColor}]}>{'List'}</Text>
                  </TouchableOpacity>
            </View>


            <View style={{marginLeft:5}}>
                  <TouchableOpacity                     
                    style={[styles.buttonTextStyle, {backgroundColor:isDraw ? Colors.selectedRedColor: Colors.bgColor , borderColor:Colors.skeletonColor, borderWidth: isDraw ?0 : 2 } ]} 
                    onPress={()=> {
                        onClickDraw()
                    }}>
                    <Text style={[styles.buttonText, {color: isDraw ? Colors.whiteColor: Colors.blackColor}]}>{isDraw? 'Discard': 'Draw'}</Text>
                  </TouchableOpacity>
            </View>

            <View style={styles.rightContainer}>
                  <TouchableOpacity                     
                    style={[styles.buttonTextStyle]}
                    onPress={()=> {
                      onClickAddToCalendar();
                    }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Text style={styles.buttonText}>Add to Calendar </Text>
                      <SvgIcon icon="Arrow_Right" width='13px' height='13px' />
                    </View>
                  </TouchableOpacity>
            </View>                    

        </View>
    );
}

const styles = StyleSheet.create({
    container:{        
        flexDirection:'row',
        alignItems:'center',
        marginLeft:10, marginRight:10,
        paddingTop:5, paddingBottom:10
    },
    
    buttonTextStyle: {
        paddingLeft:15,
        paddingRight:15,
        paddingTop:Platform.OS == "android" ? 5 : 8,
        paddingBottom:Platform.OS == "android" ? 5 : 8,
        borderRadius:15,
        backgroundColor: whiteLabel().actionFullButtonBackground
    },
    buttonText:{
        color: Colors.whiteColor,
        fontSize: 12,
        fontFamily: Fonts.secondaryBold,
    },
    rightContainer:{
        flex:1,
        alignItems: 'flex-end',
    },


});