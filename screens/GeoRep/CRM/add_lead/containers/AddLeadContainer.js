import {View, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect, useState, useRef, useMemo} from 'react';
import {Constants, Strings} from '../../../../../constants';
import AddLeadView from '../components/AddLeadView';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import AddLeadFormsModal from '../modal/AddLeadFormsModal';
import SelectDevicesModal from '../modal/SelectDevicesModal';
import CCircleButton from '../../../../../components/common/CCircleButton';
import ViewListsModal from '../modal/ViewListsModal';
import SvgIcon from '../../../../../components/SvgIcon';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  clearNotification,
  showNotification,
} from '../../../../../actions/notification.action';
import FormQuestionModal from '../modal/FormQuestionModal';
import {Notification} from '../../../../../components/modal/Notification';
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

export default function AddLeadContainer(props) {
  const currentLocation = useSelector(state => state.rep.currentLocation);

  const selectDeviceModalRef = useRef(null);
  const viewListsModalRef = useRef(null);
  const formQuestionModalRef = useRef(null);
  const addLeadFormModalRef = useRef(null);
  const addLeadViewRef = useRef(null);

  const [leadForms, setLeadForms] = useState([]);
  const [accuracyUnit, setAccuracyUnit] = useState('m');
  const [formLists, setFormLists] = useState([]);
  const [selectedLists, setSelectedLists] = useState([]);
  const [selectDeviceCount, setSelectDeviceCount] = useState(0);
  const [isCurrentLocation, setIsCurrentLocation] = useState('0');
  const [customMasterFields, setCustomMasterFields] = useState({});
  const [primaryData, setPrimaryData] = useState({});
  const [form, setForm] = useState({});
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    updateFormLists(formLists);
  }, [formSubmissions]);
  console.log('isValidOtherForms', isValidOtherForms);
  const dispatch = useDispatch();

  var isMount = true;

  useEffect(() => {
    getCustomMasterFields();
    return () => {
      isMount = false;
    };
  }, []);

  useEffect(() => {
    getFormLists();
  }, [leadForms]);

  const getCustomMasterFields = () => {
    GetRequestLeadfieldDAO.find({})
      .then(res => {
        if (props.changeTitle && res.component_title != undefined) {
          props.changeTitle(res.component_title);
        }
        if (isMount) {
          console.log("res.custom_master_fields => ", res.custom_master_fields)
          setLeadForms(res.custom_master_fields);      
          setAccuracyUnit(res.accuracy_distance_measure);
        }
      })
      .catch(e => {
        console.log('leadfield api error', e);
        expireToken(dispatch, e);
      });
  };

  const getFormLists = async () => {
    var locationTypeItem = leadForms.find(
      item => item.core_field_name == 'location_type',
    );
    var groupItem = leadForms.find(item => item.core_field_name == 'group');
    var groupSplitItem = leadForms.find(
      item => item.core_field_name == 'group_split',
    );
    var param = {
      add_lead: 1,
      location_type: locationTypeItem
        ? customMasterFields[locationTypeItem.custom_master_field_id]
        : '',
      group: groupItem
        ? customMasterFields[groupItem.custom_master_field_id]
        : '',
      group_split: groupSplitItem
        ? customMasterFields[groupSplitItem.custom_master_field_id]
        : '',
    };

    GetRequestFormListsDAO.find(param)
      .then(res => {
        updateFormLists(res.forms);        
      })
      .catch(e => {
        console.log('formlists api error:', e);
        expireToken(dispatch, e);
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
    console.log("valiidate form", isFormValid);

    if (!isFormValid) {
      dispatch(
        showNotification({
          type: 'success',
          message: Strings.Complete_Required_Fields,
          buttonText: Strings.Ok,
        }),
      );
      return;
    }
    if (!isValidOtherForms) {
      dispatch(
        showNotification({
          type: 'success',
          message: Strings.Complete_Required_Forms,
          buttonText: Strings.Ok,
        }),
      );
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
        expireToken(dispatch, e);
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
          expireToken(dispatch, e);
        });
    } else {
      setIsLoading(false);
      dispatch(
        showNotification({
          type: 'success',
          message: apiRes.message,
          buttonText: 'Ok',
          buttonAction: () => {
            dispatch(clearNotification());
            props.onButtonAction({
              type: Constants.actionType.ACTION_DONE,
              value: location_id,
            });
          },
        }),
      );
    }
  };

  const onButtonAction = value => {
    props.onButtonAction({
      type: Constants.actionType.ACTION_CAPTURE,
      value: value,
    });
  };

  const showFormModal = () => {
    getFormLists();
    addLeadFormModalRef.current.showModal();
  };

  const showAllocateModal = () => {
    if (selectDeviceModalRef.current) selectDeviceModalRef.current.showModal();
  };

  const renderViewLists = () => {
    return (
      <CCircleButton
        onClick={() => viewLists()}
        title="View List"
        icon="Check_List_Active"></CCircleButton>
    );
  };
  
  const viewLists = () => {
    if (viewListsModalRef) {
      viewListsModalRef.current.showModal();
    }
  };

  const onSelectDeviceModalClosed = ({type, value}) => {
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

  const onViewListsModal = ({type, value}) => {
    if (type == Constants.actionType.ACTION_REMOVE) {
      const tmp = selectedLists.filter(
        item => item.stock_item_id != value.stock_item_id,
      );
      setSelectedLists(tmp);
    }
  };

  const renderRightPart = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          viewListsModalRef.current.hideModal();
        }}>
        <SvgIcon icon="Close" width="20" height="20" />
      </TouchableOpacity>
    );
  };

  const useGeoLocation = () => {
    setIsCurrentLocation('1');
  };

  const onChangedCustomMasterFields = value => {
    setCustomMasterFields(value);
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

  return (
    <View style={{alignSelf: 'stretch', flex: 1}}>
      <Notification />

      <AddLeadView
        ref={addLeadViewRef}
        onButtonAction={onButtonAction}
        leadForms={leadForms}
        accuracyUnit={accuracyUnit}
        useGeoLocation={useGeoLocation}
        onChangedCustomMasterFields={onChangedCustomMasterFields}
        onPrimaryContactFields={onPrimaryContactFields}
        showFormModal={showFormModal}
        showAllocateModal={showAllocateModal}
        isValidOtherForms={isValidOtherForms}
        {...props}
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
        customRightHeaderView={
          selectDeviceCount > 0 || selectedLists.length > 0 ? (
            renderViewLists()
          ) : (
            <></>
          )
        }
        title="Select Devices:"
        onButtonAction={onSelectDeviceModalClosed}
      />

      <ViewListsModal
        ref={viewListsModalRef}
        hideClear={true}
        selectedLists={selectedLists}
        customRightHeaderView={renderRightPart()}
        title={'Allocated Devices: ' + selectedLists.length}
        onButtonAction={onViewListsModal}
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
    </View>
  );
}
 