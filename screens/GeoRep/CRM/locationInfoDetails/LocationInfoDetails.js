import React, { useState, useEffect , useRef, forwardRef ,useImperativeHandle } from 'react';
import { Text,  View, Image, TouchableOpacity, Keyboard, Dimensions, Platform , Animated ,StyleSheet , Alert ,BackHandler} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { grayBackground, style } from '../../../../constants/Styles';
import RefreshSlider from '../../../../components/modal/RefreshSlider';
import SvgIcon from '../../../../components/SvgIcon';
import {LocationInfoInput} from './LocationInfoInput';
import Divider from '../../../../components/Divider';
import Colors, { whiteLabel } from '../../../../constants/Colors';
import { SLIDE_STATUS, LOCATION_CONFIRM_MODAL_VISIBLE, SUB_SLIDE_STATUS, LOCATION_ID_CHANGED } from '../../../../actions/actionTypes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DeviceInfo from 'react-native-device-info';
import {LocationInfoInputTablet} from './LocationInfoInputTablet';
import Fonts from '../../../../constants/Fonts';
import * as ImagePicker from 'react-native-image-picker'; 
import RNFS from 'react-native-fs';
import { postLocationFeedback, postLocationImage } from '../../../../actions/location.action';
import AlertDialog from '../../../../components/modal/AlertDialog';
import UpdateCustomerInfo from '../popup/UpdateCustomerInfo';
import { NextPrev } from '../partial/NextPrev';
import WazeNavigation from './WazeNavigation';
import LocationInfoPlaceHolder from './LocationInfoPlaceHolder';
import { getLocalData } from '../../../../constants/Storage';
import SelectionPicker from '../../../../components/modal/SelectionPicker';
import { checkFeatureIncludeParamFromSession, getPostParameter, selectPicker } from '../../../../constants/Consts';
import { getApiRequest, postApiRequest } from '../../../../actions/api.action';
import moment from 'moment-timezone';
import { Notification } from '../../../../components/modal/Notification';
import { clearNotification, showNotification } from '../../../../actions/notification.action';

var outcomeVal = false;
var isCheckinTypes = false;
var isFeedbackLocInfoOutcome = false;
var checkin_type_id = "";
var reason_id = "";
var clickedAction = "";

