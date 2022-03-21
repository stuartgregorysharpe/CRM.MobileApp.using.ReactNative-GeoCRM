import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TextInput, Button, Title } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import uuid from 'react-native-uuid';
import Skeleton from '../../../../components/Skeleton';
import Divider from '../../../../components/Divider';
import Colors, { PRIMARY_COLOR, BG_COLOR, DISABLED_COLOR, whiteLabel } from '../../../../constants/Colors';
import { SLIDE_STATUS } from '../../../../actions/actionTypes';
import { getLeadFields, postLeadFields } from '../../../../actions/location.action';
import Fonts from '../../../../constants/Fonts';
import CustomPicker from '../../../../components/modal/CustomPicker';
import SvgIcon from '../../../../components/SvgIcon';
import AlertDialog from '../../../../components/modal/AlertDialog';
import { reverseGeocoding, updateCurrentLocation } from '../../../../actions/google.action';

export default function AddLead({ screenProps, onClose }) {

  const dispatch = useDispatch();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isLoading, setIsLoading] = useState(false);
  const dispositionRef = useRef([]);
  const [leadForms, setLeadForms] = useState([]);
  const [customMasterFields, setCustomMasterFields] = useState([]);
  const [dropdownId, setDropdownId] = useState(0);
  const [isDropdownModal, setIsDropdownModal] = useState([]);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [isCurrentLocation, setIsCurrentLocation] = useState("0");
  const [myLocation, setMyLocation] = useState(currentLocation);

  const handleSubmit = () => {
    let params = {
      coordinates: { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
      use_current_geo_location: isCurrentLocation,
      custom_master_fields: customMasterFields
    }
    postLeadFields(params, uuid.v4())
      .then((res) => {
        setMessage("Added lead successfully");
        setIsSuccess(true);
      })
      .catch((error) => {
        setMessage("Failed");
        setIsSuccess(true);
      })
  }

  useEffect(() => {
    setIsLoading(true);
    dispatch(updateCurrentLocation());
  }, []);

  useEffect(() => {
    setMyLocation(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    if (isLoading) {
      getLeadFields()
        .then((res) => {
          initPostData(res);
          setLeadForms(res);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
        })
    }
  }, [isLoading]);

  const initPostData = (res) => {
    var tmp = [];
    res.forEach((element) => {
      if (element.field_type === "dropdown_input") {
        tmp.push(
          {
            'custom_master_field_id': element.custom_master_field_id,
            'value': '',
            'field_name': element.field_name,
            'core_field_name': element.core_field_name,
            'field_type': element.field_type,
            'dropdown_value': ''
          }
        );
      } else {
        tmp.push(
          {
            'custom_master_field_id': element.custom_master_field_id,
            'value': '',
            'field_name': element.field_name,
            'core_field_name': element.core_field_name,
            'field_type': element.field_type
          });
      }
    })
    setCustomMasterFields(tmp);
  }

  const getTextValue = (customMasterFields, id) => {
    if (customMasterFields.length > 0) {
      var tmp = customMasterFields;
      var res = "";
      tmp.forEach((element) => {
        if (element.custom_master_field_id == id) {
          res = element.value;
        }
      });
      return res;
    } else {
      return "";
    }
  }

  const getSelectedDropdownItem = () => {
    var tmp = customMasterFields;
    var res = "";
    tmp.forEach((element) => {
      if (element.custom_master_field_id == dropdownId) {
        res = element.itemIndex;
      }
    });
    if (res === "") {
      return -1;
    }
    return res;
  }

  const getSelectedDropdownItemText = (id, originFieldName, fieldType) => {
    var tmp = [...customMasterFields];
    var index = -1;
    if (fieldType === "dropdown_input") {
      tmp.forEach((element) => {
        if (element.custom_master_field_id === id && element.dropdown_value !== '') { //&& element.value != ""          
          index = element.itemIndex;
        }
      });
    } else {
      tmp.forEach((element) => {
        if (element.custom_master_field_id === id && element.value !== '') { //&& element.value != ""
          index = element.itemIndex;
        }
      });
    }

    if (index === -1) {
      return originFieldName;
    }
    var showName = '';
    leadForms.forEach((element) => {
      if (element.custom_master_field_id == id && element.preset_options != "") {
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
                var tmp = [...customMasterFields];
                tmp.forEach((element, key) => {
                  if (element.custom_master_field_id == dropdownId) {
                    element.value = item;
                    element.itemIndex = index;
                    if (element.field_type === "dropdown_input") {
                      element.dropdown_value = item;
                      element.value = '';
                    }
                    var leadTmp = [...leadForms];
                    leadTmp[key].value = item;
                    setLeadForms(leadTmp);
                  }
                });
                setCustomMasterFields(tmp);
                setIsDropdownModal(false);
              }}>
              <Text style={styles.pickerItemText}>{item}</Text>
              {index === getSelectedDropdownItem() && <SvgIcon icon="Check" width='23px' height='23px' />}
            </TouchableOpacity>
          ))
        } />
    )
  }

  const renderText = (field, key) => {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View>
          <TextInput
            type={field.field_type}
            ref={(element) => { dispositionRef.current[key] = element }}
            keyboardType={field.field_type === "numeric" ? 'number-pad' : 'default'}
            returnKeyType={field.field_type === "numeric" ? 'done' : 'next'}
            style={styles.textInput}
            label={field.field_type === "dropdown_input" ? '' : <Text style={{ backgroundColor: BG_COLOR }}>{field.field_name}</Text>}
            value={getTextValue(customMasterFields, field.custom_master_field_id)}
            mode="outlined"
            outlineColor={whiteLabel().fieldBorder}
            activeOutlineColor={DISABLED_COLOR}
            onChangeText={text => {
              var tmp = [...customMasterFields];
              tmp.forEach((element) => {
                if (element.custom_master_field_id === field.custom_master_field_id) {
                  console.log("enter", text);
                  element.value = text;
                }
              });
              setCustomMasterFields(tmp);
              console.log("changed", tmp);
            }}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              if (key <= dispositionRef.current.length - 2 && dispositionRef.current[key + 1] != null) {
                if (leadForms[key + 1].field_type == "text") {
                  dispositionRef.current[key + 1].focus();
                }
              }
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

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
    <ScrollView style={styles.container}>

      <AlertDialog visible={isSuccess} message={message} onModalClose={() => {
        onClose();
      }}></AlertDialog>

      <TouchableOpacity style={{ padding: 6 }} onPress={() => {
        dispatch({ type: SLIDE_STATUS, payload: false })
      }}>
        <Divider />
      </TouchableOpacity>

      <View style={styles.header}>
        <Title style={{ fontFamily: Fonts.primaryBold }}>Add Lead</Title>
        <Button
          labelStyle={{
            fontFamily: Fonts.primaryRegular,
            letterSpacing: 0.2
          }}
          color={Colors.selectedRedColor}
          uppercase={false}
          onPress={() => {
            initPostData(customMasterFields);
          }}
        >
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
          latitude: myLocation.latitude,
          longitude: myLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      >
      </MapView>

      <View style={{ padding: 5 }}>
        {
          leadForms.map((field, key) => {
            if (field.field_type === "dropdown" && field.preset_options !== "" || field.field_type == "dropdown_input") {
              return (
                <View key={key}>
                  {
                    key == 1 &&
                    <TouchableOpacity style={[styles.linkBox, { marginTop: 10 }]} key={key + 100} onPress={async () => {
                      var masterFields = await reverseGeocoding(myLocation, customMasterFields);
                      if (masterFields.length > 0) {
                        setCustomMasterFields(masterFields);
                        setIsCurrentLocation("1");
                      }
                    }}>
                      <Text style={styles.linkBoxText}>Use Current Geo Location</Text>
                    </TouchableOpacity>
                  }

                  <TouchableOpacity key={key}
                    onPress={() => {
                      setDropdownItems(field.preset_options !== "" ? field.preset_options : []);
                      if (field.preset_options.length > 0) {
                        setDropdownId(field.custom_master_field_id);
                        setIsDropdownModal(true);
                      }
                    }}>
                    <Text
                      ref={(element) => { dispositionRef.current[key] = element }}
                      style={[styles.textInput, { borderColor: whiteLabel().fieldBorder, borderWidth: 1, borderRadius: 4, paddingLeft: 10, paddingTop: 5 }]}
                      outlineColor={whiteLabel().fieldBorder}>
                      {getSelectedDropdownItemText(field.custom_master_field_id, field.field_name, field.field_type)}
                    </Text>
                  </TouchableOpacity>
                  {
                    field.field_type === "dropdown_input" && field.value !== "" &&
                    renderText(field, key)
                  }
                </View>

              );
            } else {
              return (
                <View key={key}>

                  {
                    renderText(field, key)
                  }
                </View>
              );
            }
          })
        }

        <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
          <Text style={[styles.addButtonText]}>Add</Text>
          <FontAwesomeIcon style={styles.addButtonIcon} size={25} color={whiteLabel().actionFullButtonIcon} icon={faAngleDoubleRight} />
        </TouchableOpacity>

      </View>

      {dropdownModal()}

    </ScrollView>
  )
}


const styles = EStyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor,
    zIndex: 100,
    padding: 10,
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
    borderColor: whiteLabel().fieldBorder,
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
    backgroundColor: Colors.bgColor,
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
    color: whiteLabel().mainText,
    fontFamily: Fonts.secondaryMedium,
    textDecorationLine: 'underline',
    textDecorationColor: whiteLabel().mainText,
    textAlign: 'center'
  },

});