import React from 'react';
import { View, Modal, TouchableWithoutFeedback, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Divider from '../../../../../components/Divider';
import SvgIcon from '../../../../../components/SvgIcon';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import Fonts from '../../../../../constants/Fonts';
import { boxShadow, style } from '../../../../../constants/Styles';

const CardFilterOptionsModal = ({ modaVisible, onClose, filters, option, selectedType, fieldType, onValueChanged, title, clearTitle }) => {

    const getCheckedStatus = (item, type) => {
        if (!filters || filters.length == 0) {
            return false;
        }
        let data = filters.filter(x => x.type === type);
        if(data!==undefined){
            return !data ? false : data.find(x => typeof x === 'object' && typeof item === 'object' ?
            (x.id === item.id) : x.label === item);
        }else{
            return false;
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modaVisible}
            onRequestClose={onClose}>

            <TouchableWithoutFeedback onPress={onClose}>
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <TouchableOpacity style={{ padding: 6 }}>
                            <Divider></Divider>
                        </TouchableOpacity>
                        <View style={styles.sliderHeader}>
                            <Text style={{ fontSize: 16, fontFamily: Fonts.primaryBold, color: Colors.blackColor, fontSize: 16, flex: 1 }} >
                                {title}
                            </Text>
                            <TouchableOpacity style={styles.closeModal} onPress={() => { onClose(); }}>
                                <Text style={{
                                    fontSize: 13, fontFamily: Fonts.secondaryRegular,
                                    color: Colors.selectedRedColor
                                }}>
                                    {clearTitle}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ maxHeight: 400 }}>
                            {
                                option && option.options.map((item, index) => (
                                    <TouchableOpacity key={index}
                                        onPress={() => {
                                            var value = getCheckedStatus(item, option.label);
                                            onValueChanged(item, !value, option.label);
                                        }}>
                                        <View style={[style.card, Platform.OS === 'android' ? boxShadow : {}, { paddingHorizontal: 20 }]} key={index}>
                                            <Text style={styles.pickerItemText}>{item.label ? item.label : item}</Text>
                                            <TouchableOpacity onPress={() => {
                                                var value = getCheckedStatus(item, option.label);
                                                onValueChanged(item, !value, option.label);

                                            }}>
                                                <View style={[styles.checkBoxStyle, getCheckedStatus(item, option.label) ? {} : { backgroundColor: 'white' }]}>
                                                    <SvgIcon icon="Yes_No_Button_Check" width='15px' height='15px' />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    pickerItemText: {
        fontSize: 18
    },
    closeModal: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 15,
        paddingTop: 10,
        marginBottom: 10
    },
    pickerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 8,
        paddingBottom: 8,
    },
    pickerItemText: {
        fontSize: 18,
        color: 'black'
    },
    checkBoxStyle: {
        width: 25,
        height: 25,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: whiteLabel().itemSelectedBackground,
        borderWidth: 1,
        borderColor: whiteLabel().itemSelectedBackground
    },
    sliderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
})

export default CardFilterOptionsModal;