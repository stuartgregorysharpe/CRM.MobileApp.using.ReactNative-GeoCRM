import { StyleSheet, Text, View , TouchableOpacity  } from 'react-native'
import React , { useState , useRef , useEffect} from 'react'
import CTextInput from '../CTextInput';
import { SubmitButton } from '../../shared/SubmitButton';
import QRScanModal from '../QRScanModal';
import ConfirmDialog from '../../modal/ConfirmDialog';
import { Colors, Constants, Strings } from '../../../constants';
import { whiteLabel } from '../../../constants/Colors';

const ScanCodeInput = (props) => {
    
    const { value , type, errors , placeholder } = props;

    
    const [codeDisabled, setCodeDisabled] = useState(true);
    const [code, setCode] = useState(value);
    const qrScanModalRef = useRef(null);
    const confirmDialogRef = useRef();    

    useEffect(() => {
        if(value != undefined){
            setCode(value);
        }
    },[value]);

    const popDialog = () => {
        if (codeDisabled) {
            showConfirmModal();
        }
    }
  
    const onCaptureAction = ({type, value}) => {
        if (type == Constants.actionType.ACTION_CAPTURE) {
            setCode(value);
            if(props.onChangedData)
                props.onChangedData(value);            
        }
    };

    const validateError = () => {
        console.log('validate errorr', errors , errors[type] , type);
        if (errors != undefined && errors[type] != undefined ) {//&& !codeDisabled
            console.log("trigger");
          return errors[type];
        }        
        return false;
    };

    const showConfirmModal = () => {    
        if(confirmDialogRef.current)
            confirmDialogRef.current.showModal( Strings.Stock.Have_You_Tried , 'No', 'Yes');
    }

    const hideConfirmModal = () => {
        if(confirmDialogRef.current){
            confirmDialogRef.current.hideModal();
        }
    }

    return (
        <View style={{alignSelf: 'stretch'}}>
            
            <QRScanModal
                    ref={qrScanModalRef}
                    isPartialDetect={true}
                    onButtonAction={onCaptureAction}
                    showClose={true}
                    onClose={() => {
                        qrScanModalRef.current.hideModal();
                    }}
            />

            <ConfirmDialog 
                ref={confirmDialogRef}
                buttonTextStyle={styles.noButtonStyle}
                buttonText2Style={styles.yesButtonStyle}
                onBack={() => {
                    hideConfirmModal();
                }}
                onDone={() => {
                    hideConfirmModal();
                    setCodeDisabled(false);
                }}
            />

            <View
                style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'stretch',
                }}>

                <View style={{flex: 1, position: 'relative'}}>
                    
                    <CTextInput
                        label={placeholder}
                        value={code}
                        keyboardType={ type == 'msn' ? 'default' : 'number-pad'}
                        returnKeyType={'done'}
                        isRequired={true}
                        disabled={codeDisabled}
                        hasError={validateError()}
                        onChangeText={text => {
                            setCode(text);
                            if(props.onChangedData){
                                props.onChangedData(text);
                            }
                        }}
                    />
                    {codeDisabled && (
                        <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        }}
                        onPress={() => {
                            popDialog();
                        }}></TouchableOpacity>
                    )}
                </View>
                                
                <SubmitButton
                    onSubmit={() => {
                        qrScanModalRef.current.showModal();
                    }}
                    svgIcon="QR_SCAN"
                    title="Scan Code"
                    style={{marginTop: 5, marginLeft: 10}}>          
                </SubmitButton>

            </View>
        </View>
        
    )
}

export default ScanCodeInput

const styles = StyleSheet.create({
    noButtonStyle :{
        color: Colors.disabledColor,        
    },
    yesButtonStyle : {
        color: whiteLabel().mainText
    }
})