import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import { Button, Title } from 'react-native-paper';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import Fonts from '../../../../../constants/Fonts';
import Divider from '../../../../../components/Divider';
import DatePicker from 'react-native-modern-datepicker';
import SvgIcon from '../../../../../components/SvgIcon';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';


export const DatetimePickerView = ({close , value}) => {

    const [items, setItems]  =  useState([]);    
    const [options, setOptions] = useState([]);
    const [date, setSelectedDate] = useState('');

    useEffect(() => {         
        
    },[]);
    

    return (        
        <ScrollView style={styles.container}>

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
                        close()
                    }}
                >
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
                onSelectedChange={date => setSelectedDate(date)} /> 
            
            {/* <DateTimePickerModal
              isVisible={true}
              mode={'date'}
              onConfirm={ () => { close() }}
              onCancel={() => { close() }}
            /> */}


            <View style={{ marginVertical:10, width:Dimensions.get('window').width * 0.94 }}>
                <SubmitButton onSubmit={ () => {                    
                        close(date);
                    } } title="Submit"  ></SubmitButton>
            </View>

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

});