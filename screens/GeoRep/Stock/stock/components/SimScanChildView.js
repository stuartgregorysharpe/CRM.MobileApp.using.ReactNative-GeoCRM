
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React , { useState } from 'react'
import { SubmitButton } from '../../../../../components/shared/SubmitButton'
import { AppText } from '../../../../../components/common/AppText'
import CButtonTextInput from '../../../../../components/common/CButtonTextInput';
import Divider from '../../../../../components/Divider';
import { Colors } from '../../../../../constants';
import CCircleButton from '../../../../../components/common/CCircleButton';


export default function SimScanChildView(props) {

    const { title ,onSubmit , addStock, changeNetwork, viewLists, onClose} = props;
    const [code, setCode] = useState('')
    return (
        <View style={{paddingHorizontal:10, paddingTop:0, marginBottom: 20 , backgroundColor:Colors.bgColor}}>
            
            <TouchableOpacity style={{padding:10 }} onPress={() => onClose()}>
                <Divider></Divider>
            </TouchableOpacity>
            
            <View style={{flexDirection:'row' , marginTop: 20 , alignItems:'center' }}>
                <View style={{flex:1}}>
                    <AppText size="big" type="secondaryMedium" title={title ? title: 'Items'}></AppText>
                </View>
                <CCircleButton onClick={() => changeNetwork() } title="Change Network"></CCircleButton>
                <CCircleButton onClick={() => viewLists() } style={{marginLeft:10}} title="View List" icon="Check_List_Active"></CCircleButton>
            </View>
            
            <View style={{height:1, backgroundColor:Colors.primaryColor, marginTop:10}}></View>
            
            <CButtonTextInput 
                label={"Input ICCID"}
                value={code}
                returnKeyType={'done'}             
                keyboardType="number-pad"                         
                isRequired={true}
                onChangeText={text => {
                    setCode(text)
                }}
                onSubmit={() => onSubmit(code) }
                style={{marginTop:20, marginBottom:35}}
            /> 

            <SubmitButton title="Add Stock" onSubmit={addStock} ></SubmitButton>
        </View>
    )
}