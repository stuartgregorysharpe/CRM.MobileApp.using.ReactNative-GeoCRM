import { Platform, StyleSheet, Text, View } from 'react-native'
import React , { useState , useEffect } from 'react'
import CTextInput from '../../../../../components/common/CTextInput'
import { Constants, Strings } from '../../../../../constants';
import { validateMsisdn } from '../../../../../helpers/validateHelper';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import DeleteUpdateBtnView from './DeleteUpdateBtnView';

var previousText = Constants.msisdnPrefix;

const SimAddView = ( props ) => {

    const { initialValue , simModalType } = props;

    const [msisdn , setMsisdn] = useState();
    const [hasMsisdnError, setHasMsisdnError] = useState(false);

    useEffect(() => {
        setMsisdn(initialValue)        
    }, [initialValue])
    
    const onButotnPressed = (type) => {

        if(validateMsisdn(msisdn)){
            if(type == 'add'){
                if(props.onAdd){
                    props.onAdd(msisdn);
                }
            }else if(type == 'delete'){
                if(props.onDelete){
                    props.onDelete();
                }
            }else if( type == 'update'){
                if(props.onUpdate){
                    props.onUpdate(msisdn);
                }
            }            
        }else{
            if(props.showAlertModal){
                props.showAlertModal();
            }
        }
    }

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

            {
                simModalType == "add" &&
                <SubmitButton 
                    style={{marginTop: 15}}
                    title={'Add'}
                    onSubmit={() => {
                        onButotnPressed('add')
                    }}
                />
            }            
            {
                simModalType != "add" &&
                <DeleteUpdateBtnView 
                    onDelete={() => {
                        onButotnPressed('delete')
                    }}
                    onUpdate={() => {
                        onButotnPressed('update')
                    }}
                />
            }

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