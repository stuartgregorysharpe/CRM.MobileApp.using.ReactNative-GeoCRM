import React, {useState, useEffect , useRef ,useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {whiteLabel} from '../../constants/Colors';
import SvgIcon from '../SvgIcon';
import * as ImagePicker from 'react-native-image-picker';
import PhotoCameraPickerDialog from '../modal/PhotoCameraPickerDialog';
import { getDateTime } from '../../helpers/formatHelpers';
import RNPhotoManipulator from 'react-native-photo-manipulator';
import { optimizeImage } from '../../helpers/imageHelper';

var imageType =[];

const TakePhotoView = props => {

  const {photos, isOptimize ,  maxSize , hasError, image_capture , image_gallery  ,image_timestamp } = props;  

  const [isPicker, setIsPicker] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  
  
  // Combine image and text
  useEffect(() => {
    console.log("update photos",photos ,image_timestamp)
    if(photos != undefined && photos.length > 0 && image_timestamp == '1'){
      photos.forEach( (element, index) => {
        console.log("image type1", imageType, element, fileInfo);
        if( (Platform.OS == 'android' && !element.includes('RNPM') || Platform.OS == 'ios' && !element.includes('Library/Caches')) 
            && RNPhotoManipulator != null && fileInfo != null){
          console.log("image type", imageType);
          if(imageType[index] != undefined && imageType[index] == 'camera'){
            const texts = [       
              { position: { x: fileInfo.width/2 , y: fileInfo.height - 40 }, text: getDateTime(), textSize: parseInt(fileInfo.width * 0.045) , color: "#FFFFFF", thickness: 0 }
            ];
            RNPhotoManipulator.printText(element, texts).then(uri => {            
                console.log("converted image", uri);
                const tmp_photos = [...photos];
                tmp_photos[index] = uri;
                onUpdatePhotos(tmp_photos);
                
            });
          }          
        }
      });      
    }
  }, [photos]);

  const onUpdatePhotos = paths => {
    if (props.onUpdatePhotos) {
      props.onUpdatePhotos(paths);
    }
  };

  const updateImageData = ( path, imgType) => {    
    console.log("optimized path", path); 
    setIsPicker(false);
    if (photos && photos !== null) {  
      onUpdatePhotos([...photos, path]);
      imageType = [...imageType, imgType];
    } else {
      onUpdatePhotos([path]);
      imageType = [imgType];
    }
  };
  
  const showSelectionDialog = () => {
    
    if( photos == '' || photos == undefined || maxSize == undefined || maxSize == -1  || photos.length < maxSize){
                  
      if( 
        (image_capture != undefined && image_capture == "1" && image_gallery != undefined && image_gallery == "1") ||
        (image_capture == undefined && image_gallery == undefined)
        ){
        setIsPicker(true);
      }
  
      if(image_capture != undefined && image_capture == "1" && (image_gallery == undefined || image_gallery != "1" )){
        if (Platform.OS === 'android') {
          requestCameraPermission();
        } else {
          launchCamera();
        }
        
      }
      
      if( (image_capture == undefined || image_capture != "1" ) && image_gallery != undefined && image_gallery == "1"){
        launchImageLibrary();
      }
    }
  };
  
  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (response.assets != null && response.assets.length > 0) {
          console.log("gallery file", response.assets[0].uri)
          optimizeImage(response.assets[0].uri, 100, 0 , isOptimize , async (res) => {
            setFileInfo(res);
            updateImageData(res.uri , 'gallery');
          });
          
        }
      }
    });
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
        launchCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        if (response.assets != null && response.assets.length > 0) {
          console.log("camera file", response.assets[0].uri);
          optimizeImage(response.assets[0].uri, 100, 0 , isOptimize , async (res) => {
            setFileInfo(res);
            updateImageData(res.uri , 'camera');
          });
        }
      }
    });

  };



  return (
    <View style={[styles.container, props.style]}>
                      
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

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
        }}>

        <ScrollView
          horizontal={true}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          {photos != null &&
            photos instanceof Array && photos.length > 0 &&
            photos.map((photo, index) => {

              return (
                
                    <View key={'image' + index} style={styles.imageStyle}>
                      <Image style={styles.imageContainer} source={{ uri: photo}} />
                      {/* <AppText title={getDateTime()} style={{position:'absolute' , right:10 , bottom:10 , color:'white' }} />                       */}
                      <TouchableOpacity
                            style={[styles.closeButtonStyle]}
                            onPress={() => {
                              const filteredPhotos = photos.filter(
                                element => element !== photo,
                              );
                              onUpdatePhotos(filteredPhotos);
                            }}>
                            <SvgIcon icon="Close" width="20px" height="20px" />
                      </TouchableOpacity>
                      
                    </View>                 
              );

            })}


          {
            (photos == undefined || maxSize == undefined || maxSize == -1  || photos != undefined && photos.length < maxSize) &&
            <TouchableOpacity
              style={[styles.imageContainer, {marginLeft: photos instanceof Array && photos.length > 0 ? 10 : 0} ,  hasError != undefined && hasError ? { borderColor: whiteLabel().endDayBackground } :{} ]}
              onPress={() => {                
                showSelectionDialog(); 
                if(photos.length > 0){
                  //captureViewShot(0);
                }
              }}>
              <SvgIcon icon={hasError != undefined && hasError ? "Add_Image_Compulsory" : "Add_Image"}  />
            </TouchableOpacity>
          }          

        </ScrollView>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    alignSelf: 'stretch',
  },

  imageStyle: {
    width: 80,
    height: 80,
    marginBottom: 10,
    marginRight: 15,
    marginLeft:5,
  },

  imageContainer: {
    padding: 0,
    //borderWidth: 0,
    //borderColor: whiteLabel().fieldBorder,
    borderRadius: 5,
    width: Dimensions.get('screen').width / 4.5 + 7,
    height: Dimensions.get('screen').width / 4.5,
  },

  closeButtonStyle: {
    position: 'absolute',
    right: 0,
    top: 3,
  },
});

export default TakePhotoView;