export const LocationInfoDetails = forwardRef(( props, ref ) => {

  const dispatch = useDispatch();  
  const [locationInfo, setLocationInfo] = useState(props.locInfo);    
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const statusDispositionInfo = useSelector(state => state.rep.statusDispositionInfo);
  const features = useSelector(state => state.selection.payload.user_scopes.geo_rep.features);
  const subSlideStatus = useSelector(state => state.rep.subSlideStatus);
  const [showItem, setShowItem] = useState("refresh");   
  const [keyboardStatus, setKeyboardStatus] = useState(false);  
  const locationInfoRef = useRef();  
  const [filePath, setFilePath] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");  
  const [isLoading,setIsLoading] = useState(true);
  const [isFeedbackModal, setIsFeedback] = useState(false);
  const [feedbackOptions, setFeedbackOptions] = useState([]);  
  const [isOutcomeUpdated, setIsOutcomeUpdated] = useState(outcomeVal);
  const [modalTitle, setModalTitle] = useState("Feedback");
  const [modalType, setModalType] = useState("feedback");
  const [originFeedbackData, setFeedback] = useState([]);
  const [checkinTypes, setCheckInTypes] = useState([]);
  const [checkinReason, setCheckInReason] = useState([]);
  const nextPrevRef = useRef();  

  useImperativeHandle(
    ref,
    () => ({
      closePopup() {        
        console.log("isOutcomeUpdated", isOutcomeUpdated)
        if(showItem !== "update_customer"){          
          checkFeedbackAndClose("top");          
        }else{ 
          setShowItem("refresh");
        }
      },
      goBack(){              
        console.log("isOutcomeUpdated", isOutcomeUpdated);
        setModalType("feedback");
        if(showItem === "update_customer") {          
          setShowItem("refresh");
        }else if(showItem === "refresh"){   
          clickedAction = "back";       
          checkFeedbackAndClose("back");
        }else{
          props.goPreviousPage();
        }        
      },
      updateView(res){
        console.log("locaiton details" , res);
        if(locationInfoRef.current !== undefined && locationInfoRef.current.updateDispositionData ){                    
          locationInfoRef.current.updateDispositionData(res);        
        }
        setLocationInfo(res);
        setIsLoading(false);
        if(res.feedback.length > 0){
          setFeedback(res.feedback[0].feedback_loc_info_outcome[0].options);
          setFeedbackOptions(res.feedback[0].feedback_loc_info_outcome[0].options);          
        }        
      }
    }),
    [showItem],
  );

  useEffect(() => {
    outcomeVal = false;    
    initData();  
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });  

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);    
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
      showSubscription.remove();
      hideSubscription.remove();
    };           
  }, []);

  const initData = () => {
    isCheckinTypes  = checkFeatureIncludeParamFromSession(features , "checkin_types");
    isFeedbackLocInfoOutcome = checkFeatureIncludeParamFromSession(features , "feedback_loc_info_outcome");    
  }

  const handleBackButtonClick = async() => {    
    checkFeedbackAndClose("back")
    return true;
  }

  const checkFeedbackAndClose = async  (tapType) =>{

    //let check = await checkFeatureIncludeParam("feedback_loc_info_outcome");    
    if( isFeedbackLocInfoOutcome && !outcomeVal){
      clickedAction = tapType;
      setIsFeedback(true);
    }else{
      console.log(tapType);
      if(tapType === "back"){
        props.animation("search-page");
        dispatch({type: SLIDE_STATUS, payload: false});
      }else if(tapType === "top"){
        props.clostDetailsPopup();
        dispatch({type: SLIDE_STATUS, payload: false});
        dispatch({type: LOCATION_ID_CHANGED, payload: {value:0, type:0}})
      }else if("access_crm"){

      }
    }
  }  

  const _canGoNextPrev = () => {        
    if( isFeedbackLocInfoOutcome && !outcomeVal){
      setIsFeedback(true);
      return false;
    }else{
      return true;
    }
  }

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
    
  // selectPicker = (title, description) => {
  //   return Alert.alert(
  //     title,
  //     description,
  //     [
  //       // The "Yes" button
  //       {
  //         text: "Gallery",
  //         onPress: () => {
  //           launchImageLibrary();
  //         },
  //       },
  //       // The "No" button        
  //       {
  //         text: "Camera",
  //         onPress: () => {
  //           launchCamera();
  //         }
  //       },
  //     ]
  //   );
  // }
  
  const updateLocationImage = async (path) => {
    
    var data = await RNFS.readFile( path , 'base64').then(res => { return res });

    var userParam = getPostParameter(locationInfo.coordinates);
    let postData = {
      location_id: locationInfo.location_id,
      location_image: data,
      user_local_data: userParam.user_local_data
    };
    postLocationImage(postData)
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
  
  const _callLocationFeedback = (item) => {
    console.log("locaiotn",locationInfo.coordinates)
    var userParam = getPostParameter(locationInfo.coordinates);
    let postData = {
      location_id: locationInfo.location_id,
      feedback: [
          {
              "feedback_loc_info_outcome" : item
          }
      ],
      user_local_data : userParam.user_local_data
    };
    postApiRequest("locations-info/location-feedback", postData).then((res) => {            
      setIsOutcomeUpdated(true);
      outcomeVal = true;      
      console.log("location feedbaa called");

      dispatch(showNotification({ type: 'success', message: res.message , buttonText: 'Okay', 
      buttonAction : async() => { 
        console.log("clickedActionclickedAction",clickedAction)
        if(clickedAction  === "top"){
          checkFeedbackAndClose("top");
        }else if(clickedAction === "back"){
          checkFeedbackAndClose("back");
        }else if(clickedAction === "access_crm"){
          props.navigation.navigate("LocationSpecificInfo" , {"data": locationInfo , "page": "access_crm" });
        }else if(clickedAction === "checkin"){
          onClickCheckIn();
        }else if(clickedAction === "prev"){

          if(nextPrevRef.current != undefined){
            nextPrevRef.current.onClickPrev();
          }
        }else if(clickedAction === "next"){
          if(nextPrevRef.current != undefined){
            nextPrevRef.current.onClickNext();
          }
        }                
        dispatch(clearNotification());                                        
      } }));                                          
    }).catch((error) => {
      console.log(error);
    })  
  }

  const showFeedbackDropDownModal = () => {  
    return (
      <SelectionPicker
        title={modalTitle}
        clearTitle={"Close"}
        mode={"single"}
        value={[]}
        visible={isFeedbackModal}
        options={feedbackOptions}
        onModalClose={() => {
          console.log("modalType",modalType)
          if(modalType === "checkin_reason"){            
            var options = [];
            checkinTypes.forEach((item, index) => {
              options.push(item.checkin_type);
            });
            console.log("feedback, checkin", originFeedbackData);
            setFeedbackOptions(originFeedbackData);
          }else{
            console.log(" feedbackd ", originFeedbackData);
            setFeedbackOptions(originFeedbackData);
          }
          setIsFeedback(false);
        }}

        onValueChanged={(item , index) => {     
          console.log("modalTypemodalType",modalType)
          if(modalType === "feedback"){
            _callLocationFeedback(item);
            setIsFeedback(false);
          }else if(modalType === "checkin_type"){

            var checkinType = checkinTypes.find(element => element.checkin_type === item);
            if(checkinType != undefined && checkinType.checkin_reasons.length > 0){
              checkin_type_id = checkinType.checkin_type_id;
              var options = [];
              checkinType.checkin_reasons.forEach((item, index) =>{
                options.push(item.reason);
              });
              setModalType("checkin_reason");
              setModalTitle("Check In Reasons");
              setFeedbackOptions(options);              
              setCheckInReason(checkinType.checkin_reasons);
            }else{
              setIsFeedback(false);
              _callCheckedIn();
            }
          }else if(modalType === "checkin_reason"){
            var chk = checkinReason.find(element => element.reason === item);
            if(chk && chk.reason_id){
              reason_id = checkinReason.find(element => element.reason === item).reason_id;            
              _callCheckedIn();
            }else{
              setModalType("feedback")
            }
          }
        }}
        ></SelectionPicker>
    )
  }

  const _callCheckInTypes = async() => {
    //var check = await checkFeatureIncludeParam("checkin_types");    
      setIsFeedback(true);
      setModalTitle("Check In Types");
      setModalType("checkin_type");
      setFeedbackOptions([]);      
      getApiRequest("locations/checkin-types" , {} ).then((res) => {
        console.log("re", res);
        if(res.status === "success"){
            var options = [];
            res.checkin_types.forEach((item, index) => {
              options.push(item.checkin_type);
            });             
            setFeedbackOptions(options);
            setCheckInTypes(res.checkin_types);
        }
      }).catch((e) => {
        console.log("E", JSON.stringify(e))
      });    
  }


  const _callCheckedIn =  async() => {
    var currentTime = moment().format("YYYY-MM-DD HH:mm:ss"); 
    var userParam = getPostParameter(currentLocation);
    let postData = {
      location_id : locationInfo.location_id,
      checkin_time : currentTime,
      checkin_type_id : checkin_type_id,  //Selected checkin_type_id, if was requested
      reason_id: reason_id,    //Selected reason_id, if was requested
      user_local_data: userParam.user_local_data      
    }
    console.log("postdata" , postData);
    postApiRequest("location-info/check-in", postData).then((res) => {
      console.log("post data res", res);
      setIsFeedback(false);
      console.log("originFeedbackData",originFeedbackData)
      setFeedbackOptions(originFeedbackData);
      setModalType("feedback");
      props.navigation.navigate("LocationSpecificInfo" , {"data": locationInfo , "page" : "checkin" });
    }).catch((e) => {

    });
  }

  const onClickCheckIn = async() => {
    var isCheckin = await getLocalData("@checkin");
    if( isCheckin === "1" ){
      dispatch(showNotification({ type: 'success', message: "You are currently checked-in to a location" , buttonText: 'Continue', 
      buttonAction : async() => {          
        var specificLocationId = await getLocalData("@specific_location_id");
        props.navigation.navigate("LocationSpecificInfo" , { "locationId": specificLocationId, "page" : "checkin"  }); 
        dispatch(clearNotification());
      } }));                                                
    }else{
      if(isCheckinTypes){
        _callCheckInTypes();
      }else{
        _callCheckedIn();
      }
    }

  }

  return (
    <View style={[styles.container, {flex:1}]}>

      {
        showFeedbackDropDownModal()
      }

      <Notification/>

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
                            selectPicker("Upload or capture an image:", "", launchImageLibrary, launchCamera);
                        }}>
                          {
                            filePath  !== '' && 
                            <Image style={styles.walmartImage}  source={{uri:filePath}} />
                          }
                          {
                            filePath === '' &&
                            <View style={{paddingTop:3, paddingBottom:3, borderWidth:1.5, borderColor:whiteLabel().fieldBorder ,borderRadius:5}}>
                                <SvgIcon style={styles.fontIcon} icon={"Add_Image"} width={DeviceInfo.isTablet() ? '150px': '90px'} height={DeviceInfo.isTablet() ? '130px': '80px'} />
                            </View>                            
                          }
                        </TouchableOpacity>              
                      }
                  </View>
                }
                </View>

                {
                locationInfo !== undefined && locationInfo.location_id !== "" && locationInfo.address !== "" && !(props.pageType.name === "camera" && props.pageType.type !== 2) && 
                  <NextPrev 
                    {...props} 
                    ref={nextPrevRef}                 
                    canGoNextPrev={(value) => {
                      clickedAction = value;
                      setFeedbackOptions(originFeedbackData);
                      return _canGoNextPrev();           
                    }}
                    onStart={() =>{
                      setLocationInfo(undefined);
                      setIsLoading(true);
                    }}
                    onUpdated={(res) =>{
                      setIsLoading(false);
                      setFilePath('');
                      setLocationInfo(res);
                      outcomeVal = false;
                      if(locationInfoRef.current !== undefined && locationInfoRef.current.updateDispositionData){
                        locationInfoRef.current.updateDispositionData(res);                
                      }
                    }}
                    currentLocation={props.currentLocation}
                    pageType={props.pageType} locationInfo={locationInfo} > </NextPrev>
                }

                <View style={{padding:10}}>
                {        
                locationInfo !== undefined && locationInfo.address !== ""  && DeviceInfo.isTablet()?
                <LocationInfoInputTablet onOutcome={(value) => {
                  setIsOutcomeUpdated(value);
                  outcomeVal = value;
                } } ref={locationInfoRef}  infoInput={locationInfo} pageType={'loatoinInfo'} showLoopSlider={showLoopSlider} /> :
                <LocationInfoInput onOutcome={(value) => {
                  setIsOutcomeUpdated(value);
                  outcomeVal = value;
                } } ref={locationInfoRef} infoInput={locationInfo}  pageType={'loatoinInfo'} showLoopSlider={showLoopSlider} />  
                }
                </View>                                              

                {
                  locationInfo !== undefined && 
                  <WazeNavigation location={locationInfo.coordinates} address={locationInfo.address}></WazeNavigation>
                }
                <View style={{height:50}}></View>

          </View>
        }
       
      </KeyboardAwareScrollView>
      

      { showItem !== "update_customer" && features && (features.includes("access_crm") || features.includes("checkin")) && !keyboardStatus && 
        <View style={styles.nextButtonBar}>        
          {features && features.includes("access_crm") && <TouchableOpacity style={[styles.nextButton, styles.accessButton]} onPress={ async() => {  
            clickedAction = "access_crm";
            if( _canGoNextPrev() ){
              props.navigation.navigate("LocationSpecificInfo" , {"data": locationInfo , "page": "access_crm" });
            }            
          }}>
            <Text style={styles.nextButtonText}>Access CRM</Text>
            <FontAwesomeIcon size={22} color={whiteLabel().actionOutlineButtonText} icon={ faAngleDoubleRight } />
          </TouchableOpacity>
          }
          {features && features.includes("checkin") && <TouchableOpacity style={[styles.checkInButton]} onPress={ async () => {          
              clickedAction = "checkin";
              if( _canGoNextPrev() ){
                onClickCheckIn();                
              }
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
    backgroundColor: Colors.bgColor, 
  },
  innerContainer: {
    backgroundColor: Colors.bgColor,
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
    marginRight: 4,    
    
  },

  transitionView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.bgColor,    
    elevation: 2,
    zIndex: 2,
    padding: 10,
  },


});
