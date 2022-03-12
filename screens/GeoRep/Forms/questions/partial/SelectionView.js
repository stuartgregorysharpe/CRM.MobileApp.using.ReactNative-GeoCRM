import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import { Button, Title, Modal, Portal, TextInput } from 'react-native-paper';
import Colors from '../../../../../constants/Colors';
import Fonts from '../../../../../constants/Fonts';
import Divider from '../../../../../components/Divider';
import { clearFilterData, getFilterData, storeFilterData } from '../../../../../constants/Storage';
import CheckBox from '@react-native-community/checkbox';
import { style } from '../../../../../constants/Styles';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';

export const SelectionView = ({options , mode,  value, onClose , onSave , onValueChanged}) => {

    const [selectedVal, setSelectedVal] = useState(value);
    useEffect(() => {         

    },[]);

   
    const getCheckedStatus = ( item,  value ) => {
        var flag = false;
        if(item === value){
        return true;
        }
        return flag;
    }


    const getCheckedStatusForMultiple = ( item,  value ) => {    
        if(item === value){
        return true;
        }
        return false;
    }

    return (        
        <ScrollView style={styles.container}>
            <TouchableOpacity style={{ padding: 6 }}>
                <Divider />
            </TouchableOpacity>

            <View style={styles.sliderHeader}>                
                <Text style={{fontSize:16,fontFamily:Fonts.primaryBold}} >Select the correct answer from the list:</Text>
                <TouchableOpacity style={styles.closeModal} onPress={() => { onClose() }}>
                    <Text style={{ fontSize: 13, fontFamily: Fonts.secondaryRegular ,  color:Colors.selectedRedColor}}>Clear</Text>
                </TouchableOpacity>                
            </View>

            { options && options.map((item, key) => (
                <View key={key}>
                
                    <View style={[style.card , {paddingHorizontal:20}]} key={key}>
                        <Text style={styles.pickerItemText}>{item}</Text>
                        <CheckBox
                            tintColors={Colors.tickBoxColor}
                            onCheckColor={Colors.tickBoxColor}
                            onTintColor={Colors.tickBoxColor}
                            value={ mode === "single" ? getCheckedStatus(item, selectedVal) :  getCheckedStatusForMultiple( item, value) }
                            onValueChange={value => {                      
                                setSelectedVal(item);        
                                onValueChanged(item);
                            }}
                        />
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

      

});