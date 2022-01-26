import React from 'react';
import { View, Modal, TouchableWithoutFeedback, StyleSheet , TouchableHighlight,Text} from 'react-native';
import {  PRIMARY_COLOR } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';


const AlertDialog = ({visible, onModalClose, message }) => {

    return (
        <Modal 
            // animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onModalClose}>            
            {/* <TouchableWithoutFeedback onPress={onModalClose}> */}
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title} >{message}</Text>
                        <View style={styles.divider}></View>
                        <TouchableHighlight 
                        underlayColor="#DDDDDD"
                        style={{alignItems:'center', borderBottomEndRadius:7, borderBottomLeftRadius:7}} onPress={() => onModalClose() }>
                            <Text style={styles.button} >Okay</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            {/* </TouchableWithoutFeedback > */}
        </Modal>
    )
}


//export const CustomAlert: AlertDialog;
// export default AlertDialog;


const styles = StyleSheet.create({        
    
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        backgroundColor: '#00000055'        
    },

    modalView: {        
        width: '90%',
        backgroundColor: "white",
        borderRadius: 7,
        padding: 0,
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

    title:{            
        textAlign:'center',
        fontFamily:Fonts.secondaryBold,
        fontSize:16,
        color:"#000",        
        padding:13

    },

    button:{
        fontFamily:Fonts.secondaryBold,
        fontSize:18,
        color:PRIMARY_COLOR,        
        padding:10
    },
    divider:{
        height:1,
        backgroundColor:'#eee',        
    }

})


export default AlertDialog;