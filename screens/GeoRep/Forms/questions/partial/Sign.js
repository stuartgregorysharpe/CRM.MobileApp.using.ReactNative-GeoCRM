import React, { useState, useEffect , useRef} from 'react';
import { View, TouchableOpacity, StyleSheet,  Text, Dimensions, Platform ,TouchableWithoutFeedback , Modal } from 'react-native';
import { Button } from 'react-native-paper';
import SignatureScreen from "react-native-signature-canvas";
import Divider from '../../../../../components/Divider';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import { Strings } from '../../../../../constants';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import Fonts from '../../../../../constants/Fonts';
import { style } from '../../../../../constants/Styles';

const Sign = ({ visible, signature, onOK , onClear, onClose }) => {

  const [data, setData] = useState(signature);
 
  useEffect(() => {    
    setTimeout(() => {
      setData(signature);      
    }, 2000);
  },[]);

  const ref = useRef();

  const map_style = `.m-signature-pad--footer {display: none; margin: 0px;}`;
  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {    
    onOK(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
    onClose();
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = (data) => {
    console.log(data);    
  };
  
  const handleClear = () => {
    ref.current.clearSignature();
    onClear();    
  }

  const handleConfirm = () => {
    console.log("end");
    var tmp = ref.current.readSignature();    
    //onOK(ref.current.readSignature()); 
  }
  
  return (    
    <TouchableWithoutFeedback onPress={onClose}>
        <Modal 
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>                        
                <View style={[style.centeredView]}> 
                    <TouchableWithoutFeedback onPress={onClose}>
                      <View style={styles.topContainer}></View>
                    </TouchableWithoutFeedback>
                    <View style={[style.modalView, styles.container]} >
                        <Divider></Divider>
            
                        <View style={[styles.titleContainer, {marginTop:5}]}>
                            <View style={{flex:1, alignItems:'center'}}>
                                <Text style={styles.titleStyle} >{Strings.Stock.Please_Sign}</Text>
                            </View>
                                      
                            <Button
                                style={{position:'absolute' , right:10}}
                                labelStyle={styles.clearStyle}
                                // /color={Colors.selectedRedColor}
                                uppercase={false} 
                                onPress={ async() => {     
                                    handleClear();
                                }}>
                            Clear
                            </Button>
                        </View>
                                              
                        <SignatureScreen
                            ref={ref}
                            //androidHardwareAccelerationDisabled={false}
                            webStyle={map_style}
                            dataURL={signature}
                            //onEnd={handleEnd}
                            onOK={handleOK}
                            onEmpty={handleEmpty}
                            //imageType='image/png'
                            //onClear={handleClear}
                            // onGetData={handleData}
                            // autoClear={true}
                            //descriptionText={text}
                        />
                                    
                        <View style={{ marginVertical:10, width:Dimensions.get('window').width * 0.94 }}>
                            <SubmitButton onSubmit={ () => {                
                                handleConfirm();                  
                                //onClose();
                                } } title="Submit"  ></SubmitButton>
                        </View>
                    </View>
                  
                </View>
            
          </Modal>
      </TouchableWithoutFeedback>    
  );
};


const styles = StyleSheet.create({

    topContainer:{
      width:Dimensions.get("screen").width,        
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height:Dimensions.get("screen").height,        
    },
    container: {
        width:Dimensions.get("screen").width,        
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.bgColor,
        elevation: 2,
        zIndex: 2000,        
        paddingTop:10,
        height:Platform.OS === 'android' ? 360 : 380,
        alignItems: "center",
        justifyContent: "center",
        width:Dimensions.get("window").width,            
    },

    
    titleContainer:{        
        flexDirection:'row',        
        alignItems:'flex-end',
        alignContent:'flex-end'
    },

    clearStyle:{    
        color: Colors.selectedRedColor,
        fontFamily: Fonts.primaryRegular, 
        letterSpacing: 0.2 
    },

    titleStyle:{
        marginVertical:10,
        color: whiteLabel().mainText,
        fontSize:16,
        fontFamily:Fonts.primaryBold
    },        
});

export default Sign;