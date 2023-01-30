import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {  
  View,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  Platform,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {grayBackground, style} from '../../../../constants/Styles';
import RefreshSlider from '../../../../components/modal/RefreshSlider';
import SvgIcon from '../../../../components/SvgIcon';
import {LocationInfoInput} from './LocationInfoInput';
import Divider from '../../../../components/Divider';
import Colors, {whiteLabel} from '../../../../constants/Colors';
import {
  SLIDE_STATUS,
  LOCATION_CONFIRM_MODAL_VISIBLE,
  SUB_SLIDE_STATUS,
  LOCATION_ID_CHANGED,  
} from '../../../../actions/actionTypes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DeviceInfo from 'react-native-device-info';
import {LocationInfoInputTablet} from './LocationInfoInputTablet';
import Fonts from '../../../../constants/Fonts';
import RNFS from 'react-native-fs';
import AlertDialog from '../../../../components/modal/AlertDialog';
import {NextPrev} from '../partial/NextPrev';
import WazeNavigation from './WazeNavigation';
import LocationInfoPlaceHolder from './LocationInfoPlaceHolder';
import {
  checkFeatureIncludeParamFromSession,
  expireToken,
  getPostParameter,
} from '../../../../constants/Helper';
import {
  clearLoadingBar,
  clearNotification,
  showLoadingBar,
  showNotification,
} from '../../../../actions/notification.action';
import UpdateCustomerModal from '../update_customer';
import {Constants, Strings, Values} from '../../../../constants';
import {  
  PostRequestDAO,
} from '../../../../DAO';
import LocationInfo from './LocationInfo';
import AccessCRMCheckInView from './components/AccessCRMCheckInView';
import { generateKey } from '../../../../constants/Utils';

var outcomeVal = false;
var isCheckinTypes = false;
var isFeedbackLocInfoOutcome = false;
var checkin_type_id = '';
var reason_id = '';
var clickedAction = '';
var location_image_indempotency = '';


export const LocationInfoDetails = forwardRef((props, ref) => {
  
  const dispatch = useDispatch();
  const [locationInfo, setLocationInfo] = useState(props.locInfo);
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const statusDispositionInfo = useSelector(
    state => state.rep.statusDispositionInfo,
  );
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const subSlideStatus = useSelector(state => state.rep.subSlideStatus);
  const [showItem, setShowItem] = useState('refresh');
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const locationInfoRef = useRef();
  const [filePath, setFilePath] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [isFeedbackModal, setIsFeedback] = useState(false);
  const [feedbackOptions, setFeedbackOptions] = useState([]);
  const [isOutcomeUpdated, setIsOutcomeUpdated] = useState(outcomeVal);
  const [modalTitle, setModalTitle] = useState('Feedback');
  const [modalType, setModalType] = useState('feedback');
  const [originFeedbackData, setFeedback] = useState([]);
  const [checkinTypes, setCheckInTypes] = useState([]);
  const [checkinReason, setCheckInReason] = useState([]);
  const nextPrevRef = useRef();
  const showDivider = props.isModal == false;
  const isDisposition = features.includes('disposition_fields');
  const updateCustomerModalRef = useRef(null);
  const isCheckin = useSelector(state => state.location.checkIn);
  const [isUpdateImage, setIsUpdateImage] = useState(false);
  

  useImperativeHandle(
    ref,
    () => ({
      closePopup() {
        if (showItem !== 'update_customer') {
          checkFeedbackAndClose('top');
        } else {
          setShowItem('refresh');
        }
      },
      goBack() {
        setModalType('feedback');
        if (showItem === 'update_customer') {
          setShowItem('refresh');
        } else if (showItem === 'refresh') {
          clickedAction = 'back';
          checkFeedbackAndClose('back');
        } else {
          props.goPreviousPage();
        }
      },
      updateView(res) {
        updateLocationInfo(res);
      },
    }),
    [showItem],
  );

  const updateLocationInfo = _locationInfo => {
    if (!_locationInfo) return;
    if (
      locationInfoRef.current != undefined &&
      locationInfoRef.current != null
    ) {
      locationInfoRef.current.updateDispositionData(_locationInfo);
    }
    setLocationInfo(_locationInfo);
    setIsLoading(false);

    if (
      _locationInfo.feedback != undefined &&
      _locationInfo.feedback.length > 0
    ) {
      setFeedback(
        _locationInfo.feedback[0].feedback_loc_info_outcome[0].options,
      );
      setFeedbackOptions(
        _locationInfo.feedback[0].feedback_loc_info_outcome[0].options,
      );
    }
  };

  useEffect(() => {
    updateLocationInfo(props.locInfo);
  }, [props.locInfo]);

  useEffect(() => {

    outcomeVal = false;
    location_image_indempotency = generateKey();
    initData();
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const initData = () => {
    isCheckinTypes = checkFeatureIncludeParamFromSession(
      features,
      'checkin_types',
    );

    isFeedbackLocInfoOutcome = checkFeatureIncludeParamFromSession(
      features,
      'feedback_loc_info_outcome',
    );
  };

  const handleBackButtonClick = async () => {
    checkFeedbackAndClose('back');
    return true;
  };

  const checkFeedbackAndClose = async tapType => {
    if (isFeedbackLocInfoOutcome && !outcomeVal) {
      clickedAction = tapType;
      setIsFeedback(true);
    } else {
      console.log(tapType);
      if (tapType === 'back') {
        props.animation('search-page');
        dispatch({type: SLIDE_STATUS, payload: false});
      } else if (tapType === 'top') {
        props.clostDetailsPopup();
        dispatch({type: SLIDE_STATUS, payload: false});
        dispatch({type: LOCATION_ID_CHANGED, payload: {value: 0, type: 0}});
      } else if ('access_crm') {
      }
    }
  };

  const _canGoNextPrev = () => {
    if (isFeedbackLocInfoOutcome && !outcomeVal) {
      setIsFeedback(true);
      return false;
    } else {
      return true;
    }
  };

  const showLoopSlider = () => {
    setShowItem('loop');
    dispatch({type: SUB_SLIDE_STATUS, payload: true});
  };

  const onPathUpdated = path => {
    setFilePath(path);
    updateLocationImage(path);
  };

  const updateLocationImage = async path => {

    var data = await RNFS.readFile(path, 'base64').then(res => {
      return res;
    });

    var userParam = getPostParameter(locationInfo.coordinates);
    let postData = {
      location_id: locationInfo.location_id,
      location_image: data,
      user_local_data: userParam.user_local_data,
    };

    if(!isUpdateImage){

      setIsUpdateImage(true)
      dispatch(showLoadingBar({'type' : 'loading'}));

      PostRequestDAO.find(0 , postData , 'location-image' , 'locations/location-image' , '' , '',  location_image_indempotency ).then((res) => {      
        setMessage(res.message);
        setIsSuccess(true);
        setIsUpdateImage(false);
        dispatch(clearLoadingBar());
      }).catch((error) => {
        setMessage('Upload File Failed');
        setIsSuccess(true);
        expireToken(dispatch, e);
        setIsUpdateImage(false);
        dispatch(clearLoadingBar());
      })    

    }
        
  };

  const openCustomerInfo = async () => {
    updateCustomerModalRef.current.showModal();
  };

  // const _callLocationFeedback = item => {
  //   var userParam = getPostParameter(locationInfo.coordinates);
  //   let postData = {
  //     location_id: locationInfo.location_id,
  //     feedback: [
  //       {
  //         feedback_loc_info_outcome: item,
  //       },
  //     ],
  //     user_local_data: userParam.user_local_data,
  //   };

  //   PostRequestDAO.find(
  //     locationInfo.location_id,
  //     postData,
  //     'location-feedback',
  //     'locations-info/location-feedback',
  //   )
  //     .then(res => {
  //       setIsOutcomeUpdated(true);
  //       outcomeVal = true;

  //       dispatch(
  //         showNotification({
  //           type: Strings.Success,
  //           message: res.message,
  //           buttonText: Strings.Ok,
  //           buttonAction: async () => {
  //             if (clickedAction === 'top') {
  //               checkFeedbackAndClose('top');
  //             } else if (clickedAction === 'back') {
  //               checkFeedbackAndClose('back');
  //             } else if (clickedAction === 'access_crm') {
  //               if (props.onButtonAction) {
  //                 props.onButtonAction({
  //                   type: Constants.actionType.ACTION_CLOSE,
  //                   value: 'access_crm',
  //                 });
  //               }
  //             } else if (clickedAction === 'checkin') {
  //               //onClickCheckIn();
  //             } else if (clickedAction === 'prev') {
  //               if (nextPrevRef.current != undefined) {
  //                 nextPrevRef.current.onClickPrev();
  //               }
  //             } else if (clickedAction === 'next') {
  //               if (nextPrevRef.current != undefined) {
  //                 nextPrevRef.current.onClickNext();
  //               }
  //             }
  //             dispatch(clearNotification());
  //           },
  //         }),
  //       );
  //     })
  //     .catch(e => {
  //       console.log('Error : ', e);
  //       expireToken(dispatch, e);
  //     });
  // };

  const openSpecificInfoPage = (page_type) => {
    if (props.onButtonAction) {
      props.onButtonAction({
        type: Constants.actionType.ACTION_CLOSE,
        value: page_type,
      });
    }                    
    props.navigation.navigate('LocationSpecificInfo', {
      data: locationInfo,
      page: page_type,
    });

  }

  // const showFeedbackDropDownModal = () => {
  //   return (
  //     <SelectionPicker
  //       title={modalTitle}
  //       clearTitle={'Close'}
  //       mode={'single'}
  //       value={[]}
  //       visible={isFeedbackModal}
  //       options={feedbackOptions}
  //       onModalClose={() => {
  //         if (modalType === 'checkin_reason') {
  //           var options = [];
  //           checkinTypes.forEach((item, index) => {
  //             options.push(item.checkin_type);
  //           });
  //           setFeedbackOptions(originFeedbackData);
  //         } else {
  //           setFeedbackOptions(originFeedbackData);
  //         }
  //         setIsFeedback(false);
  //       }}
  //       onValueChanged={async (item, index) => {
  //         if (modalType === 'feedback') {
  //           _callLocationFeedback(item);
  //           setIsFeedback(false);
  //         } else if (modalType === 'checkin_type') {
  //           var checkinType = checkinTypes.find(
  //             element => element.checkin_type === item,
  //           );
  //           if (
  //             checkinType != undefined &&
  //             checkinType.checkin_reasons.length > 0
  //           ) {
  //             checkin_type_id = checkinType.checkin_type_id;
  //             var options = [];
  //             checkinType.checkin_reasons.forEach((item, index) => {
  //               options.push(item.reason);
  //             });
  //             setModalType('checkin_reason');
  //             setModalTitle('Check In Reasons');
  //             setFeedbackOptions(options);
  //             setCheckInReason(checkinType.checkin_reasons);
  //             await storeLocalValue('@checkin_type_id', checkin_type_id);
  //           } else {
  //             setIsFeedback(false);
  //             //_callCheckedIn();
  //           }
  //         } else if (modalType === 'checkin_reason') {
  //           console.log('check in reasons', checkinReason);
  //           var chk = checkinReason.find(element => element.reason === item);
  //           if (chk && chk.reason_id) {
  //             reason_id = checkinReason.find(
  //               element => element.reason === item,
  //             ).reason_id;
  //             console.log('Save reason id', reason_id);
  //             await storeLocalValue('@checkin_reason_id', reason_id);
  //             //_callCheckedIn();
  //           } else {
  //             setModalType('feedback');
  //           }
  //         }
  //       }}></SelectionPicker>
  //   );
  // };

  // const _callCheckInTypes = async () => {
  //   setIsFeedback(true);
  //   setModalTitle('Check In Types');
  //   setModalType('checkin_type');
  //   setFeedbackOptions([]);

  //   LocationCheckinTypeDAO.find(features)
  //     .then(res => {
  //       var options = [];
  //       res.forEach((item, index) => {
  //         options.push(item.checkin_type);
  //       });
  //       setFeedbackOptions(options);
  //       setCheckInTypes(res);
  //       console.log('check type', res);
  //     })
  //     .catch(e => {
  //       expireToken(dispatch, e);
  //     });
  // };

  // const _callCheckedIn = async () => {
  //   if (isCheckingIn) {
  //     return;
  //   }
  //   setIsCheckingIn(true);
  //   var currentTime = getDateTime();
  //   var userParam = getPostParameter(currentLocation);
  //   let postData = {
  //     location_id: locationInfo.location_id,
  //     checkin_time: currentTime,
  //     checkin_type_id: checkin_type_id, //Selected checkin_type_id, if was requested
  //     reason_id: reason_id, //Selected reason_id, if was requested
  //     user_local_data: userParam.user_local_data,
  //   };

  //   PostRequestDAO.find(
  //     locationInfo.location_id,
  //     postData,
  //     'checkin',
  //     'location-info/check-in',
  //     '',
  //     '',
  //   )
  //     .then(async res => {
  //       if (props.onButtonAction) {
  //         props.onButtonAction({type: Constants.actionType.ACTION_CLOSE});
  //       }
  //       setIsFeedback(false);
  //       setFeedbackOptions(originFeedbackData);
  //       setModalType('feedback');
  //       dispatch({type: CHECKIN, payload: true});
  //       await storeLocalValue('@checkin', '1');
  //       await storeLocalValue(
  //         '@specific_location_id',
  //         locationInfo.location_id,
  //       );
  //       await storeJsonData('@checkin_location', locationInfo);
  //       setIsCheckingIn(false);
  //       props.navigation.navigate('LocationSpecificInfo', {
  //         data: locationInfo,
  //         page: 'checkin',
  //       });
  //     })
  //     .catch(e => {
  //       expireToken(dispatch, e);
  //       setIsCheckingIn(false);
  //     });
  // };

  // const onClickCheckIn = async () => {
  //   //var isCheckin = await getLocalData('@checkin');
  //   if (isCheckin) {
  //     dispatch(
  //       showNotification({
  //         type: Strings.Success,
  //         message: Strings.You_Are_Currenly_Checkedin,
  //         buttonText: 'Continue',
  //         buttonAction: async () => {
  //           dispatch(clearNotification());
  //           if (props.onButtonAction) {
  //             props.onButtonAction({type: Constants.actionType.ACTION_CLOSE});
  //           }

  //           var specificLocationId = await getLocalData(
  //             '@specific_location_id',
  //           );

  //           console.log('specificLocationId =>', specificLocationId);
  //           props.navigation.navigate('LocationSpecificInfo', {
  //             locationId: specificLocationId,
  //             page: 'checkin',
  //           });
  //         },
  //       }),
  //     );
  //   } else {
  //     if (isCheckinTypes) {
  //       _callCheckInTypes();
  //     } else {
  //       _callCheckedIn();
  //     }
  //   }
  // };

  const onUpdateCustomerModalClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CLOSE) {
      if (props.refreshLocationInfo) {
        props.refreshLocationInfo(locationInfo.location_id);
      }

      updateCustomerModalRef.current.hideModal();
    }
  };

  return (
    <View style={[styles.container, {flex: 1}]}>
      
      {/* {showFeedbackDropDownModal()} */}
      
      {/* <Notification /> */}

      <AlertDialog
        visible={isSuccess}
        message={message}
        onModalClose={() => {
          setIsSuccess(false);
        }}
      />

      {locationInfo != undefined && (
        <UpdateCustomerModal
          ref={updateCustomerModalRef}
          locationId={locationInfo.location_id}
          title="Update"
          onButtonAction={onUpdateCustomerModalClosed}
        />
      )}

      {subSlideStatus && (
        <TouchableOpacity
          activeOpacity={1}
          style={grayBackground}
          onPress={() =>
            dispatch({type: SUB_SLIDE_STATUS, payload: false})
          }></TouchableOpacity>
      )}

      {subSlideStatus && (
        <View
          style={[
            styles.transitionView,
            showItem == 'refresh'
              ? {
                  transform: [
                    {translateY: Dimensions.get('window').height + 100},
                  ],
                }
              : {transform: [{translateY: 0}]},
          ]}>
          <RefreshSlider location_id={locationInfo.location_id} />
        </View>
      )}

      {showItem === 'update_customer' && (
        <UpdateCustomerInfo
          location_id={locationInfo.location_id}
          onClose={() => {
            if (props.refreshLocationInfo) {
              props.refreshLocationInfo(locationInfo.location_id);
            }

            setShowItem('refresh');
          }}
        />
      )}
      {showDivider && (
        <TouchableOpacity
          style={{padding: 6}}
          onPress={() => {
            if (statusDispositionInfo) {
              dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
              return;
            }
            dispatch({type: SLIDE_STATUS, payload: false});
          }}>
          <Divider />
        </TouchableOpacity>
      )}

      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === 'ios'}
        extraHeight={130}
        behavior="padding"
        style={[
          styles.innerContainer,
          keyboardStatus
            ? {}
            : {
                marginBottom:
                  features &&
                  (features.includes('access_crm') ||
                    features.includes('checkin'))
                    ? 0
                    : 0,
              },
        ]}>
        {isLoading &&
          (locationInfo === undefined ||
            locationInfo.address !== undefined ||
            locationInfo.address === '') && (
            <LocationInfoPlaceHolder
              locationInfo={locationInfo}></LocationInfoPlaceHolder>
          )}

        {!isLoading && (
          <View>
            <LocationInfo
              locationInfo={locationInfo}
              filePath={filePath}
              openCustomerInfo={openCustomerInfo}
              onPathUpdated={onPathUpdated}
            />

            {locationInfo !== undefined &&
              locationInfo.location_id !== '' &&
              locationInfo.address !== '' &&
              !(
                props.pageType.name != undefined &&
                props.pageType.name === 'camera' &&
                props.pageType.type !== 2
              ) && (
                <NextPrev
                  {...props}
                  ref={nextPrevRef}
                  canGoNextPrev={value => {
                    clickedAction = value;
                    setFeedbackOptions(originFeedbackData);
                    return _canGoNextPrev();
                  }}
                  onStart={() => {
                    setLocationInfo(undefined);
                    setIsLoading(true);
                  }}
                  onEnd={locInfo => {
                    setIsLoading(false);
                    setLocationInfo(locInfo);
                  }}
                  onUpdated={res => {
                    setIsLoading(false);
                    setFilePath('');
                    setLocationInfo(res);
                    outcomeVal = false;
                    if (
                      locationInfoRef.current != undefined &&
                      locationInfoRef.current != null
                    ) {
                      locationInfoRef.current.updateDispositionData(res);
                    }
                  }}
                  currentLocation={props.currentLocation}
                  pageType={props.pageType}
                  locationInfo={locationInfo}>
                  {' '}
                </NextPrev>
              )}

            <View style={{padding: 10}}>
              {locationInfo !== undefined &&
              locationInfo.address !== '' &&
              DeviceInfo.isTablet() ? (
                <LocationInfoInputTablet
                  onOutcome={value => {
                    setIsOutcomeUpdated(value);
                    outcomeVal = value;
                  }}
                  ref={locationInfoRef}
                  infoInput={locationInfo}
                  pageType={'loatoinInfo'}
                  showLoopSlider={showLoopSlider}
                />
              ) : (
                <LocationInfoInput
                  onOutcome={value => {
                    setIsOutcomeUpdated(value);
                    outcomeVal = value;
                  }}
                  ref={locationInfoRef}
                  infoInput={locationInfo}
                  pageType={'loatoinInfo'}
                  showLoopSlider={showLoopSlider}
                />
              )}
            </View>

            {locationInfo !== undefined && (
              <WazeNavigation
                
                onCloseModal={() => {
                  if (props.onButtonAction) {
                    props.onButtonAction({type: Constants.actionType.ACTION_CLOSE});
                  }
                }}
                location={locationInfo.coordinates}
                address={locationInfo.address}></WazeNavigation>
            )}

            <View style={{height: 100}}></View>
          </View>
        )}
      </KeyboardAwareScrollView>

      {features &&
        (features.includes('access_crm') || features.includes('checkin')) &&
        !keyboardStatus && (          
            <AccessCRMCheckInView 
              features={features}
              location_id={locationInfo?.location_id}
              onAccessCRM={() => {
                  clickedAction = 'access_crm';
                  if (_canGoNextPrev()) {
                    openSpecificInfoPage('access_crm');                    
                  }
              }}

              onCheckIn={() => {
                  clickedAction = 'checkin';                  
                  setIsCheckingIn(false);
                  openSpecificInfoPage('checkin');                  
              }}
            />

        )}

      {isDisposition && (
        <TouchableOpacity
          style={[style.plusButton, {marginBottom: 80}]}
          onPress={() => {
            if (!subSlideStatus) {
              locationInfoRef.current.postDispositionData();
            }
          }}>
          <SvgIcon icon="DISPOSITION_POST" width="70px" height="70px" />
        </TouchableOpacity>
      )}
    </View>
  );
});


const styles = StyleSheet.create({
  container: {
    maxHeight: Values.deviceHeight - 80,
    backgroundColor: Colors.bgColor,
    alignSelf: 'stretch',
  },

  innerContainer: {
    backgroundColor: Colors.bgColor,
    padding: 10,
    alignSelf: 'stretch',
  },

  dateText: {
    color: '#0AD10A',
    fontSize: 12,
    fontFamily: Fonts.secondaryMedium,
  },

  addressText: {
    flex: 1,
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
