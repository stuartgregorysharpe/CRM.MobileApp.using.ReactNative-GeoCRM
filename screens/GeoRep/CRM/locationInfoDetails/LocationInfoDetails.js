import React, { useState, useEffect , useRef, forwardRef ,useImperativeHandle } from 'react';
import { Text,  View, Image, TouchableOpacity, Keyboard, Dimensions, Platform , Animated ,StyleSheet , Alert} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { grayBackground, style } from '../../../../constants/Styles';
import RefreshSlider from '../../../../components/modal/RefreshSlider';
import SvgIcon from '../../../../components/SvgIcon';
import {LocationInfoInput} from './LocationInfoInput';
import Divider from '../../../../components/Divider';
import { PRIMARY_COLOR, BG_COLOR, whiteLabel } from '../../../../constants/Colors';
import { SLIDE_STATUS, LOCATION_CONFIRM_MODAL_VISIBLE, SUB_SLIDE_STATUS, LOCATION_ID_CHANGED } from '../../../../actions/actionTypes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DeviceInfo from 'react-native-device-info';
import {LocationInfoInputTablet} from './LocationInfoInputTablet';
import Fonts from '../../../../constants/Fonts';
import * as ImagePicker from 'react-native-image-picker'; 
import RNFS from 'react-native-fs';
import { postLocationImage } from '../../../../actions/location.action';
import uuid from 'react-native-uuid';
import AlertDialog from '../../../../components/modal/AlertDialog';
import UpdateCustomerInfo from '../popup/UpdateCustomerInfo';
import { NextPrev } from '../partial/NextPrev';
import WazeNavigation from './WazeNavigation';
import LocationInfoPlaceHolder from './LocationInfoPlaceHolder';


