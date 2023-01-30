import { View, StyleSheet } from 'react-native'
import React , { useState , useRef} from 'react'
import ContactFields from './ContactFields';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';

export default function AddContactModalView(props) {

    const { pageType , contactInfo } = props;

    console.log("page tpye", pageType)
    const [formData, setFormData] = useState({});
    const contactFieldsRef= useRef();

    const getFormData = (formData) => {        
        setFormData(formData);
    }
    
    const handleSubmit = () => {
        
        if(contactFieldsRef.current){            
            if(contactFieldsRef.current.validateForm()){
                if(props.handleSubmit){            
                    props.handleSubmit(formData);
                }
            }
        }
    }
            
    return (
        <View>                    
            <ContactFields ref={contactFieldsRef} contactInfo={contactInfo} getFormData={getFormData} />            
            <SubmitButton                 
                title={pageType === 'add' ? 'Add' : 'Update'} 
                onSubmit={handleSubmit} style={{marginHorizontal:10, marginVertical:10}} />          
        </View>
  )
}

const styles = StyleSheet.create({

})