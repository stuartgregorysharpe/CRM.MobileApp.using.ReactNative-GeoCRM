import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { boxShadow, style } from '../../constants/Styles'
import { AppText } from '../common/AppText'
import CCheckBox from '../common/CCheckBox'
import { whiteLabel } from '../../constants/Colors'

const DevicePriorityItem = (props) => {

    const { title , isPrimary  } = props;

    return (
        <View style={[styles.refreshBox, props.style]}>
            <View
                style={[style.card, boxShadow , {flexDirection:'row', alignSelf:'stretch'}]}>

                <AppText title={title} />
                        
                <CCheckBox value={isPrimary} style={styles.checkbox} onValueChange={() => {
                                        if(!isPrimary && props.onUpdate){
                                            if(title === "Primary"){
                                                props.onUpdate(true);
                                            }else{
                                                props.onUpdate(false);
                                            }                                            
                                        }                                         
                }} />
            </View>  
        </View>
    )
}

export default DevicePriorityItem

const styles = StyleSheet.create({

    refreshBox: {
        flex: 1,		
        alignSelf:'stretch',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 0,
    },

    checkbox: {
        marginRight:10,
        width: 25,
        height: 25,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: whiteLabel().itemSelectedBackground,
        borderWidth: 1,
        borderColor: whiteLabel().itemSelectedBackground,
    },

})