export const LocationInfoDetails = forwardRef(( props, ref ) => {

  const dispatch = useDispatch();  
  const [locationInfo, setLocationInfo] = useState(props.locInfo);    
  const statusDispositionInfo = useSelector(state => state.rep.statusDispositionInfo);
  const features = useSelector(state => state.selection.payload.user_scopes.geo_rep.features);    
  const subSlideStatus = useSelector(state => state.rep.subSlideStatus);
  const [showItem, setShowItem] = useState("refresh");   
  const [keyboardStatus, setKeyboardStatus] = useState(false);  
  const locationInfoRef = useRef();  
  const [filePath, setFilePath] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [bound, setBound] = useState(new Animated.Value(Dimensions.get("screen").height));
  const [isLoading,setIsLoading] = useState(true);

  useImperativeHandle(
    ref,
    () => ({
      closePopup() {        
        if(showItem !== "update_customer"){          
          props.clostDetailsPopup();
          dispatch({type: SLIDE_STATUS, payload: false});
          dispatch({type: LOCATION_ID_CHANGED, payload: {value:0, type:0}})
        }else{        
          setShowItem("refresh");
        }
      },
      goBack(){        
        if(showItem !== "update_customer"){   
          props.goPreviousPage();
        }else{          
          setShowItem("refresh");
        }        
      },
      updateView(res){ 
        if(locationInfoRef.current !== undefined){                    
          locationInfoRef.current.updateDispositionData(res);        
        }
        setLocationInfo(res);
        setIsLoading(false);               
        
      }
    }),
    [showItem],
  );

  useEffect(()=>{

  },[locationInfo]);

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

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary (options, (response)  => {      
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);        
      } else {                                                  
        if(response.assets != null && response.assets.length > 0){            
            setFilePath(response.assets[0].uri);
            updateLocationImage(response.assets[0].uri);
        }
      }
    });
  }
  
  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {        
        if(response.assets != null && response.assets.length > 0){            
          setFilePath(response.assets[0].uri);
          updateLocationImage(response.assets[0].uri);
        }
        
      }
    });

  }

  selectPicker = (title, description) => {
    return Alert.alert(
      title,
      description,
      [
        // The "Yes" button
        {
          text: "Gallery",
          onPress: () => {
            launchImageLibrary();
          },
        },
        // The "No" button        
        {
          text: "Camera",
          onPress: () => {
            launchCamera();
          }
        },
      ]
    );
}

  
  const updateLocationImage = async (path) => {
    var data = await RNFS.readFile( path , 'base64').then(res => { return res });    
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
        <UpdateCustomerInfo location_id={locationInfo.location_id} 
          onClose={() => { 
              console.log("propos ---", props);
              props.refreshLocationInfo(locationInfo.location_id);
              setShowItem("refresh");
          }} />      
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

        {
          isLoading && (locationInfo === undefined || locationInfo.address !== undefined || locationInfo.address === "") &&        
          <LocationInfoPlaceHolder locationInfo={locationInfo} ></LocationInfoPlaceHolder>
        }

        {
          !isLoading && 
          <View>
             <View style={styles.headerBox}>                    

                {
                  locationInfo !== undefined && locationInfo.location_name !== "" && 
                  <View>                        
                    <View style={[styles.subtitleBox]}>
                      <SvgIcon style={styles.fontIcon} icon="Person_Sharp" width='14px' height='16px' />              
                      <Text style={{color:whiteLabel().mainText, fontFamily:Fonts.secondaryMedium , marginLeft:5, fontSize:12}} >Customer Name</Text>
                    </View>
                  </View>
                }                  
                {
                  /*locationInfo !== undefined && locationInfo.last_visit !== "" &&
                  <View style={styles.subtitleBox}>
                    <SvgIcon style={styles.fontIcon} icon="Green_Star" width='22px' height='22px' />
                    <Text style={styles.dateText}>Visited Recently: {locationInfo? locationInfo.last_visit: ''}</Text>
                  </View>*/
                }              
                </View>

                {
                locationInfo !== undefined &&   locationInfo.location_name !== "" && 
                <TouchableOpacity onPress={() => { openCustomerInfo() }} >
                  <View style={[styles.headerBox, {marginTop:0}]}>
                    <Text style={styles.title}> {  locationInfo.location_name.value }</Text>
                  </View>
                </TouchableOpacity>
                }     

                <View style={styles.headerBox}>
                <View style={styles.addressText}>

                  {
                    locationInfo !== undefined && locationInfo.address !== "" &&
                    <View style={styles.subtitleBox}>
                      <SvgIcon style={styles.fontIcon} icon="Location_Arrow" width='16px' height='16px' />
                      <Text style={styles.subtitle}>Address</Text>
                    </View>
                  }                      
                  {
                    locationInfo !== undefined && locationInfo.address !==  "" &&
                    <TouchableOpacity onPress={() => { openCustomerInfo() }} >
                      <Text style={[styles.title, {marginTop:3}]}>{locationInfo ? locationInfo.address : ''}</Text>
                    </TouchableOpacity>            
                  }                
                </View>


                {
                  locationInfo !== undefined && locationInfo.address !==  "" &&
                  <View style={styles.walmartImageBox}>          
                      {
                        locationInfo.location_image !== "" &&
                        <Image style={styles.walmartImage}  source={{uri:locationInfo.location_image}} />
                      }
                      {
                        locationInfo.location_image === "" &&
                        <TouchableOpacity onPress={() => {
                            selectPicker("Upload or capture an image:", "");
                            
                        }}>
                          {
                            filePath  !== '' && 
                            <Image style={styles.walmartImage}  source={{uri:filePath}} />
                          }
                          {
                            filePath === '' &&
                            <SvgIcon style={styles.fontIcon} icon={"Add_Image"} width={DeviceInfo.isTablet() ? '150px': '90px'} height={DeviceInfo.isTablet() ? '130px': '80px'} />
                          }                
                        </TouchableOpacity>              
                      }
                  </View>
                }          
                </View>

                {
                locationInfo !== undefined && locationInfo.location_id !== "" && locationInfo.address !== "" && !(props.pageType.name === "camera" && props.pageType.type !== 2) && 
                  <NextPrev 
                    onStart={() =>{
                      setLocationInfo(undefined);
                      setIsLoading(true);
                    }}
                    onUpdated={(res) =>{
                      setIsLoading(false);
                      setFilePath('');
                      setLocationInfo(res);
                      if(locationInfoRef.current !== undefined){
                        locationInfoRef.current.updateDispositionData(res);                
                      }        
                    }}
                    currentLocation={props.currentLocation}
                    pageType={props.pageType} locationInfo={locationInfo} > </NextPrev>
                }

                <View style={{padding:10}}>
                {        
                locationInfo !== undefined && locationInfo.address !== ""  && DeviceInfo.isTablet()?
                <LocationInfoInputTablet ref={locationInfoRef}  infoInput={locationInfo} showLoopSlider={showLoopSlider} /> :
                <LocationInfoInput ref={locationInfoRef} infoInput={locationInfo} showLoopSlider={showLoopSlider} />  
                }
                </View>                                              

                {
                locationInfo !== undefined && 
                <WazeNavigation location={locationInfo.coordinates}></WazeNavigation>
                }

                <View style={{height:50}}></View>

          </View>
        }
       

      </KeyboardAwareScrollView>
      
      {features && (features.includes("access_crm") || features.includes("checkin")) && !keyboardStatus && 
        <View style={styles.nextButtonBar}>        
          {features && features.includes("access_crm") && <TouchableOpacity style={[styles.nextButton, styles.accessButton]} onPress={() => {          
            props.navigation.navigate("LocationSpecificInfo" , {"data": locationInfo });
          }}>
            <Text style={styles.nextButtonText}>Access CRM</Text>
            <FontAwesomeIcon size={22} color={whiteLabel().actionOutlineButtonText} icon={ faAngleDoubleRight } />
          </TouchableOpacity>
          }
          {features && features.includes("checkin") && <TouchableOpacity style={[styles.checkInButton]} onPress={() => {          
            props.navigation.navigate("LocationSpecificInfo" , {"data": locationInfo });
            }}>

            <Text style={[styles.checkInButtonText]}>Check In</Text>
            <FontAwesomeIcon size={22} color={whiteLabel().actionFullButtonIcon} icon={ faAngleDoubleRight } />
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
  },
  subtitle: {
    color: whiteLabel().mainText,
    fontSize: 12,
    textAlign: 'left',
    fontFamily: Fonts.secondaryMedium,
  },
  dateText: {
    color: '#0AD10A',
    fontSize: 12,
    fontFamily: Fonts.secondaryMedium,
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
    borderColor: whiteLabel().fieldBorder,
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
    borderColor: whiteLabel().actionOutlineButtonBorder,
    borderRadius: 7,
  },
  nextButtonText: {
    color: whiteLabel().actionOutlineButtonText,
    fontSize: 15,
    fontFamily: Fonts.secondaryBold
  },
  checkInButton: {
    width: '47%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: whiteLabel().actionFullButtonBackground,
  },
  checkInButtonText: {
    color: whiteLabel().actionFullButtonText,
    fontSize: 15,
    fontFamily: Fonts.secondaryBold
  },
  fontIcon: {
    marginRight: 4
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
