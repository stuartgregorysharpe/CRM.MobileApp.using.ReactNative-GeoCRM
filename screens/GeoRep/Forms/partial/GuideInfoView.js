import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions , Modal, TouchableWithoutFeedback } from 'react-native';
import { Title , Button , Portal } from 'react-native-paper';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import Divider from '../../../../components/Divider';
import FilterButton from '../../../../components/FilterButton';
import { getFormFilters } from '../../../../actions/forms.action';
import FilterOptionsModal from '../../../../components/modal/FilterOptionsModal';
import { clearFilterData, getFilterData, storeFilterData } from '../../../../constants/Storage';
import { style } from '../../../../constants/Styles';
import { SubmitButton } from '../../../../components/shared/SubmitButton';
import FastImage from 'react-native-fast-image';

export const GuideInfoView = ({ visible, info, onModalClose }) => {


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
                                                                                        
                                {
                                    info && info.title && info.title !== "" &&  
                                    <View style={styles.sliderHeader}> 
                                        <Title style={{ fontFamily: Fonts.primaryBold }}>{ info.title}</Title>
                                    </View>
                                }
                                                              
                                {    
                                    info && info.image !== "" &&                                 
                                     <View style={{alignItems:'center'}}>                                         
                                        <FastImage style={styles.imageContainer}  source={{uri:info.image}} />                            
                                     </View>
                                }
                                {
                                    info && info.text && info.text !=="" &&  <Title style={{ fontFamily: Fonts.primaryRegular , fontSize:14 }}>{ info.text }</Title>
                                }
                                
                                <SubmitButton onSubmit={ () =>  onModalClose()} title="Close"></SubmitButton>
                                                                                                       
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
    imageContainer:{
        width:'80%',
        height: 300,
    }

});