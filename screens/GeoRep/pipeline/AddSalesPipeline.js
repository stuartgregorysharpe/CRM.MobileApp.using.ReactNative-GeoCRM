import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import { TextInput, Button, Title } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import uuid from 'react-native-uuid';
import Skeleton from '../../../components/Skeleton';
import Divider from '../../../components/Divider';
import { PRIMARY_COLOR, BG_COLOR, DISABLED_COLOR, TEXT_COLOR, GRAY_COLOR, whiteLabel } from '../../../constants/Colors';
import { getGeocoding, getLeadFields, getLocationInfoUpdate, postLeadFields, postLocationInfoUpdate } from '../../../actions/location.action';
import Fonts from '../../../constants/Fonts';
import CustomPicker from '../../../components/modal/CustomPicker';
import SvgIcon from '../../../components/SvgIcon';
import AlertDialog from '../../../components/modal/AlertDialog';
import { reverseGeocoding, updateCurrentLocation } from '../../../actions/google.action';
import { breakPoint } from '../../../constants/Breakpoint';
import { boxShadow, style } from '../../../constants/Styles';
import { getAddOpportunityContacts, getAddOpportunityFields, postAddOpportunityFields } from '../../../actions/pipeline.action';
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../../../constants/Storage';

var selected_location_id = 0;
export default function AddSalesPipeline({ location_id, onClose }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isLoading, setIsLoading] = useState(false);
  const dispositionRef = useRef([]);
  const [dropdownId, setDropdownId] = useState(0);
  const [isDropdownModal, setIsDropdownModal] = useState([]);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [isCurrentLocation, setIsCurrentLocation] = useState("0");
  const [myLocation, setMyLocation] = useState(currentLocation);

  const [pipelinesModalVisible, setPipelinesModalVisible] = useState(false);
  const [stageModalVisible, setStageModalVisible] = useState(false);
  const [outComeModalVisible, setOutComeModalVisible] = useState(false);

  const [selectedStageId, setSelectedStageId] = useState(null);
  const [selectedOutcomes, setSelectedOutcomes] = useState([]);
  const [selectedOutcomeId, setSelectedOutComeId] = useState(null);
  const [selectedPipelineId, setSelectedPipelineId] = useState(0);

  const [opporunityFields, setOpporunityFields] = useState([]);
  const [dispositionFields, setDispositionFields] = useState([]);
  const [isDisposition, setIsDisposition] = useState(false);
  const [opportunityName, setOpportunityName] = useState('');
  // const [requestParams, setRequestParams] = useState({});
  const [addOpportunityResponse, setAddOpportunityResponse] = useState({});

  const [opportunity_fields, setOpportunity_fields] = useState([]);
  const [disposition_fields, setDisposition_fields] = useState([]);

  const [selectedOpportunityStatus, setSelectedOpportunityStatusId] = useState(null);
  const [opportunityStatusModalVisible, setOpportunityStatusModalVisible] = useState(false);

  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactModalVisible, setContactModalVisible] = useState(false);

  const [searchCustomer, setSearchCustomer] = useState('');
  const [selectedCustomerId, setCustomerId] = useState('');
  const [customerSearchModalVisible, setCustomerSearchModalVisible] = useState(false);
  const [customersList, setCustomersList] = useState([]);
  const [canShowAutoComplete, setCanShowAutoComplete] = useState(false);
  const [canSearch, setCanSearch] = useState(false);

  let requestParams = {}


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

  // useEffect(() => {
  //   setMyLocation(currentLocation);
  // }, [currentLocation]);

  useEffect(() => {
    setIsLoading(true);
    //   // dispatch(updateCurrentLocation());
  }, []);

  useEffect(() => {
    if (isLoading) {
      async function load() {
        var token = await getToken();
        if (selected_location_id != 0) requestParams['location_id'] = selected_location_id;
        requestParams['campaign_id'] = selectedPipelineId;
        getAddOpportunityFields(requestParams).then((res) => {
          console.log(JSON.stringify(res));
          initPostData(res);
          setIsLoading(false);
        }).catch((e) => {
          setIsLoading(false);
        })
      }
      load();

    }
  }, [isLoading]);

  const initPostData = (res) => {
    var opportunity = [];
    var disposition = [];
    setAddOpportunityResponse(res);
    setOpportunity_fields(res.opportunity_fields);
    setDisposition_fields(res.disposition_fields);
    setContacts(res.contacts);
    if (res.selected_campaign_id) {
      setSelectedPipelineId(res.selected_campaign_id);
    }

    if (res.current_stage_id) {
      let outcomesList = addOpportunityResponse.outcomes.filter(outcome => outcome.linked_stage_id == res.current_stage_id)
      console.log(outcomesList);
      setSelectedOutcomes([...outcomesList]);
      setSelectedStageId(res.current_stage_id);


    }

    if (res.current_opportunity_status_id) {
      setSelectedOpportunityStatusId(res.current_opportunity_status_id)
    }

    res.opportunity_fields.forEach((element) => {
      opportunity.push({ 'opportunity_field_id': element.opportunity_field_id, 'value': element.value, 'field_name': element.field_name });
    })

    res.disposition_fields.forEach((element) => {
      disposition.push({ 'disposition_field_id': element.disposition_field_id, 'value': element.value, 'field_name': element.field_name });
    })
    setOpporunityFields(opportunity);
    setDispositionFields([...disposition]);
  }

  const handleSubmit = () => {
    // let params = {
    //   "opportunity_id": null,
    //   "location_id": selectedContact,
    //   "contact_id": "2",
    //   "opportunity_name": "New Opportunity 1",
    //   "selected_campaign_id": "1",
    //   "current_stage_id": "2",
    //   "current_outcome_id": "7",
    //   "current_opportunity_status_id": "2",   
    // }    
    // postAddOpportunityFields(params, uuid.v4())
    // .then((res) => {
      // setMessage("Added Opportunity successfully");
      // setIsSuccess(true);
    // })
    // .catch((error) =>{     
      // setMessage("Failed");
      // setIsSuccess(true);
    // })        
  }


  const getLocationCustomers = async (text) => {
    var token = await getToken();
    let params = {};
    params['campaign_id'] = selectedPipelineId;
    params['search_text'] = text;
    console.log("Search: ", params);

    getAddOpportunityContacts(params, token).then((resp) => {
      console.log("Contacts: ", resp);
      setCustomersList([...resp]);
      if (resp && resp.length > 0) {
        setCanShowAutoComplete(true);
      } else {
        setCanShowAutoComplete(false);
      }
      // setCustomerSearchModalVisible(!customerSearchModalVisible)
    }).catch(e => {
      console.log(e);
    })
  }


  const getOpportunityTextValue = (opporunityFields, id) => {

    if (opporunityFields !== undefined && opporunityFields.length > 0) {
      var res = "";
      opporunityFields.forEach((element) => {
        if (element.opportunity_field_id == id) {
          res = element.value;
        }
      });
      return res;
    } else {
      return "";
    }
  }

  const getDispositionTextValue = (dispositionFields, id) => {

    if (dispositionFields !== undefined && dispositionFields.length > 0) {
      var res = "";
      dispositionFields.forEach((element) => {
        if (element.disposition_field_id == id) {
          res = element.value;
        }
      });
      return res;
    } else {
      return "";
    }
  }


  const getSelectedDropdownItem = () => {
    var res = "";
    if (isDisposition) {
      dispositionFields.forEach((element) => {
        if (element.disposition_field_id == dropdownId) {
          res = element.itemIndex;
        }
      });
    } else {
      opporunityFields.forEach((element) => {
        if (element.opportunity_field_id == dropdownId) {
          res = element.itemIndex;
        }
      });
    }

    if (res === "") {
      return -1;
    }
    return res;
  }

  const getSelectedOpportunityDropdownItemText = (id, originFieldName) => {
    var tmp = [...opporunityFields];
    var index = -1;
    tmp.forEach((element) => {
      if (element.opportunity_field_id === id && element.value !== '') { //&& element.value != ""
        index = element.itemIndex;
      }
    });
    if (!index || index === -1) {
      return originFieldName;
    }
    var showName = '';
    opportunity_fields.forEach((element) => {
      if (element.opportunity_field_id == id && element.preset_options != "") {
        showName = element.preset_options[index];
      }
    });
    return showName;
  }

  const getSelectedDispositionDropdownItemText = (id, originFieldName) => {
    var tmp = [...dispositionFields];
    var index = -1;
    tmp.forEach((element) => {
      if (element.disposition_field_id === id && element.value !== '') {
        index = element.itemIndex;
      }
    });
    if (!index || index === -1) {
      return originFieldName;
    }
    var showName = '';
    disposition_fields.forEach((element) => {
      if (element.disposition_field_id == id && element.preset_options != "") {
        showName = element.preset_options[index];
      }
    });
    return showName;
  }


  const dropdownModal = () => {
    return (
      <CustomPicker
        visible={isDropdownModal}
        renderItems={
          dropdownItems.map((item, index) => (
            <TouchableOpacity style={[styles.pickerItem]} key={index}
              onPress={() => {
                if (isDisposition) {
                  var tmp = [...dispositionFields];
                  tmp.forEach((element) => {
                    if (element.disposition_field_id == dropdownId) {
                      element.value = item;
                      element.itemIndex = index;
                    }
                  });
                  setDispositionFields(tmp);
                } else {
                  var tmp = [...opporunityFields];
                  tmp.forEach((element) => {
                    if (element.opportunity_field_id == dropdownId) {
                      element.value = item;
                      element.itemIndex = index;
                    }
                  });
                  setOpporunityFields(tmp);
                }

                setIsDropdownModal(false);
              }}>
              <Text style={styles.pickerItemText}>{item}</Text>
              {index === getSelectedDropdownItem() && <SvgIcon icon="Check" width='23px' height='23px' />}
            </TouchableOpacity>
          ))
        } />
    )
  }

  const contactsModal = () => {
    return (
      <CustomPicker visible={contactModalVisible} onModalClose={() => setContactModalVisible(!contactModalVisible)} renderItems={

        contacts.map((contact, key) => (
          <View style={styles.pickerItem} key={key}>
            <TouchableOpacity onPress={() => {
              setSelectedContact(contact.contact_id);
              setContactModalVisible(!contactModalVisible);
            }} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

              <Text style={styles.pickerItemText}>{contact.contact_name !== "" ? contact.contact_name : ' '}</Text>
              {contact.contact_id == selectedContact && <SvgIcon icon="Check" width='23px' height='23px' />}
            </TouchableOpacity>
          </View>
        ))
      } />
    )
  }

  const customerSearchModal = () => {
    return (
      <CustomPicker visible={customerSearchModalVisible} onModalClose={() => setCustomerSearchModalVisible(!customerSearchModalVisible)} renderItems={

        customersList.map((customer, key) => (
          <View style={styles.pickerItem} key={key}>
            <TouchableOpacity onPress={() => {
              setCustomerId(customer.location_id);
              selected_location_id = 1234;
              setCustomerSearchModalVisible(!customerSearchModalVisible);
              setIsLoading(true);
            }} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

              <Text style={styles.pickerItemText}>{customer.name !== "" ? customer.name : ' '}</Text>
              {customer.location_id == selectedCustomerId && <SvgIcon icon="Check" width='23px' height='23px' />}
            </TouchableOpacity>
          </View>
        ))
      } />
    )
  }

  const pipelinesModal = () => {
    return (
      <CustomPicker visible={pipelinesModalVisible} onModalClose={() => setPipelinesModalVisible(!pipelinesModalVisible)} renderItems={

        addOpportunityResponse && addOpportunityResponse.campaigns && addOpportunityResponse.campaigns.map((campaign, key) => (
          <View style={styles.pickerItem} key={key}>
            <TouchableOpacity onPress={() => {
              setSelectedPipelineId(campaign.campaign_id);
              setPipelinesModalVisible(!pipelinesModalVisible);
              setIsLoading(true);
            }} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

              <Text style={styles.pickerItemText}>{campaign.campaign_name !== "" ? campaign.campaign_name : ' '}</Text>
              {campaign.campaign_id == selectedPipelineId && <SvgIcon icon="Check" width='23px' height='23px' />}
            </TouchableOpacity>
          </View>
        ))
      } />
    )
  }

  const stagesModal = () => {
    return (
      <CustomPicker visible={stageModalVisible} onModalClose={() => setStageModalVisible(!stageModalVisible)} renderItems={

        addOpportunityResponse && addOpportunityResponse.stages && addOpportunityResponse.stages.map((stage, key) => (
          <View style={styles.pickerItem} key={key}>
            <TouchableOpacity onPress={() => {
              setSelectedStageId(stage.stage_id);
              setSelectedOutComeId(null);
              if (addOpportunityResponse.outcomes) {
                setSelectedOutcomes(addOpportunityResponse.outcomes.filter(outcome => outcome.linked_stage_id == stage.stage_id));
              }
              setStageModalVisible(!stageModalVisible);
            }} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

              <Text style={styles.pickerItemText}>{stage.stage_name !== "" ? stage.stage_name : ' '}</Text>
              {stage.stage_id == selectedStageId && <SvgIcon icon="Check" width='23px' height='23px' />}
            </TouchableOpacity>
          </View>
        ))
      } />
    )
  }

  const outComesModal = () => {
    return (
      <CustomPicker
        visible={outComeModalVisible}
        renderItems={
          selectedOutcomes.map((outcome, key) => (
            <TouchableOpacity style={[styles.pickerItem]} key={key}
              onPress={() => {
                setSelectedOutComeId(outcome.outcome_id);
                setOutComeModalVisible(!outComeModalVisible);
                // setIsLoading(true);
              }}>
              <Text style={styles.pickerItemText}>{outcome.outcome_name}</Text>
              {outcome.outcome_id == selectedOutcomeId && <SvgIcon icon="Check" width='23px' height='23px' />}
            </TouchableOpacity>
          ))
        } />
    )
  }

  const opportunityStatusModal = () => {
    return (
      <CustomPicker visible={opportunityStatusModalVisible} onModalClose={() => setOpportunityStatusModalVisible(!opportunityStatusModalVisible)} renderItems={

        addOpportunityResponse && addOpportunityResponse.opportunity_statuses && addOpportunityResponse.opportunity_statuses.map((item, key) => (
          <View style={styles.pickerItem} key={key}>
            <TouchableOpacity onPress={() => {
              setSelectedOpportunityStatusId(item.opportunity_status_id);

              setOpportunityStatusModalVisible(!opportunityStatusModalVisible);
            }} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

              <Text style={styles.pickerItemText}>{item.opportunity_status_name !== "" ? item.opportunity_status_name : ' '}</Text>
              {item.opportunity_status_id == selectedOpportunityStatus && <SvgIcon icon="Check" width='23px' height='23px' />}
            </TouchableOpacity>
          </View>
        ))
      } />
    )
  }

  var index = 0;
  if (isLoading) {
    return (
      <View style={[styles.container, { padding: 10, justifyContent: 'center', height: '100%' }]}>
        {Array.from(Array(6)).map((_, key) => (
          <Skeleton key={key} />
        ))}
      </View>
    )
  }

  return (
    <Animated.View>
      <ScrollView style={[styles.container]} >

        <AlertDialog visible={isSuccess} message={message} onModalClose={() => {
          setIsSuccess(false);
          setMessage('');
        }}></AlertDialog>

        <TouchableOpacity style={{ padding: 6 }} onPress={() => {
          onClose();
        }}>
          <Divider />
        </TouchableOpacity>

        <View style={styles.header}>
          <Title style={{ fontFamily: Fonts.primaryBold, fontWeight: 'bold', fontSize: 15 }}>Add Pipeline Opportunity</Title>
        </View>

        <View style={{ padding: 5 }}>
          {/* <TouchableOpacity style={[styles.textInput, styles.dropdownBox]} onPress={() => {
            
          }}>
            <Text style={{ backgroundColor: BG_COLOR }}>{'Select Customer'}</Text>
            <SvgIcon icon="Right_Arrow" width='23px' height='23px' />
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => {
            console.log("Clicked input");
            setCanSearch(true)
          }}
            activeOpacity={1}>
            <View>

              <TextInput
                style={styles.textInput}
                label={<Text style={{ backgroundColor: BG_COLOR }}>{'Select Customer'}</Text>}
                value={searchCustomer}//customersList.find(x => x.location_id == selectedCustomerId)?.name}//getTextValue(customMasterFields, field.custom_master_field_id)}
                mode="outlined"
                outlineColor={DISABLED_COLOR}
                activeOutlineColor={DISABLED_COLOR}
                onKeyPress={(e) => {
                  console.log(e.nativeEvent.key);
                  setCanSearch(true);
                }}
                onChangeText={text => {
                  console.log("on change text");
                  setSearchCustomer(text);
                }}
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  // getLocationCustomers(searchCustomer);
                }}
              />

            </View>
          </TouchableOpacity>
          {canShowAutoComplete && <View style={{ zIndex: 3, elevation: 3, position: 'absolute', top: 60, maxHeight: 180, backgroundColor: 'white', width: '100%', left: 5, borderColor: whiteLabel().fieldBorder, borderWidth: 1, borderRadius: 5 }}>
            <TouchableWithoutFeedback onPress={() => {
              console.log("clicked outside");
              setCanShowAutoComplete(!canShowAutoComplete);
              setCanSearch(false);
            }
            }>
              <ScrollView >
                <View>
                  {customersList.map((item, index) => {
                    return <TouchableOpacity key={index}
                      onPress={() => {
                        setCanShowAutoComplete(false);
                        setSearchCustomer(item.name);
                        setCustomerId(item.location_id);
                        setCanSearch(false);
                        selected_location_id = item.location_id;
                      }}
                      style={{ padding: 5 }}>
                      <Text key={index} style={styles.pickerItemText}>{item.name}</Text>
                    </TouchableOpacity>
                  })}
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </View>}

          <TouchableOpacity style={[styles.textInput, styles.dropdownBox]} onPress={() => {
            if (contacts.length > 0) {
              console.log("Contacts available", JSON.stringify(contacts));
              setContactModalVisible(!contactModalVisible);
            } else {
              setMessage('No contacts available. Please make sure a Customer has been selected first');
              setIsSuccess(true);
            }
          }}>
            <Text style={{ backgroundColor: BG_COLOR }}>{selectedContact ? contacts.find(x => x.contact_id == selectedContact)?.contact_name : 'Select Contact'}</Text>
            <SvgIcon icon="Drop_Down" width='23px' height='23px' />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}>
            <View>
              <TextInput
                style={styles.textInput}
                label={<Text style={{ backgroundColor: BG_COLOR }}>{'Opportunity Name'}</Text>}
                value={opportunityName}//getTextValue(customMasterFields, field.custom_master_field_id)}
                mode="outlined"
                outlineColor={DISABLED_COLOR}
                activeOutlineColor={DISABLED_COLOR}
                onChangeText={text => {
                  console.log("on change text");
                  setOpportunityName(text);
                }}
                blurOnSubmit={false}
                onSubmitEditing={() => {

                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.textInput, styles.dropdownBox]} onPress={() => {
            setPipelinesModalVisible(!pipelinesModalVisible)

          }}>
            <Text style={{ backgroundColor: BG_COLOR }}>{addOpportunityResponse && addOpportunityResponse.campaigns && addOpportunityResponse.campaigns.find(x => x.campaign_id == selectedPipelineId) ? addOpportunityResponse.campaigns.find(x => x.campaign_id == selectedPipelineId).campaign_name : 'Select Pipeline'}</Text>
            <SvgIcon icon="Drop_Down" width='23px' height='23px' />
          </TouchableOpacity>
          <View style={styles.refreshBox}>
            <TouchableOpacity style={styles.shadowBox} onPress={() => setStageModalVisible(!stageModalVisible)}>
              <Text style={[styles.shadowBoxText]}>Stage</Text>
              <View>
                <View style={[styles.button, { flex: 1 }]} onPress={() => setStageModalVisible(!stageModalVisible)}>
                  <Text style={styles.buttonText}>
                    {addOpportunityResponse && addOpportunityResponse.stages && addOpportunityResponse.stages.find(x => x.stage_id == selectedStageId) ? addOpportunityResponse.stages.find(x => x.stage_id == selectedStageId).stage_name : 'Select Stage'}
                  </Text>
                </View>
              </View>
              <SvgIcon icon="Drop_Down" width='23px' height='23px' />
            </TouchableOpacity>
          </View>
          <View style={styles.refreshBox}>
            <TouchableOpacity style={styles.shadowBox} onPress={() => setOutComeModalVisible(!outComeModalVisible)}>
              <Text style={styles.shadowBoxText}>Outcome</Text>
              <View>
                <View style={styles.button} onPress={() => {
                  if (selectedOutcomes.length > 0) {
                    setOutComeModalVisible(!outComeModalVisible)
                  }
                }}>
                  <Text style={styles.buttonText}>
                    {selectedOutcomeId ? addOpportunityResponse.outcomes.find(x => x != null && x.outcome_id != null && x.outcome_id == selectedOutcomeId)?.outcome_name : 'Select Outcome'}
                  </Text>
                </View>
              </View>
              <SvgIcon icon="Drop_Down" width='23px' height='23px' />
            </TouchableOpacity>
          </View>
          {disposition_fields.length > 0 && <View>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <Text style={{
                flexShrink: 1,
                color: whiteLabel().mainText,
                fontFamily: Fonts.secondaryBold,
                borderBottomColor: whiteLabel().mainText,
                borderBottomWidth: 2,
                paddingBottom: 2,
              }}>Dispositions</Text>
            </View>
            {disposition_fields.map((field, key) => {
              if (field.field_type == "dropdown") {
                index++;
                return (
                  <TouchableOpacity key={key} style={[styles.textInput, styles.dropdownBox]} onPress={() => {
                    setDropdownItems(field.preset_options);
                    setIsDisposition(true);
                    if (field.preset_options.length > 0) {
                      setDropdownId(field.disposition_field_id);
                      setIsDropdownModal(true);
                    }
                  }}>
                    <Text
                      ref={(element) => { dispositionRef.current[key] = element }} outlineColor={whiteLabel().fieldBorder}
                      style={{ backgroundColor: BG_COLOR }}>
                      {getSelectedDispositionDropdownItemText(field.disposition_field_id, field.field_name)}
                    </Text>
                    <SvgIcon icon="Drop_Down" width='23px' height='23px' />
                  </TouchableOpacity>
                );
              } else {
                return (
                  <View key={key}>
                    <TouchableOpacity
                      activeOpacity={1}>
                      <View>
                        <TextInput
                          type={field.field_type}
                          ref={(element) => { dispositionRef.current[key] = element }}
                          keyboardType={field.field_type === "numeric" ? 'number-pad' : 'default'}
                          returnKeyType={field.field_type === "numeric" ? 'done' : 'next'}
                          style={styles.textInput}
                          label={<Text style={{ backgroundColor: BG_COLOR }}>{field.field_name}</Text>}
                          value={getDispositionTextValue(dispositionFields, field.disposition_field_id)}
                          mode="outlined"
                          outlineColor={DISABLED_COLOR}
                          activeOutlineColor={DISABLED_COLOR}
                          left={field.add_prefix && <TextInput.Affix textStyle={{ marginTop: 8 }} text={field.add_prefix} />}
                          right={field.add_suffix && <TextInput.Affix textStyle={{ marginTop: 8 }} text={field.add_suffix} />}
                          onChangeText={text => {
                            console.log("on change text");
                            var tmp = [...dispositionFields];
                            console.log(JSON.stringify(tmp));
                            tmp.forEach((element) => {
                              if (element.disposition_field_id === field.disposition_field_id) {
                                console.log("enter", text);
                                element.value = text;
                              }
                            });
                            setDispositionFields(tmp);
                          }}
                          blurOnSubmit={false}
                          onSubmitEditing={() => {
                            if (key <= dispositionRef.current.length - 2 && dispositionRef.current[key + 1] != null) {
                              if (disposition_fields[key + 1] && disposition_fields[key + 1].field_type == "text") {
                                dispositionRef.current[key + 1].focus();
                              }
                            }
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }
            })}

          </View>}
          {opportunity_fields.length > 0 && <View>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <Text style={{
                flexShrink: 1,
                color: whiteLabel().mainText,
                fontFamily: Fonts.secondaryBold,
                borderBottomColor: whiteLabel().mainText,
                borderBottomWidth: 2,
                paddingBottom: 2,
              }}>Opportunity Details</Text>
            </View>
            {opportunity_fields.map((field, key) => {
              if (field.field_type == "dropdown") {
                index++;
                return (
                  <TouchableOpacity key={key} style={[styles.textInput, styles.dropdownBox]} onPress={() => {
                    setDropdownItems(field.preset_options);
                    setIsDisposition(false);
                    if (field.preset_options.length > 0) {
                      setDropdownId(field.opportunity_field_id);
                      setIsDropdownModal(true);
                    }
                  }}>
                    <Text
                      ref={(element) => { dispositionRef.current[key] = element }} outlineColor={whiteLabel().fieldBorder}
                      style={{ backgroundColor: BG_COLOR }}>
                      {getSelectedOpportunityDropdownItemText(field.opportunity_field_id, field.field_name)}
                    </Text>
                    <SvgIcon icon="Drop_Down" width='23px' height='23px' />
                  </TouchableOpacity>
                );
              } else {
                return (
                  <View key={key}>
                    <TouchableOpacity
                      activeOpacity={1}>
                      <View>
                        <TextInput
                          type={field.field_type}
                          ref={(element) => { dispositionRef.current[key] = element }}
                          keyboardType={field.field_type === "numeric" ? 'number-pad' : 'default'}
                          returnKeyType={field.field_type === "numeric" ? 'done' : 'next'}
                          style={styles.textInput}
                          label={<Text style={{ backgroundColor: BG_COLOR }}>{field.field_name}</Text>}
                          value={getOpportunityTextValue(opporunityFields, field.opportunity_field_id)}
                          mode="outlined"
                          outlineColor={DISABLED_COLOR}
                          activeOutlineColor={DISABLED_COLOR}
                          left={field.add_prefix && <TextInput.Affix textStyle={{ marginTop: 8 }} text={field.add_prefix} />}
                          right={field.add_suffix && <TextInput.Affix textStyle={{ marginTop: 8 }} text={field.add_suffix} />}
                          onChangeText={text => {
                            console.log("on change text");
                            var tmp = [...opporunityFields];
                            tmp.forEach((element) => {
                              if (element.opportunity_field_id === field.opportunity_field_id) {
                                console.log("enter", text);
                                element.value = text;
                              }
                            });
                            setOpporunityFields(tmp);
                          }}
                          blurOnSubmit={false}
                          onSubmitEditing={() => {
                            if (key <= dispositionRef.current.length - 2 && dispositionRef.current[key + 1] != null) {
                              if (opportunity_fields[key + 1].field_type == "text") {
                                dispositionRef.current[key + 1].focus();
                              }
                            }
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }
            })}

          </View>}
          <View style={styles.refreshBox}>
            <TouchableOpacity style={styles.shadowBox} onPress={() => setOpportunityStatusModalVisible(!opportunityStatusModalVisible)}>
              <Text style={styles.shadowBoxText}> {selectedOpportunityStatus ? addOpportunityResponse.opportunity_statuses.find(x => x != null && x.opportunity_status_id != null && x.opportunity_status_id == selectedOpportunityStatus)?.opportunity_status_name : 'Opportunity status'}</Text>
              {/* <View>
                <View style={styles.button} onPress={() => setOutComeModalVisible(!outComeModalVisible)}>
                  <Text style={styles.buttonText}>
                    {selectedOutcomeId ? addOpportunityResponse.outcomes.find(x => x != null && x.outcome_id != null && x.outcome_id == selectedOutcomeId)?.outcome_name : 'Select Outcome'}
                  </Text>
                </View>
              </View> */}
              <SvgIcon icon="Drop_Down" width='23px' height='23px' />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => { }}>
            <Text style={[styles.addButtonText]}>Add</Text>
            <FontAwesomeIcon style={styles.addButtonIcon} size={25} color={whiteLabel().actionFullButtonIcon} icon={faAngleDoubleRight} />
          </TouchableOpacity>
        </View>

        {dropdownModal()}
        {stagesModal()}
        {outComesModal()}
        {pipelinesModal()}
        {opportunityStatusModal()}
        {contactsModal()}
        {customerSearchModal()}
      </ScrollView>

    </Animated.View>
  )
}

