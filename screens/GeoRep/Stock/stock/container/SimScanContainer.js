
import { View } from 'react-native'
import React from 'react'
import { Constants } from '../../../../../constants';
import SimScanView from '../components/SimScanView';

export default function SimScanContainer(props) {
    
    const addData = (value) => {        
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }

    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            <SimScanView                 
                onButtonAction={addData}                
                {...props}
            />
        </View>
    )
}