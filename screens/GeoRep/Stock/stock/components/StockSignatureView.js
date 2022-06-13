

import { View, StyleSheet } from 'react-native'
import React , {useRef} from 'react'
import CTextInput from '../../../../../components/common/CTextInput'
import SignatureScreen from "react-native-signature-canvas";
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import { useSelector } from 'react-redux';

export default function StockSignatureView(props) {

    const signatureScreenRef =  useRef(null)
    const { receivedBy , serial,  onChangedReceivedBy, onChangedSerial , signature,  onOK , onClose } = props;
    const map_style = `.m-signature-pad--footer {display: none; margin: 0px;}`;
    const features = useSelector(state => state.selection.payload.user_scopes.geo_rep.features);
    const isMSISDN = features.includes("msisdn");    

    const handleOK = (signature) => {        
        onOK(signature);
    };

    const handleEmpty = () => {    
        onClose();
    };

    const handleConfirm = () => {        
        var tmp = signatureScreenRef.current.readSignature();    
    }

    return (
        <View style={styles.container}>
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

            {
                isMSISDN && 
                <CTextInput 
                    label={"Assign MSISDN"}
                    value={receivedBy}
                    returnKeyType={'done'}                                        
                    keyboardType={'number-pad'}
                    isRequired={true}
                    onChangeText={text => {                
                        onChangedSerial(text);
                    }}
                    style={{marginTop:5}}
                />
            }

            <SignatureScreen
                style={{marginTop:10}}
                ref={signatureScreenRef}
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

            <SubmitButton title="Submit" style={{marginTop:10}} onSubmit={handleConfirm}> </SubmitButton>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:10,        
        height:Platform.OS === 'android' ? 360 : 380,
    }
})