import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Animated, ScrollView, SectionList } from 'react-native';
import { TextInput } from 'react-native-paper';
import { getLocationContacts, getLocationFields } from '../../../../actions/location.action';
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
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        loadList()
    }, []);

    const loadList = () => {
        if (selectedIndex == 1) {
            getLocationFields(locationId).then(res => {
                console.log("getLocationFields:", res.custom_master_fields);
                initPostData(res.custom_master_fields);
                setLocationFields(res.custom_master_fields);
            })
        } else if (selectedIndex == 2) {
            getLocationContacts(locationId).then(res => {
                prepareContactsList(res.contacts);
            })
        }
    }

    const prepareContactsList = (res) => {
        console.log("contacts:", res);
        let data = [];
        data = res;
        let primaryContacts = data.filter(x => x.primary_contact === '1');
        let additionalContacts = data.filter(x => x.primary_contact !== '1');

        let requiredList = [];
        requiredList.push({
            title: 'Primary Contacts',
            data: primaryContacts
        });

        requiredList.push({
            title: 'Additional Contacts',
            data: additionalContacts
        })

        console.log(requiredList);
        setContacts(requiredList);
    }

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
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ padding: 5, flex: 1 }}>
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

                    <View style={{ height: 60 }}></View>
                </View>
            </ScrollView>

        )

    }

    const renderContactItem = (item, index, tabIndex) => {
        return (
            <View style={{
                marginTop: 5,
                marginHorizontal:2,
                marginBottom:5,
                backgroundColor: Colors.whiteColor,
                borderRadius: 5,
                borderColor: item.primary_contact==='1'?whiteLabel().headerBackground:Colors.whiteColor,
                elevation:2,
                borderWidth: 1, padding: 10
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{fontSize:15, fontFamily: Fonts.secondaryBold, color: Colors.textColor }}>{item.contact_name}</Text>
                    <Text style={{
                        fontFamily: Fonts.secondaryMedium,
                        color: whiteLabel().headerBackground,
                        fontSize: 15,textDecorationLine:'underline'
                    }}>{Number(item.contact_cell).toLocaleString('en-ZA')}</Text>
                </View>
                <Text style={{ fontFamily: Fonts.secondaryRegular, color: whiteLabel().subtextColor }}>{item.contact_email}</Text>

            </View>)
    }

    const renderContactsTab = () => {
        return (
            <View style={{ flex: 1,marginBottom:60 }}>
                <SectionList
                    keyExtractor={(item, index) => index.toString()}
                    sections={contacts}
                    renderItem={({ item, index }) => {
                        return renderContactItem(item, index, tabIndex)
                    }}
                    renderSectionHeader={({ section }) => {
                        console.log(section);
                        return <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontFamily: Fonts.secondaryMedium, color: whiteLabel().headerBackground }}>{section.title}</Text>
                            <View style={{ height: 2, backgroundColor: whiteLabel().headerBackground, marginVertical: 5 }} />
                        </View>
                    }}
                />
            </View>
        )
    }

    return (
        // <Animated.View>
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
                    loadList();
                }}>
                    <Text style={[styles.tabText, tabIndex === 1 ? styles.tabActiveText : {}]}>Customer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => {
                    setTabIndex(2);
                    selectedIndex = 2;
                    loadList()
                }}>
                    <Text style={[styles.tabText, tabIndex === 2 ? styles.tabActiveText : {}]}>Contacts</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                {tabIndex == 1 && renderCustomerTab()}
                {tabIndex == 2 && renderContactsTab()}
            </View>

            {dropdownModal()}
        </View>
        // </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flexGrow:1,
        flex: 1,
        padding: 10,
        zIndex: 100,
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