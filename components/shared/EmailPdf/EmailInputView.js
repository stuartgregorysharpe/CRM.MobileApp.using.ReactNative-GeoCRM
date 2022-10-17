
import { View, Text , TextInput, StyleSheet , Dimensions} from 'react-native'
import React , { useState ,useEffect } from 'react'
import { Colors, Constants, Fonts, Strings } from '../../../constants';
import { whiteLabel } from '../../../constants/Colors';
import { validateEmail } from '../../../helpers/validateHelper';

export default function EmailInputView(props) {

    const { item } = props;        
    const [lists, setLists] = useState([]);
    const [email, setEmail] = useState(email)

    useEffect(() => {                
        if(item.value && item.value != null){            
            setLists(item.value);
        }else{            
            setLists([]);
        }
    }, [item.value])

    return (
        <View style={styles.container}>

            <View style={styles.subContainer}>
                {
                    lists.length > 0 && lists.map((item , index) => {
                        return <Text key={index} style={ validateEmail(item) ? styles.selectedText : styles.invalidText } >{item}</Text>
                    })
                }
                <View>
                    <TextInput
                        value={email}
                        style={[styles.textInput]}
                        placeholder={ lists.length > 0 ? Strings.Add_Additional : Strings.Add_Email_Address}
                        returnKeyType={'done'}
                        keyboardType="email-address"
                        onChangeText={(text) =>{
                            setEmail(text);
                        }}
                        onSubmitEditing={(event) => {
                            if(email != '' && email != undefined){
                                setLists([...lists, email]);
                                setEmail('');
                                if(props.onItemAction){                            
                                    props.onItemAction({type:  Constants.actionType.ACTION_FORM_SUBMIT, value: [...lists, email] , item:'' });
                                }
                            }                            
                        }}
                        onKeyPress={({ nativeEvent }) => {                            
                            if(nativeEvent.key === 'Backspace'){                          
                                if(email === '' || email === undefined){  
                                    const copyArr = [...lists];
                                    copyArr.splice(-1);
                                    setLists(copyArr);
                                    if(props.onItemAction){
                                        props.onItemAction({type:  Constants.actionType.ACTION_FORM_SUBMIT, value: copyArr , item:''});
                                    }
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

    subContainer:{
        flexWrap:'wrap', 
        flexDirection:'row' , 
        alignItems:'flex-start'
    },
    
    selectedText:{
        alignSelf:'center',
        color: Colors.whiteColor,        
        backgroundColor: whiteLabel().actionFullButtonBackground,
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