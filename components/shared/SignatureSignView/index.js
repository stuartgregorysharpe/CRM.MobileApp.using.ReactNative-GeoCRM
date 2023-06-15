import { StyleSheet, Text, View ,TouchableOpacity, Platform } from 'react-native'
import React , { useRef } from 'react'
import SignatureScreen from "react-native-signature-canvas";
import { Colors, Fonts, Values } from '../../../constants';
import { AppText } from '../../common/AppText';
import { whiteLabel } from '../../../constants/Colors';
import RNFS from 'react-native-fs';
import { generateKey } from '../../../constants/Utils';

const SignatureSignView = (props) => {

    const { hasError, signature , title } = props;
    const imgWidth = 300;
    const imgHeight = 180;
    
    const map_style = `.m-signature-pad {box-shadow: none; border: none; } 
              .m-signature-pad--body {border: none;}
              .m-signature-pad--footer {display: none; margin: 0px;}`;

    const ref = useRef();
    
    const handleOK = (signature) => {                
        saveImage(signature);        
    };
    
    const handleEmpty = () => {
        if(props.onEmpty){
            props.onEmpty();
        }
        if(props.onClose){
            props.onClose();
        }        
    };

    const handleClear = () => {
        if(ref.current)
            ref.current.clearSignature();
        if(props.onOK){
            props.onOK('');
        }
    }    

    const handleData = () => {
        if(ref.current){
            ref.current.readSignature();
        }        
    }

    const handleEnd = async () => {        
        var signature = ref.current.readSignature();      
        saveImage(signature);                   
    }
    
    const saveImage = async(signature) => {
        if(signature  != null){
            var outputPath =
            Platform.OS === 'ios'
            ? `${RNFS.DocumentDirectoryPath}`
            : `${RNFS.ExternalDirectoryPath}`;
            var filepath = outputPath + '/add_prodict_sign' + '-' + generateKey() + '.png';
            var data = await RNFS.writeFile(
                filepath,
                signature.replace('data:image/png;base64,', ''),
                'base64',
            ).then(res => {
                if (!filepath.includes('file://')) {
                    filepath = 'file://' + filepath;
                }            
                props.onOK(filepath); 
                return res;
            });                        
        }  
    }


    return (
        <View style={{marginTop:15}}>

            <View style={{flexDirection:'row', justifyContent:'center', marginBottom:5}}>

                    <AppText title={title != undefined ? title + " " : 'Please Sign below:'} style={{fontSize:15}} color={whiteLabel().mainText} />

                    <TouchableOpacity
                      style={styles.clearButtonContainer}
                      onPress={handleClear}>
                      <Text style={styles.clearText}>
                        {'Clear Signature'}
                      </Text>
                    </TouchableOpacity>

            </View>

            <View style={[styles.signatureContainer , hasError !=undefined && hasError ? {borderColor: whiteLabel().endDayBackground} : {} ]}>
                <SignatureScreen
                    ref={ref}
                    //androidHardwareAccelerationDisabled={false}
                    webStyle={map_style}
                    //dataURL={signature}
                    
                    onOK={handleOK}
                    onEmpty={handleEmpty}
                    //imageType='image/png'
                    //onClear={handleClear}
                    onGetData={handleData}
                    bgHeight={170}
                    overlayHeight={170}
                    onBegin={() => {
                        if(props.setScrollEnabled){
                            props.setScrollEnabled(false);
                        }                        
                    }}
                    onEnd={() => {
                        handleEnd();
                        if(props.setScrollEnabled){
                            props.setScrollEnabled(true)
                        }
                    }}
                    // autoClear={true}
                    //descriptionText={text}
                />
            </View>
            
        </View>
    )
}

export default SignatureSignView

const styles = StyleSheet.create({
    clearButtonContainer: {
        position: 'absolute',
        top:2,
        right: 0,
    },

    clearText: {
        fontSize: Values.fontSize.xSmall,
        fontFamily: Fonts.secondaryRegular,
        color: Colors.redColor,
    },

    signatureContainer :{
        alignSelf:'stretch', 
        height:170, 
        borderWidth:1, 
        borderColor: Colors.greyColor
    }
})