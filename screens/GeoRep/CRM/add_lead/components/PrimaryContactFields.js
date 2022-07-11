import { View, Text } from 'react-native'
import React , { useEffect ,useState , useRef } from 'react'
import { whiteLabel } from '../../../../../constants/Colors';
import { checkFeatureIncludeParam } from '../../../../../constants/Storage';
import { Fonts } from '../../../../../constants';
import DynamicForm from '../../../../../components/common/DynamicForm';
import { getFormData, getFormStructureData } from '../helper';

export default function PrimaryContactFields(props) {
  
    const actionFormRef = useRef();    
    const [isCustomerAndContacts, setIsCustomerAndContacts] = useState(false);
    const [formData, setFormData] = useState(getFormData());
    const [formStructure, setFormStructure] = useState(getFormStructureData());
    

    useEffect(() => {
        var isMount = true;
        initView()
        return () => {
            isMount = false;
        };
    }, [])
    
    const initView = async() => {
        const  tmp = await checkFeatureIncludeParam('customer_and_contacts')
        setIsCustomerAndContacts(tmp)
    }

    return (
        
        <View >
            {isCustomerAndContacts && (
                <View>
                    <View
                    style={{
                        borderBottomColor: whiteLabel().mainText,
                        borderBottomWidth: 1,
                        marginVertical: 10,
                        marginHorizontal:10,
                    }}>
                        <Text
                            style={{
                            fontFamily: Fonts.secondaryBold,
                            color: whiteLabel().mainText,
                            }}>
                            Primary Contact
                        </Text>
                    </View>
                                        
                    <DynamicForm
                        ref={actionFormRef}
                        formData={formData}
                        formStructureData={formStructure}
                        updateFormData={formData => {
                            console.log("Fomr data" , formData)
                            setFormData(formData);
                            props.onPrimaryContactFields(formData);
                        }}
                    />                                    
                   
                </View>
                )}
                
            </View>

    )
}

