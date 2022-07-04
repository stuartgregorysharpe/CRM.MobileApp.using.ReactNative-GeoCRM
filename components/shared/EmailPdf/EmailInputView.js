
import { View, Text , TextInput, StyleSheet ,ScrollView ,Keyboard } from 'react-native'
import React , { useState } from 'react'
import CTextInput from '../../common/CTextInput'
import { Colors, Fonts } from '../../../constants';
import { whiteLabel } from '../../../constants/Colors';
import { validateEmail } from '../../../helpers/formatHelpers';


export default function EmailInputView() {

    const [lists, setLists] = useState([]);
    const [email, setEmail] = useState(email)

    return (
        <View style={styles.container}>
            <View style={{alignItems:'center',backgroundColor:'yellows'}}>
                <ScrollView horizontal={true} style={{backgroundColor:'yellows'}}>
                    {
                        lists.length > 0 && lists.map((item , index) => {
                            return <Text key={index} style={validateEmail(item) ? styles.selectedText : styles.invalidText} >{item}</Text>
                        })
                    }
                </ScrollView>
            </View>
            <View style={{flex:1}}>
                <TextInput
                    value={email}
                    style={styles.textInput}
                    placeholder={ lists.length > 0 ? 'Add additional' : 'Add email address'}
                    returnKeyType={'done'}
                    onChangeText={(text) =>{
                        setEmail(text);
                    }}
                    onSubmitEditing={(event) => {
                        setLists([...lists, email]);
                        setEmail('');
                    }}
                    onKeyPress={({ nativeEvent }) => {
                        console.log("on key press");
                        console.log(nativeEvent)
                        if(nativeEvent.key === 'Backspace'){                          
                          if(email == ''){                            
                            const copyArr = [...lists];
                            copyArr.splice(-1);
                            setLists(copyArr);
                          }
                        }
                    }}
                    // mode="outlined"
                    // outlineColor={whiteLabel().fieldBorder}   
                />
            </View>

            {/* <TextInput                 
                returnKeyType={'done'}                                        
                isRequired={true}
                onChangeText={text => {                
                    //onChangedReceivedBy(text);
                }}
                style={{marginTop:15 , flex:1}}
            /> */}

        </View>
    )
}

const styles = StyleSheet.create({
    container:{        
        height:38,
        flexDirection:'row',
        borderRadius:3,
        borderWidth:1,
        borderColor:whiteLabel().fieldBorder,
        alignItems:'center',
        justifyContent:'center'
    },

    selectedText:{
        alignSelf:'center',
        color: Colors.whiteColor,
        backgroundColor: Colors.primaryColor,
        fontFamily: Fonts.secondaryMedium,
        marginHorizontal:5,
        borderRadius:5,
        paddingHorizontal:5,
        paddingVertical:3
    },
    invalidText:{
        alignSelf:'center',
        color: Colors.whiteColor,
        backgroundColor: Colors.redColor,
        fontFamily: Fonts.secondaryMedium,
        marginHorizontal:5,
        borderRadius:5,
        paddingHorizontal:5,
        paddingVertical:3
    },
    textInput: {
        height: 38,
        fontSize: 14,
        lineHeight: 30,        
        paddingVertical:5,
        justifyContent:'center',        
        fontFamily: Fonts.secondaryMedium,    
    }
    
})