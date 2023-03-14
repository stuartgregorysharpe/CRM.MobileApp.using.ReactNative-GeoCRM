import { Platform, StyleSheet, Text, View } from 'react-native'
import React , { useState } from 'react'
import CTextInput from '../../../../../components/common/CTextInput'
import { Constants, Strings } from '../../../../../constants';
import { validateMsisdn } from '../../../../../helpers/validateHelper';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';

var previousText = Constants.msisdnPrefix;

const SimAddView = ( props ) => {

    const [msisdn , setMsisdn] = useState();
    const [hasMsisdnError, setHasMsisdnError] = useState(false);
    
    return (
        <View style={styles.container}>

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
                    } else {
                        if (text.startsWith(Constants.msisdnPrefix)) {
                            setMsisdn(text);
                            previousText = text;
                        } else {
                            setMsisdn(previousText);
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

            <SubmitButton 
                style={{marginTop: 15}}
                title={'Add'}
                onSubmit={() => {
                    if(validateMsisdn(msisdn)){
                        if(props.onAdd){
                            props.onAdd(msisdn);
                        }
                    }else{
                        if(props.showAlertModal){
                            props.showAlertModal();
                        }
                    }
                }}
            />

        </View>
    )
}

export default SimAddView

const styles = StyleSheet.create({
    container : {
        alignSelf: 'stretch',
        marginHorizontal : 20,
        marginBottom : Platform.OS == 'android' ? 20 : 50
    },
    
})