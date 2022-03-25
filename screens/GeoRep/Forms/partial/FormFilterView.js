import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text, Dimensions , Modal, TouchableWithoutFeedback } from 'react-native';
import { Title , Button , Portal } from 'react-native-paper';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import Divider from '../../../../components/Divider';
import FilterButton from '../../../../components/FilterButton';
import { getFormFilters } from '../../../../actions/forms.action';
import FilterOptionsModal from '../../../../components/modal/FilterOptionsModal';
import { clearFilterData, getFilterData, storeFilterData } from '../../../../constants/Storage';
import { style } from '../../../../constants/Styles';

export const FormFilterView = ({ visible,  onModalClose, close , apply , onItemClicked}) => {

    const [items, setItems]  =  useState([]); 
    const [modaVisible, setModalVisible] = useState(false);
    const [options, setOptions] = useState([]);
    const [filters, setFilters] = useState({ form_type : [] })

    useEffect(() => {
        _callFormFilters();
        //initFilter();
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
        
        <Modal             
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onModalClose}>
            <TouchableWithoutFeedback onPress={onModalClose}>
                                
                    <View style={style.centeredView}>
                        <View style={style.modalView}>                            
                            <TouchableOpacity style={{ padding: 6 }}>
                                <Divider></Divider>
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
                                            clearFilterData("@form_filter");
                                            close()
                                        }}>
                                    Clear Filters
                                    </Button>
                                </View>

                                {
                                    items.map((item , key) => (
                                        <FilterButton key={key} text={item.filter_label} 
                                            onPress={() => {       
                                                
                                                onItemClicked(item.options);    
                                            }}
                                        />
                                    ))
                                }
                                            
                                <Button 
                                    mode="contained"  color={Colors.primaryColor}  uppercase={false} 
                                    labelStyle={{
                                        fontSize: 18, 
                                        fontFamily: Fonts.secondaryBold, 
                                        letterSpacing: 0.2
                                    }}
                                    onPress={ async () => {
                                        // console.log("fave form filter", filters);
                                        // await storeFilterData( "@form_filter", filters);
                                        close();
                                        apply();
                                    }}>
                                    Apply Filters
                                </Button>            

                                <Portal>                                    
                                </Portal>                                  
                        </View>
                    </View>
            </TouchableWithoutFeedback>
        </Modal>                
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