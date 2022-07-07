
import { View, Text , TextInput, StyleSheet ,ScrollView, Platform, Dimensions} from 'react-native'
import React , { useState } from 'react'
import { Colors, Fonts } from '../../../constants';
import { whiteLabel } from '../../../constants/Colors';
import { validateEmail } from '../../../helpers/formatHelpers';

export default function EmailInputView() {

    const [lists, setLists] = useState([]);
    const [email, setEmail] = useState(email)

    return (
        <View style={styles.container}>
            
            <View style={{flexWrap:'wrap', flexDirection:'row' , alignItems:'flex-start'}}>
                {
                    lists.length > 0 && lists.map((item , index) => {
                        return <Text key={index} style={ validateEmail(item) ? styles.selectedText : styles.invalidText } >{item}</Text>
                    })
                }
                <View>
                    <TextInput
                        value={email}
                        style={[styles.textInput]}
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
                    />
                </View>
                
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{        
        alignSelf:'stretch',
        flexDirection:'row',
        borderRadius:3,
        borderWidth:1,
        borderColor:whiteLabel().fieldBorder,
    
    },

    selectedText:{
        alignSelf:'center',
        color: Colors.whiteColor,
        backgroundColor: Colors.primaryColor,
        fontFamily: Fonts.secondaryMedium,
        marginHorizontal:5,
        borderRadius:5,
        paddingHorizontal:5,
        paddingVertical:3,
        marginTop:5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: 'hidden',
    },
    
    invalidText:{
        alignSelf:'center',
        color: Colors.whiteColor,
        backgroundColor: Colors.redColor,
        fontFamily: Fonts.secondaryMedium,
        marginHorizontal:5,
        borderRadius:5,
        paddingHorizontal:5,
        paddingVertical:3,
        marginTop:5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: 'hidden',
    },
    textInput: {
        marginLeft:5,
        height: 38,
        width:Dimensions.get("screen").width * 0.5,
        fontSize: 14,        
        paddingTop:3,
        paddingBottom:3,        
        fontFamily: Fonts.secondaryMedium,
    }
    
})