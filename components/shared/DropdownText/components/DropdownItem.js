
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React  , {useState , useEffect} from 'react'
import { AppText } from '../../../common/AppText';
import { whiteLabel } from '../../../../constants/Colors';
import SvgIcon from '../../../SvgIcon';
import CTextInput from '../../../common/CTextInput';
import { style } from '../../../../constants/Styles';

const DropdownItem = (props) => {

    const { title, index, input_label, item} = props;
    const { option , input } = item;    

    const [expand, setExpand] = useState(true);
    const [inputValue, setValue] = useState('');

    useEffect(() => {
        setValue(input);
    }, [input])

    const onExpand = () => {
        setExpand(!expand)
    }

    return (        
        <View style={[{alignSelf:'stretch'},style.card]}>
            <View style={{alignSelf:'stretch' , flex:1}}>
                
                <View style={styles.itemContainer}>                
                    <AppText title={title + " " + index} />                                
                    <View style={styles.optionName}>
                        <AppText title={option != undefined ? option : ''} />
                    </View>                
                    <TouchableOpacity onPress={onExpand}>
                        <SvgIcon icon={expand ? 'Drop_Down' : 'Drop_Down'} width="23px" height="23px" />
                    </TouchableOpacity>
                </View>

                {
                    expand &&
                    <View style={{marginBottom:10}}>
                        <CTextInput
                            label={'Input ' + input_label}                                                                                            
                            value={inputValue}
                            disabled={false}                        
                            onChangeText={text => {
                                setValue(text);
                                if(props.onChange){
                                    props.onChange(option, text);
                                }                                
                            }}                        
                        />
                    </View>
                }
            </View>            
        </View>
        
        
    )
}

export default DropdownItem

const styles = StyleSheet.create({

    optionName: {        
        
        backgroundColor: whiteLabel().itemSelectedBackground + '31',
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal:20,
        minWidth: 60,
        textAlign: 'center',
        borderRadius: 7,
    },

    itemContainer:{        
        flex:1,        
        alignSelf:'stretch',
        flexDirection:'row',        
        justifyContent:'space-between',
        marginVertical:5,
        alignItems:'center'
    }
})