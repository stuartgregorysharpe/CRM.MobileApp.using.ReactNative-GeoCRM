import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TextInput, Title} from 'react-native-paper';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import Skeleton from '../../../../components/Skeleton';
import Divider from '../../../../components/Divider';
import Colors, {whiteLabel} from '../../../../constants/Colors';
import {
  getLocationInfoUpdate,
  postLocationInfoUpdate,
} from '../../../../actions/location.action';
import Fonts from '../../../../constants/Fonts';
import SvgIcon from '../../../../components/SvgIcon';
import AlertDialog from '../../../../components/modal/AlertDialog';
import {
  reverseGeocoding,
  updateCurrentLocation,
} from '../../../../actions/google.action';
import SelectionPicker from '../../../../components/modal/SelectionPicker';
import {expireToken, getPostParameter} from '../../../../constants/Helper';
import {Notification} from '../../../../components/modal/Notification';

export default function UpdateCustomerInfo({location_id, onClose, pageType}) {
  const dispatch = useDispatch();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isLoading, setIsLoading] = useState(false);
  const dispositionRef = useRef([]);
  const [leadForms, setLeadForms] = useState([]);
  const [customMasterFields, setCustomMasterFields] = useState([]);
  const [originCustomMasterFields, setOriginCustomMasterFields] = useState([]);
  const [dropdownId, setDropdownId] = useState(0);
  const [isDropdownModal, setIsDropdownModal] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [options, setDropdownItems] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isCurrentLocation, setIsCurrentLocation] = useState('0');
  const [customerNameUpdated, setCustomerNameUpdated] = useState('0');
  const [addressUpdated, setAddressUpdated] = useState('0');
  const [pickerTitle, setPickerTitle] = useState('');
  const [accuracyUnit, setAccuracyUnit] = useState('m');
  var location_name_updated = '0';
  var address_updated = '0';
  var index = 0;

  const handleSubmit = () => {
    checkChangedStatus();
    var userParam = getPostParameter(currentLocation);
    let postData = {
      location_id: location_id,
      coordinates: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
      use_current_geo_location: isCurrentLocation,
      location_name_updated: location_name_updated,
      address_updated: address_updated,
      custom_master_fields: customMasterFields,
      user_local_data: userParam.user_local_data,
    };

    postLocationInfoUpdate(postData)
      .then(res => {
        setMessage(res);
        setIsSuccess(true);
      })
      .catch(error => {
        console.log('error', error);
        expireToken(dispatch, error);
        setMessage('Failed');
        setIsSuccess(true);
      });
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (Platform.OS === 'android') {
        dispatch(updateCurrentLocation());
      }
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    //dispatch(updateCurrentLocation());
  }, []);

  useEffect(() => {
    if (isLoading) {
      console.log('is loading');
      getLocationInfoUpdate(location_id)
        .then(res => {
          console.log('is loading end', res);
          initPostData(res.custom_master_fields);
          setLeadForms(res.custom_master_fields);
          setAccuracyUnit(res.accuracy_distance_measure);
          setIsLoading(false);
        })
        .catch(e => {
          console.log('is loading erorr', e);
          setIsLoading(false);
          expireToken(dispatch, e);
        });
    }
  }, [isLoading]);

  const initPostData = res => {
    let tmp = [];
    var origin = [];
    res.forEach(element => {
      if (element.field_type === 'dropdown_input') {
        tmp.push({
          custom_master_field_id: element.custom_master_field_id,
          value: element.value,
          field_name: element.field_name,
          core_field_name: element.core_field_name,
          field_type: element.field_type,
          dropdown_value: element.dropdown_value,
        });
        origin.push({
          custom_master_field_id: element.custom_master_field_id,
          value: element.value,
          field_name: element.field_name,
          core_field_name: element.core_field_name,
          field_type: element.field_type,
          dropdown_value: element.dropdown_value,
        });
      } else {
        tmp.push({
          custom_master_field_id: element.custom_master_field_id,
          value: element.value,
          field_name: element.field_name,
          core_field_name: element.core_field_name,
          field_type: element.field_type,
        });
        origin.push({
          custom_master_field_id: element.custom_master_field_id,
          value: element.value,
          field_name: element.field_name,
          core_field_name: element.core_field_name,
          field_type: element.field_type,
        });
      }
    });
    const copy = [...tmp];
    setCustomMasterFields(tmp);
    setOriginCustomMasterFields(origin);
  };

  const checkChangedStatus = () => {
    if (originCustomMasterFields !== customMasterFields) {
      if (
        originCustomMasterFields.find(
          item => item.core_field_name === 'location_name',
        ).value !==
        customMasterFields.find(
          item => item.core_field_name === 'location_name',
        ).value
      ) {
        setCustomerNameUpdated('1');
        location_name_updated = '1';
      } else {
      }
      originCustomMasterFields.forEach(element => {
        if (
          element.core_field_name !== 'location_name' &&
          customMasterFields.find(
            item => item.core_field_name === element.core_field_name,
          ).value !== element.value
        ) {
          setAddressUpdated('1');
          address_updated = '1';
        }
      });
    }
  };

  const getTextValue = (customMasterFields, id) => {
    if (customMasterFields !== undefined && customMasterFields.length > 0) {
      customMasterFields.forEach(element => {
        if (element.custom_master_field_id == id) {
          res = element.value;
        }
      });
      return res;
    } else {
      return '';
    }
  };

  const getSelectedDropdownItemText = (id, originFieldName, fieldType) => {
    var tmp = [...customMasterFields];
    var index = -1;
    var dropdownText = '';
    if (fieldType === 'dropdown_input') {
      tmp.forEach(element => {
        if (
          element.custom_master_field_id === id &&
          element.dropdown_value !== ''
        ) {
          //&& element.value != ""
          index = -2;
          dropdownText = element.dropdown_value;
        }
      });
      if (index === -2) {
        return dropdownText;
      }
    } else {
      tmp.forEach(element => {
        if (element.custom_master_field_id === id && element.value !== '') {
          //&& element.value != ""
          index = element.itemIndex;
        }
      });
    }

    if (index === -1) {
      return originFieldName;
    }
    console.log('Selected index', index);
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
        mode={'single'}
        title={pickerTitle}
        clearTitle={'Clear'}
        value={selectedValue}
        visible={isDropdownModal}
        options={options}
        onModalClose={() => setIsDropdownModal(false)}
        onValueChanged={(item, index) => {
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
          console.log('clicied', currentLocation);
          if (currentLocation && currentLocation.latitude !== undefined) {
            //initPostData(customMasterFields);
            var masterFields = await reverseGeocoding(
              currentLocation,
              customMasterFields,
            );
            if (masterFields.length > 0) {
              setCustomMasterFields([]);
              setCustomMasterFields(masterFields);
              setIsCurrentLocation('1');
            }
          }
        }}>
        <Text style={styles.linkBoxText}>Use Current Geo Location</Text>
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
    <Animated.View>
      <ScrollView style={styles.container}>
        <Notification></Notification>
        <AlertDialog
          visible={isSuccess}
          message={message}
          onModalClose={() => {
            onClose();
          }}></AlertDialog>

        <TouchableOpacity
          style={{padding: 6}}
          onPress={() => {
            onClose();
          }}>
          <Divider />
        </TouchableOpacity>

        <View style={styles.header}>
          <Title style={{fontFamily: Fonts.primaryBold}}>Update</Title>
        </View>

        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}></MapView>

        <View style={{padding: 5}}>
          {leadForms.map((field, key) => {
            if (
              (field.field_type === 'dropdown' &&
                field.preset_options !== '') ||
              field.field_type == 'dropdown_input'
            ) {
              index++;
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
                      setDropdownItems(field.preset_options);
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
                      ref={element => {
                        dispositionRef.current[key] = element;
                      }}
                      style={{flex: 1}}
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
                    field.value !== '' &&
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

          <TouchableOpacity
            style={[
              styles.addButton,
              {
                marginBottom:
                  pageType && pageType === 'customer_contacts'
                    ? Dimensions.get('window').height * 0.1
                    : 10,
              },
            ]}
            onPress={handleSubmit}>
            <Text style={[styles.addButtonText]}>Update</Text>
            <FontAwesomeIcon
              style={styles.addButtonIcon}
              size={25}
              color={whiteLabel().actionFullButtonIcon}
              icon={faAngleDoubleRight}
            />
          </TouchableOpacity>
        </View>

        {dropdownModal()}
      </ScrollView>
    </Animated.View>
  );
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor,
    height: '100%',
    zIndex: 100,
    padding: 10,
    // elevation: 1
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
    color: whiteLabel().mainText,
    fontFamily: Fonts.secondaryMedium,
    textDecorationLine: 'underline',
    textDecorationColor: whiteLabel().mainText,
    textAlign: 'center',
  },
});
