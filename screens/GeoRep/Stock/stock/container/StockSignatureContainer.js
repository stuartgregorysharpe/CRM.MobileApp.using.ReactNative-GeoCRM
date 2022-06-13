
import { View, Text } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import StockSignatureView from '../components/StockSignatureView';

export default function StockSignatureContainer(props) {
         
    useEffect(() => {

    },[]);  

    const onItemPressed = (item) => {

    }

    const onSubmit = () => {

    }
    const onOK = (signature) => {
        
    }
    const onChangedSerial = (serial) => {

    }
    
    const onChangedReceivedBy = (receivedBy) => {
        
    }
    
    return (
        <View style={{alignSelf:'stretch'}}>
            <StockSignatureView                
                onItemPressed = {onItemPressed}
                onSubmit = {onSubmit}
                onOK={onOK}
                onChangedReceivedBy={onChangedReceivedBy}
                onChangedSerial={onChangedSerial}
                {...props}
            />

            
        </View>
    )
}