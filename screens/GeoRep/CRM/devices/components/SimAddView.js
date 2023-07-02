import { Platform, StyleSheet, View } from 'react-native'
import React , { useState , useEffect } from 'react'
import { validateMsisdn } from '../../../../../helpers/validateHelper';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import DeleteUpdateBtnView from './DeleteUpdateBtnView';
import MsisdnInput from '../../../../../components/common/MsisdnInput';
import { Strings } from '../../../../../constants';

const SimAddView = ( props ) => {

    const { initialValue , simModalType } = props;

    const [msisdn , setMsisdn] = useState();

    useEffect(() => {        
        if(simModalType == 'add'){
            setMsisdn('');
        }else{
            setMsisdn(initialValue)
        }        
    }, [initialValue , simModalType])
    
    const onButotnPressed = (type) => {
        
        if(type == 'delete'){
            if(props.onDelete){
                props.onDelete();
            }
        }else {
            if(validateMsisdn(msisdn)){
                if(type == 'add'){
                    if(props.onAdd){
                        props.onAdd(msisdn);
                    }                                 
                }else if( type == 'update'){
                    if(props.onUpdate){
                        props.onUpdate(msisdn);
                    }
                }            
            }else{
                if(props.showAlertModal){
                    props.showAlertModal(Strings.Complete_Compulsory_Fields , 'compulsory');
                }
            }
        }        
    }

    return (
        <View style={styles.container}>

            <MsisdnInput 
                initialValue={msisdn}
                simModalType={simModalType}
                onChangeText={(text) => {
                    setMsisdn(text);
                }}
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