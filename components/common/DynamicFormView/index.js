import {StyleSheet, Text, View, Keyboard, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {getFormData, getFormStructureData} from './helper';
import {SubmitButton} from '../../shared/SubmitButton';
import DynamicForm from '../DynamicForm';
import AddContactModal from '../../../screens/GeoRep/CRM/customer_contacts/modal/AddContactModal';
import { getJsonData, getLocalData } from '../../../constants/Storage';
import { getApiRequest } from '../../../actions/api.action';
import { Constants, Strings } from '../../../constants';
import { useDispatch } from 'react-redux';
import { clearNotification, showNotification } from '../../../actions/notification.action';
import { expireToken } from '../../../constants/Helper';

var canSubmitEmailContact = true;
var canSubmitEmailSelect = true;

const DynamicFormView = props => {

  const {page, buttonTitle, fields, isClear , style} = props;
  
  if (!fields) return null;

  const addProductRef = useRef(null);
  const addContactModalRef = useRef(null);

  const [formData, setFormData] = useState({});
  const [formStructure, setFormStructure] = useState([]);
  const [hasTextInput, setKeyboardVisible] = useState(false);
  const [scrollEnabled, setScrollViewEnabled] = useState(true);  
  const [locationId, setLocationId] = useState(0);
  const [contactInfo, setContactInfo] = useState({});
  const [canSubmit, setCanSubmit] = useState(true);
  const [pageType, setPageType] = useState('update');

  const dispatch = useDispatch();


  useEffect(() => {
    initializeLocation();
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        console.log('show');
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        console.log('hide');
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (isClear) {
      setFormData(getFormData(fields, page));
      if (props.updateClear) {
        props.updateClear();
      }
    }
  }, [isClear]);

  useEffect(() => {
    if (!props.value) {
      setFormData(getFormData(fields, page));
    } else {
      setFormData(props.value);
    }
    setFormStructure(getFormStructureData(fields, page));
  }, [fields]);


  const initializeLocation = async() => {    
		var data = await getJsonData("@setup");
		if(data != null){		
      setLocationId(data?.location?.location_id);
		}else if(isCheckin){
      const location_id = await getLocalData("@specific_location_id");            
      setLocationId(location_id);
		}
	}

  const onAdd = () => {    
      if (addProductRef.current.validateForm()) {        
        if(canSubmitEmailContact && canSubmitEmailSelect){      
          if (props.onAdd) {
            props.onAdd(formData);
          }
        }else{
          console.log('can not submit');
        }        
      } else {
        console.log('submission not validated');
      }  
    
  };

  const addContactModalClosed = ({type, value}) => {
    if(type == Constants.actionType.ACTION_DONE){    
      setCanSubmit(true);
      addContactModalRef.current.hideModal();
      if(props.close){
        props.close();
      }
    }else if(type === Constants.actionType.ACTION_CLOSE){  
      addContactModalRef.current.hideModal();
      if(props.close){
        props.close();
      }
    }
  }

  const confirmModal = (contact_id , modalType) => {

    var buttonText = 'Add Contact';
    var message = 'There are currently no contacts linked, please add a contact';
    if(modalType == 'update'){
      buttonText = 'Update Contact';
      message = 'Selected contact does not have a valid email, please update';
    }

    dispatch(
      showNotification({
        type: Strings.Success,
        message: message,
        buttonText: 'Okay',
        cancelButtonText: buttonText,        
        cancelButtonAction: () => {
          closeModal();                    
          if(modalType == 'add'){
            setPageType('add');
            addContactModalRef.current.showModal();
          }else{
            setPageType('update');
            getContactsInfo(contact_id);
          }          
        }, 
        cancelable: false  
      }),
    );
  }


  const getContactsInfo = (contact_id) => {    
    var params = {location_id: locationId};    
    console.log(params)
    getApiRequest("locations/location-contacts" , params).then((res) => {
      console.log("res", res , contact_id);
        const contact = res?.contacts.find(element =>  parseInt(element.contact_id) == parseInt(contact_id));
        if(contact != undefined){
          setContactInfo(contact);
          addContactModalRef.current.showModal();
        }        
    }).catch((e) => {              
        expireToken(dispatch , e);
    })
  }

  const closeModal = () => {    
    dispatch(clearNotification());
  }

  const handleUpdatedData = (data , contactIds) => {
    if(data != undefined && ( data.field_type == 'contact_email' ) ){ // || data.field_type == 'contact_select'
      handleContactEmail(data, contactIds);
    }
  }

  const handleContactEmail = (data , contactIds) => {
    const options = data?.items.filter(element => contactIds.includes(element.contact_id) );              
    if(options  != undefined){
      var flag = true;
      options.forEach(option => {
        if(option != undefined &&  ( option?.contact_email?.trim() == '' )  ){ // ||  !option?.contact_email?.includes("@") 
          console.log("Can submit", false)
          confirmModal(option.contact_id , 'update' );
          setCanSubmit(false);
          if(data.field_type == 'contact_email'){
            canSubmitEmailContact = false;
          }else if(data.field_type == 'contact_select'){
            canSubmitEmailSelect = false;
          }
          flag = false;
          return;
        }
      });
      if(flag){
        console.log("Can submit", true)
        setCanSubmit(true);
        if(data.field_type == 'contact_email'){
          canSubmitEmailContact = true;
        }else if(data.field_type == 'contact_select'){
          canSubmitEmailSelect = true;
        }
      }      
    }
  }


  return (
    
    <ScrollView
      style={[hasTextInput ? {height: 300} : {}]}
      scrollEnabled={scrollEnabled}>

      <DynamicForm
        style={{paddingTop:5}}
        ref={addProductRef}
        formData={formData}
        formStructureData={formStructure}        
        updateFormData={ (formData , filedName) => {   
          if(filedName  != undefined){
            const data = formStructure.find(element => element.field_name == filedName);
            const contactIds = formData[filedName];
            //handleUpdatedData(data , contactIds);
          }
          setFormData(formData);
        }}
        onNoData={(item) => {
          console.log("on no data", item);
          if(item?.contact_email?.trim() == ''){
            confirmModal(item.contact_id , 'update' );
          }
        }}
        onPress={(data) => {
          console.log("press",data);
          if(data.field_type == 'contact_email' || data.field_type == 'contact_select'){
            confirmModal(0, 'add');
          }
        }}        
        setScrollEnabled={flag => {
          setScrollViewEnabled(flag);
        }}
      />

      <SubmitButton
        title={buttonTitle}        
        onSubmit={onAdd}
        style={{marginTop: 20}}        
      />

      
      <AddContactModal
        ref={addContactModalRef}
        title= {pageType == 'add' ? 'Add Contact' : 'Update Contact'}
        pageType={pageType}        
        locationId={locationId}
        contactInfo={contactInfo}
        onButtonAction={addContactModalClosed}
      />

    </ScrollView>
  );
};

export default DynamicFormView;

const styles = StyleSheet.create({});
