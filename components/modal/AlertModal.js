import React from 'react';
import { useState,useImperativeHandle } from 'react';
import { View, Modal, StyleSheet , TouchableHighlight,Text} from 'react-native';
import { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { useDispatch  } from 'react-redux';
import { setToken } from '../../constants/Storage';
import { CHANGE_LOGIN_STATUS } from '../../actions/actionTypes';
import { style } from '../../constants/Styles';

const AlertModal=  React.forwardRef((props, ref) => {

  const [message, setMessage] = useState(props.message || '')
  const [visible, setVisible] = useState(false)
  const [buttonText, setButtonText] = useState('Okay');
  const [isExpire, setIsExpire] = useState(false);
  const [response, setResponse] = useState('');
  const dispatch = useDispatch()

  useImperativeHandle(ref, () => ({
    alert: (message = '', buttonText='Okay' , expire = false , res = '' ) => {
      setMessage(message)
      setButtonText(buttonText == '' ? 'Okay' : buttonText );
      setVisible(true)
      setIsExpire(expire);
      setResponse(res);
    },
    hideModal: () => {
      setVisible(false);      
      if(isExpire){
        setToken(null);
        dispatch({ type: CHANGE_LOGIN_STATUS, payload: 'logout' });
      }
    },
  }))
 
  const onModalClose = () => {
    setVisible(false);
    if(isExpire){
      setToken(null);
      dispatch({ type: CHANGE_LOGIN_STATUS, payload: 'logout' });
    }
    if(props.onModalClose){
      props.onModalClose(response);
    }
  }

    return (
        <Modal 
            animationType="fade"
            transparent={true}
            visible={visible}>            
          <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text style={styles.title} >{message}</Text>
                  <View style={style.divider}></View>
                  <TouchableHighlight 
                  underlayColor="#DDDDDD"
                  style={{alignItems:'center', borderBottomEndRadius:7, borderBottomLeftRadius:7}} onPress={() => onModalClose() }>
                      <Text style={style.buttonText} >{ buttonText }</Text>
                  </TouchableHighlight>
              </View>
          </View>
        </Modal>
    )
  })

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
})


export default AlertModal;