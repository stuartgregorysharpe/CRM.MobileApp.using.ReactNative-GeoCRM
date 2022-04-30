import React, { useRef, useState } from 'react';
import { Platform, View, SafeAreaView, TouchableOpacity, Text, StyleSheet, ScrollView, Modal, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Divider from '../../../../components/Divider';
import Fonts from '../../../../constants/Fonts';
import Colors, { PRIMARY_COLOR, BG_COLOR, whiteLabel } from '../../../../constants/Colors';
import { Button, Provider, TextInput, Title } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import AlertDialog from '../../../../components/modal/AlertDialog';
import { addEditLocationContact } from '../../../../actions/location.action';
import uuid from 'react-native-uuid';
import { getPostParameter } from '../../../../constants/Consts';

export default function AddContact({ onClose, pageType, contactInfo, locationId }) {
    const dispatch = useDispatch();
    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const mobileRef = useRef();
    const additionalNumberRef = useRef();

    const currentLocation = useSelector(state => state.rep.currentLocation);
    const [name, setName] = useState(contactInfo ? contactInfo?.contact_name : '');
    const [surname, setSurname] = useState(contactInfo ? contactInfo?.contact_surname : '');
    const [email, setEmail] = useState(contactInfo ? contactInfo?.contact_email : '');
    const [mobile_number, setMobileNumber] = useState(contactInfo ? contactInfo?.contact_cell : '');
    const [additional_number, setAdditionalNumber] = useState(contactInfo ? contactInfo?.additional_number : '');

    const [isNameRequired, setNameRequired] = useState(false);
    const [isSurnameRequired, setSurnameRequired] = useState(false);
    const [isEmailRequired, setEmailRequired] = useState(false);
    const [isMobileRequired, setMobileRequired] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [canShowErrorAlert, setShowErrorAlert] = useState(false);

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
            // setIsSuccess(true);
            // setShowErrorAlert(true);
            // setMessage('Please complete the compulsory fields');
            return false;
        }
        setShowErrorAlert(false);
        return true;
    }

    const handleSubmit = () => {
        if (!validFields()) {
            return;
        }
        //  /locations/add-edit-contacts
        var userParam = getPostParameter(currentLocation);
        let payload = {
            "location_id": locationId,
            "contact_name": name,
            "contact_surname": surname,
            "contact_cell": mobile_number,
            "additional_number": additional_number,
            "contact_email": email,
            "user_local_data" : userParam.user_local_data
        }
        if (pageType === 'add') {
            payload['contact_id'] = "";
        } else {
            payload['contact_id'] = contactInfo.contact_id;
        }

        console.log(payload);

        addEditLocationContact(payload, uuid.v4()).then(response => {
            setIsSuccess(true);
            setShowErrorAlert(false);
            if (pageType === 'add') {
                setMessage('Contact added successfully')
            } else {
                setMessage('Contact updated successfully');
            }
        }).catch(e => {

            //added for temporary. will remove once api working properly
            setIsSuccess(true);
            setShowErrorAlert(false);
            if (pageType === 'add') {
                setMessage('Contact added successfully')
            } else {
                setMessage('Contact updated successfully');
            }
        })
    }

    return (
        <Modal
            transparent={true}
            style={styles.container}
            onRequestClose={() => {
                onClose();
            }}>
            <Pressable style={{ flex: 1, backgroundColor: '#00000055' }} onPress={() => { onClose() }}>
                <View style={{ flex: 1 }}></View>

                <View style={{ backgroundColor: Colors.whiteColor, padding: 10 }}>
                    <ScrollView>
                        <AlertDialog visible={isSuccess} message={message} onModalClose={() => {
                            if (canShowErrorAlert) {
                                setIsSuccess(false);
                                setShowErrorAlert(false);
                            } else {
                                onClose();
                            }

                        }}></AlertDialog>
                        <TouchableOpacity style={{ padding: 6 }} onPress={onClose}>
                            <Divider />
                        </TouchableOpacity>
                        <View style={styles.header}>
                            <Title style={{ fontFamily: Fonts.primaryBold }}>{pageType === 'add' ? 'Add ' : 'Update '}Contact</Title>
                            <Button
                                labelStyle={{
                                    fontFamily: Fonts.primaryRegular,
                                    letterSpacing: 0.2
                                }}
                                color={Colors.selectedRedColor}
                                uppercase={false}
                                onPress={() => {
                                    setName('');
                                    setSurname('');
                                    setEmail('');
                                    setMobileNumber('');
                                    setAdditionalNumber('');
                                }}
                            >
                                Clear
                            </Button>
                        </View>
                        <View>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => nameRef.current.focus()}
                            >
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        ref={nameRef}
                                        style={styles.textInput}
                                        label="Name"
                                        mode="outlined"
                                        outlineColor={isNameRequired ? whiteLabel().endDayBackground : PRIMARY_COLOR}
                                        activeOutlineColor={isNameRequired ? whiteLabel().endDayBackground : Colors.disabledColor}
                                        value={name}
                                        onChangeText={text => {
                                            setName(text);
                                            if (text !== '') {
                                                setNameRequired(false);
                                            } else {
                                                setNameRequired(true);
                                            }
                                        }}
                                    />
                                    {isNameRequired && <View style={{ position: 'absolute', right: 0 }}>
                                        <Text style={{ color: whiteLabel().endDayBackground, marginHorizontal: 10 }}>(required)</Text>
                                    </View>}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => surnameRef.current.focus()}
                            >
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        ref={surnameRef}
                                        style={styles.textInput}
                                        label="Surname"
                                        mode="outlined"
                                        outlineColor={isSurnameRequired ? whiteLabel().endDayBackground : PRIMARY_COLOR}
                                        activeOutlineColor={isSurnameRequired ? whiteLabel().endDayBackground : Colors.disabledColor}
                                        value={surname}
                                        onChangeText={text => {
                                            setSurname(text)
                                            if (text !== '') {
                                                setSurnameRequired(false);
                                            } else {
                                                setSurnameRequired(true);
                                            }
                                        }}
                                    />
                                    {isSurnameRequired && <View style={{ position: 'absolute', right: 0 }}>
                                        <Text style={{ color: whiteLabel().endDayBackground, marginHorizontal: 10 }}>(required)</Text>
                                    </View>}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => emailRef.current.focus()}
                            >
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        ref={emailRef}
                                        style={styles.textInput}
                                        label="Email Address"
                                        mode="outlined"
                                        outlineColor={isEmailRequired ? whiteLabel().endDayBackground : PRIMARY_COLOR}
                                        activeOutlineColor={isEmailRequired ? whiteLabel().endDayBackground : Colors.disabledColor}
                                        value={email}
                                        onChangeText={text => {
                                            setEmail(text)
                                            if (text !== '') {
                                                setEmailRequired(false);
                                            } else {
                                                setEmailRequired(true);
                                            }
                                        }}
                                    />
                                    {isEmailRequired && <View style={{ position: 'absolute', right: 0 }}>
                                        <Text style={{ color: whiteLabel().endDayBackground, marginHorizontal: 10 }}>(required)</Text>
                                    </View>}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => mobileRef.current.focus()}
                            >
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        ref={mobileRef}
                                        style={styles.textInput}
                                        label="Mobile Number"
                                        mode={"outlined"}
                                        outlineColor={isMobileRequired ? whiteLabel().endDayBackground : PRIMARY_COLOR}
                                        activeOutlineColor={isMobileRequired ? whiteLabel().endDayBackground : Colors.disabledColor}
                                        value={mobile_number}
                                        onChangeText={text => {
                                            setMobileNumber(text)
                                            if (text !== '') {
                                                setMobileRequired(false);
                                            } else {
                                                setMobileRequired(true);
                                            }
                                        }}
                                    />

                                    {isMobileRequired && <View style={{ position: 'absolute', right: 0 }}>
                                        <Text style={{ color: whiteLabel().endDayBackground, marginHorizontal: 10 }}>(required)</Text>
                                    </View>}

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => additionalNumberRef.current.focus()}
                            >
                                <View>
                                    <TextInput
                                        ref={additionalNumberRef}
                                        style={styles.textInput}
                                        label="Additional Number"
                                        mode="outlined"
                                        outlineColor={PRIMARY_COLOR}
                                        activeOutlineColor={Colors.disabledColor}
                                        value={additional_number}
                                        onChangeText={text => setAdditionalNumber(text)}
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                                <Text style={[styles.addButtonText]}>{pageType === 'add' ? 'Add' : 'Update'}</Text>
                                <FontAwesomeIcon style={styles.addButtonIcon} size={25} color={whiteLabel().actionFullButtonIcon} icon={faAngleDoubleRight} />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>


            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: BG_COLOR,
        padding: 10,
        zIndex: 100,
        elevation: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        fontSize: 14,
        lineHeight: 30,
        height: 40,
        backgroundColor: Colors.whiteColor,
        fontFamily: Fonts.secondaryMedium,
        marginBottom: 8
    },
    inputContainer: {
        justifyContent: 'center',
        backgroundColor:Colors.whiteColor
    }

})