const perWidth = setWidthBreakpoints(breakPoint);
const styles = EStyleSheet.create(parse({
  container: {
    backgroundColor: BG_COLOR,
    height: '100%',
    zIndex: 100,
    padding: 10,
    // elevation: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  map: {
    width: '100%',
    height: 230,
    marginBottom: 10
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
    backgroundColor: whiteLabel().actionFullButtonBackground
  },
  addButtonText: {
    color: whiteLabel().actionFullButtonText,
    fontSize: 15,
    fontFamily: Fonts.secondaryBold
  },
  addButtonIcon: {
    position: 'absolute',
    right: 10
  },
  textInput: {
    height: 40,
    fontSize: 14,
    lineHeight: 30,
    backgroundColor: BG_COLOR,
    //fontFamily: Fonts.secondaryMedium,
    marginBottom: 8
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
    color: 'black'
  },

  linkBox: {
    position: 'relative',
    marginBottom: 8
  },
  linkBoxText: {
    color: whiteLabel().activeTabText,
    fontFamily: Fonts.secondaryMedium,
    textDecorationLine: 'underline',
    textDecorationColor: whiteLabel().activeTabUnderline,
    textAlign: 'center'
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
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: Platform.OS == 'ios' ? 1 : 0.5,
    shadowRadius: 0,
    elevation: 1,
    zIndex: 1,
    borderRadius: 7,
  },
  shadowBoxText: {
    fontSize: 13,
    color: TEXT_COLOR,
    fontFamily: 'Gilroy-Medium'
  },
  button: {
    backgroundColor: GRAY_COLOR,
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
  }, cardtitle: {
    color: TEXT_COLOR,
    fontSize: 14,
    fontFamily: Fonts.secondaryMedium,
  },
  dropdownBox: {
    borderColor: DISABLED_COLOR,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }


}));