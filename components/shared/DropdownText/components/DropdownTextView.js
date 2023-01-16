import { StyleSheet, View } from 'react-native'
import React , { useState , useEffect , useRef } from 'react'
import AddItemButton from './AddItemButton'
import DropdownItem from './DropdownItem';
import SingleSelectModal from '../../../common/SelectInput/modals/SingleSelectModal';
import { Constants } from '../../../../constants';


const DropdownTextView = (props) => {

    const { item , options } = props;
    
    const selectModalRef =  useRef(null);

    const [lists, setLists] = useState(item && item.value != '' && item.value != undefined ? item.value : []);
    const [presetOptions, setPresetOptions] = useState([]);

    
    useEffect(() => {        
        if(item.value != '' && item.value != undefined && item.value != '[]'){
            console.log("item.value",item.value)
            setLists(item && item.value != '' && item.value != undefined ? item.value : []);
        }        
    }, [item, item.value]);

    useEffect(() => {
        if(options && options.length > 0){
            var tmp = [];
            options.forEach(element => {
                tmp.push({label:element, value: element});
            });
            setPresetOptions(tmp);
        }
    }, [options]);

    const addItem = () => {
        if(selectModalRef.current){
            selectModalRef.current.showModal();
        }
    }

    const onButtonAction = ({type, item}) => {        
        if (type == Constants.actionType.ACTION_CHECK) {                
            var updated = [...lists, { option:item.label, input:''} ];            
            setLists(updated);
            props.onItemAction({type:  Constants.actionType.ACTION_FORM_SUBMIT, value: updated , item:''});
        }
        if( type == Constants.actionType.ACTION_FORM_CLEAR){

        }        
    };

    const onChange = (option, value) => {

        var tmp = lists.map((element) =>{            
            if(element.option === option){
                return {option: option, input: value}
            }else{
                return element;
            }
        })
        setLists(tmp);
        props.onItemAction({type:  Constants.actionType.ACTION_FORM_SUBMIT, value: tmp , item:''});
    }

    return (
        <View style={styles.container}>
            {
                lists.map((element , index) => {
                    return (
                        <DropdownItem 
                            key={index} 
                            title={item.field_label} 
                            index={index + 1} 
                            input_label={item.input_label} 
                            item={element}
                            onChange={onChange} 
                        />
                    )
                })
            }
            
            <AddItemButton title={item.field_label} hasError={props.hasError != undefined ? props.hasError : false} onPress={addItem} />
            
            <SingleSelectModal
                items={presetOptions}
                mode={'single'}
                modalTitle={'Select ' + item.question_text}
                checkedValue={''}
                onButtonAction={onButtonAction}
                ref={selectModalRef}
            />
            
        </View>
    )
}

export default DropdownTextView

const styles = StyleSheet.create({
    container:{        
        alignItems:'flex-start',
        alignSelf:'stretch',
        flex:1,
        flexDirection:'column'
    }
})