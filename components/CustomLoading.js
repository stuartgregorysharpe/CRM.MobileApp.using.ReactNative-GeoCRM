import React from 'react';
import { View,Modal, TouchableWithoutFeedback, StyleSheet,ActivityIndicator,Text } from 'react-native';
import Colors from '../constants/Colors';

const CustomLoading = ({visible, onModalClose,closeOnTouchOutside=false,message="Please wait.." , onCompleted}) => {
    return (
        <Modal animationType="slide"
            transparent={true}
            visible={visible}
            onShow={onCompleted()}
            
            onRequestClose={onModalClose}>
            <TouchableWithoutFeedback onPress={closeOnTouchOutside? onModalClose:null}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ActivityIndicator size={'large'} color={Colors.primaryColor}/>
                        <Text style={styles.messageText}>{message}</Text>
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
        marginTop: 22,
        backgroundColor: '#00000055'
    },
    modalView: {
        margin: 20,
        width: '90%',
        backgroundColor: "white",
        borderRadius: 7,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    messageText:{
        color:'black',
        fontSize:16,
        margin:10
    }
})

export default CustomLoading;