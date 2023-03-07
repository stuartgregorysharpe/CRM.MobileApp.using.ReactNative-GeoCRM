import React, { useImperativeHandle ,useState } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableHighlight,
  Text,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import * as ImagePicker from 'react-native-image-picker';
import { optimizeImage } from '../../helpers/imageHelper';
import RNPhotoManipulator from 'react-native-photo-manipulator';
import { getDateTime } from '../../helpers/formatHelpers';

const PhotoCameraPickerDialog = React.forwardRef((props, ref) => {

  const { visible, isOptimize,  message, onGallery, onCamera, onModalClose , image_timestamp } = props;

  useImperativeHandle(ref, () => ({
    openCamera: () => {
      if (Platform.OS === 'android') {
        requestCameraPermission();
      } else {
        launchCamera();
      }
    },
    openGallery: () => {
      launchImageLibrary();
    },
  }));

  const updateImageData = (url , imgType , fileInfo) => {    
    if (props.updateImageData) {
      addTextToImage(url, imgType , fileInfo , (uri) => {
        props.updateImageData(uri);
      });      
    }
  };

  const onPickImage = (asset , imgType , fileInfo) => {
    if (props.onPickImage) {
      addTextToImage(asset.uri, imgType , fileInfo, (uri) => {
        asset.uri  = uri;
        props.onPickImage(asset);        
      });
    }
  };

  const addTextToImage = (url , imgType , fileInfo, onCallBack) => {
    if(imgType == 'gallery' || image_timestamp != '1'){
      onCallBack(url);
    }else{      
      if(        
        fileInfo != null && url != undefined && url != '' &&
        (Platform.OS == 'android' && !url.includes('RNPM') || Platform.OS == 'ios' && !url.includes('Library/Caches')) &&
        RNPhotoManipulator != null ){
        const texts = [       
          { position: { x: fileInfo.width/2 , y: fileInfo.height - 40 }, text: getDateTime() , textSize: parseInt(fileInfo.width * 0.045) , color: "#FFFFFF", thickness: 0 }
        ];        
        RNPhotoManipulator.printText( url , texts).then(uri => {
          onCallBack(uri);
        });
      }else{
        alert(fileInfo);
      }  
    }
  }

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
        if (props.onCamera) {
          onCamera();
        } else {
          launchCamera();
        }
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
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        if (response.assets != null && response.assets.length > 0) {

          optimizeImage(response.assets[0].uri, 100, 0 , isOptimize , async (res) => {            
            updateImageData(res.uri , 'camera' , res);  
            onPickImage(res, 'camera' , res);
          });              

        }
      }
    });
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
          optimizeImage(response.assets[0].uri, 100, 0 , isOptimize , async (res) => {            
            updateImageData(res.uri , 'gallery' , res);  
            onPickImage(res, 'gallery' , res);
          });          
        }
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onModalClose}>
      <Modal        
        transparent={true}
        visible={visible}
        onRequestClose={onModalClose}>
        <TouchableWithoutFeedback onPress={onModalClose}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.title}>{message}</Text>
              <View style={styles.divider}></View>

              <View style={{ flexDirection: 'row' }}>
                <TouchableHighlight
                  underlayColor="#DDDDDD"
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    borderBottomEndRadius: 7,
                    borderBottomLeftRadius: 7,
                  }}
                  onPress={() => {
                    if (props.onGallery) {
                      onGallery();
                    } else {
                      launchImageLibrary();
                    }
                  }}>
                  <Text style={styles.button}>Gallery</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor="#DDDDDD"
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    borderBottomEndRadius: 7,
                    borderBottomLeftRadius: 7,
                  }}
                  onPress={() => {
                    if (Platform.OS === 'android') {
                      requestCameraPermission();
                    } else {
                      if (props.onCamera) {
                        onCamera();
                      } else {
                        launchCamera();
                      }
                    }
                  }}>
                  <Text style={styles.button}>Camera</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#00000055',
  },

  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 7,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  title: {
    textAlign: 'center',
    fontFamily: Fonts.secondaryBold,
    fontSize: 16,
    color: '#000',
    padding: 13,
  },

  button: {
    fontFamily: Fonts.secondaryBold,
    fontSize: 18,
    color: whiteLabel().mainText,
    padding: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
  },
});

export default PhotoCameraPickerDialog;
