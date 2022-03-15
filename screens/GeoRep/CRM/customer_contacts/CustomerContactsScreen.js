import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Animated, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { getLocationFields } from '../../../../actions/location.action';
import Divider from '../../../../components/Divider';
import CustomPicker from '../../../../components/modal/CustomPicker';
import SvgIcon from '../../../../components/SvgIcon';
import Colors, { BG_COLOR, DISABLED_COLOR, whiteLabel } from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import { boxShadow } from '../../../../constants/Styles';

var selectedIndex = 1;
export default function CustomerContactsScreen({ onClose, locationId }) {
    const [tabIndex, setTabIndex] = useState(1);
    const [locationFields, setLocationFields] = useState([]);
    const [isDropdownModal, setIsDropdownModal] = useState([]);
    const [dropdownItems, setDropdownItems] = useState([]);
    const [customMasterFields, setCustomMasterFields] = useState([]);
    const [dropdownId, setDropdownId] = useState(0);
    const dispositionRef = useRef([]);

    useEffect(() => {
        getLocationFields(locationId).then(res => {
            console.log("getLocationFields:", res.custom_master_fields);
            initPostData(res.custom_master_fields);
            setLocationFields(res.custom_master_fields);
        })
    }, []);

    const initPostData = (res) => {
        var tmp = [];
        res.forEach((element) => {
            tmp.push({ 'custom_master_field_id': element.custom_master_field_id, 'value': '', 'field_name': element.field_name });
        })
        console.log("temp list: ", tmp);
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
    const getSelectedDropdownItemText = (id, originFieldName) => {
        var tmp = [...customMasterFields];
        var index = -1;
        tmp.forEach((element) => {
            if (element.custom_master_field_id === id && element.value !== '') { //&& element.value != ""
                index = element.itemIndex;
            }
        });
        if (index === -1) {
            return originFieldName;
        }
        var showName = '';
        locationFields.forEach((element) => {
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
                                tmp.forEach((element) => {
                                    if (element.custom_master_field_id == dropdownId) {
                                        element.value = item;
                                        element.itemIndex = index;
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

    const renderCustomerTab = () => {
        return (
            <View style={{ padding: 5 }}>
                {
                    locationFields.map((field, key) => {

                        if (field.field_type == "dropdown") {
                            console.log(field);
                            //index++;
                            return (
                                <TouchableOpacity key={key}
                                    onPress={() => {
                                        setDropdownItems(field.preset_options);
                                        if (field.preset_options.length > 0) {
                                            setDropdownId(field.custom_master_field_id);
                                            setIsDropdownModal(true);
                                        }
                                    }}>

                                    <Text
                                        ref={(element) => { dispositionRef.current[key] = element }}
                                        style={[styles.textInput, { borderColor: whiteLabel().fieldBorder, borderWidth: 1, borderRadius: 4, paddingLeft: 10, paddingTop: 5 }]}
                                        outlineColor={whiteLabel().fieldBorder}>
                                        {getSelectedDropdownItemText(field.custom_master_field_id, field.field_name)}
                                    </Text>

                                </TouchableOpacity>
                            );
                        }
                        else {
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
                                                        if (locationFields[key + 1].field_type == "text") {
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
                    })
                }
            </View>

        )

    }

    const renderContactsTab = () => {
        return (
            <View>

            </View>
        )
    }

    return (
        <Animated.View>
            <View style={styles.container}>
                <TouchableOpacity style={{ padding: 6 }} onPress={() => {
                    onClose();
                }}>
                    <Divider />
                </TouchableOpacity>
                <View style={[styles.tabContainer]}>
                    <TouchableOpacity style={styles.tabItem} onPress={() => {
                        setTabIndex(1);
                        selectedIndex = 1;
                        // loadList("Customer");
                    }}>
                        <Text style={[styles.tabText, tabIndex === 1 ? styles.tabActiveText : {}]}>Customer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem} onPress={() => {
                        setTabIndex(2);
                        selectedIndex = 2;
                        // loadList("today");
                    }}>
                        <Text style={[styles.tabText, tabIndex === 2 ? styles.tabActiveText : {}]}>Contacts</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    {tabIndex == 1 && renderCustomerTab()}
                    {tabIndex == 2 && renderContactsTab()}
                </View>
            </View>
            {dropdownModal()}

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        minHeight: '100%',
        backgroundColor: BG_COLOR
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: '',
        paddingTop: 12,
        paddingBottom: 12,
        // borderRadius: 7,
        // backgroundColor: '#fff',
        marginBottom: 8
    },
    tabText: {
        fontFamily: Fonts.secondaryMedium,
        fontSize: 15,
        color: DISABLED_COLOR,
        borderBottomColor: DISABLED_COLOR,
        borderBottomWidth: 2,
        paddingBottom: 2,
        paddingHorizontal: 2
    },
    tabActiveText: {
        color: whiteLabel().activeTabText,
        fontFamily: Fonts.secondaryBold,
        borderBottomColor: whiteLabel().activeTabUnderline,
        borderBottomWidth: 2,
        paddingBottom: 2,
        paddingHorizontal: 2
    },
    tabItem: {
        marginHorizontal: 10
    },
    textInput: {
        height: 40,
        fontSize: 14,
        lineHeight: 30,
        backgroundColor: Colors.bgColor,
        marginBottom: 8
    },
})