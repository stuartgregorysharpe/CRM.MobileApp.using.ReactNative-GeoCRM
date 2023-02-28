import React , { useEffect, useState, useImperativeHandle } from 'react';
import { View, Modal, TouchableWithoutFeedback, StyleSheet , TouchableHighlight,Text} from 'react-native';
import { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const ConfirmDialog = React.forwardRef((props, ref) => {

    const { message, buttonText } = props;
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        showModal: () => {
          setVisible(true)
        },
        hideModal: () => {
            setVisible(false);
        },
    }));

    const onModalClose = () => {

    }

    return (
        <Modal 
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onModalClose}>            
            {/* <TouchableWithoutFeedback onPress={onModalClose}> */}
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                    <Text style={styles.title}>{message}</Text>
                    <View style={styles.divider}></View>

                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableHighlight
                                underlayColor="#DDDDDD"
                                style={{
                                alignItems: 'center',
                                borderBottomLeftRadius: 7,
                                flex: 1,
                                }}
                                onPress={() => {
                                    if(props.onBack){
                                        props.onBack();
                                    }
                                }}>
                                <Text style={[styles.button , { color: whiteLabel().mainText } ]}>
                                    Back
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                underlayColor="#DDDDDD"
                                style={{
                                alignItems: 'center',
                                borderBottomEndRadius: 7,
                                flex: 1,
                                }}
                                onPress={() => {
                                    if(props.onDone){
                                        props.onDone()
                                    }
                                }}>
                                <Text style={[styles.button , { color: whiteLabel().endDayBackground }]}>{'Delete'}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            {/* </TouchableWithoutFeedback > */}
        </Modal>
    )
});


//export const CustomAlert: AlertDialog;
// export default AlertDialog;


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
        fontFamily:Fonts.secondaryMedium,
        fontSize:18,        
        padding:10
    },

    divider:{
        height:1,
        backgroundColor:'#eee',        
    }

})


export default ConfirmDialog;