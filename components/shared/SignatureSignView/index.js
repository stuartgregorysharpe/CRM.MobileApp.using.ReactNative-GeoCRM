import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native'
import React , { useRef } from 'react'
import SignatureScreen from "react-native-signature-canvas";
import { Colors, Fonts, Values } from '../../../constants';
import { AppText } from '../../common/AppText';
import { whiteLabel } from '../../../constants/Colors';

const SignatureSignView = (props) => {

    const { hasError, signature } = props;
    const imgWidth = 300;
    const imgHeight = 180;

    //const map_style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

    const map_style = `.m-signature-pad {box-shadow: none; border: none; } 
              .m-signature-pad--body {border: none;}
              .m-signature-pad--footer {display: none; margin: 0px;}`;

    const ref = useRef();

    
    const handleOK = (signature) => {                
        if(props.onOK){
            props.onOK(signature);
        }
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

    const handleEnd = () => {
        console.log("hande data end");
        props.onOK(ref.current.readSignature()); 
    }
    return (
        <View style={{marginTop:15}}>

            <View style={{flexDirection:'row', justifyContent:'center', marginBottom:5}}>

                    <AppText title="Please Sign below: " size="medium" color={whiteLabel().mainText} />

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
                    onEnd={handleEnd}
                    onOK={handleOK}
                    onEmpty={handleEmpty}
                    //imageType='image/png'
                    //onClear={handleClear}
                    onGetData={handleData}
                    bgHeight={170}
                    overlayHeight={170}
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