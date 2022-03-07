import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { baseURL } from '../constants';
import { PRIMARY_COLOR, whiteLabel } from '../constants/Colors';
import { Login } from '../actions/auth.action';
import { CHANGE_LOGIN_STATUS ,
  CHANGE_USER_INFO, 
  CHANGE_PROJECT_PAYLOAD,
  CHANGE_ACCESS_TOKEN,   
  MAP_FILTERS} from '../actions/actionTypes';
import Fonts from '../constants/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getCurrentDate, getFilterData, getToken, getUserData, storeCurrentDate, storeLocationLoop } from '../constants/Storage';
import jwt_decode from "jwt-decode";
import {displayName} from "../app.json";

export default function SignIn() {
  const dispatch = useDispatch();
  const loginStatus = useSelector(state => state.auth.loginStatus);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [step, setStep] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const emailRef = useRef();
  const passwordInput = useRef();

  //clinton@cydcor.com / Test2021#
  useEffect(() => {  
    initView();    
    if (loginStatus == "failed") {
      setPasswordError(true);
    }

  }, [loginStatus])

  const initView = async () =>{    

    var date = new Date().getDate();
    var month = new Date().getMonth();
    var current = await getCurrentDate();    
    if(current !== month.toString() + date.toString()){
      await storeLocationLoop([]);
    }

    var token = await getToken();
    var filters = await getFilterData();
    if(token != null){
      var userData = await getUserData();
      console.log("login userData ", userData);      
      dispatch({ type: MAP_FILTERS, payload: filters });
      dispatch({ type: CHANGE_USER_INFO, payload: userData });
      dispatch({ type: CHANGE_ACCESS_TOKEN, payload: token });
      dispatch({ type: CHANGE_PROJECT_PAYLOAD, payload: jwt_decode(token) })
      dispatch({ type: CHANGE_LOGIN_STATUS, payload: "success" });
    }
        
  }

  const handleNext = () => {
    if (email == '') {
      setEmailError(true);
      return;
    }
    console.log("login url", `${baseURL}/authentication_api/Auth/check_aad_login`);
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
    <SafeAreaView style={{flex:1}}>
      <KeyboardAwareScrollView 
        keyboardShouldPersistTaps={'always'}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 , flex:1 }} 
        enableOnAndroid={true}
        ref={emailRef}
        enableAutomaticScroll={(Platform.OS === 'ios')}
        extraHeight={140}
        //extraScrollHeight={140}
        behavior="padding" style={{flex:1}}>
    
      <StatusBar translucent backgroundColor={whiteLabel().headerBackground} />
      <View style={styles.container}>
        
        <Image style={styles.logo} source={require("../assets/images/signIn_logo.png")} />
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}>{displayName}</Text>

        <View style={styles.textInputBox} >
          <TextInput
            style={styles.textInput}
            label={<Text style={{ backgroundColor: whiteLabel().headerBackground }}>Email</Text>}
            mode="outlined"
            outlineColor="#fff"
            activeOutlineColor="#fff"
            value={email}            
            onFocus={() => {               
            }}
            onSubmitEditing={()=>{
              handleNext();
              console.log("submit");
            }}
            returnKeyType="next"
            keyboardType="email-address"
            onChangeText={text => {
              console.log("change");
              setEmail(text);
              setEmailError(false);
            }}
            theme={{ colors: { text: '#fff', placeholder: '#fff' } }}
          />
          {emailError && <Text style={styles.errorText}>Please Input your email</Text>}
        </View>
        {step && <View style={styles.textInputBox}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={[styles.textInput, { flex:1}]}
            ref={passwordInput}
            label={<Text style={{ backgroundColor: whiteLabel().headerBackground }}>Password</Text>}
            mode="outlined"
            outlineColor="#fff"
            activeOutlineColor="#fff"
            value={password}
            secureTextEntry={isPassword ? true : false}
            returnKeyType="done"            
              onSubmitEditing={()=>{
                handleSubmit();
              }}
            onChangeText={text => {
              setPassword(text);
              setPasswordError(false);
            }}
            theme={{ colors: { text: '#fff', placeholder: '#fff' } }}
          />

          <TouchableOpacity style={[styles.eyeIcon, {  }]} onPress={() => {
              setIsPassword(!isPassword)          
            }}> 
          <Icon
            name={!isPassword ? `visibility-off` : `visibility`}
            size={25}
            color="#fff"
            onPress={() => setIsPassword(!isPassword)}
          />
          </TouchableOpacity>   
          </View>

          {passwordError && <Text style={styles.errorText}>Please Input Password</Text>}
        </View>}
        
                <TouchableOpacity style={styles.submitButton} onPress={step ? handleSubmit : handleNext}>
          <Text style={[styles.submitButtonText]}>
            {loginStatus == "pending" ? "Loading..." : step ? `Sign In` : `Next` }
          </Text>
          <FontAwesomeIcon style={styles.submitButtonIcon} size={25} color={whiteLabel().signInButtonIcon} icon={ faAngleDoubleRight } />
        </TouchableOpacity>
        {step && <TouchableOpacity onPress={() => {}}>
          <Text style={styles.linkText}>Forgot Password</Text>
        </TouchableOpacity>}
      </View>      
    </KeyboardAwareScrollView>  
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteLabel().headerBackground,    
    justifyContent: 'center',  
    padding: 25,
    flex:1,
  },

  logo: {
    width: 250,
    height: 200,
    resizeMode: "contain",
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
    fontFamily: Fonts.secondaryMediumMedium,
    marginBottom: 8
  },

  eyeIcon: {
    position: 'absolute',
    top: 4,
    right: 8,
    padding:10,
    zIndex:101
  },


  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    marginBottom: 24,
    borderRadius: 7,
    backgroundColor: whiteLabel().signInButtonBackground,
    marginBottom:10
  },
  
  submitButtonText: {
    color: whiteLabel().signInButtonText,
    fontSize: 15,
    fontFamily: Fonts.secondaryBold
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