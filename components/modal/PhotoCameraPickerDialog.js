import React from 'react';
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
import {whiteLabel} from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import * as ImagePicker from 'react-native-image-picker';

const PhotoCameraPickerDialog = props => {
  const {visible, message, onGallery, onCamera, onModalClose} = props;
  const updateImageData = url => {
    if (props.updateImageData) {
      props.updateImageData(url);
    }
  };
  const onPickImage = asset => {
    if (props.onPickImage) {
      props.onPickImage(asset);
    }
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
          updateImageData(response.assets[0].uri);
          onPickImage(response.assets[0]);
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
          updateImageData(response.assets[0].uri);
          onPickImage(response.assets[0]);
        }
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onModalClose}>
      <Modal
        // animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onModalClose}>
        <TouchableWithoutFeedback onPress={onModalClose}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.title}>{message}</Text>
              <View style={styles.divider}></View>

              <View style={{flexDirection: 'row'}}>
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
};

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
