import { View, Text , TouchableOpacity, StyleSheet} from 'react-native'
import React , { useRef , useState} from 'react'
import {TextInput, Button, Title} from 'react-native-paper';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import { Fonts } from '../../../../../constants';
import { useSelector } from 'react-redux';
import SvgIcon from '../../../../../components/SvgIcon';

export default function CustomMasterFields(props) {

    const { leadForms , customMasterFields ,accuracyUnit } = props;    
    const currentLocation = useSelector(state => state.rep.currentLocation);
    const dispositionRef = useRef([]);
    const [options, setDropdownItems] = useState([]);

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


    return (
        <View>
        {leadForms != undefined && leadForms.map((field, key) => {
            if (
                (field.field_type === 'dropdown' && field.preset_options !== '') || field.field_type == 'dropdown_input') {
                  
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
        </View>
        
    )
}

const styles = StyleSheet.create({
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
})