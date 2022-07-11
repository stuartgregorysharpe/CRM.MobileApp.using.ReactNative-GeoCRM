import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TextInput, Button, Title} from 'react-native-paper';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import Skeleton from '../../../../components/Skeleton';
import Divider from '../../../../components/Divider';
import Colors, {whiteLabel} from '../../../../constants/Colors';
import {SLIDE_STATUS} from '../../../../actions/actionTypes';
import {
  getAddLeadFormsList,
  getLeadFields,
  postLeadFields,
} from '../../../../actions/location.action';
import Fonts from '../../../../constants/Fonts';
import AlertDialog from '../../../../components/modal/AlertDialog';
import {
  reverseGeocoding,
  updateCurrentLocation,
} from '../../../../actions/google.action';
import SelectionPicker from '../../../../components/modal/SelectionPicker';
import SvgIcon from '../../../../components/SvgIcon';
import {expireToken, getPostParameter} from '../../../../constants/Helper';
import {Notification} from '../../../../components/modal/Notification';
import {checkFeatureIncludeParam} from '../../../../constants/Storage';
import CustomInput from '../../../../components/common/CustomInput';
import AddLeadForms from './AddLeadForms';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddLead({screenProps, onClose}) {
  const dispatch = useDispatch();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isLoading, setIsLoading] = useState(false);
  const dispositionRef = useRef([]);
  const [leadForms, setLeadForms] = useState([]);
  const [customMasterFields, setCustomMasterFields] = useState([]);
  const [dropdownId, setDropdownId] = useState(0);
  const [isDropdownModal, setIsDropdownModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);
  const [options, setDropdownItems] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isCurrentLocation, setIsCurrentLocation] = useState('0');
  const [locationId, setLocationId] = useState(0);
  const [pickerTitle, setPickerTitle] = useState('');
  const [accuracyUnit, setAccuracyUnit] = useState('m');

  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const [isNameRequired, setNameRequired] = useState(false);
  const [isSurnameRequired, setSurnameRequired] = useState(false);
  const [isEmailRequired, setEmailRequired] = useState(false);
  const [isMobileRequired, setMobileRequired] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile_number, setMobileNumber] = useState('');
  const [isCustomerAndContacts, setIsCustomerAndContacts] = useState(false);
  const [isAddLeadFormsEnabled, setIsAddLeadFormsEnabled] = useState(false);
  const [canShowAddLeadForms, setCanShowaddLeadForms] = useState(false);
  const [formLists, setFormsList] = useState([]);
  const [compulsaryFormExist, setCompulsoryFormExist] = useState(false);

  const validFields = () => {
    let nameCheck = !name || name === '';
    let surNameCheck = !surname || surname === '';
    let emailCheck = !email || email === '';
    let mobileCheck = !mobile_number || mobile_number === '';

    setNameRequired(nameCheck);
    setSurnameRequired(surNameCheck);
    setEmailRequired(emailCheck);
    setMobileRequired(mobileCheck);
    if (nameCheck || surNameCheck || emailCheck || mobileCheck) {
      return false;
    }
    return true;
  };

  const isCompulsoryFormExist = async() => {
    let completedForms = await AsyncStorage.getItem('submitted_forms');
    let submittedFormsList = [];
    let isCompulsoryExist = false;
    if (completedForms) {
      submittedFormsList = JSON.parse(completedForms);
      formLists.forEach(element => {
        if (element.compulsory === '1') {
          let found = submittedFormsList.find(x => x === element.form_id);
          if (!found) {
            isCompulsoryExist = true;
          }
        }
      });
    }

    setCompulsoryFormExist(isCompulsoryExist)
    return isCompulsoryExist;
  }

  const handleSubmit = async () => {
    if (isCustomerAndContacts && !validFields()) {
      return;
    }
    var userParam = getPostParameter(currentLocation);
    let params = {
      coordinates: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
      use_current_geo_location: isCurrentLocation,
      custom_master_fields: customMasterFields,
      user_local_data: userParam.user_local_data,
    };
    if (isCustomerAndContacts) {
      params['contact'] = {
        contact_name: name,
        contact_surname: surname,
        contact_cell: mobile_number,
        contact_email: email,
      };
    }
    
    
    if(await isCompulsoryFormExist()){
      return;
    }

    postLeadFields(params)
      .then(res => {
        AsyncStorage.removeItem('submitted_forms');
        setLocationId(res);
        setMessage('Added lead successfully');
        setIsSuccess(true);
      })
      .catch(error => {
        expireToken(dispatch, error);
        setMessage('Failed');
        setIsSuccess(true);
      });
  };

  useEffect(() => {
    async function featureCheck() {
      setIsCustomerAndContacts(
        await checkFeatureIncludeParam('customer_and_contacts'),
      );
      setIsAddLeadFormsEnabled(await checkFeatureIncludeParam("add_lead_forms"));
      console.log( "val", await checkFeatureIncludeParam("add_lead_forms"))
    }
    featureCheck();
    setIsLoading(true);    
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (Platform.OS === 'android') {
        dispatch(updateCurrentLocation());
      }
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {    
    if (isLoading) {
      getLeadFields()
        .then(res => {        
          initPostData(res.custom_master_fields);
          setLeadForms(res.custom_master_fields);
          setAccuracyUnit(res.accuracy_distance_measure);
          setIsLoading(false);
        })
        .catch(e => {
          setIsLoading(false);
          expireToken(dispatch, e);
        });
    }
  }, [isLoading]);

  const initPostData = res => {
    var tmp = [];
    res.forEach(element => {
      if (element.field_type === 'dropdown_input') {
        tmp.push({
          custom_master_field_id: element.custom_master_field_id,
          value: '',
          field_name: element.field_name,
          core_field_name: element.core_field_name,
          field_type: element.field_type,
          dropdown_value: '',
        });
      } else {
        tmp.push({
          custom_master_field_id: element.custom_master_field_id,
          value: '',
          field_name: element.field_name,
          core_field_name: element.core_field_name,
          field_type: element.field_type,
        });
      }
    });
    setCustomMasterFields(tmp);
  };

  const getFormsList = () => {
    let data = [...customMasterFields];
    let params = {
      location_type: null,
      group: null,
      group_split: null
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].core_field_name === 'location_type') {
        params['location_type'] = data[i].value;
      }
      if (data[i].core_field_name === 'group') {
        params['group'] = data[i].value;
      }
      if (data[i].core_field_name === 'group_split') {
        params['group_split'] = data[i].value;
      }
    }    
    getAddLeadFormsList(params).then(response => {
      console.log(JSON.stringify(response));
      if (response?.forms) {
        var isCompulsoryExist = false;
        response.forms.forEach(element => {
          if (element.compulsory === "1") {
            isCompulsoryExist = true;
          }
        });
        setCompulsoryFormExist(isCompulsoryExist);        
        setFormsList(response.forms);
      }
    }).catch(e => {
      console.log("GET FORMS ERROR: ", e?.request);
    })
  }

  const getTextValue = (customMasterFields, id) => {
    if (customMasterFields.length > 0) {
      var tmp = customMasterFields;
      var res = '';
      tmp.forEach(element => {
        if (element.custom_master_field_id == id) {
          res = element.value;
        }
      });
      return res;
    } else {
      return '';
    }
  };

  const getSelectedDropdownItem = () => {
    var tmp = customMasterFields;
    var res = '';
    tmp.forEach(element => {
      if (element.custom_master_field_id == dropdownId) {
        res = element.itemIndex;
      }
    });
    if (res === '') {
      return -1;
    }
    return res;
  };

  const getSelectedDropdownItemText = (id, originFieldName, fieldType) => {
    var tmp = [...customMasterFields];
    var index = -1;
    if (fieldType === 'dropdown_input') {
      tmp.forEach(element => {
        if (
          element.custom_master_field_id === id &&
          element.dropdown_value !== ''
        ) {
          //&& element.value != ""
          index = element.itemIndex;
        }
      });
    } else {
      tmp.forEach(element => {
        if (element.custom_master_field_id === id && element.value !== '') {
          //&& element.value != ""
          index = element.itemIndex;
        }
      });
    }

    if (index === -1) {
      return 'Select ' + originFieldName;
    }

    var showName = '';
    leadForms.forEach(element => {
      if (
        element.custom_master_field_id == id &&
        element.preset_options != ''
      ) {
        showName = element.preset_options[index];
      }
    });
    return showName;
  };

  const dropdownModal = () => {
    return (
      <SelectionPicker
        title={pickerTitle}
        clearTitle={'Clear'}
        mode={'single'}
        value={selectedValue}
        visible={isDropdownModal}
        options={options}
        onModalClose={() => setIsDropdownModal(false)}
        onValueChanged={(item, index) => {
          console.log('selected item', item);
          var tmp = [...customMasterFields];
          tmp.forEach((element, key) => {
            if (element.custom_master_field_id == dropdownId) {
              element.itemIndex = index;
              var leadTmp = [...leadForms];
              if (element.field_type === 'dropdown_input') {
                element.dropdown_value = item;
                leadTmp[key].dropdown_value = item;
              } else {
                element.value = item;
                leadTmp[key].value = item;
              }
              setLeadForms(leadTmp);
              console.log("Ele", element)
              if (element.core_field_name === 'location_type' || element.core_field_name === 'group'
                || element.core_field_name === 'group_split') {
                getFormsList();
              }
            }
          });
          setCustomMasterFields(tmp);
          setIsDropdownModal(false);
        }}></SelectionPicker>
    );
  };

  const renderText = (field, key) => {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View>
          <TextInput
            type={field.field_type}
            ref={element => {
              dispositionRef.current[key] = element;
            }}
            keyboardType={
              field.field_type === 'numeric' ? 'number-pad' : 'default'
            }
            returnKeyType={field.field_type === 'numeric' ? 'done' : 'next'}
            style={styles.textInput}
            label={
              field.field_type === 'dropdown_input' ? (
                field.field_name + ' Number & Details'
              ) : (
                <Text style={{backgroundColor: Colors.bgColor}}>
                  {field.field_name}
                </Text>
              )
            }
            value={getTextValue(
              customMasterFields,
              field.custom_master_field_id,
            )}
            mode="outlined"
            outlineColor={whiteLabel().fieldBorder}
            activeOutlineColor={Colors.disabledColor}
            onChangeText={text => {
              var tmp = [...customMasterFields];
              tmp.forEach(element => {
                if (
                  element.custom_master_field_id ===
                  field.custom_master_field_id
                ) {
                  console.log('enter', text);
                  element.value = text;
                }
              });
              setCustomMasterFields(tmp);
              console.log('changed', tmp);
            }}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              if (
                key <= dispositionRef.current.length - 2 &&
                dispositionRef.current[key + 1] != null
              ) {
                if (leadForms[key + 1].field_type == 'text') {
                  dispositionRef.current[key + 1].focus();
                }
              }
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderUseCurrentLocation = key => {
    return (
      <TouchableOpacity
        style={[
          styles.linkBox,
          {marginTop: 7, marginBottom: 17, justifyContent: 'center'},
        ]}
        key={key + 100}
        onPress={async () => {
          if (currentLocation) {
            initPostData(customMasterFields);
            var masterFields = await reverseGeocoding(
              currentLocation,
              customMasterFields,
            );
            if (masterFields.length > 0) {
              setCustomMasterFields(masterFields);
              setIsCurrentLocation('1');
            }
          }
        }}>
        <Text style={[styles.linkBoxText, {flex: 1}]}>
          Use Current Geo Location
        </Text>
        <View style={{position: 'absolute', right: 0}}>
          <Text style={{color: Colors.disabledColor, fontSize: 11}}>
            Accuracy{' '}
            {accuracyUnit === 'm'
              ? parseInt(currentLocation.accuracy)
              : parseInt(currentLocation.accuracy * 3.28084)}{' '}
            {accuracyUnit}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const changedName = text => {
    setName(text);
    if (text !== '') {
      setNameRequired(false);
    } else {
      setNameRequired(true);
    }
  };

  const changedSurname = text => {
    setSurname(text);
    if (text !== '') {
      setSurnameRequired(false);
    } else {
      setSurnameRequired(true);
    }
  };

  const changedEmail = text => {
    setEmail(text);
    if (text !== '') {
      setEmailRequired(false);
    } else {
      setEmailRequired(true);
    }
  };

  const changedMobileNumber = text => {
    setMobileNumber(text);
    if (text !== '') {
      setMobileRequired(false);
    } else {
      setMobileRequired(true);
    }
  };

  
  const renderAddLeadFormField = () => {
    return (
      <View style={{ marginBottom: 10 }}>
        <View style={{ borderBottomColor: whiteLabel().fieldBorder, borderBottomWidth: 1, marginVertical: 10 }}>
          <Text style={{ fontFamily: Fonts.secondaryBold, color: whiteLabel().mainText }}>Other</Text>
        </View>
        <TouchableOpacity style={{
          height: 40,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: compulsaryFormExist ? Colors.selectedRedColor : whiteLabel().fieldBorder,
          borderRadius: 5, flexDirection: 'row',
          backgroundColor: Colors.whiteColor,
          paddingHorizontal: 10,
        }}
          onPress={() => {
            isCompulsoryFormExist();
            setCanShowaddLeadForms(!canShowAddLeadForms);
          }}>
          <Text style={{ fontSize: 14, fontFamily: Fonts.secondaryBold, color: whiteLabel().fieldBorder }}>Complete Forms</Text>
          <SvgIcon icon="Drop_Down" width='23px' height='23px' />
        </TouchableOpacity>
      </View>
    )
  }

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

  return (
    <ScrollView style={styles.container}>
      <Notification></Notification>
      <AlertDialog
        visible={isSuccess}
        message={message}
        onModalClose={() => {
          onClose(locationId);
        }}></AlertDialog>

      <TouchableOpacity
        style={{padding: 6}}
        onPress={() => {
          dispatch({type: SLIDE_STATUS, payload: false});
        }}>
        <Divider />
      </TouchableOpacity>

      <View style={styles.header}>
        <Title style={{fontFamily: Fonts.primaryBold}}>Add Lead</Title>
        <Button
          labelStyle={{
            fontFamily: Fonts.primaryRegular,
            letterSpacing: 0.2,
          }}
          color={Colors.selectedRedColor}
          uppercase={false}
          onPress={() => {
            initPostData(customMasterFields);
          }}>
          Clear
        </Button>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        followUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled={true}
        region={{
          latitude:  currentLocation && currentLocation.latitude != undefined? currentLocation.latitude : 0,
          longitude: currentLocation && currentLocation.longitude != undefined? currentLocation.longitude : 0,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}></MapView>

      <View style={{padding: 5}}>
        {leadForms.map((field, key) => {
          if (
            (field.field_type === 'dropdown' && field.preset_options !== '') ||
            field.field_type == 'dropdown_input'
          ) {
            return (
              <View key={key}>
                {key == 1 && renderUseCurrentLocation(key)}

                <TouchableOpacity
                  key={key}
                  style={[
                    styles.textInput,
                    {
                      borderColor: whiteLabel().fieldBorder,
                      borderWidth: 1,
                      borderRadius: 4,
                      paddingLeft: 10,
                      paddingTop: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  ]}
                  onPress={() => {
                    setDropdownItems(
                      field.preset_options !== '' ? field.preset_options : [],
                    );
                    if (field.preset_options.length > 0) {
                      setDropdownId(field.custom_master_field_id);
                      setIsDropdownModal(true);
                      if (field.field_type === 'dropdown') {
                        setSelectedValue(field.value);
                        setPickerTitle('Select ' + field.field_name);
                      } else {
                        setSelectedValue(field.dropdown_value);
                        setPickerTitle('Select Suite, Unit, Apt');
                      }
                    }
                  }}>
                  {((field.dropdown_value !== undefined &&
                    field.dropdown_value !== '') ||
                    (field.value !== undefined && field.value !== '')) && (
                    <Text
                      style={{
                        position: 'absolute',
                        top: -8,
                        left: 8,
                        fontSize: 12,
                        color: Colors.disabledColor,
                        backgroundColor: Colors.bgColor,
                      }}>
                      {' '}
                      {'Select ' + field.field_name}{' '}
                    </Text>
                  )}

                  <Text
                    mode="outlined"
                    style={{flex: 1}}
                    ref={element => {
                      dispositionRef.current[key] = element;
                    }}
                    outlineColor={whiteLabel().fieldBorder}>
                    {getSelectedDropdownItemText(
                      field.custom_master_field_id,
                      field.field_name,
                      field.field_type,
                    )}
                  </Text>

                  <View style={{marginRight: 10}}>
                    <SvgIcon icon="Drop_Down" width="23px" height="23px" />
                  </View>
                </TouchableOpacity>
                {field.field_type === 'dropdown_input' &&
                  field.dropdown_value !== undefined &&
                  renderText(field, key)}
              </View>
            );
          } else {
            return (
              <View key={key}>
                {key == 1 && renderUseCurrentLocation(key)}
                {renderText(field, key)}
              </View>
            );
          }
        })}

        {isCustomerAndContacts && (
          <View>
            <View
              style={{
                borderBottomColor: whiteLabel().mainText,
                borderBottomWidth: 1,
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontFamily: Fonts.secondaryBold,
                  color: whiteLabel().mainText,
                }}>
                Primary Contact
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <CustomInput
                label="Name"
                isError={isNameRequired}
                value={name}
                outlineColor={whiteLabel().fieldBorder}
                onChangeText={text => {
                  changedName(text);
                }}></CustomInput>
              {isNameRequired && (
                <View style={{position: 'absolute', right: 0}}>
                  <Text style={styles.requiredTextStyle}>(required)</Text>
                </View>
              )}
            </View>

            <View style={styles.inputContainer}>
              <CustomInput
                label="Surname"
                isError={isSurnameRequired}
                value={surname}
                outlineColor={whiteLabel().fieldBorder}
                onChangeText={text => {
                  changedSurname(text);
                }}></CustomInput>
              {isNameRequired && (
                <View style={{position: 'absolute', right: 0}}>
                  <Text style={styles.requiredTextStyle}>(required)</Text>
                </View>
              )}
            </View>

            <View style={styles.inputContainer}>
              <CustomInput
                label="Email Address"
                isError={isEmailRequired}
                value={email}
                outlineColor={whiteLabel().fieldBorder}
                onChangeText={text => {
                  changedEmail(text);
                }}></CustomInput>
              {isEmailRequired && (
                <View style={{position: 'absolute', right: 0}}>
                  <Text style={styles.requiredTextStyle}>(required)</Text>
                </View>
              )}
            </View>

            <View style={styles.inputContainer}>
              <CustomInput
                label="Mobile Number"
                isError={isMobileRequired}
                value={mobile_number}
                outlineColor={whiteLabel().fieldBorder}
                onChangeText={text => {
                  changedMobileNumber(text);
                }}></CustomInput>
              {isMobileRequired && (
                <View style={{position: 'absolute', right: 0}}>
                  <Text style={styles.requiredTextStyle}>(required)</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {isAddLeadFormsEnabled && renderAddLeadFormField()}

        <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
          <Text style={[styles.addButtonText]}>Add</Text>
          <FontAwesomeIcon
            style={styles.addButtonIcon}
            size={25}
            color={whiteLabel().actionFullButtonIcon}
            icon={faAngleDoubleRight}
          />
        </TouchableOpacity>
      </View>

      {dropdownModal()}

      <AddLeadForms
        onClose={() => {
          setCanShowaddLeadForms(!canShowAddLeadForms)
        }}
        visible={canShowAddLeadForms}
        formLists={formLists}
        screenProps={screenProps} />
        
    </ScrollView>
  );
}

const styles = EStyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.bgColor,
    elevation: 2,
    zIndex: 2000,
    padding: 10,    
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  map: {
    width: '100%',
    height: 230,
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
    borderColor: whiteLabel().fieldBorder,
    borderRadius: 7,
    backgroundColor: whiteLabel().actionFullButtonBackground,
    marginBottom:60
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
    marginBottom: 8,
  },

  linkBox: {
    position: 'relative',
    marginBottom: 8,
  },

  linkBoxText: {
    color: whiteLabel().mainText,
    fontFamily: Fonts.secondaryMedium,
    textDecorationLine: 'underline',
    textDecorationColor: whiteLabel().mainText,
    textAlign: 'center',
  },

  inputContainer: {
    justifyContent: 'center',
  },
  requiredTextStyle: {
    color: whiteLabel().endDayBackground,
    marginHorizontal: 10,
  },
});
