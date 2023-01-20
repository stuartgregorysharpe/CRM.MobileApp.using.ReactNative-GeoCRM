
import React, {} from 'react';
import { View , StyleSheet} from 'react-native';
import Colors, { } from '../../../constants/Colors';
import { style } from '../../../constants/Styles';

export default function LocationSearchScreenPlaceholder({}){    
    let urArray=['','','','','','','','','','','','',''];
    return(
        <View>            
            {
                urArray.map((prop, key) => {                
                    return (
                        <View style={[styles.resultItem , {backgroundColor: Colors.bgColor }]} key={key} >
                            <View style={{ flex:1 }}>                                
                                <View style={{flexDirection:'row'}}>
                                    <View style={[style.grey_bar,{width:'50%'}]}></View>
                                    <View style={[style.grey_bar,{width:'25%'}]}></View>
                                </View>                                                    
                                <View style={{flexDirection:'row'}}>
                                    <View style={[style.grey_bar,{width:'25%'}]}></View>
                                    <View style={[style.grey_bar,{width:'30%'}]}></View>
                                    <View style={[style.grey_bar,{width:'25%'}]}></View>
                                </View>                          
                            </View>

                            <View style={{ flex:1 , alignItems:'flex-end' }}>
                                <View style={[style.grey_bar,{width:'25%'}]}></View>                                
                                <View style={{flexDirection:'row'}} >
                                    <View style={[style.grey_bar,{width:'40%'}]}></View>
                                    <View style={[style.grey_bar,{width:'40%'}]}></View>
                                </View>                
                            </View>                                        
                        </View> 
                    );
                })
            }                       
        </View>
    )
}

const styles = StyleSheet.create({
    resultItem: {
        maxWidth: '100%',
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 14,
        paddingRight: 14,
        borderTopWidth: 1,
        borderColor: '#e7e7e7',                        
    },
})