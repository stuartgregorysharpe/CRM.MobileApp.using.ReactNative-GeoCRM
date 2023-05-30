import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  setWidthBreakpoints,
  parse,
} from 'react-native-extended-stylesheet-breakpoints';
import {TextInput, Button, Title} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import Skeleton from '../../../components/Skeleton';
import Divider from '../../../components/Divider';
import Colors, {whiteLabel} from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import SvgIcon from '../../../components/SvgIcon';
import {breakPoint} from '../../../constants/Breakpoint';
import {postAddOpportunityFields} from '../../../actions/pipeline.action';
import {getToken} from '../../../constants/Storage';
import {faSearch, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import SelectionPicker from '../../../components/modal/SelectionPicker';
import {expireToken, getPostParameter} from '../../../constants/Helper';
import {Notification} from '../../../components/modal/Notification';
import {getApiRequest} from '../../../actions/api.action';
import {DatetimePickerView} from '../../../components/DatetimePickerView';
import {
  clearLoadingBar,
  clearNotification,
  showLoadingBar,
  showNotification,
} from '../../../actions/notification.action';
import CustomInput from '../../../components/common/CustomInput';
import {Constants, Strings} from '../../../constants';
import CSingleSelectInput from '../../../components/common/SelectInput/CSingleSelectInput';
import {style} from '../../../constants/Styles';
import ProductChannelTieredModal from './modals/ProductChannelTieredModal';
import { PostRequestDAO } from '../../../DAO';
import { generateKey } from '../../../constants/Utils';
import LoadingProgressBar from '../../../components/modal/LoadingProgressBar';

var selected_location_id = 0;
var selected_dispositio_id = 0;
var pipeline_indempotency = '';

export default function AddSalesPipeline({
  location_id,
  onClose,
  pageType,
  opportunity_id,
  locationName,
}) {

  const dispatch = useDispatch();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isLoading, setIsLoading] = useState(false);
  const dispositionRef = useRef([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState(null);
  const [selectedOutcomes, setSelectedOutcomes] = useState([]);
  const [selectedOutcomeId, setSelectedOutComeId] = useState(null);
  const [selectedPipelineId, setSelectedPipelineId] = useState(0);
  const [opporunityFields, setOpporunityFields] = useState([]);
  const [dispositionFields, setDispositionFields] = useState([]);
  const [opportunityName, setOpportunityName] = useState('');
  const [addOpportunityResponse, setAddOpportunityResponse] = useState({});
  const [opportunity_fields, setOpportunity_fields] = useState([]);
  const [disposition_fields, setDisposition_fields] = useState([]);
  const [opportunityNameList, setOpportunityNameList] = useState([]);
  const [selectedOpportunityStatus, setSelectedOpportunityStatusId] =
    useState(null);
  const [opportunityStatusModalVisible, setOpportunityStatusModalVisible] =
    useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchCustomer, setSearchCustomer] = useState('');
  const [selectedCustomerId, setCustomerId] = useState('');
  const [customersList, setCustomersList] = useState([]);
  const [canShowAutoComplete, setCanShowAutoComplete] = useState(false);
  const [canSearch, setCanSearch] = useState(false);
  const [isCustomerMandatory, setIsCustomerMandatory] = useState(false);
  const [isOpportunityNameCompulsory, setIsOpportunityNameCompulsory] =
    useState(false);
  const [isStageCompulsory, setIsStageCompulsory] = useState(false);
  const [isOutcomeCompulsory, setIsOutcomeCompulsory] = useState(false);
  const [disableCustomerField, setDisableCustomerField] = useState(false);
  const [options, setOptions] = useState([]);
  const [modalType, setModalType] = useState('');
  const [opportunityValue, setOpportunityValue] = useState('');
  const [isOpportunityValue, setIsOpportunityValue] = useState(false);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState('date');
  const [selectedProductChannel, setSelectedProductChannel] = useState(null);
  const [currentChannels, setCurrentChannels] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const productChannelTiredModalRef = useRef(null);
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  let requestParams = {};
  const isOpportunityNameSelection =
    opportunityNameList != undefined && opportunityNameList.length > 0;
  const isOutcomeEnabled = features?.includes(
    Constants.features.FEATURE_OUTCOMES,
  );
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchCustomer != '' && canSearch) {
        getLocationCustomers(searchCustomer);
      } else {
        setCanShowAutoComplete(false);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchCustomer]);

  useEffect(() => {
    setIsLoading(true);    
  }, []);

  useEffect(() => {
    if (isLoading) {
      async function load() {
        if (selected_location_id != 0) {
          requestParams['location_id'] = selected_location_id;
          setCustomerId(selected_location_id);
        }
        requestParams['campaign_id'] = selectedPipelineId;
        if (pageType === 'update' && opportunity_id && opportunity_id !== '') {
          requestParams['opportunity_id'] = opportunity_id;
        }        
        getApiRequest('pipeline/pipeline-add-edit-opportunity', requestParams)
          .then(res => {
            console.log('RES', res);
            initPostData(res);
            setIsLoading(false);
          })
          .catch(e => {
            expireToken(dispatch, e);
            setIsLoading(false);
          });
      }
      load();
    }
  }, [isLoading]);

  const initPostData = res => {
    var opportunity = [];
    var disposition = [];
    let opportunityFieldList = [];
    opportunityFieldList = [...res.opportunity_fields];
    opportunityFieldList.forEach(element => {
      opportunity.push({
        opportunity_field_id: element.opportunity_field_id,
        value: element.value,
        field_name: element.field_name,
        compulsory: element.rule_compulsory,
        canShowError: false,
      });
      if (
        element.field_type == 'dropdown' &&
        element.value !== '' &&
        pageType === 'update'
      ) {
        opportunity[opportunity.length - 1].itemIndex = element.preset_field;
      }
    });
    setOpporunityFields([...opportunity]);
    if (res.opportunity_names && res.opportunity_names.length > 0) {
      const _opportunityNameList = res.opportunity_names.map(
        opportunityName => {
          return {
            label: opportunityName,
            value: opportunityName,
          };
        },
      );
      setOpportunityNameList(_opportunityNameList);
    } else {
      setOpportunityNameList([]);
    }

    // initialize disposition data
    console.log('DISPOS DATA', res.disposition_fields);
    res.disposition_fields.forEach(element => {
      disposition.push({
        disposition_field_id: element.disposition_field_id,
        value: element.value,
        field_name: element.field_name,
        compulsory: element.rule_compulsory,
        canShowError: false,
        field_type: element.field_type,
      });
    });
    setDispositionFields([...disposition]);

    setAddOpportunityResponse(res);
    setOpportunity_fields(res.opportunity_fields);
    setDisposition_fields(res.disposition_fields);
    console.log('current_channels', res.current_channels);
    setCurrentChannels(
      res.current_channels.map(x => {
        return {
          value: x.product_id,
          label: x.product,
          ...x,
        };
      }),
    );
    setContacts(res.contacts);
    if (res.selected_campaign_id) {
      setSelectedPipelineId(res.selected_campaign_id);
    }
    if (res.opportunity_value !== undefined) {
      setOpportunityValue(res.opportunity_value);
      setIsOpportunityValue(true);
    }

    if (res.current_stage_id) {
      let outcomesList = res.outcomes.filter(
        outcome => outcome.linked_stage_id == res.current_stage_id,
      );
      initializeOptionValue(outcomesList, 'outcomes');
      setSelectedOutcomes([...outcomesList]);
      setSelectedStageId(res.current_stage_id);
    }

    if (res.current_opportunity_status_id) {
      setSelectedOpportunityStatusId(res.current_opportunity_status_id);
    }
    // console.log("gkkjkl:",res.opportunity_fields);
    if (pageType === 'update') {
      setOpportunityName(res.opportunity_name);
      setContacts(res.contacts);
      setSelectedContact(res.selected_contact_id);
      setSelectedOutComeId(res.current_outcome_id);
      setSearchCustomer(res.location_name);
      setDisableCustomerField(true);
    }

    if (locationName !== '') {
      setSearchCustomer(locationName);
    }
  };

  const handleSubmit = () => {

    var canSubmit = true;
    console.log('locationName', locationName);
    if (
      (!selectedCustomerId || selectedCustomerId == '') &&
      (locationName === '' || locationName === null)
    ) {
      setIsCustomerMandatory(true);
      canSubmit = false;
    } else {
      setIsCustomerMandatory(false);
    }

    if (!opportunityName || opportunityName === '') {
      canSubmit = false;
      setIsOpportunityNameCompulsory(true);
    } else {
      setIsOpportunityNameCompulsory(false);
    }

    if (!selectedStageId || selectedStageId == '') {
      setIsStageCompulsory(true);
      canSubmit = false;
    } else {
      setIsStageCompulsory(false);
    }
    if (isOutcomeEnabled) {
      if (!selectedOutcomeId || selectedOutcomeId == '') {
        setIsOutcomeCompulsory(true);
        canSubmit = false;
      } else {
        setIsOutcomeCompulsory(false);
      }
    }

    let mandatoryDispositionExist = false;
    let disposition = [...dispositionFields];
    for (let i = 0; i < disposition.length; i++) {
      if (
        disposition[i].compulsory === '1' &&
        (!disposition[i].value || disposition[i].value == '')
      ) {
        disposition[i].canShowError = true;
        mandatoryDispositionExist = true;
      } else {
        disposition[i].canShowError = false;
      }
    }
    let mandatoryOpportunityExist = false;
    let opportunity = [...opporunityFields];
    for (let i = 0; i < opportunity.length; i++) {
      if (
        opportunity[i].compulsory === '1' &&
        (!opportunity[i].value || opportunity[i].value == '')
      ) {
        opportunity[i].canShowError = true;
        mandatoryOpportunityExist = true;
      } else {
        opportunity[i].canShowError = false;
      }
    }
    if (mandatoryDispositionExist || mandatoryOpportunityExist) {
      canSubmit = false;
    }

    setDispositionFields([...disposition]);
    setOpporunityFields([...opportunity]);

    if (!canSubmit) {
      dispatch(
        showNotification({
          type: 'success',
          message: 'Please complete the compulsory fields',
          buttonText: Strings.Ok,
        }),
      );
      return;
    }

    let dispostions = [];
    let opportunity_fields = [];

    dispositionFields.forEach(item => {
      dispostions.push({
        dispostion_field_id: item.disposition_field_id,
        value: item.value,
      });
    });

    opporunityFields.forEach(item => {
      opportunity_fields.push({
        opportunity_field_id: item.opportunity_field_id,
        value: item.value,
      });
    });

    var userParam = getPostParameter(currentLocation);
    let params = {
      opportunity_id:
        pageType === 'update' && opportunity_id && opportunity_id !== ''
          ? opportunity_id
          : null,
      location_id: selectedCustomerId,
      contact_id: selectedContact,
      opportunity_name: opportunityName,
      selected_campaign_id: selectedPipelineId,
      current_stage_id: selectedStageId,
      current_outcome_id: selectedOutcomeId,
      channel_products: currentChannels.map(x => x.product_id),
      current_opportunity_status_id: selectedOpportunityStatus,
      dispostions: dispostions,
      opportunity_fields: opportunity_fields,
      user_local_data: userParam.user_local_data,
    };
    if (isOpportunityValue) {
      params['opportunity_value'] = opportunityValue;
    }

    if(isSubmit){
      return;
    }

    setIsSubmit(true);    
    PostRequestDAO.find(0, params , 'pipeline/pipeline-add-edit-opportunity' , 'pipeline/pipeline-add-edit-opportunity',
    '' , '' , null , dispatch).then((res) => {            
      dispatch(
        showNotification({
          type: 'success',
          message: 'Opportunity added sucessfully',
          buttonText: Strings.Ok,
          buttonAction: async () => {
            onClose();
            dispatch(clearNotification());
          },
        }),
      );
      setIsSubmit(false);
    }).catch((error) => {      
      setIsSubmit(false);
      if(error === 'expired'){
        expireToken(dispatch, error)
      }else{
        dispatch(
          showNotification({
            type: 'success',
            message: 'Failed',
            buttonText: Strings.Ok,
          }),
        );
      }
    });


  };

  const getLocationCustomers = async text => {
    var token = await getToken();
    let params = {
      campaign_id: selectedPipelineId,
      search_text: text,
    };
    getApiRequest('locations/customer_search', params)
      .then(resp => {
        setCustomersList([...resp.items]);
        if (resp && resp.items.length > 0) {
          setCanShowAutoComplete(true);
        } else {
          setCanShowAutoComplete(false);
        }
      })
      .catch(e => {
        expireToken(dispatch, e);
        setCanShowAutoComplete(false);
      });
  };

  const getOpportunityTextValue = (opporunityFields, id) => {
    if (opporunityFields !== undefined && opporunityFields.length > 0) {
      var res = '';
      opporunityFields.forEach(element => {
        if (element.opportunity_field_id == id) {
          res = element.value;
        }
      });
      return res;
    } else {
      return '';
    }
  };

  const getDispositionTextValue = (dispositionFields, id) => {
    if (dispositionFields !== undefined && dispositionFields.length > 0) {
      var res = '';
      dispositionFields.forEach(element => {
        if (element.disposition_field_id == id) {
          res = element.value;
        }
      });
      return res;
    } else {
      return '';
    }
  };

  const getSelectedOpportunityDropdownItemText = (id, originFieldName) => {
    var tmp = [...opporunityFields];
    var showName = originFieldName;

    tmp.forEach(element => {
      if (element.opportunity_field_id === id && element.value !== '') {
        //&& element.value != ""
        showName = element.value;
      }
    });
    return showName;
  };

  const getSelectedDispositionDropdownItemText = (id, originFieldName) => {
    var tmp = [...dispositionFields];
    var index = -1;
    tmp.forEach(element => {
      if (element.disposition_field_id === id && element.value !== '') {
        index = element.itemIndex;
      }
    });
    if (!index || index === -1) {
      return originFieldName;
    }
    var showName = '';
    disposition_fields.forEach(element => {
      if (element.disposition_field_id == id && element.preset_options != '') {
        showName = element.preset_options[index];
      }
    });
    return showName;
  };

  const customSingleModal = () => {
    return (
      <SelectionPicker
        mode={'single'}
        visible={showModal}
        title={'Please select an option:'}
        options={options}
        value={getSelectedValue()}
        onModalClose={() => setShowModal(false)}
        onValueChanged={(item, index) => {
          console.log('modalType', modalType);
          if (modalType === 'stages') {
            var stage_id = addOpportunityResponse.stages.find(
              element => element.stage_name === item,
            ).stage_id;
            setSelectedStageId(stage_id);
            setSelectedOutComeId(null);
            if (addOpportunityResponse.outcomes) {
              var selectedOutcomes = addOpportunityResponse.outcomes.filter(
                outcome => outcome.linked_stage_id == stage_id,
              );
              setSelectedOutcomes(selectedOutcomes);
            }
          } else if (modalType === 'outcomes') {
            let outcomesList = addOpportunityResponse.outcomes.filter(
              outcome => outcome.linked_stage_id === selectedStageId,
            );
            var outcome_id = outcomesList.find(
              element => element.outcome_name === item,
            ).outcome_id;
            setSelectedOutComeId(outcome_id);
            //setIsLoading(true);
          } else if (modalType === 'opportunity_statuses') {
            var opportunity_status_id =
              addOpportunityResponse.opportunity_statuses.find(
                element => element.opportunity_status_name === item,
              ).opportunity_status_id;

            setSelectedOpportunityStatusId(opportunity_status_id);
          } else if (modalType === 'campaigns') {
            var campaign_id = addOpportunityResponse.campaigns.find(
              element => element.campaign_name === item,
            ).campaign_id;
            setSelectedPipelineId(campaign_id);
            setIsLoading(true);
          } else if (modalType === 'contacts') {
            var contact_id = contacts.find(
              element => element.contact_name === item,
            ).contact_id;
            setSelectedContact(contact_id);
          } else if (modalType === 'disposition') {
            updateDispositionValue(selected_dispositio_id, item);
          } else if (modalType === 'opportunity') {
            updateOpportunityValue(selected_dispositio_id, item);
          }
          setShowModal(false);
        }}></SelectionPicker>
    );
  };

  const initializeOptionValue = (lists, type) => {
    setModalType(type);
    var tmp = [];
    lists.forEach((element, index) => {
      if (type === 'stages') {
        tmp.push(element.stage_name);
      } else if (type === 'outcomes') {
        tmp.push(element.outcome_name);
      } else if (type === 'opportunity_statuses') {
        tmp.push(element.opportunity_status_name);
      } else if (type === 'campaigns') {
        tmp.push(element.campaign_name);
      } else if (type === 'contacts') {
        tmp.push(element.contact_name);
      }
    });
    setOptions(tmp);
  };

  const getSelectedValue = () => {
    if (modalType === 'stages') {
      return addOpportunityResponse.stages.find(
        element => element.stage_id === selectedStageId,
      )
        ? addOpportunityResponse.stages.find(
            element => element.stage_id === selectedStageId,
          ).stage_name
        : '';
    } else if (modalType === 'outcomes') {
      return selectedOutcomes.find(
        element => element.outcome_id === selectedOutcomeId,
      )
        ? selectedOutcomes.find(
            element => element.outcome_id === selectedOutcomeId,
          ).outcome_name
        : '';
    } else if (modalType === 'opportunity_status_name') {
      return addOpportunityResponse.opportunity_statuses.find(
        element => element.opportunity_status_id === selectedOpportunityStatus,
      )
        ? addOpportunityResponse.opportunity_statuses.find(
            element =>
              element.opportunity_status_id === selectedOpportunityStatus,
          ).opportunity_status_name
        : '';
    } else if (modalType === 'campaigns') {
      return addOpportunityResponse.campaigns.find(
        element => element.campaign_id === selectedPipelineId,
      )
        ? addOpportunityResponse.campaigns.find(
            element => element.campaign_id === selectedPipelineId,
          ).campaign_name
        : '';
    } else if (modalType === 'contacts') {
      return contacts.find(element => element.contact_id === selectedContact)
        ? contacts.find(element => element.contact_id === selectedContact)
            .contact_name
        : '';
    }
    return '';
  };
  const handleScheduleDate = date => {
    var tmp = [...dispositionFields];
    tmp.forEach(element => {
      if (element.disposition_field_id === selected_dispositio_id) {
        element.value = date;
      }
    });
    setDispositionFields(tmp);
  };
  getDisableStatus = (filedType, isEditable) => {
    if (filedType == 'date' || filedType == 'datetime') {
      return true;
    }
    if (isEditable == 0) {
      return true;
    }
    return false;
  };
  const handleEmpty = () => {};
  const handleFocus = (fieldType, key, isEditable) => {
    selected_dispositio_id = key;
    if (fieldType == 'date') {
      Keyboard.dismiss();
      if (isEditable == 1) {
        setDatePickerMode('date');
        setIsDateTimePickerVisible(true);
      }
    }
    if (fieldType == 'datetime') {
      Keyboard.dismiss();
      if (isEditable == 1) {
        setDatePickerMode('datetime');
        setIsDateTimePickerVisible(true);
      }
    }
  };

  const updateDispositionValue = (disposition_field_id, text) => {
    var tmp = [...dispositionFields];
    tmp.forEach(element => {
      if (element.disposition_field_id === disposition_field_id) {
        element.value = text;
      }
    });
    setDispositionFields(tmp);
  };
  const updateOpportunityValue = (opportunity_field_id, text) => {
    var tmp = [...opporunityFields];
    tmp.forEach(element => {
      if (element.opportunity_field_id === opportunity_field_id) {
        // console.log("enter", text);
        element.value = text;
      }
    });
    setOpporunityFields(tmp);
  };

  const renderDispositionView = (field, key, renderType) => {
    var renderFields = [];
    if (renderType === 'disposition') {
      renderFields = dispositionFields;
    } else if (renderType === 'opportunity') {
      renderFields = opporunityFields;
    }

    let canShowError = renderFields.find(
      x => x.disposition_field_id === field.disposition_field_id,
    )?.canShowError;
    if (field.field_type == 'dropdown') {
      index++;
      return (
        <TouchableOpacity
          key={key}
          style={[
            styles.textInput,
            styles.dropdownBox,
            {
              borderColor: canShowError
                ? whiteLabel().endDayBackground
                : Colors.disabledColor,
            },
          ]}
          onPress={() => {
            console.log('clicked dropdown', field.preset_options);
            console.log('fie', field);
            if (field.preset_options.length > 0) {
              setShowModal(true);
              setModalType(renderType);
              setOptions(field.preset_options);
              if (renderType === 'disposition') {
                selected_dispositio_id = field.disposition_field_id;
              } else {
                selected_dispositio_id = field.opportunity_field_id;
              }
            }
          }}>
          <Text
            ref={element => {
              dispositionRef.current[key] = element;
            }}
            outlineColor={whiteLabel().fieldBorder}
            style={{backgroundColor: Colors.bgColor}}>
            {renderType === 'disposition'
              ? getSelectedDispositionDropdownItemText(
                  field.disposition_field_id,
                  field.field_name,
                )
              : getSelectedOpportunityDropdownItemText(
                  field.opportunity_field_id,
                  field.field_name,
                )}
          </Text>
          <SvgIcon icon="Drop_Down" width="23px" height="23px" />
        </TouchableOpacity>
      );
    } else {
      let inputLength = getDispositionTextValue(
        renderFields,
        field.disposition_field_id,
      )
        ? getDispositionTextValue(renderFields, field.disposition_field_id)
            .length
        : 0;
      return (
        <View key={key}>
          <TouchableOpacity
            onPress={() => {
              field.field_type == 'date' || field.field_type == 'datetime'
                ? handleFocus(
                    field.field_type,
                    field.disposition_field_id,
                    field.rule_editable,
                  )
                : handleEmpty.bind(null);
            }}
            //activeOpacity={1}
          >
            <View>
              <TextInput
                theme={{ colors: { text: 'black'  , placeholder: whiteLabel().disabledColor } }}
                type={field.field_type}
                ref={element => {
                  dispositionRef.current[key] = element;
                }}
                keyboardType={
                  field.field_type === 'numeric' ? 'number-pad' : 'default'
                }
                returnKeyType={field.field_type === 'numeric' ? 'done' : 'next'}
                style={[inputLength < 30 && styles.textInput]}
                multiline={inputLength > 30 ? true : false}
                label={
                  <Text style={{backgroundColor: Colors.bgColor}}>
                    {field.field_name}
                  </Text>
                }
                value={
                  renderType === 'disposition'
                    ? getDispositionTextValue(
                        renderFields,
                        field.disposition_field_id,
                      )
                    : getOpportunityTextValue(
                        opporunityFields,
                        field.opportunity_field_id,
                      )
                }
                mode="outlined"
                outlineColor={
                  canShowError
                    ? whiteLabel().endDayBackground
                    : Colors.disabledColor
                }
                activeOutlineColor={
                  canShowError
                    ? whiteLabel().endDayBackground
                    : Colors.disabledColor
                }
                left={
                  field.add_prefix && (
                    <TextInput.Affix
                      textStyle={{marginTop: 8}}
                      text={field.add_prefix}
                    />
                  )
                }
                right={
                  field.add_suffix && (
                    <TextInput.Affix
                      textStyle={{marginTop: 8}}
                      text={field.add_suffix}
                    />
                  )
                }
                disabled={getDisableStatus(
                  field.field_type,
                  field.rule_editable,
                )}
                onChangeText={text => {
                  if (renderType === 'disposition') {
                    updateDispositionValue(field.disposition_field_id, text);
                  } else if (renderType === 'opportunity') {
                    updateOpportunityValue(field.opportunity_field_id, text);
                  }
                }}
                blurOnSubmit={false}
                onPressIn={
                  field.field_type == 'date' || field.field_type == 'datetime'
                    ? handleFocus.bind(
                        null,
                        field.field_type,
                        field.disposition_field_id,
                        field.rule_editable,
                      )
                    : handleEmpty.bind(null)
                }
                onSubmitEditing={() => {
                  if (renderType === 'disposition') {
                    if (
                      key <= dispositionRef.current.length - 2 &&
                      dispositionRef.current[key + 1] != null
                    ) {
                      if (
                        disposition_fields[key + 1] &&
                        disposition_fields[key + 1].field_type == 'text'
                      ) {
                        dispositionRef.current[key + 1].focus();
                      }
                    }
                  } else if (renderType === 'opportunity') {
                    if (
                      key <= dispositionRef.current.length - 2 &&
                      dispositionRef.current[key + 1] != null
                    ) {
                      if (opportunity_fields[key + 1].field_type == 'text') {
                        dispositionRef.current[key + 1].focus();
                      }
                    }
                  }
                  Keyboard.dismiss();
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  var index = 0;
  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          {padding: 10, justifyContent: 'center', height: '100%'},
        ]}>
        {Array.from(Array(6)).map((_, key) => (
          <Skeleton key={key} />
        ))}
      </View>
    );
  }
  const renderOpportunityNameField = () => {
    if (isOpportunityNameSelection) {
      return (
        <CSingleSelectInput
          bgType="card"
          bgStyle={[style.card, {borderWidth: 0}]}
          placeholderStyle={{color: whiteLabel().inputText, fontWeight: '400'}}
          description={'Select Opportunity Name'}
          placeholder={'Select Opportunity Name'}
          mode='single'
          checkedValue={opportunityName}
          items={opportunityNameList}
          hasError={false}
          disabled={false}
          onSelectItem={item => {
            setOpportunityName(item.label);
          }}
          onClear={() => setOpportunityName('')}
          containerStyle={{marginTop: 0, marginHorizontal: 0, flex: 1}}
        />
      );
    }
    return (
      <TouchableOpacity activeOpacity={1}>
        <View>
          <TextInput
            theme={{ colors: { text: 'black'  , placeholder: whiteLabel().disabledColor } }}
            style={styles.textInput}
            // multiline={true}
            label={
              <Text style={{backgroundColor: Colors.bgColor}}>
                {'Opportunity Name'}
              </Text>
            }
            value={opportunityName}
            mode="outlined"
            outlineColor={
              isOpportunityNameCompulsory
                ? whiteLabel().endDayBackground
                : Colors.disabledColor
            }
            activeOutlineColor={
              isOpportunityNameCompulsory
                ? whiteLabel().endDayBackground
                : Colors.disabledColor
            }
            onChangeText={text => {
              setOpportunityName(text);
            }}
            blurOnSubmit={false}
            onSubmitEditing={() => {}}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderOutcome = () => {
    if (!isOutcomeEnabled) return false;
    return (
      <View
        style={[
          styles.refreshBox,
          {
            borderColor: isOutcomeCompulsory
              ? whiteLabel().endDayBackground
              : Colors.whiteColor,
            borderWidth: isOutcomeCompulsory ? 1 : 0,
          },
        ]}>
        <TouchableOpacity
          style={[styles.shadowBox, {paddingRight: 15}]}
          onPress={() => {
            setShowModal(true);
            if (addOpportunityResponse.outcomes) {
              let outcomesList = addOpportunityResponse.outcomes.filter(
                outcome => outcome.linked_stage_id === selectedStageId,
              );
              initializeOptionValue(outcomesList, 'outcomes');
            }
          }}>
          <Text style={styles.shadowBoxText}>Outcome</Text>
          <View>
            <View
              style={styles.button}
              onPress={() => {
                if (selectedOutcomes.length > 0) {
                  setShowModal(true);
                  if (addOpportunityResponse.outcomes) {
                    let outcomesList = addOpportunityResponse.outcomes.filter(
                      outcome => outcome.linked_stage_id === selectedStageId,
                    );
                    initializeOptionValue(outcomesList, 'outcomes');
                  }
                }
              }}>
              <Text style={styles.buttonText}>
                {selectedOutcomeId
                  ? addOpportunityResponse.outcomes.find(
                      x =>
                        x != null &&
                        x.outcome_id != null &&
                        x.outcome_id == selectedOutcomeId,
                    )?.outcome_name
                  : 'Select Outcome'}
              </Text>
            </View>
          </View>
          <SvgIcon icon="Drop_Down" width="23px" height="23px" />
        </TouchableOpacity>
      </View>
    );
  };
  const renderProductSection = () => {
    const isProductChannelEnabled = features?.includes(
      Constants.features.FEATURE_PRODUCT_CHANNELS,
    );
    const text = currentChannels.length > 0 ? currentChannels[0].product : null;
    if (!isProductChannelEnabled) return null;
    const isCurrentChannelEmpty = currentChannels.length == 0;
    return (
      <View>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Text style={styles.sectionTitle}>Products</Text>
        </View>
        <CSingleSelectInput
          showDescription={true}
          description={'Products'}
          placeholder={'Please Select'}
          hideClear
          text={text}
          checkedValue={selectedProductChannel?.value}
          items={currentChannels}
          isPressOption
          hasError={false}
          disabled={false}
          isClickable={true}
          onPress={() => {
            if (currentChannels.length > 0) {
              setSelectedProductChannel(currentChannels[0]);
            } else {
              setSelectedProductChannel(null);
            }

            productChannelTiredModalRef.current.showModal();
          }}
          onSelectItem={item => {
            productChannelTiredModalRef.current.showModal();
            setSelectedProductChannel(item);
          }}
          onClear={() => setSelectedProductChannel(null)}
          containerStyle={{marginTop: 0, marginLeft: 5, flex: 1}}
        />
        <ProductChannelTieredModal
          ref={productChannelTiredModalRef}
          selectedProduct={selectedProductChannel}
          opportunityName={opportunityName}
          locationId={selectedCustomerId}
          onButtonAction={data => {
            const {type, selectedProductItem, selectedDropdownValues} = data;
            if (type == Constants.actionType.ACTION_FORM_SUBMIT) {
              if (selectedDropdownValues.length > 2) {
                const item = {
                  channel: selectedDropdownValues[0]?.label,
                  sub_channel: selectedDropdownValues[1]?.label,
                  product_type: selectedDropdownValues[2]?.label,
                  value: selectedProductItem.product_id,
                  label: selectedProductItem.product,
                  ...selectedProductItem,
                };

                if (
                  selectedProductChannel?.product_id != item.product_id &&
                  !currentChannels.find(x => x.product_id == item.product_id)
                ) {
                  const _currentChannels = currentChannels.filter(
                    x => x.product_id != selectedProductChannel?.product_id,
                  );

                  _currentChannels.push(item);
                  setCurrentChannels(_currentChannels);
                }
              }
            }
          }}
          onClear={() => {
            const _currentChannels = currentChannels.filter(
              x => x.product_id != selectedProductChannel?.product_id,
            );
            setCurrentChannels(_currentChannels);
            setSelectedProductChannel(null);
          }}
        />
      </View>
    );
  };
  return (
    <Animated.View>
      <ScrollView style={[styles.container]}>
        <Notification></Notification>
        <LoadingProgressBar/>

        <DatetimePickerView
          visible={isDateTimePickerVisible}
          value={''}
          mode={datePickerMode}
          onModalClose={() => {
            setIsDateTimePickerVisible(false);
          }}
          close={date => {
            if (date.length > 0) {
              handleScheduleDate(date.replace('/', '-').replace('/', '-'));
            }
            setIsDateTimePickerVisible(false);
          }}></DatetimePickerView>

        <TouchableOpacity
          style={{padding: 6}}
          onPress={() => {
            onClose();
          }}>
          <Divider />
        </TouchableOpacity>

        <View style={styles.header}>
          <Title
            style={{
              fontFamily: Fonts.primaryBold,
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            {pageType === 'add' ? `Add` : `Update`} Pipeline Opportunity
          </Title>
        </View>

        <View style={{padding: 5}}>
          <TouchableOpacity
            onPress={() => {
              setCanSearch(true);
            }}
            //activeOpacity={1}
          >
            <View style={{flex: 1}}>
              <TextInput
                theme={{ colors: { text: 'black'  , placeholder: whiteLabel().disabledColor } }}
                style={styles.textInput}
                label={
                  <Text style={{backgroundColor: Colors.bgColor}}>
                    {'Search Customer'}
                  </Text>
                }
                value={searchCustomer} //customersList.find(x => x.location_id == selectedCustomerId)?.name}//getTextValue(customMasterFields, field.custom_master_field_id)}
                mode="outlined"
                outlineColor={
                  isCustomerMandatory
                    ? whiteLabel().endDayBackground
                    : Colors.disabledColor
                }
                activeOutlineColor={
                  isCustomerMandatory
                    ? whiteLabel().endDayBackground
                    : Colors.disabledColor
                }
                onKeyPress={e => {
                  setCanSearch(true);
                }}
                disabled={disableCustomerField}
                onChangeText={text => {
                  if (pageType === 'update') {
                    return;
                  }
                  setSearchCustomer(text);
                  if (text !== '') {
                    setCanShowAutoComplete(true);
                  } else {
                    setCustomersList([]);
                    setCanShowAutoComplete(false);
                  }
                }}
                blurOnSubmit={false}
                onSubmitEditing={() => {}}
              />
              <FontAwesomeIcon
                style={styles.searchIcon}
                size={16}
                color={whiteLabel().inactiveIcon}
                icon={faSearch}
              />
            </View>
          </TouchableOpacity>

          {canShowAutoComplete && (
            <View
              style={{
                zIndex: 3,
                elevation: 3,
                position: 'absolute',
                top: 60,
                minHeight: 220,
                maxHeight: 220,
                backgroundColor: 'white',
                width: '100%',
                left: 5,
                borderColor: whiteLabel().fieldBorder,
                borderWidth: 1,
                borderRadius: 5,
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCanShowAutoComplete(!canShowAutoComplete);
                  setCanSearch(false);
                }}>
                <ScrollView>
                  <View>
                    {customersList.length > 0 ? (
                      customersList.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              console.log('USEEE', item);
                              setCanShowAutoComplete(false);
                              setSearchCustomer(item.name);
                              setCustomerId(item.location_id);
                              setCanSearch(false);
                              selected_location_id = item.location_id;
                              setIsLoading(true);
                            }}
                            style={{padding: 5}}>
                            <Text key={index} style={styles.pickerItemText}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })
                    ) : (
                      <View>
                        <Text style={{margin: 15}}>Searching...</Text>
                      </View>
                    )}
                  </View>
                </ScrollView>
              </TouchableWithoutFeedback>
            </View>
          )}

          <TouchableOpacity
            style={[styles.textInput, styles.dropdownBox]}
            onPress={() => {
              if (contacts.length > 0) {
                setShowModal(true);
                initializeOptionValue(contacts, 'contacts');
              } else {
                dispatch(
                  showNotification({
                    type: 'success',
                    message:
                      'No contacts available. Please make sure a Customer has been selected first',
                    buttonText: Strings.Ok,
                  }),
                );
              }
            }}>
            <Text style={{backgroundColor: Colors.bgColor}}>
              {selectedContact
                ? contacts.find(x => x.contact_id == selectedContact)
                    ?.contact_name
                : 'Select Contact'}
            </Text>
            <SvgIcon icon="Drop_Down" width="23px" height="23px" />
          </TouchableOpacity>

          {renderOpportunityNameField()}

          {/* Pipeline Modal */}
          <TouchableOpacity
            style={[styles.textInput, styles.dropdownBox]}
            onPress={() => {
              setShowModal(true);
              if (addOpportunityResponse.campaigns) {
                initializeOptionValue(
                  addOpportunityResponse.campaigns,
                  'campaigns',
                );
              }
            }}>
            <Text style={{backgroundColor: Colors.bgColor}}>
              {addOpportunityResponse &&
              addOpportunityResponse.campaigns &&
              addOpportunityResponse.campaigns.find(
                x => x.campaign_id == selectedPipelineId,
              )
                ? addOpportunityResponse.campaigns.find(
                    x => x.campaign_id == selectedPipelineId,
                  ).campaign_name
                : 'Select Pipeline'}
            </Text>
            <SvgIcon icon="Drop_Down" width="23px" height="23px" />
          </TouchableOpacity>

          {/* Stage Modal */}
          <View
            style={[
              styles.refreshBox,
              {
                borderColor: isStageCompulsory
                  ? whiteLabel().endDayBackground
                  : Colors.whiteColor,
                borderWidth: isStageCompulsory ? 1 : 0,
              },
            ]}>
            <TouchableOpacity
              style={[styles.shadowBox, {paddingRight: 15}]}
              onPress={() => {
                setShowModal(true);
                if (addOpportunityResponse.stages) {
                  initializeOptionValue(
                    addOpportunityResponse.stages,
                    'stages',
                  );
                }
              }}>
              <Text style={[styles.shadowBoxText]}>Stage</Text>
              <View>
                <View
                  style={[styles.button, {flex: 1}]}
                  onPress={() => {
                    setShowModal(true);
                    if (addOpportunityResponse.stages) {
                      initializeOptionValue(
                        addOpportunityResponse.stages,
                        'stages',
                      );
                    }
                  }}>
                  <Text style={styles.buttonText}>
                    {addOpportunityResponse &&
                    addOpportunityResponse.stages &&
                    addOpportunityResponse.stages.find(
                      x => x.stage_id == selectedStageId,
                    )
                      ? addOpportunityResponse.stages.find(
                          x => x.stage_id == selectedStageId,
                        ).stage_name
                      : 'Select Stage'}
                  </Text>
                </View>
              </View>
              <SvgIcon icon="Drop_Down" width="23px" height="23px" />
            </TouchableOpacity>
          </View>

          {renderOutcome()}
          {renderProductSection()}

          {disposition_fields.length > 0 && (
            <View>
              <View style={{flexDirection: 'row', marginVertical: 10}}>
                <Text
                  style={{
                    flexShrink: 1,
                    color: whiteLabel().mainText,
                    fontFamily: Fonts.secondaryBold,
                    borderBottomColor: whiteLabel().mainText,
                    borderBottomWidth: 2,
                    paddingBottom: 2,
                  }}>
                  Dispositions
                </Text>
              </View>

              {disposition_fields.map((field, key) => {
                return renderDispositionView(field, key, 'disposition');
              })}
            </View>
          )}

          {opportunity_fields.length > 0 && (
            <View>
              <View style={{flexDirection: 'row', marginVertical: 10}}>
                <Text
                  style={{
                    flexShrink: 1,
                    color: whiteLabel().mainText,
                    fontFamily: Fonts.secondaryBold,
                    borderBottomColor: whiteLabel().mainText,
                    borderBottomWidth: 2,
                    paddingBottom: 2,
                  }}>
                  Opportunity Details
                </Text>
              </View>
              {opportunity_fields.map((field, key) => {
                return renderDispositionView(field, key, 'opportunity');
              })}
            </View>
          )}

          {isOpportunityValue && (
            <CustomInput
              keyboardType={'number-pad'}
              value={opportunityValue}
              label="Value"
              onChangeText={text => {
                setOpportunityValue(text);
              }}></CustomInput>
          )}

          <View style={[styles.refreshBox]}>
            <TouchableOpacity
              style={[styles.shadowBox, {paddingRight: 15}]}
              onPress={() => {
                setShowModal(true);
                if (addOpportunityResponse.opportunity_statuses) {
                  initializeOptionValue(
                    addOpportunityResponse.opportunity_statuses,
                    'opportunity_statuses',
                  );
                }
                setOpportunityStatusModalVisible(
                  !opportunityStatusModalVisible,
                );
              }}>
              <Text style={styles.shadowBoxText}> Opportunity status </Text>
              <View>
                <View
                  style={styles.button}
                  onPress={() => {
                    setShowModal(true);
                    if (addOpportunityResponse.opportunity_statuses) {
                      initializeOptionValue(
                        addOpportunityResponse.opportunity_statuses,
                        'opportunity_statuses',
                      );
                    }
                  }}>
                  <Text style={styles.buttonText}>
                    {selectedOpportunityStatus
                      ? addOpportunityResponse.opportunity_statuses.find(
                          x =>
                            x != null &&
                            x.opportunity_status_id != null &&
                            x.opportunity_status_id ==
                              selectedOpportunityStatus,
                        )?.opportunity_status_name
                      : 'Select Status'}
                  </Text>
                </View>
              </View>
              <SvgIcon icon="Drop_Down" width="23px" height="23px" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.addButton, {marginBottom: 80}]}
            onPress={handleSubmit}>
            <Text style={[styles.addButtonText]}>
              {pageType === 'add' ? 'Add' : 'Update'}
            </Text>
            <FontAwesomeIcon
              style={styles.addButtonIcon}
              size={25}
              color={whiteLabel().actionFullButtonIcon}
              icon={faAngleDoubleRight}
            />
          </TouchableOpacity>
        </View>

        {customSingleModal()}
      </ScrollView>
    </Animated.View>
  );
}

