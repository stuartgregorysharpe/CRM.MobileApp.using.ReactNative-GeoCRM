import React from 'react';
import { View, Modal, StyleSheet , TouchableHighlight,Text} from 'react-native';
import { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';

const AlertDialog = ({visible, onModalClose, message, buttonText }) => {

    return (
        <Modal 
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onModalClose}>            
            {/* <TouchableWithoutFeedback onPress={onModalClose}> */}
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title} >{message}</Text>
                        <View style={style.divider}></View>
                        <TouchableHighlight 
                        underlayColor="#DDDDDD"
                        style={{alignItems:'center', borderBottomEndRadius:7, borderBottomLeftRadius:7}} onPress={() => onModalClose() }>
                            <Text style={style.buttonText} >{ buttonText ? buttonText : 'Okay'}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            {/* </TouchableWithoutFeedback > */}
        </Modal>
    )
}

const styles = StyleSheet.create({        
    
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        backgroundColor: '#00000055',
        zIndex:99999999999999,
    },

    modalView: {        
        width: '90%',
        backgroundColor: "white",
        borderRadius: 7,
        padding: 0,        
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
})


export default AlertDialog;