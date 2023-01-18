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

const DynamicFormView = props => {

  const {page, buttonTitle, fields, isClear , style} = props;
  if (!fields) return null;

  const addProductRef = useRef(null);
  const addContactModalRef = useRef(null);

  const [formData, setFormData] = useState({});
  const [formStructure, setFormStructure] = useState([]);
  const [hasTextInput, setKeyboardVisible] = useState(false);
  const [scrollEnabled, setScrollViewEnabled] = useState(true);
  const pageType = 'update';
  const [locationId, setLocationId] = useState(0);
  const [contactInfo, setContactInfo] = useState({});

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
      if (props.onAdd) {
        props.onAdd(formData);
      }
    } else {
      console.log('not validated');
    }
  };

  const addContactModalClosed = ({type, value}) => {
    if(type === Constants.actionType.ACTION_CLOSE){  
      addContactModalRef.current.hideModal();
      if(props.close){
        props.close();
      }
    }
  }

  const confirmModal = (contact_id) => {
    
    dispatch(
      showNotification({
        type: Strings.Success,
        message: 'Selected contact does not have a valid email, please update',
        buttonText: 'Okay',
        cancelButtonText: 'Add Contact',        
        cancelButtonAction: () => {
          closeModal();
          getContactsInfo(contact_id);
        }, 
        cancelable: false  
      }),
    );

  }


  const getContactsInfo = (contact_id) => {
    console.log("cancel ")
    var params = {location_id: locationId};    
    getApiRequest("locations/location-contacts" , params).then((res) => {
      console.log("res", res , contact_id);
        const contact = res?.contacts.find(element =>  parseInt(element.contact_id) == parseInt(contact_id));
        if(contact != undefined){
          setContactInfo(contact);
          addContactModalRef.current.showModal();
        }
        //prepareContactsList(res.contacts);
    }).catch((e) => {
        expireToken(dispatch , e);
    })
  }

  const closeModal = () => {
    console.log("clear")
    dispatch(clearNotification());
  }


  return (

    <ScrollView style={[hasTextInput ? {height: 300} : {} , style]} scrollEnabled={scrollEnabled}>

      <DynamicForm
        style={{paddingTop:5}}
        ref={addProductRef}
        formData={formData}
        formStructureData={formStructure}
        updateFormData={ (formData , filedName) => {          
          if(filedName  != undefined){
            const data = formStructure.find(element => element.field_name == filedName);
            const contactIds = formData[filedName];                 
            if(data != undefined && data.field_type == 'contact_email' ){              
              const options = data?.items.filter(element => contactIds.includes(element.contact_id) );              
              if(options  != undefined){
                options.forEach(option => {
                  if(option != undefined &&  ( option.contact_email == '' )  ){ // ||  !option?.contact_email?.includes("@") 
                    confirmModal(option.contact_id);                    
                    return;
                  }
                });
              }
            }
          }
          setFormData(formData);
        }}
        
        setScrollEnabled={(flag) => {
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
