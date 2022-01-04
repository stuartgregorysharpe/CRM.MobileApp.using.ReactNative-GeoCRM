import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { baseURL } from '../constants';
import { PRIMARY_COLOR } from '../constants/Colors';
import { Login } from '../actions/auth.action';
import { CHANGE_LOGIN_STATUS } from '../actions/actionTypes';

export default function SignIn() {
  const dispatch = useDispatch();
  const loginStatus = useSelector(state => state.auth.loginStatus);

  const [email, setEmail] = useState('carl@cydcor.com');
  const [password, setPassword] = useState('Test2021#');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [step, setStep] = useState(false);
  const [isPassword, setIsPassword] = useState(true);

  const passwordInput = useRef();

  useEffect(() => {
    if (loginStatus == "failed") {
      setPasswordError(true);
    }
  }, [loginStatus])

  const handleNext = () => {
    if (email == '') {
      setEmailError(true);
      return;
    }
    dispatch({ type: CHANGE_LOGIN_STATUS, payload: "pending" });
    axios
      .post(`${baseURL}/authentication_api/Auth/check_aad_login`, { email })
      .then((res) => {
        if (res.data.success.allow_aad_login == 0) {
          setStep(true);
          passwordInput.current.focus()
          dispatch({ type: CHANGE_LOGIN_STATUS, payload: "logout" });
        }
      })
      .catch((err) => {
        console.log(err);
        setEmailError(true);
      });
  }

  const handleSubmit = () => {
    if (email == '') {
      setEmailError(true);
      return;
    }
    if (password == '') {
      setPasswordError(true);
      return;
    }
    dispatch({ type: CHANGE_LOGIN_STATUS, payload: "pending" });
    dispatch(Login(email, password));
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
            label={<Text style={{ backgroundColor: PRIMARY_COLOR }}>Email</Text>}
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
        {step && <View style={styles.textInputBox}>
          <TextInput
            style={styles.textInput}
            ref={passwordInput}
            label={<Text style={{ backgroundColor: PRIMARY_COLOR }}>Password</Text>}
            mode="outlined"
            outlineColor="#fff"
            activeOutlineColor="#fff"
            value={password}
            secureTextEntry={isPassword ? true : false}
            onChangeText={text => {
              setPassword(text);
              setPasswordError(false);
            }}
            theme={{ colors: { text: '#fff', placeholder: '#fff' } }}
          />
          <Icon
            style={styles.eyeIcon}
            name={isPassword ? `visibility-off` : `visibility`}
            size={25}
            color="#fff"
            onPress={() => setIsPassword(!isPassword)}
          />
          {passwordError && <Text style={styles.errorText}>Please Input Password</Text>}
        </View>}
        <TouchableOpacity style={styles.submitButton} onPress={step ? handleSubmit : handleNext}>
          <Text style={[styles.submitButtonText]}>
            {loginStatus == "pending" ? "Loading..." : step ? `Sign In` : `Next` }
          </Text>
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
    width: 250,
    height: 62,
    marginBottom: 8
  },
  title: {
    color: '#fff',
    fontSize: 24
  },
  textInputBox: {
    position: 'relative',
    marginTop: 12,
  },
  textInput: {
    height: 40,
    fontSize: 14,
    lineHeight: 30,
    backgroundColor: 'transparent',
    fontFamily: 'Gilroy-Medium',
    marginBottom: 8
  },
  eyeIcon: {
    position: 'absolute',
    top: 14,
    right: 8
  },
  submitButton: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 24,
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
    color: 'red',
    textAlign: 'center'
  }
})