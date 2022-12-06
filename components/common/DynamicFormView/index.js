import { StyleSheet, Text, View , Keyboard, ScrollView} from 'react-native'
import React  , { useEffect , useRef, useState } from 'react'
import { getFormData, getFormStructureData } from './helper';
import { SubmitButton } from '../../shared/SubmitButton';
import DynamicForm from '../DynamicForm';

const DynamicFormView = (props) => {

    const { page ,  fields , isClear} = props;
    if(!fields) return null; 

    const addProductRef = useRef(null)
    const [formData, setFormData] = useState({});
    const [formStructure, setFormStructure] = useState([]);
    const [hasTextInput, setKeyboardVisible] = useState(false)

    useEffect(() => {        
        const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            console.log("show")
            setKeyboardVisible(true); // or some other action
        },
        );
        const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            console.log("hide")
            setKeyboardVisible(false); // or some other action
        },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        if(isClear){
            setFormData(getFormData(fields , page));
            if(props.updateClear){
                props.updateClear();
            }
        }
    }, [isClear])

    useEffect(() => {        
        setFormData(getFormData(fields , page))
        setFormStructure(getFormStructureData(fields));
        console.log("field data => " , getFormStructureData(fields))

    }, [fields])

    const onAdd = () => {
        console.log("fomr data", formData)
        if(addProductRef.current.validateForm()){
            if(props.onAdd){                
                props.onAdd(formData);
            }
        }else{
            console.log("not validated");
        }
    }

    return (
        <ScrollView style={[hasTextInput ? {height : 300} : {} ]}>      
            
            <DynamicForm
                ref={addProductRef}
                formData={formData}
                formStructureData={formStructure}
                updateFormData={formData => {
                    setFormData(formData);
                }}
            />
            
            <SubmitButton title="Add" onSubmit={onAdd} style={{marginTop:20}} />

        </ScrollView>
    )
}

export default DynamicFormView

const styles = StyleSheet.create({})