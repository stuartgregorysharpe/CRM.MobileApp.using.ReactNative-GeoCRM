import { View, Text } from 'react-native'
import React from 'react'

export default function PrimaryContactFields() {
  return (
    
    <View>
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
            
        </View>

  )
}