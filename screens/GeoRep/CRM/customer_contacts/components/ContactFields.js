import { View, Text } from 'react-native'
import React , { useEffect ,useState , useRef , useImperativeHandle} from 'react'
import DynamicForm from '../../../../../components/common/DynamicForm';
import { getFormData, getFormStructureData } from './helper';

const ContactFields = React.forwardRef((props, ref) => {
    
    const { contactInfo } = props;

    const actionFormRef = useRef();    
    const [formData, setFormData] = useState(getFormData(contactInfo));
    const [formStructure, setFormStructure] = useState(getFormStructureData());
    
    useEffect(() => {
        var isMount = true;        
        return () => {
            isMount = false;
        };
    }, [])

    useImperativeHandle(ref, () => ({
        validateForm: () => {
            return validate();
        }
    }));
    
    const validate = () => {
        return actionFormRef.current.validateForm();
    }
        
    return (        
        <View >                                                                 
            <DynamicForm
                ref={actionFormRef}
                formData={formData}                
                formStructureData={formStructure}
                updateFormData={formData => {
                    console.log("Fomr data" , formData)
                    setFormData(formData);
                    if(props.getFormData){
                        props.getFormData(formData);
                    }
                    
                }}
            />                                            
        </View>

    )
});
export default ContactFields;


