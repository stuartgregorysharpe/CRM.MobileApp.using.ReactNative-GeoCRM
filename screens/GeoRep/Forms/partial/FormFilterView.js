import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text, Dimensions , Modal, TouchableWithoutFeedback } from 'react-native';
import { Title , Button , Portal } from 'react-native-paper';
import Colors, { whiteLabel } from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import Divider from '../../../../components/Divider';
import FilterButton from '../../../../components/FilterButton';
import { clearFilterData, getFilterData, storeFilterData } from '../../../../constants/Storage';
import { style } from '../../../../constants/Styles';
import { useDispatch } from 'react-redux';
import { getApiRequest } from '../../../../actions/api.action';

export const FormFilterView = ({ visible,  onModalClose, close , apply , onItemClicked}) => {

    const dispatch = useDispatch();
    const [items, setItems]  =  useState([]); 
    const [modaVisible, setModalVisible] = useState(false);
    const [options, setOptions] = useState([]);
    const [filters, setFilters] = useState({ form_type : [] })

    useEffect(() => {
        _callFormFilters();        
    },[]);

    const _callFormFilters = () =>{        
        //https://www.dev.georep.com/local_api_old/
        getApiRequest("forms/forms-filters" , {}).then((res) => {
            console.log(JSON.stringify(res));
            setItems(res.items);
        }).catch((e) => {
            console.log(e);
        });        
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
                                    mode="contained"  color={whiteLabel().actionFullButtonBackground}  uppercase={false} 
                                    labelStyle={{
                                        fontSize: 18, 
                                        fontFamily: Fonts.secondaryBold, 
                                        letterSpacing: 0.2
                                    }}
                                    onPress={ async () => {                                        
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
    
    sliderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },   

});