import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Platform} from 'react-native';
import Fonts from '../../../../constants/Fonts';
import {TextInput} from 'react-native-paper';
import SvgIcon from '../../../../components/SvgIcon';
import Colors, {whiteLabel} from '../../../../constants/Colors';
import {getBaseUrl, getToken, getUserData} from '../../../../constants/Storage';
import {
  getSupportIssues,  
} from '../../../../actions/support.action';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {
  expireToken,
  getPostParameter,  
} from '../../../../constants/Helper';
import {useDispatch, useSelector} from 'react-redux';
import {generateKey} from '../../../../constants/Utils';
import { PostRequestDAO } from '../../../../DAO';
import { Strings } from '../../../../constants';
import { AppText } from '../../../../components/common/AppText';
import CSingleSelectInput from '../../../../components/common/SelectInput/CSingleSelectInput';
import AlertModal from '../../../../components/modal/AlertModal';
import LoadingBar from '../../../../components/LoadingView/loading_bar';

var ticket_indempotency = '';

export const Ticket = forwardRef((props, ref) => {

  const dispatch = useDispatch();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const emailRef = useRef();
  const alertModalRef = useRef();
  const loadingBarRef = useRef();
  const [email, setEmail] = useState('');
  const [universalUserId, setUniversalUserId] = useState('');
  const [universalClientId, setUniversalClientId] = useState('');
  const [userName, setUserName] = useState('');  
  const [supportIssues, setSupportIssues] = useState([]);
  const [issue, setIssue] = useState('');
  const [issueDetails, setIssueDetails] = useState('');
  const [issueImage, setIssueImage] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  useImperativeHandle(ref, () => ({
    callPostSupport() {
      postdata();
    },
  }));

  useEffect(() => {
    initView();
    loadSupportItems();
    ticket_indempotency = generateKey();
  }, []);
  
  const initView = async () => {
    var userData = await getUserData();
    if (userData) {
      setEmail(userData.user_email);
      setUniversalClientId(userData.universal_client_id);
      setUniversalUserId(userData.universal_user_id);
      setUserName(userData.user_name);
    }
  };

  const loadSupportItems = async () => {

    var base_url = await getBaseUrl();
    var token = await getToken();
    if (base_url != null && token != null) {
      let params = {};

      getSupportIssues(base_url, token, params)
        .then(res => {
          console.log("resss", res)
          if(res != undefined){
            var issues = [];
            res.forEach(element => {
              issues.push({label: element, value: element});              
            });
            setSupportIssues(issues);
          }
        })
        .catch(error => {
          expireToken(dispatch, error);
        });
    }
  };


  const isValidate = useCallback((issue, issueDetails) => {
      var e = {}
      var flag = true;
      if(issue == '' || issue == null){
        e = { issue : true };
        flag = false;
      }
      if(issueDetails == '' || issueDetails == null){
        e = {
          ...e,
          issueDetails : true
        }
        flag = false;
      }
      console.log("changed e", e)
      setErrors(e);
      return flag;      
    }, [issue , issueDetails]); 

  const postdata = async () => {

    if(isSubmit){
      return;
    }    

    if(isValidate(issue, issueDetails)){
      
        showLoadingBar();
        var userParam = getPostParameter(currentLocation);
        let params = {
          indempotency_key: generateKey(),
          user_email: email,
          user_name: userName,
          user_cell: '+27 0811231234',
          app_version: '1.1.2',
          device_model: 'Galaxy A32',
          universal_user_id: universalUserId,
          universal_client_id: universalClientId,
          selected_issue: issue,
          issue_details: issueDetails,
          issue_image: issueImage,
          user_local_data: userParam.user_local_data,
        };
  
        setIsSubmit(true);
        
        PostRequestDAO.find(0 , params, 'supportmail' , 'supportmail', '' , '' , ticket_indempotency  , null ).then((res) => {
          setIssue('');
          setIssueDetails('');
          setIsSubmit(false);
          hideLoadingBar();
          showMessage(res.message);
        }).catch((e) => {
          setIsSubmit(false);       
          hideLoadingBar();
          expireToken(dispatch, e , alertModalRef);
        });  
      
    }      
  };

  const launchImageLibrary = index => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (response.assets != null && response.assets.length > 0) {
          convertBase64(response.assets[0].uri);
        }
      }
    });
  };

  const convertBase64 = async path => {
    var data = await RNFS.readFile(path, 'base64').then(res => {
      return res;
    });    
    setIssueImage(data);
  };

  const showLoadingBar = () => {
    if(loadingBarRef.current){
      loadingBarRef.current.showModal();
    }
  }
  const hideLoadingBar = () => {
    if(loadingBarRef.current){
      loadingBarRef.current.hideModal();
    }
  }
  const showMessage = (message) => {
    const delay = Platform.OS == 'ios' ? 500 : 0;
    setTimeout(() => {
      alertModalRef.current.alert(message);
    }, delay);
  }

  return (
    <View>
      
      <AlertModal ref={alertModalRef}/>

      <LoadingBar ref={loadingBarRef}/>

      <AppText style={styles.description} title={Strings.Ticket_Description}></AppText>

      <TouchableOpacity
        style={{width: '100%'}}
        activeOpacity={1}
        onPress={() => emailRef.current.focus()}>
        <View>
          <TextInput
            ref={emailRef}
            style={styles.textInput}
            label="Email"
            mode="outlined"
            outlineColor={whiteLabel().fieldBorder}
            activeOutlineColor={Colors.disabledColor}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
      </TouchableOpacity>

      <CSingleSelectInput        
        description={'Issue'}
        placeholder={'Select Issue'}
        checkedValue={issue}
        items={supportIssues}
        hasError={errors?.issue}
        mode={'single'}
        onPress={() => {          
        }}
        onClear={() => {                    
          setIssue('');
        }}
        onSelectItem={ item => {            
          setIssue(item.value);
          isValidate(item.value, issueDetails);
        }}
        containerStyle={{marginBottom: 3}}        
      />
     
      <TextInput
        style={styles.textArea}
        mode="outlined"
        outlineColor={ errors?.issueDetails ? Colors.redColor : whiteLabel().fieldBorder}
        activeOutlineColor={Colors.disabledColor}
        placeholder="Issue details can be entered here..."
        multiline={true}
        value={issueDetails}
        returnKeyType="done"
        onChangeText={text => {
          setIssueDetails(text);
          isValidate(issue, text);
        }}
        numberOfLines={4}
      />

      <TouchableOpacity
        style={styles.downloadButton}
        onPress={() => {
          launchImageLibrary();
        }}>
        <Text style={styles.downloadText}>Upload Image</Text>
        <SvgIcon icon="File_Download" width="18px" height="18px" />
      </TouchableOpacity>
     
    </View>
  );
});

const styles = StyleSheet.create({

  description: {
    fontSize: 16,
    fontFamily: Fonts.primaryBold,    
    paddingTop: 10,
    marginBottom: 20,
  },

  textInput: {
    height: 38,
    fontSize: 14,
    paddingLeft:0,
    lineHeight: 30,
    backgroundColor: Colors.bgColor,
    fontFamily: Fonts.secondaryMedium,
    marginBottom: 8,
  },

  textArea: {    
    fontSize: 14,
    lineHeight: 30,
    backgroundColor: Colors.bgColor,
    fontFamily: Fonts.secondaryMedium,
    marginBottom: 20,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: whiteLabel().actionOutlineButtonBorder,
    borderWidth: 1,
    width: 140,
    padding: 4,
    borderRadius: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 12,
  },

  downloadText: {
    fontSize: 13,
    fontFamily: Fonts.primaryMedium,
    color: whiteLabel().actionOutlineButtonText,
  },

  
});
