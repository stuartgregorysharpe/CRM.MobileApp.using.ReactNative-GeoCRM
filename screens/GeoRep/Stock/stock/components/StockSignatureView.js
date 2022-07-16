

import { View, StyleSheet, Platform } from 'react-native'
import React , {useRef , useState} from 'react'
import CTextInput from '../../../../../components/common/CTextInput'
import SignatureScreen from "react-native-signature-canvas";
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import { useSelector } from 'react-redux';
import RNFS from "react-native-fs";
import { Constants } from '../../../../../constants';
import uuid from 'react-native-uuid';
import { validateMsisdn } from '../../../../../helpers/formatHelpers';
var previousText = Constants.msisdnPrefix;

export default function StockSignatureView(props) {

    const signatureScreenRef =  useRef(null)
    const msisdnRef = useRef(null);
    const { receivedBy , onChangedReceivedBy, onChangedSerial , signature,  onSubmit , onClose } = props;
    const map_style = `.m-signature-pad--footer {display: none; margin: 0px;}`;
    const features = useSelector(state => state.selection.payload.user_scopes.geo_rep.features);
    const isMSISDN = features.includes("msisdn");    
    const [enabled, setEnabled] = useState(false);
    const [path, setPath] = useState(null);
    const [hasMsisdnError , setHasMsisdnError] = useState(false)
    const [serial, setSerial] = useState(Constants.msisdnPrefix)
    

    const handleOK = async(signature) => {
        console.log("handle ok")
        var outputPath = Platform.OS === 'ios' ? `${RNFS.DocumentDirectoryPath}` : `${RNFS.ExternalDirectoryPath}`;
        const filepath = outputPath + "/sign" + "-" + uuid.v4() + ".png";
        var data = await RNFS.writeFile(filepath,  signature.replace("data:image/png;base64,", ""),  'base64').then(res => {
            console.log("ressss",res)            
            return res;
        });

        setPath(filepath);        
        
        // const path = FileSystem.cacheDirectory + "sign.png";
        // FileSystem.writeAsStringAsync(
        //   path,
        //   signature.replace("data:image/png;base64,", ""),
        //   { encoding: FileSystem.EncodingType.Base64 }
        // )
        //   .then(() => FileSystem.getInfoAsync(path))
        //   .then(console.log)
        //   .catch(console.error);        
        // onSubmit(signature);
    };


    const handleEmpty = () => {    
        onClose();
    };

    const handleConfirm = () => {        
        var tmp = signatureScreenRef.current.readSignature();    
    }
    const handleEnd = () => {
        checkValidation();
        handleConfirm();
    }

    const checkValidation = () => {
        var flag = false;
        if ( props.item.stock_type != Constants.stockType.RETURN && (isMSISDN && props.item.stock_type != Constants.stockType.SIM) ){
            console.log("validate")
            if(validateMsisdn(serial)){
                flag = true;
                setHasMsisdnError(false)
            }else{
                setHasMsisdnError(true)
            }
            if(receivedBy != '' ){
                flag = true;
            }            
        }else{
            if(receivedBy != ''){
                flag = true;
            }
        }
        setEnabled(flag);
    }

    const onFileSubmit = () =>{        
        if(!validateMsisdn(serial)){
            setHasMsisdnError(true);
            msisdnRef.current.focus();
            return;
        }                
        if(enabled){
            if(path != null){
                RNFS.exists(path)
                .then(res => {
                    if (res) {
                        onSubmit(path);
                    }                
                });
            }
        }                
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
                    checkValidation();
                }}
                style={{marginTop:15}}
            /> 

            {
                props.item.stock_type != Constants.stockType.RETURN && (isMSISDN && props.item.stock_type != Constants.stockType.SIM) && 
                <CTextInput                
                    cTextRef={msisdnRef}
                    label={"Assign MSISDN"}
                    value={serial}
                    returnKeyType={'done'}                                        
                    keyboardType={'number-pad'}
                    isRequired={true}                    
                    hasError={hasMsisdnError}
                    errorText={Constants.msisdnErrorMessage}
                    onChangeText={text => {                        
                        if(text.length <= 2){
                            setSerial(Constants.msisdnPrefix);
                            onChangedSerial(Constants.msisdnPrefix);
                        } else {                
                            if( text.startsWith(Constants.msisdnPrefix) ){
                                setSerial(text);
                                onChangedSerial(text);
                                previousText = text;
                            }else{
                                setSerial(previousText);
                                onChangedSerial(previousText);
                            }                                                        
                        }
                        if(validateMsisdn(text)){
                            setHasMsisdnError(false);
                        }                        
                    }}
                    style={{marginTop:5}}
                    maxLength={11}
                    onBlur={() => {                  
                        if(!validateMsisdn(serial)){
                            setHasMsisdnError(true);
                        }                                                                  
                    }}
                />
            }

            <SignatureScreen
                style={{marginTop:10}}
                ref={signatureScreenRef}
                //androidHardwareAccelerationDisabled={false}
                webStyle={map_style}
                dataURL={signature}
                onEnd={handleEnd}
                onOK={handleOK}
                onEmpty={handleEmpty}
                imageType='image/png'
                //onClear={handleClear}
                //onGetData={handleData}
                // autoClear={true}
                //descriptionText={text}
            />

            <SubmitButton title="Submit" style={{marginTop:10}} onSubmit={onFileSubmit}> </SubmitButton>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:10,        
        height:Platform.OS === 'android' ? 360 : 380,
    }
})