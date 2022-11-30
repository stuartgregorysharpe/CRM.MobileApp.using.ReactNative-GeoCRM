import { StyleSheet, Text, View } from 'react-native'
import React  , { useEffect , useRef, useState } from 'react'
import DynamicForm from '../../../../../components/common/DynamicForm';
import { getFormData, getFormStructureData } from './helper';

const AddProductView = (props) => {

    const { fields } = props;
    if(!fields) return null;    
    const addProductRef = useRef(null)
    const [formData, setFormData] = useState({});
    const [formStructure, setFormStructure] = useState([]);

    useEffect(() => {
        console.log("fields",fields)
        setFormData(getFormData(fields))
        setFormStructure(getFormStructureData(fields));
    }, [fields])

    return (
        <View>
            
            <DynamicForm
                ref={addProductRef}
                formData={formData}
                formStructureData={formStructure}
                updateFormData={formData => {
                    setFormData(formData);
                }}
            />
            
        </View>
    )
}

export default AddProductView

const styles = StyleSheet.create({})