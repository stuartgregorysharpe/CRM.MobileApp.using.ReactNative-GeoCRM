import React from 'react';
import { View, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { BG_COLOR } from '../../constants/Colors';

const CustomPicker = ({visible, onModalClose, renderItems }) => {
    return (
        <Modal animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onModalClose}>
            <TouchableWithoutFeedback onPress={onModalClose}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {renderItems}
                    </View>
                </View>
            </TouchableWithoutFeedback >
        </Modal>
    )
}

const styles = StyleSheet.create({        
    
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        backgroundColor: '#00000055'        
    },
    modalView: {
        margin: 20,
        width: '90%',
        backgroundColor: "white",
        borderRadius: 7,
        padding: 20,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})

export default CustomPicker;