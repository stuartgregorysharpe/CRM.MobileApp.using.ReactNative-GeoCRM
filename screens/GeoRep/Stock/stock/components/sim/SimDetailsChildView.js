
import { View, TouchableOpacity } from 'react-native'
import React , { useState } from 'react'
import { SubmitButton } from '../../../../../../components/shared/SubmitButton'
import { AppText } from '../../../../../../components/common/AppText'
import CButtonTextInput from '../../../../../../components/common/CButtonTextInput';
import Divider from '../../../../../../components/Divider';
import { Colors } from '../../../../../../constants';
import CCircleButton from '../../../../../../components/common/CCircleButton';

export default function SimDetailsChildView(props) {

    const { selectedCodes, title ,onAddCode , sellToTrader, transfer, viewLists, onClose} = props;
    const [code, setCode] = useState('');

    const checkValidation = () => {
        var check = props.codeLists.filter(item => item.code === code);
        return check.length > 0 ? true : false;        
    }

    return (
        <View style={{paddingHorizontal:10, paddingTop:0, marginBottom: 20 , backgroundColor:Colors.bgColor}}>
            
            <TouchableOpacity style={{padding:10 }} onPress={() => onClose()}>
                <Divider></Divider>
            </TouchableOpacity>
            
            <View style={{flexDirection:'row' , marginTop: 10 , alignItems:'center' }}>
                <View style={{flex:1}}>
                    <AppText size="big" type="secondaryMedium" title={title ? title: 'Item: ' + selectedCodes.length }></AppText>
                </View>                
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
                onSubmit={() => {
                    onAddCode(code)
                    if(checkValidation()){
                        setCode("")
                    }
                }}
                style={{marginTop:20, marginBottom:20}}
            /> 

            <SubmitButton title="Sell To Trader" onSubmit={sellToTrader} ></SubmitButton>
            
            <SubmitButton title="Transfer" onSubmit={transfer} style={{marginTop:10}} ></SubmitButton>

        </View>
    )
}