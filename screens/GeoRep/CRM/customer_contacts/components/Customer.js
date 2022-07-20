import { View, Text ,ScrollView ,TouchableOpacity , StyleSheet} from 'react-native'
import React , {useRef , useState , useEffect} from 'react'
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { whiteLabel } from '../../../../../constants/Colors';
import DynamicForm from '../../../../../components/common/DynamicForm';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import { getPostParameter } from '../../../../../constants/Helper';
import { postApiRequest } from '../../../../../actions/api.action';
import { showNotification } from '../../../../../actions/notification.action';
import {useSelector, useDispatch} from 'react-redux';
import AlertDialog from '../../../../../components/modal/AlertDialog';
import UpdateCustomerModal from '../../update_customer';
import { Constants } from '../../../../../constants';
//import UpdateCustomerModal from '../../update_customer';

export default function Customer(props) {

    const { locationFields ,locationId ,getCustomerInfo } = props;
    const actionFormRef = useRef();    
    const [formData, setFormData] = useState({});
    const [formStructure, setFormStructure] = useState([]);
    const currentLocation = useSelector(state => state.rep.currentLocation);
    const dispatch = useDispatch();
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("")
    const updateCustomerModalRef = useRef(null);
        
    useEffect(() => {        
        initData(locationFields);
    }, [locationFields])

    const initData = (leadForms) => {

        var renderForms  = leadForms; // leadForms.filter((item , index) => index != 0); 
        const tmpFormData = {}; 
        renderForms.forEach(field => {
          var value = field.value;
          if(field.field_type === "dropdown_input"){
            if(field.value != '' && field.value != null){
              value = {value: field.preset_options[parseInt(field.preset_field)], secondValue: field.value};
            }              
          }
          tmpFormData[field.custom_master_field_id] = value;                    
        });
        setFormData(tmpFormData);        
        const dynamicFields = renderForms.map((field, index) => {
          if( (field.field_type == "dropdown" || field.field_type == "dropdown_input") && field.preset_options != undefined ){
            var items = [];         
            if(field.preset_options != undefined && field.preset_options != ''){
              field.preset_options.forEach((element) => {
                items.push({label: element, value: element});
              })
            }
            field = {
              ...field,
              items: items
            }      
          }
          var editable = disableField(field) ? "0" : "1";
          console.log(field.core_field_name, editable)
          return {
            ...field,
            key:index,
            field_name: field.custom_master_field_id,
            initial_value: field.value, 
            editable: editable,
            is_required: true,
            field_label:field.field_name,    
            value: field.value,      
          };
        });      
        setFormStructure(dynamicFields);
    }

    const onSubmit = async() =>{
        
        var fields = [];
        for(let key of Object.keys(formData)){
            if(formData[key] != undefined && formData[key] != ''){
                fields.push({custom_master_field_id:key, value:formData[key]});
            }            
        }  
        
        var userParam = getPostParameter(currentLocation);
        let postData = {
            location_id: locationId,
            fields: fields,
            user_local_data: userParam.user_local_data,
        };

        postApiRequest("locations/location-fields", postData).then((res) => {      
            console.log("Succes", res);                  
            //dispatch(showNotification({type:'success' , message: "res.message" , buttonText: 'Ok'}));
            setMessage(res.message)
            setIsSuccess(true)
            
        }).catch((e)=> {
            console.log("E",e)
        })
    }

    const disableField = field => {
      if (
        field.core_field_name === 'location_name' ||
        field.core_field_name === 'location_unit' ||
        field.core_field_name === 'street_address' ||
        field.core_field_name === 'suburb' ||
        field.core_field_name === 'city' ||
        field.core_field_name === 'state' ||
        field.core_field_name === 'country' ||
        field.core_field_name === 'pincode'
      ) {
        return true;
      }  
      return false;
    };

    const onModalClosed = ({type, value}) => {
      if(type == Constants.actionType.ACTION_CLOSE){
        updateCustomerModalRef.current.hideModal();
        getCustomerInfo();
      }
    }

    return (        
        <ScrollView>
            <View style={{marginBottom:60}}>
                   
                <DynamicForm
                    ref={actionFormRef}
                    formData={formData}
                    formStructureData={formStructure}
                    isClickable={true}
                    onPress={() =>{
                      console.log("onPress");
                      console.log("show modal");
                      updateCustomerModalRef.current.showModal();
                      console.log("show modal");
                    }}
                    updateFormData={formData => {
                        console.log("form data" , formData)
                        setFormData(formData);                        
                    }}
                />
                
                <AlertDialog
                    visible={isSuccess}
                    message={message}
                    onModalClose={() => {
                      setIsSuccess(false);                      
                    }}></AlertDialog>

                <UpdateCustomerModal 
                  ref={updateCustomerModalRef}
                  locationId={locationId}
                  title="Update"
                  onButtonAction={onModalClosed}
                />                                    
                <SubmitButton style={{marginTop:10, marginHorizontal:10}} onSubmit={onSubmit} title="Update" />

            </View>
        </ScrollView>
    )

}


const styles = StyleSheet.create({

})