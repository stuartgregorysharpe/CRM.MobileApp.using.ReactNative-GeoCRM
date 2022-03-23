import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text, Modal,TouchableHighlight, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Button, Title,  Portal, TextInput } from 'react-native-paper';
import Colors, { whiteLabel } from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Divider from './Divider';
import DatePicker from 'react-native-modern-datepicker';
import SvgIcon from './SvgIcon';
import { SubmitButton } from './shared/SubmitButton';
import { style } from '../constants/Styles';

export const DatetimePickerView = ({ visible , onModalClose, close , value}) => {

    const [items, setItems]  =  useState([]);    
    const [options, setOptions] = useState([]);
    const [date, setSelectedDate] = useState('');
    
    return (
        // <TouchableWithoutFeedback onPress={onModalClose}>
        <Modal 
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onModalClose}>            
            <TouchableWithoutFeedback onPress={onModalClose}>
                <View style={[style.centeredView]}>
                    <TouchableWithoutFeedback onPress={() => {}}>

                        <View style={[style.modalView]}>
                                <TouchableOpacity style={{ padding: 6 }}>
                                    <Divider />
                                </TouchableOpacity>

                                <View style={styles.sliderHeader}>
                                    <Title style={{ fontFamily: Fonts.primaryBold, fontSize:16 , color:Colors.blackColor }}>Please select the correct date:</Title>
                                    <Button 
                                        labelStyle={{
                                            fontFamily: Fonts.primaryRegular, 
                                            letterSpacing: 0.2
                                        }}
                                        color={Colors.selectedRedColor}
                                        uppercase={false} 
                                        onPress={ async() => {                                            
                                            onModalClose();
                                        }}>
                                    Clear
                                    </Button>
                                </View>

                                <DatePicker 
                                    nextSvg = {<SvgIcon icon="Calendar_Previous" width='23px' height='23px' />}
                                    prevSvg = {<SvgIcon icon="Calendar_Next" width='23px' height='23px' />}   
                                    options={{                                        
                                        backgroundColor: Colors.bgColor,
                                        textHeaderColor: whiteLabel().mainText,
                                        textDefaultColor: Colors.blackColor,
                                        selectedTextColor: whiteLabel().selectedTextColor,
                                        mainColor: whiteLabel().itemSelectedBackground,
                                        textSecondaryColor: whiteLabel().mainText,
                                        //borderColor: 'rgba(122, 146, 165, 0.1)',
                                    }}
                                    selected={ value }
                                    mode="calendar"
                                    onSelectedChange={date => {                                        
                                        setSelectedDate(date)
                                    }} /> 

                                <View style={{ marginBottom:10, width:Dimensions.get('window').width * 0.94 }}>
                                    <SubmitButton onSubmit={ () => {                    
                                            close(date);
                                        } } title="Submit"  ></SubmitButton>
                                </View>
                        </View>
                    </TouchableWithoutFeedback>
                    
                </View>
            </TouchableWithoutFeedback >
        </Modal>
        // </TouchableWithoutFeedback>
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
        zIndex: 20,
        padding: 10,
    },
    sliderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0
    },   

});