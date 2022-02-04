

import React, { useState, useEffect , useRef, forwardRef ,useImperativeHandle } from 'react';
import { Text,  View, Image, TouchableOpacity, Keyboard, Dimensions, Platform , Animated ,StyleSheet} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { grayBackground, style } from '../../../constants/Styles';
import RefreshSlider from '../../../components/modal/RefreshSlider';
import SvgIcon from '../../../components/SvgIcon';
import {LocationInfoInput} from './LocationInfoInput';
import Divider from '../../../components/Divider';
import { PRIMARY_COLOR, BG_COLOR } from '../../../constants/Colors';
import { SLIDE_STATUS, LOCATION_CONFIRM_MODAL_VISIBLE, SUB_SLIDE_STATUS, LOCATION_ID_CHANGED } from '../../../actions/actionTypes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DeviceInfo from 'react-native-device-info';
import Images from '../../../constants/Images';
import LocationInfoInputTablet from './LocationInfoInputTablet';
import Fonts from '../../../constants/Fonts';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { postLocationImage } from '../../../actions/location.action';
import uuid from 'react-native-uuid';
import AlertDialog from '../../../components/modal/AlertDialog';
import UpdateCustomerInfo from './popup/UpdateCustomerInfo';


export const LocationInfoDetails = forwardRef(( props, ref ) => {

  const dispatch = useDispatch();  
  const [locationInfo, setLocationInfo] = useState(props.locInfo);  
  const statusDispositionInfo = useSelector(state => state.rep.statusDispositionInfo);
  const features = useSelector(state => state.selection.payload.user_scopes.geo_rep.features);    
  const subSlideStatus = useSelector(state => state.rep.subSlideStatus);
  const [showItem, setShowItem] = useState("refresh");   
  const [keyboardStatus, setKeyboardStatus] = useState(false);  
  const locationInfoRef = useRef();
  const [issueImage, setIssueImage] = useState('');
  const [filePath, setFilePath] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [bound, setBound] = useState(new Animated.Value(Dimensions.get("screen").height))

  console.log("locationInfo",locationInfo)
  useImperativeHandle(
    ref,
    () => ({
      closePopup() {        
        if(showItem !== "update_customer"){          
          props.clostDetailsPopup();
          dispatch({type: SLIDE_STATUS, payload: false});
          dispatch({type: LOCATION_ID_CHANGED, payload: 0})
        }else{        
          setShowItem("refresh");
        }        
      },
      goBack(){
        console.log("props", props);
        if(showItem !== "update_customer"){   
          props.goPreviousPage();
        }else{          
          setShowItem("refresh");
        }        
      }
    }),
    [showItem],
  );



  useEffect(() => { 
    dispatch({type: SUB_SLIDE_STATUS, payload: false});
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const showLoopSlider = () => {
    setShowItem("loop");
    dispatch({type: SUB_SLIDE_STATUS, payload: true});
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
            console.log("path", response.assets[0].uri);
            setFilePath(response.assets[0].uri);
            convertBase64(response.assets[0].uri);
        }
      }
    });
  }

  const convertBase64 = async (path) => {
    var data = await RNFS.readFile( path , 'base64').then(res => { return res });    
    setIssueImage(data);
    let postData = {
      location_id: locationInfo.location_id,
      location_image: data,
    };
    postLocationImage(postData, uuid.v4())
    .then((res) => {
        setMessage(res);
        setIsSuccess(true);
    })
    .catch((e) =>{
      setMessage(e);
      setIsSuccess(true);
    })
  }

  const openCustomerInfo = async() => {
    setShowItem("update_customer")
  }
  
  return (
    <View style={[styles.container, {flex:1}]}>

      <AlertDialog visible={isSuccess} message={message} onModalClose={() => {
        setIsSuccess(false);
      }} />
    
      { subSlideStatus && 
        <TouchableOpacity
          activeOpacity={1} 
          style={grayBackground}
          onPress={() => dispatch({type: SUB_SLIDE_STATUS, payload: false})}>            
        </TouchableOpacity>
      }

      { subSlideStatus && 
        <View style={[styles.transitionView, showItem == "refresh" ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]}>
          <RefreshSlider  location_id={locationInfo.location_id} />
        </View>
      }

      {
        showItem === "update_customer" &&
        <UpdateCustomerInfo location_id={locationInfo.location_id} onClose={() => {setShowItem("refresh")}} />      
      }
      

      <TouchableOpacity style={{ padding: 6 }} onPress={() => {
        if (statusDispositionInfo) {
          dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
          return;
        }
        dispatch({type: SLIDE_STATUS, payload: false});              
      }}>
        <Divider />
      </TouchableOpacity>
      
      <KeyboardAwareScrollView 
        enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}
        extraHeight={130}                
        behavior="padding" style={[styles.innerContainer, keyboardStatus ? {} : {marginBottom: (features && (features.includes("access_crm") || features.includes("checkin"))) ? 50 : 0}]}>

        <View style={styles.headerBox}>                    
          <View>
            <View style={[styles.subtitleBox]}>
              <SvgIcon style={styles.fontIcon} icon="Person_Sharp" width='14px' height='16px' />              
              <Text style={{color:PRIMARY_COLOR, fontFamily:Fonts.secondaryMedium , marginLeft:5, fontSize:12}} >Customer Name</Text>
            </View>
          </View>
          <View style={styles.subtitleBox}>
            <SvgIcon style={styles.fontIcon} icon="Green_Star" width='22px' height='22px' />
            <Text style={styles.dateText}>Visited Recently: {locationInfo? locationInfo.last_visit: ''}</Text>
          </View>
        </View>
        
        <TouchableOpacity onPress={() => { openCustomerInfo() }} >
          <View style={[styles.headerBox, {marginTop:0}]}>
            <Text style={styles.title}> { locationInfo &&  locationInfo.location_name ? locationInfo.location_name.value : ''}</Text>
          </View>
        </TouchableOpacity>
        
        
        <View style={styles.headerBox}>
          <View style={styles.addressText}>
            <View style={styles.subtitleBox}>
              <SvgIcon style={styles.fontIcon} icon="Location_Arrow" width='16px' height='16px' />
              <Text style={styles.subtitle}>Address</Text>
            </View>
            <TouchableOpacity onPress={() => { openCustomerInfo() }} >
              <Text style={[styles.title, {marginTop:3}]}>{locationInfo ? locationInfo.address : ''}</Text>
            </TouchableOpacity>            
          </View>

          <View style={styles.walmartImageBox}>          
            {
              locationInfo.location_image !== "" &&
              <Image style={styles.walmartImage}  source={{uri:locationInfo.location_image}} />
            }
            {
              locationInfo.location_image === "" &&
              <TouchableOpacity onPress={() => {
                  launchImageLibrary();
              }}>
                {
                  filePath  !== '' && 
                  <Image style={styles.walmartImage}  source={{uri:filePath}} />
                }
                {
                  filePath === '' &&
                  <SvgIcon style={styles.fontIcon} icon="Add_Image" width={DeviceInfo.isTablet() ? '150px': '90px'} height={DeviceInfo.isTablet() ? '30px': '80px'} />
                }                
              </TouchableOpacity>              
            }
          </View>
        </View>    

        <View style={{padding:10, marginBottom:50}}>
        {        
          locationInfo && DeviceInfo.isTablet()?
          <LocationInfoInputTablet ref={locationInfoRef}  infoInput={locationInfo} showLoopSlider={showLoopSlider} /> :
          <LocationInfoInput ref={locationInfoRef} infoInput={locationInfo} showLoopSlider={showLoopSlider} />  
        }
        </View>                                              
      </KeyboardAwareScrollView>
      
      {features && (features.includes("access_crm") || features.includes("checkin")) && !keyboardStatus && 
        <View style={styles.nextButtonBar}>        
          {features && features.includes("access_crm") && <TouchableOpacity style={[styles.nextButton, styles.accessButton]} onPress={() => {          
            props.navigation.navigate("LocationSpecificInfo" , {"data": locationInfo });
          }}>
            <Text style={styles.nextButtonText}>Access CRM</Text>
            <FontAwesomeIcon size={22} color={PRIMARY_COLOR} icon={ faAngleDoubleRight } />
          </TouchableOpacity>
          }
          {features && features.includes("checkin") && <TouchableOpacity style={[styles.nextButton, styles.checkInButton]} onPress={() => {          
            props.navigation.navigate("LocationSpecificInfo" , {"data": locationInfo });
            }}>

            <Text style={[styles.checkInButtonText]}>Check In</Text>
            <FontAwesomeIcon size={22} color="#fff" icon={ faAngleDoubleRight } />
          </TouchableOpacity>
          }
      </View>
      }
      
      {
        showItem !== "update_customer" &&
        <TouchableOpacity style={[style.plusButton, {marginBottom:80}]} onPress={() => {
                if(!subSlideStatus){
                    locationInfoRef.current.postDispositionData();
                }
              }}>
          <SvgIcon icon="DISPOSITION_POST" width='70px' height='70px' />
        </TouchableOpacity> 
      }
      
    </View>
  )

});

