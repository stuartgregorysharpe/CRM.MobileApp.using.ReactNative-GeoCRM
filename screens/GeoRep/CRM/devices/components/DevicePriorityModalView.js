import { View, StyleSheet } from 'react-native'
import React , { useState , useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import DevicePriorityItem from '../../../../../components/items/DevicePriorityItem';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import MsisdnInput from '../../../../../components/common/MsisdnInput';
import ScanCodeInput from '../../../../../components/common/ScanCodeInput';

export default function DevicePriorityModalView(props) {

    const { device , errors } = props;

    const isAdditionalImei = device?.additional_imei_required == "1";    
    const isMsnRequired = device?.msn_required == '1';
    const [isPrimary, setIsPrimary] = useState(false);
    const [updatedDevice, setUpdatedDevice] = useState(null);    
    const type1 = isAdditionalImei ? 'imei1' : 'imei';
    const type2 = isAdditionalImei ? 'imei2' : '';
    
    const hasError = device?.msisdn == undefined || device?.msisdn == ''
    
    useEffect(() => {
        if(updatedDevice == null){
            const tmp = { ...device };
            tmp.device_serial = device.msn;
            setUpdatedDevice(tmp);
        }       
        setIsPrimary(device.primary_device === "1" ? true: false);
    }, [device])    

    const onUpdate = (priamry) => {
        const tmp = { ...updatedDevice };
        tmp.primary_device = priamry ? '1' : '0';    
        setUpdatedDevice(tmp);
        setIsPrimary(priamry);
    }

    const onSubmit = () => {
        if(props.onSubmit){
            props.onSubmit(updatedDevice);            
        }            
    }
  
    return (
        <View style={styles.container}>

                <ScrollView>                    
                    
                    <MsisdnInput 
                        hasError={hasError}
                        initialValue={updatedDevice?.msisdn}                                            
                        onChangeText={(text) => {
                            var tmp = { ...updatedDevice };
                            tmp.msisdn = text;
                            setUpdatedDevice(tmp)
                        }}
                    />

                    {
                        isMsnRequired && 
                        <ScanCodeInput 
                            placeholder={'MSN'}
                            type={'msn'}     
                            value={updatedDevice?.device_serial} 
                            errors={errors}
                            onChangedData={(text) =>{
                                var tmp = { ...updatedDevice };
                                tmp.device_serial = text;
                                tmp.msn = text;
                                setUpdatedDevice(tmp)
                            }}
                        />
                    }
                             

                    <ScanCodeInput 
                            placeholder={isAdditionalImei ? 'IMEI 1' : 'IMEI'}
                            type={type1} 
                            value={updatedDevice?.imei}
                            errors={errors}
                            onChangedData={(text) =>{
                                var tmp = { ...updatedDevice };
                                tmp.imei = text;
                                setUpdatedDevice(tmp)
                            }}
                        />

                    {
                        isAdditionalImei &&
                        <ScanCodeInput 
                            placeholder={isAdditionalImei ? 'IMEI 2' : ''}
                            type={type2} 
                            value={updatedDevice?.additional_imei} 
                            errors={errors}
                            onChangedData={(text) =>{
                                var tmp = { ...updatedDevice };
                                tmp.additional_imei = text;
                                setUpdatedDevice(tmp)
                            }}
                        />                        
                    }
                                            
                    <DevicePriorityItem title="Primary" isPrimary={isPrimary} onUpdate={onUpdate} style={{marginTop:10}} />

                    <DevicePriorityItem title="Additional" isPrimary={!isPrimary} onUpdate={onUpdate}/>

                    <SubmitButton                    
                        title="Save" 
                        onSubmit={() => {
                            onSubmit();
                        }}  
                        style={{marginTop:10, marginBottom:20}}
                    />
                    
                </ScrollView>

        </View>
        
    )
}


const styles = StyleSheet.create({
    container: {        
        flexDirection:'column',
        marginTop:8,        
        marginHorizontal: 20,      
        paddingBottom:0,        
    },  
  
})

  