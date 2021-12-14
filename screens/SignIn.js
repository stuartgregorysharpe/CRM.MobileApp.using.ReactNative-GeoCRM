import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import PasswordInputText from 'react-native-hide-show-password-input';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import { PRIMARY_COLOR } from '../constants/Colors';
import { CHANGE_LOGIN_STATUS } from '../actions/actionTypes';

export default function SignIn({screenProps}) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [step, setStep] = useState(false);

  const handleSubmit = () => {
    if (email == '') {
      setEmailError(true);
      return;
    }
    if (password == '') {
      setPasswordError(true);
    }
    // setStep(true);
    // dispatch({type: CHANGE_LOGIN_STATUS, payload: true});
  }
  return (
    <SafeAreaView>
      <StatusBar translucent backgroundColor={PRIMARY_COLOR} />
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/images/logo.png")} />
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}>Geo Rep CRM</Text>
        <View style={styles.textInputBox}>
          <TextInput
            style={styles.textInput}
            label={<Text style={{backgroundColor: PRIMARY_COLOR}}>Email</Text>}
            mode="outlined"
            outlineColor="#fff"
            activeOutlineColor="#fff"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setEmailError(false);
            }}
            theme={{ colors: { text: '#fff', placeholder: '#fff' } }}
          />
          {emailError && <Text style={styles.errorText}>Please Input your email</Text>}
        </View>
        <PasswordInputText
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {!step && <View style={styles.textInputBox}>
          <TextInput
            style={styles.textInput}
            label={<Text style={{backgroundColor: PRIMARY_COLOR}}>Password</Text>}
            mode="outlined"
            outlineColor="#fff"
            activeOutlineColor="#fff"
            value={password}
            secureTextEntry={true}
            onChangeText={text => {
              setPassword(text);
              setPasswordError(false);
            }}
            theme={{ colors: { text: '#fff', placeholder: '#fff' } }}
          />
          {passwordError && <Text style={styles.errorText}>Please Input Password</Text>}
        </View>}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={[styles.submitButtonText]}>{step ? `Sign In` : `Next`}</Text>
          <FontAwesomeIcon style={styles.submitButtonIcon} size={25} color={PRIMARY_COLOR} icon={ faAngleDoubleRight } />
        </TouchableOpacity>
        {step && <TouchableOpacity onPress={() => console.log("pressed")}>
          <Text style={styles.linkText}>Forgot Password</Text>
        </TouchableOpacity>}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY_COLOR,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: 20
  },
  logo: {
    width: 240,
    height: 64,
    marginBottom: 8
  },
  title: {
    color: '#fff',
    fontSize: 24
  },
  textInputBox: {
    marginTop: 12,
    marginBottom: 24
  },
  textInput: {
    height: 40,
    fontSize: 14,
    lineHeight: 30,
    backgroundColor: 'transparent',
    fontFamily: 'Gilroy-Medium',
    marginBottom: 8
  },
  submitButton: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 24,
    borderRadius: 7,
    backgroundColor: '#fff'
  },
  submitButtonText: {
    color: PRIMARY_COLOR,
    fontSize: 15,
    fontFamily: 'Gilroy-Bold'
  },
  submitButtonIcon: {
    position: 'absolute',
    right: 10
  },
  linkText: {
    textAlign: 'center',
    color: '#fff'
  },
  errorText: {
    color: 'yellow',
    textAlign: 'center'
  }
})