import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native'
import React , { useRef } from 'react'
import SignatureScreen from "react-native-signature-canvas";
import { Colors, Fonts, Values } from '../../../constants';
import { AppText } from '../../common/AppText';
import { whiteLabel } from '../../../constants/Colors';

const SignatureSignView = (props) => {

    const { signature } = props;
    const map_style = `.m-signature-pad--footer {display: none; margin: 0px;}`;
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
        <View style={{height:180 , marginTop:15}}>

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
                // autoClear={true}
                //descriptionText={text}
            />
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
})