const styles = StyleSheet.create({

  
  container: {      
    backgroundColor: BG_COLOR,          
  },
  innerContainer: {
    backgroundColor: BG_COLOR,
    padding: 10,
  },
  headerBox: {    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingLeft:10,
    paddingRight:10
  },

  subtitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 4,
  },
  subtitle: {
    color: PRIMARY_COLOR,
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Gilroy-Medium',
  },
  dateText: {
    color: '#0AD10A',
    fontSize: 12,
    fontFamily: 'Gilroy-Medium',
  },
  title: {
    fontSize: 14,
    color: '#000',
    fontFamily: Fonts.secondaryBold,
    lineHeight: 20
  },
  addressText: {
    flex:1
  },

  walmartImageBox: {    
    alignItems: 'flex-end',    
  },
  walmartImage: {
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 7,
    width:Dimensions.get("screen").width / 4.5,
    height:Dimensions.get("screen").width / 4.5
  },

  nextButtonBar: {        
    position:'absolute',
    bottom:0,
    backgroundColor:"#FFF",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: DeviceInfo.isTablet() ? 20 : 15,
    paddingLeft: DeviceInfo.isTablet() ? 20 : 15,    
    paddingRight: DeviceInfo.isTablet() ? 20 : 15,   
    width:Dimensions.get("screen").width,      
    paddingBottom: DeviceInfo.isTablet() ? 20 : 5,    
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderTopWidth: 0.5,    

  },
  nextButton: {
    width: '47%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 7,
  },
  nextButtonText: {
    color: PRIMARY_COLOR,
    fontSize: 15,
    fontFamily: 'Gilroy-Bold'
  },
  checkInButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Gilroy-Bold'
  },
  fontIcon: {
    marginRight: 4
  },
  checkInButton: {
    backgroundColor: PRIMARY_COLOR,
  },
  
  transitionView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: BG_COLOR,    
    elevation: 2,
    zIndex: 2,
    padding: 10,
  },


});
