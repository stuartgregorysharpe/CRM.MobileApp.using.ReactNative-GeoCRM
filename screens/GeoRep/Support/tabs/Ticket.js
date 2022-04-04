
import React, { useRef, useState, useEffect, forwardRef , useImperativeHandle } from 'react';
import {View,StyleSheet, ScrollView, TouchableOpacity, Text, Platform, ToastAndroid , AlertIOS  } from 'react-native';
import Fonts from '../../../../constants/Fonts';
import {  Modal, Portal, TextInput } from 'react-native-paper';
import SvgIcon from '../../../../components/SvgIcon';
import { BG_COLOR, DISABLED_COLOR, PRIMARY_COLOR, whiteLabel } from '../../../../constants/Colors';
import { getBaseUrl, getToken, getUserData } from '../../../../constants/Storage';
import { getSupportIssues, postSupportEmail } from '../../../../actions/support.action';
import uuid from 'react-native-uuid';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { expireToken, getPostParameter, notifyMessage } from '../../../../constants/Consts';
import SelectionPicker from '../../../../components/modal/SelectionPicker';
import { Notification } from '../../../../components/modal/Notification';
import { useDispatch ,useSelector} from 'react-redux';

export const Ticket = forwardRef((props, ref) => {

    const dispatch = useDispatch()
    const currentLocation = useSelector(state => state.rep.currentLocation);
    const emailRef = useRef();
    const [email, setEmail] = useState('');
    const [universalUserId, setUniversalUserId] = useState("");
    const [universalClientId, setUniversalClientId] = useState("");
    const [userName, setUserName] = useState("");
    const [modaVisible, setModalVisible] = useState(false);    
    const [supportIssues, setSupportIssues] = useState([]);
    const [issue, setIssue] = useState('');
    const [issueDetails, setIssueDetails] = useState('');
    const [issueImage, setIssueImage] = useState('');
        
    useImperativeHandle(
        ref,
        () => ({
            callPostSupport(){
                postdata();
            }
        })       
    )

    useEffect(() => {        
        initView();
        loadSupportItems();
    }, []);
    
    const selectItem = (text) => {
      setModalVisible(false);
      setIssue(text);
    }    
    
    const initView = async () =>{
        var userData = await getUserData();        
        if(userData){
            setEmail(userData.user_email);
            setUniversalClientId(userData.universal_client_id);
            setUniversalUserId(userData.universal_user_id);
            setUserName(userData.user_name);
        }            
    }

    const loadSupportItems = async() =>{    
        var base_url = await getBaseUrl();
        var token = await getToken();
        if(base_url != null && token != null){
            let params = {};      
            getSupportIssues(base_url, token,  params)
            .then(res => {        
                setSupportIssues(res);                
            })
            .catch(error=>{    
              expireToken(dispatch, error);            
            });
        }   
    }

    const postdata = async() =>{    
        if(issue != '' && issueDetails != ''){
          var userParam = getPostParameter(currentLocation);
          let params = {
            "indempotency_key":uuid.v4(),
            "user_email": email,
            "user_name": userName,
            "user_cell": "+27 0811231234",
            "app_version": "1.1.2",
            "device_model": "Galaxy A32",
            "universal_user_id": universalUserId,
            "universal_client_id": universalClientId,
            "selected_issue": issue,
            "issue_details": issueDetails,
            "issue_image": issueImage,
            "user_local_data" : userParam.user_local_data
          };
                    
          postSupportEmail(params)
          .then((res) =>{
            if(res.status == 'success'){
                notifyMessage("Success","");                    
            }else{
                notifyMessage("Failed","");
            }
          })
          .catch((e) =>{
            expireToken(dispatch, e);
          })
        }
    }
        
    const launchImageLibrary = (index) => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary (options, (response)  => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);        
          } else {                                                  
            if(response.assets != null && response.assets.length > 0){                            
                convertBase64(response.assets[0].uri);
            }
          }
        });  
    }

    const convertBase64 = async (path) => {
        var data = await RNFS.readFile( path , 'base64').then(res => { return res });
        console.log("base 64", data);
        setIssueImage(data);
    }

    

    return (
      <View>
        <Notification></Notification>
        <Text style={styles.description}>
          Please fill in the above fields and upload any relevant screenshots that could help identify the problem your experiencing.
        </Text>
        <TouchableOpacity
          style={{ width: '100%' }}
          activeOpacity={1}
          onPress={() => emailRef.current.focus()}
        >
          <View>
            <TextInput
              ref = {emailRef}
              style={styles.textInput}
              label="Email"
              mode="outlined"
              outlineColor={whiteLabel().fieldBorder}
              activeOutlineColor={DISABLED_COLOR}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: '100%' }}
          activeOpacity={1}
          onPress={() => setModalVisible(true)}>
            
          <View pointerEvents="none">
            <TextInput
              style={styles.textInput}
              label={issue == '' ? "Select Issue" : issue}
              mode="outlined"
              outlineColor={whiteLabel().fieldBorder}
              activeOutlineColor={DISABLED_COLOR}
            />
            <SvgIcon style={styles.pickerIcon} icon="Drop_Down" width='23px' height='23px' />
          </View>
        </TouchableOpacity>
        
        <TextInput
          style={styles.textArea}
          mode="outlined"
          outlineColor={whiteLabel().fieldBorder}
          activeOutlineColor={DISABLED_COLOR}
          placeholder="Issue details can be entered here..."
          multiline={true}
          value={issueDetails}
          returnKeyType="done" 
          onChangeText={text => setIssueDetails(text)}
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.downloadButton} onPress={() =>{
            launchImageLibrary();
        }}>
          <Text style={styles.downloadText}>Upload Image</Text>
          <SvgIcon icon="File_Download" width='18px' height='18px' />
        </TouchableOpacity>


        <SelectionPicker
          title="Please select an option"
          clearTitle={"Close"}
          mode={"single"}
          value={issue}
          visible={modaVisible}
          options={supportIssues}
          onModalClose={() =>{setModalVisible(false)}}          
          onValueChanged={(item, index) => {
            setIssue(item);            
            setModalVisible(false);
          }}
        >

        </SelectionPicker>
        {/* <Portal>
          <Modal visible={modaVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.pickerItemBox}>
            {supportIssues.map((item, index) => (
                <TouchableOpacity key={index} style={styles.pickerItem} onPress={selectItem.bind(null, item)}>
                <Text style={styles.pickerItemText}>{item}</Text>
                </TouchableOpacity>
            ))}
          </Modal>
        </Portal> */}


      </View>
    )
  })


  const styles = StyleSheet.create({
    description: {
        fontSize: 16,
        fontFamily: Fonts.primaryBold,
        color: '#000',
        paddingTop: 12,
        marginBottom: 20
    },
    textInput: {
        height: 40,
        fontSize: 14,
        lineHeight: 30,
        backgroundColor: BG_COLOR,
        fontFamily: Fonts.secondaryMedium,
        marginBottom: 8
    },
    textArea: {
        fontSize: 14,
        lineHeight: 30,
        backgroundColor: BG_COLOR,
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
        marginBottom: 12
    },
    
    downloadText: {
        fontSize: 13,
        fontFamily: Fonts.primaryMedium,
        color: whiteLabel().actionOutlineButtonText
    },

    pickerIcon: {
        position: 'absolute',
        top: 15,
        right: 8
    },

    pickerItemBox: {
        backgroundColor: BG_COLOR, 
        padding: 10
    },

    pickerItem: {
        padding: 10,
        borderRadius: 7,
        marginBottom: 8
    },
    pickerItemText: {
        fontSize: 16,
        fontFamily: Fonts.secondaryMedium
    },


  })