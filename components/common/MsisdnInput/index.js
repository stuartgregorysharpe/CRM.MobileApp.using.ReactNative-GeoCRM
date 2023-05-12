import { StyleSheet, Text, View } from 'react-native'
import React , { useState , useEffect } from 'react'
import CTextInput from '../CTextInput'
import { Constants, Strings } from '../../../constants';
import { validateMsisdn } from '../../../helpers/validateHelper';


const MsisdnInput = (props) => {

    const { initialValue , hasError } = props;

    const [msisdn , setMsisdn] = useState(Constants.msisdnPrefix);
    const [hasMsisdnError, setHasMsisdnError] = useState( hasError ? true : false);
 
    const onChangeText = (text) => {
        if(props.onChangeText){
            props.onChangeText(text);
        }
    }

    useEffect(() => {                
        if(initialValue != undefined && initialValue != ''){
            setMsisdn(initialValue);               
        }
    }, [initialValue])


    return (
        <View>
            <CTextInput
                    label={'MSISDN'}
                    value={msisdn}
                    returnKeyType={'done'}
                    keyboardType={'number-pad'}
                    isRequired={true}
                    maxLength={11}
                    hasError={hasMsisdnError}
                    errorText={Strings.MSISDN_Error_Message}
                    onChangeText={text => {
                        if (text.length <= 2) {
                            setMsisdn(Constants.msisdnPrefix);
                            onChangeText(Constants.msisdnPrefix);
                        } else {
                            if (text.startsWith(Constants.msisdnPrefix)) {
                                setMsisdn(text);
                                previousText = text;
                                onChangeText(text)
                            } else {
                                setMsisdn(previousText);
                                onChangeText(text)
                            }
                        }
                        if ( validateMsisdn(text) ) {
                            setHasMsisdnError(false);
                        }else{
                            setHasMsisdnError(true);
                        }
                    }}
                    onBlur={() => {
                        if (!validateMsisdn(msisdn)) {
                            setHasMsisdnError(true);
                        }
                    }}
                    style={{marginTop: 10}}
            />      
        </View>
    )

}

export default MsisdnInput

const styles = StyleSheet.create({

})