import {View,  Platform} from 'react-native';
import React, {useEffect, useState, useRef, useMemo} from 'react';
import {Constants, Strings} from '../../../../../constants';
import AddLeadView from '../components/AddLeadView';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import AddLeadFormsModal from '../modal/AddLeadFormsModal';
import SelectDevicesModal from '../modal/SelectDevicesModal';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import FormQuestionModal from '../modal/FormQuestionModal';
import {
  GetRequestFormListsDAO,
  GetRequestLeadfieldDAO,
  PostRequestDAO,
} from '../../../../../DAO';
import {getTokenData} from '../../../../../constants/Storage';
import {getTimeStamp} from '../../../../../helpers/formatHelpers';
import {getFormSubmissionPostJsonData, validateFormQuestionData} from '../../../Forms/questions/helper';
import {
  getAddLeadLocationName,
  getAddLeadStreetAddress,
  getLeadFieldsPostJsonData,
} from '../helper';
import {expireToken} from '../../../../../constants/Helper';
import SimListModal from '../modal/SimListModal';
import AlertModal from '../../../../../components/modal/AlertModal';

export default function AddLeadContainer(props) {

  const currentLocation = useSelector(state => state.rep.currentLocation);
  const payload = useSelector(state => state.selection.payload);  
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );  
  const isAllocateDevices = features.includes('location_specific_devices');

  const selectDeviceModalRef = useRef(null);  
  const formQuestionModalRef = useRef(null);
  const addLeadFormModalRef = useRef(null);
  const addLeadViewRef = useRef(null);
  const simListModalRef = useRef();
  const alertModalRef = useRef();

  const [leadForms, setLeadForms] = useState([]);
  const [accuracyUnit, setAccuracyUnit] = useState('m');
  const [formLists, setFormLists] = useState([]);
  const [selectedLists, setSelectedLists] = useState([]);
  const [selectedRICAs, setSelectedRICAs]= useState([]);
  const [selectDeviceCount, setSelectDeviceCount] = useState(0);
  const [isCurrentLocation, setIsCurrentLocation] = useState('0');
  const [customMasterFields, setCustomMasterFields] = useState({});
  const [primaryData, setPrimaryData] = useState({});
  const [form, setForm] = useState({});
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [compulsoryDevices, setCompulsoryDevices] = useState([]);
  const [compulsoryUnattachedDevices, setCompulsoryUnattachedDevices] =  useState([]);
  const [fieldOptionFilters, setFieldOptionFilters] = useState([]);

  const validateFormList = lists => {    
    let isValid = true;
    lists.forEach(item => {
      if (item.compulsory == '1') {
        isValid = false;
      }
    });
    return isValid;
  };

  const isValidOtherForms = useMemo(() => {
    return validateFormList(formLists);
  }, [formLists]);

  const isValidateAllocateDevice = useMemo(() => {
    var flag = false;
    compulsoryDevices.forEach(element => {
      const custom_master_field_id = element.custom_master_field_id ;
      const compusloryOptions = element.options;
      const options = customMasterFields[custom_master_field_id];      
      if(options != undefined && options != '' ){ 
        if(Array.isArray(options)){
          options.forEach(subElement => {          
            if(compusloryOptions.includes(subElement)){            
              flag = true;
            }
          });
        }else{
          if(compusloryOptions.includes(options)){            
            flag = true;
          }
        }
      }
    });    
    if(flag && selectedLists.length > 0 || !flag){
      return true;
    }
    return false;
  }, [customMasterFields , selectedLists]);

  const isValidateRICA = useMemo(() => {
    var flag = false;
    compulsoryUnattachedDevices.forEach(element => {
      const custom_master_field_id = element.custom_master_field_id ;
      const compusloryOptions = element.options;
      const options = customMasterFields[custom_master_field_id];
      if(options != undefined && options != ''){        
        if(Array.isArray(options)){
          options.forEach(subElement => {          
            if(compusloryOptions.includes(subElement)){            
              flag = true;
            }
          });
        }else{
          if(compusloryOptions.includes(options)){
            flag = true;
          }
        }
      }
    });    
    if(flag && selectedRICAs.length > 0 || !flag){
      return true;
    }
    return false;
  }, [customMasterFields , selectedRICAs]);

  useEffect(() => {
    updateFormLists(formLists);
  }, [formSubmissions]);  
  const dispatch = useDispatch();

  var isMount = true;

  useEffect(() => {
    getCustomMasterFields();
    return () => {
      isMount = false;
    };
  }, []);

  useEffect(() => {
    if(leadForms.length > 0){
      getFormLists(customMasterFields);
    }    
  }, [leadForms]);

  const getCustomMasterFields = () => {
    var param = {
      role: payload.user_scopes.geo_rep.role
    };
    GetRequestLeadfieldDAO.find(param)
      .then(res => {
        if (props.changeTitle && res.component_title != undefined) {
          props.changeTitle(res.component_title);
        }        
        setFieldOptionFilters(res.field_option_filters);
        setLeadForms(res.custom_master_fields);
        setAccuracyUnit(res.accuracy_distance_measure);
        setCompulsoryDevices(res.compulsory_device);
        setCompulsoryUnattachedDevices(res.compulsory_unattached_device);                
      })
      .catch(e => {
        console.log('leadfield api error', e);
        expireToken(dispatch, e, alertModalRef);
      });
  };

  const getFormLists = async (customMasterFields) => {
    var locationTypeItem = leadForms.find(
      item => item.core_field_name == 'location_type',
    );
    var groupItem = leadForms.find(item => item.core_field_name == 'group');
    var groupSplitItem = leadForms.find(
      item => item.core_field_name == 'group_split',
    );
    var param = {
      add_lead: 1,
      location_type: locationTypeItem && customMasterFields[locationTypeItem.custom_master_field_id] != undefined
        ? customMasterFields[locationTypeItem.custom_master_field_id]
        : '',
      group: groupItem && customMasterFields[groupItem.custom_master_field_id] != undefined
        ? customMasterFields[groupItem.custom_master_field_id]
        : '',
      group_split: groupSplitItem && customMasterFields[groupSplitItem.custom_master_field_id] != undefined
        ? customMasterFields[groupSplitItem.custom_master_field_id]
        : '',
    };
    
    GetRequestFormListsDAO.find(param)
      .then(res => {        
        updateFormLists(res.forms); 
      })
      .catch(e => {
        console.log('formlists api error:', e);
        expireToken(dispatch, e , alertModalRef);
      });
  };

  const updateFormLists = lists => {
    var tmp = [...lists];
    tmp.map(element => {
      var check = formSubmissions.find(
        item => item.form.form_id == element.form_id,
      );
      if (check != undefined) {
        element.compulsory = '0';
      }
      return element;
    });    
    setFormLists(tmp);
  };

  const validateForm = async () => {
    let isValid = true;

    if (addLeadViewRef) {
      const isValidForm = await addLeadViewRef.current.validateForm();
      console.log("isValidForm",isValidForm)
      if (!isValidForm) isValid = false;
    }
    return isValid;
  };

  
  const onAdd = async () => {
    const isFormValid = await validateForm();

    var message = '';
    if (!isFormValid ) {      
      message = Strings.Complete_Required_Fields; 
    }
    if( isAllocateDevices && !isValidateAllocateDevice ){      
      message = Strings.CRM.Complete_Device; 
    }
    if( isAllocateDevices && !isValidateRICA){      
      message = Strings.CRM.Complete_RICA;
    }
    if(!isValidOtherForms){      
      message = Strings.Complete_Required_Forms;
    }

    if(message != ''){
      if(alertModalRef.current){
        alertModalRef.current.alert(message);
      }      
      return;
    }
            
    setIsLoading(true);
    var user_id = await getTokenData('user_id');
    var add_location_id = getTimeStamp() + user_id;

    const postDataJson = await getLeadFieldsPostJsonData(
      isCurrentLocation,
      currentLocation,
      leadForms,
      customMasterFields,
      primaryData,
      selectedLists,
      selectedRICAs,
      add_location_id,
    );
    const locationName = getAddLeadLocationName(leadForms, customMasterFields);
    const streetAddress = getAddLeadStreetAddress(
      leadForms,
      customMasterFields,
    );
    
    PostRequestDAO.find(
      0,
      postDataJson,
      'leadfields',
      'leadfields',
      locationName,
      streetAddress,
    )
      .then(async leadFieldsRes => {
        if (leadFieldsRes.status == Strings.Success) {
          await recursiveFormPost(
            0,
            add_location_id,
            leadFieldsRes.location_id,
            leadFieldsRes,
            locationName,
          );
        } else {
          console.log('failed', res);
          setIsLoading(false);
        }
      })
      .catch(e => {
        setIsLoading(false);
        expireToken(dispatch, e, alertModalRef);
      });
  };

  const recursiveFormPost = async (
    index,
    add_location_id,
    location_id,
    apiRes,
    locationName,
  ) => {
    
    if (index <= formSubmissions.length - 1) {
      var formSubmission = formSubmissions[index];
      var {form, form_answers, files} = formSubmission;
      const postDataJson = await getFormSubmissionPostJsonData(
        form.form_id,
        add_location_id,
        currentLocation,
        form_answers,
        files,
      );
      PostRequestDAO.find(
        add_location_id,
        postDataJson,
        'form_submission',
        'forms/forms-submission',
        form.form_name,
        locationName,
        null,
        dispatch        
      )
        .then(async res => {
          if (res.status === Strings.Success) {
            await recursiveFormPost(
              index + 1,
              add_location_id,
              location_id,
              res,
              locationName,
            );
          }
        })
        .catch(e => {
          console.log(e);
          setIsLoading(false);
          expireToken(dispatch, e , alertModalRef);
        });
    } else {
      setIsLoading(false);
      if(alertModalRef.current){
        alertModalRef.current.alert(apiRes.message, Strings.Ok , false , location_id);
      }      
    }
  };

  const onButtonAction = value => {
    props.onButtonAction({
      type: Constants.actionType.ACTION_CAPTURE,
      value: value,
    });
  };

  const showFormModal = () => {
    getFormLists(customMasterFields);
    addLeadFormModalRef.current.showModal();
  };

  const showAllocateModal = () => {    
    
    if (selectDeviceModalRef.current) {
      console.log(selectDeviceModalRef.current);
      selectDeviceModalRef.current.showModal();
    }
  };

  const showSimViewModal = () => {
    if(simListModalRef.current){
      simListModalRef.current.showModal();
    }
  }

  const onSelectDeviceModalClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_REMOVE) {
      const tmp = selectedLists.filter(
        item => item.stock_item_id != value.stock_item_id,
      );
      setSelectedLists(tmp);
    }
    if (type == Constants.actionType.ACTION_VIEW) {
      setSelectedLists(value);
    }
    if (type == Constants.actionType.ACTION_NEXT) {
      setSelectDeviceCount(value);
    }
    if (type == Constants.actionType.ACTION_CLOSE) {
      props.onButtonAction({
        type: Constants.actionType.ACTION_NEXT,
        value: value,
      });
      selectDeviceModalRef.current.hideModal();
    }
  };

  const useGeoLocation = () => {
    setIsCurrentLocation('1');
  };

  const onChangedCustomMasterFields = (formMasterFields , fieldId) => {    
    setCustomMasterFields(formMasterFields);
    if(fieldId != undefined){
      const item = leadForms.find(element => element.custom_master_field_id == fieldId);      
      if(item.core_field_name == 'location_type' || item.core_field_name == 'group' || item.core_field_name == 'group_split' ){
        getFormLists(formMasterFields);
      }
    }
  };

  const onPrimaryContactFields = value => {
    setPrimaryData(value);
  };

  const onFormQuestionModalClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CLOSE) {
      formQuestionModalRef.current.hideModal();
    }
    if (type == Constants.actionType.ACTION_DONE) {
      if (value.form_answers != undefined && value.files != undefined) {
        var lists = [...formSubmissions];
        var check = lists.find(
          item => item.form.form_id === value.form.form_id,
        );

        if (check != undefined) {
          var tmp = lists.filter(
            item => item.form.form_id != value.form.form_id,
          );
          var item = {
            form: value.form,
            files: value.files,
            form_answers: value.form_answers,
          };
          setFormSubmissions([...tmp, item]);
        } else {
          var item = {
            form: value.form,
            files: value.files,
            form_answers: value.form_answers,
          };
          setFormSubmissions([...lists, item]);
        }
        formQuestionModalRef.current.hideModal();
      }
    }
  };

  const onSimListModalClosed = ({ type , value}) => {
    if (type == Constants.actionType.ACTION_CLOSE) {
      simListModalRef.current.hideModal();
    }
    if(type == Constants.actionType.ACTION_DONE) {
      console.log("allocated data", value)
      setSelectedRICAs(value);
      simListModalRef.current.hideModal();
    }
  }

  return (
    <View style={{alignSelf: 'stretch', flex: 1}}>
      
      <AlertModal 
        onModalClose={(response) => {
          if(response != ''){
            props.onButtonAction({
              type: Constants.actionType.ACTION_DONE,
              value: response,
            });
          }
        }}
        ref={alertModalRef} />

      <AddLeadView
        ref={addLeadViewRef}
        onButtonAction={onButtonAction}
        leadForms={leadForms}
        fieldOptionFilters={fieldOptionFilters}
        accuracyUnit={accuracyUnit}
        useGeoLocation={useGeoLocation}
        onChangedCustomMasterFields={onChangedCustomMasterFields}
        onPrimaryContactFields={onPrimaryContactFields}
        showFormModal={showFormModal}
        showAllocateModal={showAllocateModal}
        showSimViewModal={showSimViewModal}
        isValidOtherForms={isValidOtherForms}
        isValidateAllocateDevice={isValidateAllocateDevice}
        isValidateRICA={isValidateRICA}
        {...props}
      />

      <SubmitButton
        style={{
          marginHorizontal: 10,
          marginBottom: Platform.OS == 'android' ? 10 : 20,
          marginTop: 10,
        }}
        title={'Add'}
        isLoading={isLoading}
        onSubmit={onAdd}
      />

      <AddLeadFormsModal
        ref={addLeadFormModalRef}
        formLists={formLists}
        title="Forms"
        clearText="Close"
        onClose={() => {
          addLeadFormModalRef.current.hideModal();
        }}
        onNext={item => {
          if (formQuestionModalRef.current) {
            setForm({form_id: item.form_id, form_name: item.form_name});
            formQuestionModalRef.current.showModal();
          }
        }}
        navigation={props.navigation}
      />

      <SelectDevicesModal
        closableWithOutsideTouch
        ref={selectDeviceModalRef}
        hideClear={true}
        selLists={selectedLists}        
        title={Strings.CRM.Select_Devices}
        onButtonAction={onSelectDeviceModalClosed}
      />

      <FormQuestionModal
        ref={formQuestionModalRef}
        hideClear={true}
        title=""
        form={form}
        leadForms={leadForms}
        customMasterFields={customMasterFields}
        selectedLists={selectedLists}
        onButtonAction={onFormQuestionModalClosed}
      />

      <SimListModal
        closableWithOutsideTouch
        ref={simListModalRef}
        hideClear
        selectedRICAs={selectedRICAs}
        title={Strings.CRM.RICA_MSISDN}
        onButtonAction={onSimListModalClosed}
      />
     
    </View>
  );
}
 