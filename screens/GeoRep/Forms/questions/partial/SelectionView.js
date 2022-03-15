import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text, Dimensions, Platform } from 'react-native';
import { Button, Title, Modal, Portal, TextInput } from 'react-native-paper';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import Fonts from '../../../../../constants/Fonts';
import Divider from '../../../../../components/Divider';
import { boxShadow, style } from '../../../../../constants/Styles';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import SvgIcon from '../../../../../components/SvgIcon';

export const SelectionView = ({options , mode,  value, onClose , onSave , onValueChanged}) => {    
    const [selectedVals, setSelectedVal] = useState(value !== null && value !== undefined ? value : [] );
    useEffect(() => { 

    },[]);
   
    const getCheckedStatus = ( item,  values ) => {
        console.log("selectedVals - ----", selectedVals);
        
        var tmp = null;
        if(values !== null && values !== undefined){
            tmp = values.find((element => element === item ));
            if(tmp !== null && tmp !== undefined){
                return true;
            }
        }
        return false; 
    }
    
    const onTapItem = (item) => {
        console.log("clicked", item);
        if(mode === "single"){
            setSelectedVal([item]);
            onValueChanged([item]);
        }else {
            var check = selectedVals.find( element => element === item);
            if(check != null){
                var tmp = selectedVals.filter( element => element !== item);                
                setSelectedVal(tmp);
                onValueChanged(tmp);
            }else{
                setSelectedVal([...selectedVals, item]);
                onValueChanged([...selectedVals, item]);
            }            
            
        }
    }

   
    return (        
        <ScrollView style={styles.container}>
            <TouchableOpacity style={{ padding: 6 }}>
                <Divider />
            </TouchableOpacity>

            <View style={styles.sliderHeader}>                
                <Text style={{fontSize:16,fontFamily:Fonts.primaryBold , color:Colors.blackColor, fontSize:16 }} >Select the correct answer from the list:</Text>
                <TouchableOpacity style={styles.closeModal} onPress={() => { onClose() }}>
                    <Text style={{ fontSize: 13, fontFamily: Fonts.secondaryRegular ,  color:Colors.selectedRedColor}}>Clear</Text>
                </TouchableOpacity>
            </View>

            { options && options.map((item, key) => (
                <View key={key}>
                
                    <View style={[style.card , Platform.OS === 'android' ? boxShadow : {}, {paddingHorizontal:20}]} key={key}>
                        <Text style={styles.pickerItemText}>{item}</Text>

                        <TouchableOpacity onPress={() => onTapItem(item) }>
                            <View style={[styles.checkBoxStyle ,getCheckedStatus(item, selectedVals)? {} : {backgroundColor:'white'}]}>
                                <SvgIcon icon="Yes_No_Button_Check" width='15px' height='15px' />
                            </View>
                        </TouchableOpacity>                                                
                    </View>                          
                </View>
          ))}
                                  
                                  
            <SubmitButton onSubmit={ () =>  onSave()} title="Save"></SubmitButton>

        </ScrollView>        
    );
}

const styles = StyleSheet.create({

    container: {
        width:Dimensions.get("screen").width,        
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.bgColor,
        elevation: 2,
        zIndex: 2000,
        padding: 10,
    },
    
    sliderHeader: {                
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },   

    pickerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 8,
        paddingRight: 20,
        paddingBottom: 8
    },
    pickerItemText: {
        fontSize: 16,
        color: Colors.blackColor
    },

    checkBoxStyle:{
        width:25,
        height:25,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:whiteLabel().itemSelectedBackground,
        borderWidth:1,
        borderColor:whiteLabel().itemSelectedBackground
    }
      

});