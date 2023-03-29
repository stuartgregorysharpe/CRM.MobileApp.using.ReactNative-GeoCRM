import React, {useState, useEffect , useRef, useImperativeHandle } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  getApiRequest,
  postApiRequestMultipart,
} from '../../../../../actions/api.action';
import {AppText} from '../../../../../components/common/AppText';
import CModal from '../../../../../components/common/CModal';
import CTextInput from '../../../../../components/common/CTextInput';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import SvgIcon from '../../../../../components/SvgIcon';
import {Constants, Strings} from '../../../../../constants';
import Colors, {whiteLabel} from '../../../../../constants/Colors';
import * as ImagePicker from 'react-native-image-picker';
import PhotoCameraPickerDialog from '../../../../../components/modal/PhotoCameraPickerDialog';
import * as RNLocalize from 'react-native-localize';
import { useDispatch } from 'react-redux';
import { expireToken, getPostParameter } from '../../../../../constants/Helper';
import LoadingBar from '../../../../../components/LoadingView/loading_bar';
import { PostRequestDAO } from '../../../../../DAO';
import { storeLocalValue } from '../../../../../constants/Storage';

const OdometerReadingModal = React.forwardRef((props, ref) => {

  const {title, currentLocation, isStart} = props;
  
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [image, setImage] = useState(null);
  const [isPicker, setIsPicker] = useState(false);
  const [distanceMeasure, setDistanceMeasure] = useState('km');
  const [imageRequired, setImageRequired] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [isStartRequired, setIsStartRequired] = useState(false);
  const [isEndRequired, setIsEndRequired] = useState(false);
  const [isSubmit , setIsSubmit] = useState(false);
  const loadingBarRef = useRef(null)
  const modalRef= useRef(null)

  const dispatch = useDispatch();
  useImperativeHandle(ref, () => ({

    showModal: () => {
      clearData()
      _callGetOdometer()
      modalRef.current.showModal()
    },

    hideModal: () => {
      modalRef.current.hideModal()
    },
  }));


  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (ref) {
      ref.current.hideModal();
    }
  };
  const clearData = () => {
    setStart("")
    setEnd("")
  }

  const _callGetOdometer = () => {    
  
    getApiRequest('home/odometer', {})
      .then(res => {      
        console.log("_callGetOdometer", res)  
        setDistanceMeasure(res.distance_measure);
        setImageRequired(res.image_required === '1' ? true : false);
        if(res.start_reading !== undefined) {
          setStart(res.start_reading)
        }
        if(res.end_reading !== undefined) {
          setEnd(res.end_reading)
        }
      })
      .catch(e => {
        expireToken(dispatch, e);
      });
  };
  const _callMyDay = (isStart, currentLocation) => {
    if(isSubmit){
      return ;
    }
    setIsSubmit(true);
    loadingBarRef.current.showModal();
    var userParam = getPostParameter(currentLocation);
    var postData = {
      startEndDay_type: isStart
        ? Constants.homeStartEndType.START_MY_DAY
        : Constants.homeStartEndType.END_MY_DAY,
      user_local_data:
        userParam.user_local_data != undefined
          ? userParam.user_local_data
          : { time_zone: '', latitude: 0, longitude: 0 },
    };
    console.log("home/startEndDay->Postdata :", postData)
    PostRequestDAO.find(0, postData, "start_end_day", 'home/startEndDay', '', '', null, dispatch).then(async (res) => {

      if (res.status == Strings.Success) {
        await storeLocalValue('start_my_day', isStart ? '0' : '1');
        _callSubmitOdometer(res.startEndDay_id, isStart, currentLocation)
      } else {
        loadingBarRef.current.hideModal();
        setIsSubmit(false);
      }
    }).catch((e) => {
      console.log("OdometerReadingModal->PostRequestDAO api call: error", e)
      loadingBarRef.current.hideModal();
      setIsSubmit(false);      
      expireToken(dispatch, e);
    });

  };
  const _callSubmitOdometer = (startEndDayId, isStart, currentLocation) => {
    var postData = new FormData();
    postData.append('startEndDay_id', startEndDayId);
    postData.append('reading_type', isStart ? 'start_reading': 'end_reading');
    postData.append('reading', isStart ? start : end);
    if (image) {
      postData.append('image_included', '1');
      postData.append('File[odometer_image]', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
    }else{
      postData.append('image_included', '0');
    }
    
    var time_zone = RNLocalize.getTimeZone();
    postData.append('user_local_data[time_zone]', time_zone);
    postData.append(
      'user_local_data[latitude]',
      currentLocation && currentLocation.latitude != null
        ? currentLocation.latitude
        : '0',
    );

    postData.append(
      'user_local_data[longitude]',
      currentLocation && currentLocation.longitude != null
        ? currentLocation.longitude
        : '0',
    );
    console.log("home/odometer->Postdata :", postData)
     postApiRequestMultipart('home/odometer', postData)
      .then(res => {
        loadingBarRef.current.hideModal();
        setIsSubmit(false);
        if (res.status === Strings.Success) {
          setImage(null);
          onButtonAction({
            type: Constants.actionType.ACTION_DONE,
            value: res.message,
          });
        }
        
      })
      .catch(error => {
        console.log('home/odometer post api error:', error);
        loadingBarRef.current.hideModal();
        setIsSubmit(false);      
        expireToken(dispatch, e);        
      });
  }

  const onPressSubmit = () => {
   
    let hasError = false;
    if (imageRequired && image === null) {
      message = Strings.Please_Take_Photo;
      hasError = true;
      setIsImageError(true);
    }

    if (!isStart && (end == '' || end == undefined)) {
      message = Strings.Home.Input_End_Reading;
      hasError = true;
      setIsEndRequired(true);
      return;
    }

    if (isStart && (start == '' || start == undefined)) {
      message = Strings.Home.Input_Start_Reading;
      hasError = true;
      setIsStartRequired(true);
    
      return;
    }

    if (hasError) return;

    setIsEndRequired(false);
    setIsStartRequired(false);
    setIsImageError(false);

    _callMyDay(isStart, currentLocation)
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        launchCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const onRemoveImage = () => {
    setImage(null)
    setIsImageError(false)
  }

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      setIsPicker(false);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (response.assets != null && response.assets.length > 0) {
          setImage(response.assets[0]);
          setIsImageError(false)
        }
      }
    });
  };

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);
      setIsPicker(false);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        if (response.assets != null && response.assets.length > 0) {
          setImage(response.assets[0]);
        }
      }
    });
  };

  return (
    <CModal
      ref={modalRef}
      title={title}
      closableWithOutsideTouch
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      onClear={() => {
        onButtonAction({
          type: Constants.actionType.ACTION_FORM_CLEAR,
        });
      }}
      {...props}>
      <View style={styles.container}>

        <LoadingBar 
          backButtonDisabled={true}
          ref={loadingBarRef}
        />
        
        <View style={styles.inputContainer}>
          <CTextInput
            label={Strings.Home.Start_Reading}
            disabled={!isStart}
            value={start}
            keyboardType={'number-pad'}
            returnKeyType={'done'}
            hasError={isStart && isStartRequired}
            add_suffix={isStartRequired ? '' : distanceMeasure}     
            isRequired={true}
            onChangeText={text => {
              setStart(text);
              setIsStartRequired(false);
            }}
          />
        </View>

        {!isStart && (
          <View style={styles.inputContainer}>
            <CTextInput
              label="End Reading"
              value={end}
              keyboardType={'number-pad'}
              returnKeyType={'done'}
              style={{marginTop: 10}}
              hasError={ isEndRequired }
              isRequired={true}
              add_suffix={ isEndRequired ? '' : distanceMeasure }
              onChangeText={text => {
                setEnd(text);
                setIsEndRequired(false);
              }}
            />
          </View>
        )}

        {imageRequired && (
          <View
            style={{
              marginBottom: 10,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <AppText
                type="secondaryBold"
                size="big"
                title={Strings.Home.Take_Photo}></AppText>
            </View>
            {image && (
              <TouchableOpacity
                style={[{marginLeft: 10, marginRight: 20}]}
                onPress={() => {
                  setIsPicker(true);
                }}>
                <Image
                  style={styles.imageContainer}
                  source={{uri: image.uri}}
                />
                <TouchableOpacity
                  style={styles.closeButtonStyle}
                  onPress={onRemoveImage}>
                  <SvgIcon icon="Close" width="20px" height="20px" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            {image === null && (
              <TouchableOpacity
                style={[
                  styles.imageContainer,
                  {marginLeft: 10, marginRight: 20}                  
                ]}
                onPress={() => {
                  setIsPicker(true);
                }}>
                <SvgIcon icon={isImageError ? "Add_Image_Compulsory" : "Add_Image" }  />
              </TouchableOpacity>
            )}
          </View>
        )}

        <SubmitButton
          style={{marginTop: 10}}
          title="Submit"
          onSubmit={onPressSubmit}
        />
        <PhotoCameraPickerDialog
          visible={isPicker}
          message={'Choose Image'}
          onCamera={() => {
            if (Platform.OS === 'android') {
              requestCameraPermission();
            } else {
              launchCamera();
            }
          }}
          onGallery={launchImageLibrary}
          onModalClose={() => {
            setIsPicker(false);
          }}></PhotoCameraPickerDialog>
      </View>
    </CModal>
  );
});

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingTop: 10,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  imageContainer: {
    padding: 5,
    // borderWidth: 1,
    // borderColor: whiteLabel().fieldBorder,
    borderRadius: 5,
    width: Dimensions.get('screen').width / 4.5 + 7,
    height: Dimensions.get('screen').width / 4.5,
  },
  inputContainer: {
    justifyContent: 'center',
  },
  closeButtonStyle: {
    position: 'absolute',
    right: 0,
    top: 3,
  },
  
});

export default OdometerReadingModal;
