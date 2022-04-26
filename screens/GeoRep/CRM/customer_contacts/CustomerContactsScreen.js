import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Animated, ScrollView, SectionList, Dimensions, Linking, BackHandler } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { SLIDE_STATUS } from '../../../../actions/actionTypes';
import { getLocationContacts, getLocationFields, updateCustomerLocationFields } from '../../../../actions/location.action';
import Divider from '../../../../components/Divider';
import SvgIcon from '../../../../components/SvgIcon';
import Colors, { BG_COLOR, DISABLED_COLOR, whiteLabel } from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import { grayBackground, style } from '../../../../constants/Styles';
import AddContact from '../popup/AddOrUpdateContact';
import uuid from 'react-native-uuid';
import UpdateCustomerInfo from '../popup/UpdateCustomerInfo';
import SelectionPicker from '../../../../components/modal/SelectionPicker';
import { getPostParameter } from '../../../../constants/Consts';
import AlertDialog from '../../../../components/modal/AlertDialog';
import { TopTab } from '../../../../components/common/TopTab';

var selectedIndex = 0;

var showingItem = 0;

export const CustomerContactsScreen = forwardRef((props, ref) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [locationFields, setLocationFields] = useState([]);
    const [isDropdownModal, setIsDropdownModal] = useState([]);
    const [dropdownItems, setDropdownItems] = useState([]);
    const [customMasterFields, setCustomMasterFields] = useState([]);
    const [dropdownId, setDropdownId] = useState(0);
    const dispositionRef = useRef([]);
    const [contacts, setContacts] = useState([]);
    const [showItem, setShowItem] = useState(0);
    const dispatch = useDispatch();
    const currentLocation = useSelector(state => state.rep.currentLocation);
    const [pageType, setPageType] = useState('add');
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectedValue, setSelectedValue] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const headers = ["Customer", "Contacts"];

    useImperativeHandle(
        ref,
        () => ({
            onBackHandler() {
                handleBackButtonClick();
            },
        }),
        [],
    );

    useEffect(() => {
        loadList()
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [showItem]);

    const handleBackButtonClick = () => {
        console.log("back clicked", showItem);
        if (showingItem == 2) {
            setShowItem(0);
            showingItem = 0;
            return true;
        }
        if (showingItem == 1) {
            setShowItem(0);
            showingItem = 0;
            dispatch({ type: SLIDE_STATUS, payload: false });
            return true;
        }
        props.onClose();        
        return true;
    }

    const loadList = () => {
        if (selectedIndex == 0) {
            getLocationFields(props.locationId).then(res => {
                console.log("getLocationFields:", res.custom_master_fields);
                initPostData(res.custom_master_fields);
                setLocationFields(res.custom_master_fields);
            })
        } else if (selectedIndex == 1) {
            setContacts([]);
            console.log("updating");
            getLocationContacts(props.locationId).then(res => {
                prepareContactsList(res.contacts);
            })
        }
    }

    const animation = (name) => {
        dispatch({ type: SLIDE_STATUS, payload: true });
        switch (name) {
            case "addcontact":
                setShowItem(1);
                showingItem = 1;
                return;
            default:
                return;
        }
    }

    const disableField = (field) => {
        if (field.core_field_name === 'location_name' || field.core_field_name === 'location_unit'
            || field.core_field_name === 'street_address' || field.core_field_name === 'suburb'
            || field.core_field_name === 'city' || field.core_field_name === 'state'
            || field.core_field_name === 'country' || field.core_field_name === 'pincode') {
            return true;
        }

        return false;
    }

    const handleSubmit = () => {
        let fields = [];
        for (let i = 0; i < customMasterFields.length; i++) {
            if (!disableField(customMasterFields[i])) {
                fields.push({
                    'custom_master_field_id': customMasterFields[i].custom_master_field_id,
                    'value': customMasterFields[i].value
                })
            }
        }

        var userParam = getPostParameter(currentLocation);
        let request = {
            "location_id": props.locationId,
            "fields": fields,
            "user_local_data": userParam.user_local_data
        }

        console.log("Customer: ", JSON.stringify(request));
        updateCustomerLocationFields(request, uuid.v4()).then(response => {
            console.log(response);
            if (response?.status === 'success') {
                setIsSuccess(true);
                setMessage('Details updated successfully');
            }
        }).catch(e => {
            console.log(e);
        })
    }

    const prepareContactsList = (res) => {
        // console.log("contacts:", res);
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

        // console.log(requiredList);
        setContacts([...requiredList]);
    }

    const initPostData = (res) => {
        var tmp = [];
        res.forEach((element) => {
            if (element.field_type === "dropdown_input") {
                tmp.push(
                    {
                        'custom_master_field_id': element.custom_master_field_id,
                        'value': element.value,
                        'field_name': element.field_name,
                        'core_field_name': element.core_field_name,
                        'field_type': element.field_type,
                        'dropdown_value': element.dropdown_value
                    }
                );
                let presetOptions = [];
                presetOptions = [...element.preset_options];
                tmp[tmp.length - 1].itemIndex = presetOptions.findIndex(x => x === element.dropdown_value);
            } else {
                tmp.push(
                    {
                        'custom_master_field_id': element.custom_master_field_id,
                        'value': element.value,
                        'field_name': element.field_name,
                        'core_field_name': element.core_field_name,
                        'field_type': element.field_type
                    });

                let presetOptions = [];
                presetOptions = [...element.preset_options];
                tmp[tmp.length - 1].itemIndex = presetOptions.findIndex(x => x === element.value);
            }
        })
        //console.log("temp list: ", tmp);
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
        locationFields.forEach((element) => {
            if (element.custom_master_field_id == id && element.preset_options != "") {
                showName = element.preset_options[index];
            }
        });
        return showName;
    }

    const dropdownModal = () => {
        return (
            <SelectionPicker
                title={"Please select an option"}
                clearTitle={"Clear"}
                mode={"single"}
                value={selectedValue}
                visible={isDropdownModal}
                options={dropdownItems}
                onModalClose={() => setIsDropdownModal(false)}
                onValueChanged={(item, index) => {
                    console.log("selected item", item);
                    var tmp = [...customMasterFields];
                    tmp.forEach((element, key) => {

                        if (element.custom_master_field_id == dropdownId) {

                            element.itemIndex = index;
                            var fieldTmp = [...locationFields];
                            if (element.field_type === "dropdown_input") {
                                element.dropdown_value = item;
                                fieldTmp[key].dropdown_value = item;
                            } else {
                                element.value = item;
                                fieldTmp[key].value = item;
                            }
                            setLocationFields(fieldTmp);
                        }
                    });
                    setCustomMasterFields(tmp);
                    setIsDropdownModal(false);
                }}
            ></SelectionPicker>
        )
    }

    const renderText = (field, key) => {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => {
                if (disableField(field)) {
                    setShowItem(2);
                    showingItem = 2;
                }
            }}>
                <View>
                    <TextInput
                        type={field.field_type}
                        ref={(element) => { dispositionRef.current[key] = element }}
                        keyboardType={field.field_type === "numeric" ? 'number-pad' : 'default'}
                        returnKeyType={field.field_type === "numeric" ? 'done' : 'next'}
                        style={styles.textInput}
                        label={field.field_type === "dropdown_input" ? 'Input number, details' : <Text style={{ backgroundColor: BG_COLOR }}>{field.field_name}</Text>}
                        value={getTextValue(customMasterFields, field.custom_master_field_id)}
                        mode="outlined"
                        disabled={disableField(field)}
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
        );
    }

    const renderCustomerTab = () => {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ padding: 5, flex: 1 }}>
                    {
                        locationFields.map((field, key) => {
                            if (field.field_type === "dropdown" && field.preset_options !== "" || field.field_type == "dropdown_input") {
                                return (
                                    <View key={key}>
                                        <TouchableOpacity key={key} style={[styles.textInput, styles.dropdownBox, { borderColor: whiteLabel().fieldBorder, borderWidth: 1, borderRadius: 4, paddingLeft: 10, }]}
                                            onPress={() => {
                                                if (disableField(field)) {
                                                    setShowItem(2);
                                                    showingItem = 2;
                                                    return;
                                                }
                                                setDropdownItems(field.preset_options !== "" ? field.preset_options : []);
                                                if (field.preset_options.length > 0) {
                                                    setDropdownId(field.custom_master_field_id);
                                                    setIsDropdownModal(true);
                                                    if (field.field_type === "dropdown") {
                                                        setSelectedValue([field.value])
                                                    } else {
                                                        setSelectedValue([field.dropdown_value])
                                                    }
                                                }
                                            }}>
                                            <Text
                                                ref={(element) => { dispositionRef.current[key] = element }}
                                                outlineColor={whiteLabel().fieldBorder}>
                                                {getSelectedDropdownItemText(field.custom_master_field_id, field.field_name, field.field_type)}
                                            </Text>
                                            <SvgIcon icon="Drop_Down" width='23px' height='23px' />
                                        </TouchableOpacity>
                                        {
                                            field.field_type === "dropdown_input" && field.value !== "" &&
                                            renderText(field, key)
                                        }
                                    </View>

                                );
                            }
                            else {
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
                        <Text style={[styles.addButtonText]}>Update</Text>
                        <FontAwesomeIcon style={styles.addButtonIcon} size={25} color={whiteLabel().actionFullButtonIcon} icon={faAngleDoubleRight} />
                    </TouchableOpacity>
                    <View style={{ height: 60 }}></View>
                </View>
            </ScrollView>

        )

    }

    const phoneNumberReformat = (number) => {
        number = number.replace(/[^\d]/g, "");
        if (number.length == 10) {
            return number.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
        }

        return number;
    }

    const renderContactItem = (item, index, tabIndex) => {
        return (
            <TouchableOpacity onPress={() => {
                setSelectedContact(item);
                setPageType('update');
                animation('addcontact');
            }}>
                <View style={[styles.contactItemContainer, { borderColor: item.primary_contact === '1' ? whiteLabel().headerBackground : Colors.whiteColor, }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 15, fontFamily: Fonts.secondaryBold, color: Colors.textColor }}>{item.contact_name}</Text>
                        <TouchableOpacity onPress={() => { Linking.openURL(`tel:${item.contact_cell}`) }}>
                            <Text style={{
                                fontFamily: Fonts.secondaryMedium,
                                color: whiteLabel().headerBackground,
                                fontSize: 15, textDecorationLine: 'underline'
                            }}>{phoneNumberReformat(item.contact_cell)}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontFamily: Fonts.secondaryRegular, color: whiteLabel().subText }}>{item.contact_email}</Text>

                </View>
            </TouchableOpacity>
        )
    }

    const renderContactsTab = () => {
        return (
            <View style={{ flex: 1, marginBottom: 60 }}>
                <SectionList
                    keyExtractor={(item, index) => index.toString()}
                    sections={contacts}
                    renderItem={({ item, index }) => {
                        return renderContactItem(item, index, tabIndex)
                    }}
                    renderSectionHeader={({ section }) => {
                        // console.log(section);
                        return <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontFamily: Fonts.secondaryMedium, color: whiteLabel().headerBackground }}>{section.title}</Text>
                            <View style={{ height: 2, backgroundColor: whiteLabel().headerBackground, marginVertical: 5 }} />
                        </View>
                    }}
                />

                <View style={styles.plusButtonContainer}>
                    <TouchableOpacity style={style.innerPlusButton} onPress={() => {
                        setPageType('add');
                        setSelectedContact(null);
                        animation('addcontact');
                    }}>
                        <SvgIcon icon="Round_Btn_Default_Dark" width='70px' height='70px' />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    if (showItem === 2) {
        return (
            <View style={{flex:1}}>
                <UpdateCustomerInfo location_id={props.locationId}
                    pageType={'customer_contacts'}
                    onClose={() => {
                        //   props.refreshLocationInfo(locationId);
                        loadList();
                        setShowItem(0);
                        showingItem = 0;
                    }}
                />
            </View>

        )
    }

    return (
        // <Animated.View>
        <View style={styles.container}>

            <TouchableOpacity style={{ padding: 6 }} onPress={() => {
                props.onClose();
            }}>
                <Divider />
            </TouchableOpacity>

            <AlertDialog visible={isSuccess} message={message} onModalClose={() => {
                setIsSuccess(false);
                loadList();
            }}>
            </AlertDialog>
          
            <TopTab 
                tabIndex={tabIndex}
                headers={headers} 
                onTabClicked={(index) => {
                    setTabIndex(index);
                    selectedIndex = index;
                    loadList()
                    //refPagerView.current.setPage(index);
            }} ></TopTab>


            <View style={{ flex: 1 }}>
                {tabIndex == 0 && renderCustomerTab()}
                {tabIndex == 1 && renderContactsTab()}
            </View>

            {dropdownModal()}
            {
                showItem == 1 &&
                <View
                    style={[styles.transitionView, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] }]}>
                    {showItem == 1 && <AddContact onClose={() => {
                        setShowItem(0);
                        showingItem = 0;
                        dispatch({ type: SLIDE_STATUS, payload: false });
                    }} pageType={pageType} contactInfo={selectedContact}
                        locationId={props.locationId} />}
                </View>}

        </View>
        // </Animated.View>
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        zIndex: 100,
        backgroundColor: BG_COLOR
    },
                
    textInput: {
        height: 40,
        fontSize: 14,
        lineHeight: 30,
        backgroundColor: Colors.bgColor,
        marginBottom: 8
    },
    plusButtonContainer: {
        position: 'absolute',
        flexDirection: "row",
        bottom: Dimensions.get('window').height * 0.02,
        right: 20,
        zIndex: 1,
        elevation: 1,
    },
    transitionView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.bgColor,
        elevation: 2,
        zIndex: 2,
        padding: 0,
    },
    contactItemContainer: {
        marginTop: 5,
        marginHorizontal: 2,
        marginBottom: 5,
        backgroundColor: Colors.whiteColor,
        borderRadius: 5,
        elevation: 2,
        borderWidth: 1, padding: 10
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
    dropdownBox: {
        borderColor: Colors.disabledColor,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default CustomerContactsScreen;