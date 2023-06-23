import { StyleSheet, View } from 'react-native'
import React from 'react'
import CheckinRingFenceView from '../components/CheckinRingFenceView'
import { Constants } from '../../../../constants'

const CheckinRingFenceContainer = (props) => {

    const onContinue = () => {
        if(props.onButtonAction)
            props.onButtonAction({ type: Constants.actionType.ACTION_APPLY });
    }

    const onUpdate = () => {
        if(props.onButtonAction)
            props.onButtonAction({ type: Constants.actionType.ACTION_NEXT });
    }

    const onCancel = () => {
        if(props.onButtonAction)
            props.onButtonAction({ type: Constants.actionType.ACTION_CLOSE });
    }
    
    return (
        <View>
            <CheckinRingFenceView 
                onContinue={onContinue}
                onUpdate={onUpdate}
                onCancel={onCancel}
            {...props}/>
        </View>
    )

}

export default CheckinRingFenceContainer

const styles = StyleSheet.create({})