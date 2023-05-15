import { View, ScrollView , StyleSheet, Platform} from 'react-native'
import React , {useRef , useState , useEffect} from 'react'
import DynamicForm from '../../../../../components/common/DynamicForm';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import { expireToken, getPostParameter } from '../../../../../constants/Helper';
import { postApiRequest } from '../../../../../actions/api.action';
import {useSelector, useDispatch} from 'react-redux';
import UpdateCustomerModal from '../../update_customer';
import { Constants, Strings } from '../../../../../constants';
import LoadingBar from '../../../../../components/LoadingView/loading_bar';
import AlertModal from '../../../../../components/modal/AlertModal';
import { PostRequestDAO } from '../../../../../DAO';
import { setCompulsoryLocationField } from '../../../../../actions/location.action';

export default function Customer(props) {

    const { locationFields ,locationId ,getCustomerInfo } = props;
    const actionFormRef = useRef();    
    const [formData, setFormData] = useState({});
    const [formStructure, setFormStructure] = useState([]);
    const currentLocation = useSelector(state => state.rep.currentLocation);
    const dispatch = useDispatch();    
    const [isLoading, setIsLoading] = useState(false);    
    const updateCustomerModalRef = useRef(null);
    const loadingBarRef = useRef();
    const alertModalRef = useRef();
        
    useEffect(() => {        
        initData(locationFields);
    }, [locationFields])

    useEffect(() => {
      if(formData){
        if (actionFormRef) 
          actionFormRef.current.validateForm();
      }
    }, [formData]);

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
          if( (field.field_type == "dropdown" || field.field_type == "dropdown_input" || field.field_type == "multi_select" ) && field.preset_options != undefined ){
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
          return {
            ...field,
            key:index,
            field_name: field.custom_master_field_id,
            initial_value: field.value, 
            editable: editable,
            isClickable: disableField(field) ? true : false,
            is_required: true,
            field_label:field.field_name,    
            value: field.value,      
          };
        });      
        setFormStructure(dynamicFields);
    }



    const onSubmit = async() =>{
        
        if(isLoading) return;

        var fields = [];
        for(let key of Object.keys(formData)){
            if(formData[key] != undefined && formData[key] != ''){
                const value = formData[key];
                if(value.value != undefined && value.secondValue != undefined){
                  fields.push({custom_master_field_id:key, dropdown_value:value.value , value: value.secondValue });
                }else{
                  fields.push({custom_master_field_id:key, value:value });
                }                
            }            
        }  
                
        if (actionFormRef) {
          if (!actionFormRef.current.validateForm()) {
            showMessage(Strings.Complete_Required_Fields , Strings.Ok);            
            return;
          }
        }


        setIsLoading(true);
        showLoadingBar();

        var userParam = getPostParameter(currentLocation);
        let postData = {
            location_id: locationId,
            fields: fields,
            user_local_data: userParam.user_local_data,
        };

        PostRequestDAO.find( locationId , postData , 'location_info_update' , 'locations/location-fields' , 'location_info_update' , '').then((res) => {
          console.log("location-fields response => " , res);
          dispatch(setCompulsoryLocationField(false));
          hideLoadingBar();
          setIsLoading(false);
          showMessage(res.message);

        }).catch((e) => {
          expireToken(dispatch , e, alertModalRef);
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

    const showLoadingBar = () => {
      if(loadingBarRef.current){
        loadingBarRef.current.showModal();
      }
    }

    const hideLoadingBar = () => {
      if(loadingBarRef.current){
        loadingBarRef.current.hideModal();
      }
    }

    const showMessage = (message) => {
      var delay = 0;
      if(Platform.OS == 'ios'){
        delay = 500;
      }
      setTimeout(() => {
        if(alertModalRef.current){
          alertModalRef.current.alert(message);
        }
      }, delay);
      
    }

    return (        
        <ScrollView>
            <View style={{marginBottom:60}}>
                
                <LoadingBar ref={loadingBarRef}/>
                <AlertModal ref={alertModalRef} />

                <DynamicForm
                    ref={actionFormRef}
                    formData={formData}
                    formStructureData={formStructure}                    
                    onPress={(item) =>{                      
                      if( item != undefined && item.editable == "0"){
                        updateCustomerModalRef.current.showModal();
                      }                                                                  
                    }}
                    updateFormData={formData => {                        
                        setFormData(formData);                        
                    }}
                    style={{marginTop:5}}
                />
                                
                <UpdateCustomerModal 
                  ref={updateCustomerModalRef}
                  locationId={locationId}
                  title="Update"
                  onButtonAction={onModalClosed}
                />

                <SubmitButton
                  style={{marginTop:10, marginHorizontal:10}} onSubmit={onSubmit} title="Update" />

            </View>
        </ScrollView>
    )

}


const styles = StyleSheet.create({

})