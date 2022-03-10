import React, { useState, useEffect , useRef} from 'react';
import { View, TouchableOpacity, StyleSheet,  Text, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import SignatureScreen from "react-native-signature-canvas";
import Divider from '../../../../../components/Divider';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import Fonts from '../../../../../constants/Fonts';

const Sign = ({ text, onOK , onClose }) => {


  const ref = useRef();
  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;


  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    console.log(signature);
    onOK(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
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
  }

  const handleConfirm = () => {
    console.log("end");
    ref.current.readSignature();
  }

  return (
    <View style={styles.container}>

        <Divider></Divider>
        
        <View style={[styles.titleContainer, {marginTop:10}]}>
            <View style={{flex:1, alignItems:'center'}}>
                <Text style={styles.titleStyle} >Please Sign Below:</Text>
            </View>
                       
            <Button
                style={{position:'absolute' , right:10}}
                labelStyle={styles.clearStyle}
                color={Colors.selectedRedColor}
                uppercase={false} 
                onPress={ async() => { 
                    console.log("clear");
                    handleClear();
                }}>
            Clear
            </Button>
        </View>

        <SignatureScreen
            ref={ref}
            webStyle={style}
            //onEnd={handleEnd}
            onOK={handleOK}
            // onEmpty={handleEmpty}
            // onClear={handleClear}
            // onGetData={handleData}
            // autoClear={true}
            // descriptionText={text}
        />
                    
        <View style={{ paddingHorizontal:30 , marginVertical:10, width:Dimensions.get('window').width }}>
            <SubmitButton onSubmit={ () => {
                 handleConfirm(); 
                 onClose(); 
                } } title="Submit"  ></SubmitButton>
        </View>

        
    </View>
    
  );
};


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
        paddingTop:10,
        height:300,
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
        color: whiteLabel().selectedRedColor,
        fontFamily: Fonts.primaryRegular, 
        letterSpacing: 0.2  
    },

    titleStyle:{
        marginVertical:10,
        color: whiteLabel().mainText,
        fontSize:16,
        fontFamily:Fonts.primaryBold
    },  
    
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
    },
});

export default Sign;