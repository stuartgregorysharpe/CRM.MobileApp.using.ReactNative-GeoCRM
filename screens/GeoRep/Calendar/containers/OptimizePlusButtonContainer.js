import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OptimizePlusButtonView from '../components/OptimizePlusButtonView'
import { checkConnectivity } from '../../../../DAO/helper'
import { IS_CALENDAR_SELECTION } from '../../../../actions/actionTypes'
import { useDispatch } from 'react-redux'
import { showOfflineDialog } from '../../../../constants/Helper'

const OptimizePlusButtonContainer = (props) => {

    const dispatch = useDispatch()

    const onOptimize = () => {
        if(props.onOptimize)
            props.onOptimize()
    }

    const onAdd = () => {        
        checkConnectivity().then( isConnected => {
            if (isConnected) {                
                addLocationToCalendar();
            } else {
                showOfflineDialog(dispatch);
            }
        });        
    }

    const addLocationToCalendar = () => {
        
        dispatch({
          type: IS_CALENDAR_SELECTION , 
          payload: true,
        });
    
        props.navigation.navigate('CRM', {
          screen: 'LocationSearch',
          params: {calendar_type: 'optimize'},
        });
    };

    return (
        <View>
            <OptimizePlusButtonView 
                {...props}            
                onOptimize={onOptimize}
                onAdd={onAdd}
            />
        </View>
    )
}

export default OptimizePlusButtonContainer

const styles = StyleSheet.create({})