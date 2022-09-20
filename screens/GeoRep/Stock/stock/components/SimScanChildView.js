
import { View, TouchableOpacity } from 'react-native'
import React , { useState,useEffect } from 'react'
import { SubmitButton } from '../../../../../components/shared/SubmitButton'
import { AppText } from '../../../../../components/common/AppText'
import CButtonTextInput from '../../../../../components/common/CButtonTextInput';
import Divider from '../../../../../components/Divider';
import { Colors, Strings } from '../../../../../constants';
import CCircleButton from '../../../../../components/common/CCircleButton';


export default function SimScanChildView(props) {

    const { isAdded, title ,onSubmit , addStock, changeNetwork, viewLists, onClose} = props;
    const [code, setCode] = useState('');

    useEffect(() => {        
       if(isAdded){
           setCode('')
       }
    }, [isAdded])

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
                label={ Strings.Stock.Input_ICCID }
                value={code}
                returnKeyType={'done'}             
                keyboardType="number-pad"                         
                isRequired={true}
                onChangeText={text => {
                    setCode(text)
                }}
                onSubmit={() => {
                    onSubmit(code);
                    setCode('');
                }}
                style={{marginTop:20, marginBottom:35}}
            /> 

            <SubmitButton title={Strings.Stock.Add_Stock} onSubmit={addStock} ></SubmitButton>
        </View>
    )
}