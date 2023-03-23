import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SubmitButton } from '../../../../../components/shared/SubmitButton'
import { whiteLabel } from '../../../../../constants/Colors'

const DeleteUpdateBtnView = (props) => {

    const onDelete = () => {
        if(props.onDelete){
            props.onDelete();
        }
    }

    const onUpdate = () => {
        if(props.onUpdate){
            props.onUpdate()
        }
    }

    return (
        <View style={styles.container}>
            <SubmitButton 
                onSubmit={() => { onDelete() }}
                title="Delete" 
                style={styles.deleteBtnStyle} 
                titleStyle={styles.titleStyle} 
                theme='light'
            /> 
            <SubmitButton 
                onSubmit={() => { onUpdate() }}
                title="Update" 
                style={{flex:1, marginLeft:20}}
            />
        </View>
    )
}

export default DeleteUpdateBtnView

const styles = StyleSheet.create({

    container : {
        marginTop: 20,
        marginBottom: 10,
        flexDirection:'row',
        alignSelf:'stretch',
    },

    deleteBtnStyle : {
        flex:1,
        backgroundColor : 'white',
        borderWidth:1,
        borderColor: whiteLabel().fieldBorder,
    },

    titleStyle:{
        color: whiteLabel().mainText  
    },

})