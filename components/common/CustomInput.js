import { View, Text , StyleSheet, Keyboard } from 'react-native'
import React from 'react'
import Colors, { whiteLabel } from '../../constants/Colors';
import { TextInput } from 'react-native-paper';

export default function CustomInput(props) {

    const { keyboardType , style , label , value , isError = false , onChangeText , onSubmitEditing , outlineColor } = props;
    return (
        <View>
        
        <TextInput         
                theme={{ colors: { text: 'black'  , placeholder:  whiteLabel().disabledColor } }}       
                keyboardType={keyboardType ? keyboardType : 'default'}
                returnKeyType={'done'}
                style={[styles.textInput, style]}
                label={<Text style={{ backgroundColor: Colors.bgColor }}>{label}</Text>}
                value={value}
                mode="outlined"
                outlineColor={ isError ? whiteLabel().endDayBackground : outlineColor ? outlineColor :  Colors.disabledColor }
                activeOutlineColor={ isError ? whiteLabel().endDayBackground : outlineColor ? outlineColor :  Colors.disabledColor }  
                onChangeText={text => {
                    if(onChangeText){
                        onChangeText(text);
                    }                
                }}
                blurOnSubmit={false}
                onSubmitEditing={() => {
                    if(onSubmitEditing){
                        onSubmitEditing();
                    }else{
                        Keyboard.dismiss();
                    }
                }}
                />        

        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        fontSize: 14,
        lineHeight: 30,    
        backgroundColor: Colors.bgColor,        
        marginBottom: 8
    },
})