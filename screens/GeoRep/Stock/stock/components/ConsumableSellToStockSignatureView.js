

import { View, StyleSheet, Platform , Keyboard } from 'react-native'
import React , {useRef , useEffect ,useState } from 'react'
import CTextInput from '../../../../../components/common/CTextInput'
import SignatureScreen from "react-native-signature-canvas";
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import { useSelector } from 'react-redux';
import RNFS from "react-native-fs";


export default function ConsumableSellToStockSignatureView(props) {

    const signatureScreenRef =  useRef(null)
    const { 
        receivedBy , 
        quantity,
        price,
        reference,        
        onChangedReceivedBy, 
        onChangedQuantity,
        onChangedPrice,
        onChangedReference,
        signature,  
        onSubmit , 
        onClose } = props;
    const map_style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true); // or some other action
          console.log("show key board")
        },
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false); // or some other action
          console.log("hide keyboard")
        },
      );
  
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);

    const handleOK = async(signature) => {

        var outputPath = Platform.OS === 'ios' ? `${RNFS.DocumentDirectoryPath}` : `${RNFS.ExternalDirectoryPath}`;

        const path = outputPath + "/sign.png";        
        console.log("path", path);

        var data = await RNFS.writeFile(path,  signature.replace("data:image/png;base64,", ""),  'base64').then(res => {
            onSubmit(path);
            return res;
        });

    };


    const handleEmpty = () => {    
        onClose();
    };

    const handleConfirm = () => {        
        var tmp = signatureScreenRef.current.readSignature();    
    }
    const getHeight = () => {
        if(!isKeyboardVisible){
            if(Platform.OS === "android"){
                return 460;
            }else{
                return 480;
            }
        }else{
            if(Platform.OS === "android"){
                return 320;
            }else{
                return 300;
            }
        }        
    }

    return (
        <View style={[styles.container , {height: getHeight() }]}>
            <CTextInput 
                label={"Received By"}
                value={receivedBy}
                returnKeyType={'done'}                                        
                isRequired={true}
                onChangeText={text => {                
                    onChangedReceivedBy(text);
                }}
                style={{marginTop:15}}
            /> 

            <CTextInput 
                label={"Quantity to Sell"}
                value={quantity}
                returnKeyType={'done'}                                        
                keyboardType={'number-pad'}
                isRequired={true}
                onChangeText={text => {                
                    onChangedQuantity(text);
                }}
                style={{marginTop:5}}
            />

            <CTextInput 
                label={"Price"}
                value={price}
                returnKeyType={'done'}                                        
                keyboardType={'number-pad'}
                isRequired={true}
                onChangeText={text => {                
                    onChangedPrice(text);
                }}
                style={{marginTop:5}}
            />

            <CTextInput 
                label={"Preference"}
                value={reference}
                returnKeyType={'done'}                                        
                keyboardType={'number-pad'}
                isRequired={true}
                onChangeText={text => {                
                    onChangedReference(text);
                }}
                style={{marginTop:5}}
            />


            
            <SignatureScreen
                style={{marginTop:10}}
                ref={signatureScreenRef}
                //androidHardwareAccelerationDisabled={false}
                webStyle={map_style}
                dataURL={signature}
                //onEnd={handleEnd}
                onOK={handleOK}
                onEmpty={handleEmpty}
                imageType='image/png'
                //onClear={handleClear}
                // onGetData={handleData}
                // autoClear={true}
                //descriptionText={text}
            />

            <SubmitButton title="Submit" style={{marginTop:10}} onSubmit={handleConfirm}> </SubmitButton>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:10,        
        height:Platform.OS === 'android' ? 460 : 480,
    }
})