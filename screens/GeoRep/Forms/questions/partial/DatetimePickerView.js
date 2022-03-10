import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import { Button, Title, Modal, Portal, TextInput } from 'react-native-paper';
import Colors from '../../../../../constants/Colors';
import Fonts from '../../../../../constants/Fonts';
import Divider from '../../../../../components/Divider';
import { getFormFilters } from '../../../../../actions/forms.action';
import { clearFilterData, getFilterData, storeFilterData } from '../../../../../constants/Storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export const DatetimePickerView = ({close , apply}) => {

    const [items, setItems]  =  useState([]);    
    const [modaVisible, setModalVisible] = useState(false);
    const [options, setOptions] = useState([]);
    const [filters, setFilters] = useState({ form_type : [] })

    useEffect(() => { 
        _callFormFilters();
        initFilter();
    },[]);

    const _callFormFilters = () =>{        
        getFormFilters().then((res) => {    
            console.log("res", JSON.stringify(res));
            setItems(res)
        }).catch((e) => {
          console.log(e)
        })
    }

    const initFilter = async() => {
        var savedFilters = await getFilterData("@form_filter");
        setFilters(savedFilters);
    }    


    return (        
        <ScrollView style={styles.container}>

            <TouchableOpacity style={{ padding: 6 }}>
                <Divider />
            </TouchableOpacity>

            <View style={styles.sliderHeader}>
                <Title style={{ fontFamily: Fonts.primaryBold }}>Filter your search</Title>

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
                Clear Filters
                </Button>
            </View>
                        
            <DateTimePickerModal
              isVisible={true}
              mode={'date'}
              onConfirm={ () => { close() }}
              onCancel={() => { close() }}
            />
                                    
            <Button 
                mode="contained"  color={Colors.primaryColor}  uppercase={false} 
                labelStyle={{
                    fontSize: 18, 
                    fontFamily: Fonts.secondaryBold, 
                    letterSpacing: 0.2
                }}
                onPress={ async () => {
                    console.log("fave form filter", filters);
                    await storeFilterData( "@form_filter", filters);
                    close();
                    apply(filters);
                }}>
                Apply Filters
            </Button>
                 
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