const perWidth = setWidthBreakpoints(breakPoint);
const styles = EStyleSheet.create(
  parse({
    container: {
      backgroundColor: Colors.bgColor,
      height: '100%',
      zIndex: 100,
      padding: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },

    addButton: {
      position: 'relative',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom: 10,
      borderWidth: 1,
      borderRadius: 7,
      backgroundColor: whiteLabel().actionFullButtonBackground,
    },
    addButtonText: {
      color: whiteLabel().actionFullButtonText,
      fontSize: 15,
      fontFamily: Fonts.secondaryBold,
    },
    addButtonIcon: {
      position: 'absolute',
      right: 10,
    },
    textInput: {
      height: 40,
      fontSize: 14,
      lineHeight: 30,
      backgroundColor: Colors.bgColor,
      //fontFamily: Fonts.secondaryMedium,
      marginBottom: 8,
    },
    textInput_wrap_text: {
      // minHeight: 40,
      fontSize: 14,
      // lineHeight: 30,
      backgroundColor: Colors.bgColor,
      //fontFamily: Fonts.secondaryMedium,
      // marginBottom: 8
    },
    pickerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 8,
      paddingBottom: 8,
    },
    pickerItemText: {
      fontSize: 18,
      color: 'black',
    },

    linkBox: {
      position: 'relative',
      marginBottom: 8,
    },
    linkBoxText: {
      color: whiteLabel().activeTabText,
      fontFamily: Fonts.secondaryMedium,
      textDecorationLine: 'underline',
      textDecorationColor: whiteLabel().activeTabUnderline,
      textAlign: 'center',
    },
    refreshBox: {
      flex: 1,
      display: perWidth('none', 'flex'),
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    shadowBox: {
      flex: 1,
      padding: 8,
      flexGrow: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      shadowColor: '#00000014',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: Platform.OS == 'ios' ? 1 : 0.5,
      shadowRadius: 0,
      elevation: 1,
      zIndex: 1,
      borderRadius: 7,
    },
    shadowBoxText: {
      fontSize: 13,
      color: Colors.textColor,
      fontFamily: 'Gilroy-Medium',
    },

    button: {
      backgroundColor: whiteLabel().itemSelectedBackground + '31',
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      paddingRight: 5,
      minWidth: 60,
      textAlign: 'center',
      borderRadius: 7,
    },
    buttonText: {
      textAlign: 'center',
      color: '#000',
      fontSize: 13,
      fontFamily: 'Gilroy-Medium',
      letterSpacing: 0.2,
    },
    cardtitle: {
      color: Colors.textColor,
      fontSize: 14,
      fontFamily: Fonts.secondaryMedium,
    },
    dropdownBox: {
      borderColor: Colors.disabledColor,
      borderWidth: 1,
      borderRadius: 5,
      alignItems: 'center',
      paddingHorizontal: 13,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    searchIcon: {
      position: 'absolute',
      top: 20,
      right: 20,
    },

    sectionTitle: {
      flexShrink: 1,
      color: whiteLabel().mainText,
      fontFamily: Fonts.secondaryBold,
      borderBottomColor: whiteLabel().mainText,
      borderBottomWidth: 2,
      paddingBottom: 2,
    },
  }),
);
