import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import Colors, {whiteLabel} from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import SvgIcon from '../SvgIcon';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import PhotoCameraPickerDialog from '../modal/PhotoCameraPickerDialog';
import ImageResizer from 'react-native-image-resizer';

const TakePhotoView = props => {
  const {photos, isOptimize} = props;
  const [isPicker, setIsPicker] = useState(false);
  const onUpdatePhotos = paths => {
    if (props.onUpdatePhotos) {
      props.onUpdatePhotos(paths);
    }
  };
  const updateImageData = path => {
    setIsPicker(false);
    if (photos && iphotos !== null) {
      onUpdatePhotos([...photos, path]);
    } else {
      onUpdatePhotos([path]);
    }
  };

  const showSelectionDialog = () => {
    setIsPicker(true);
  };
  const optimizeImage = (filePath, quality, index) => {
    var outputPath =
      Platform.OS === 'ios'
        ? `${RNFS.DocumentDirectoryPath}`
        : `${RNFS.ExternalDirectoryPath}`;
    var width_height = 800;
    if (isOptimize) {
      width_height = 500;
    }
    ImageResizer.createResizedImage(
      filePath,
      width_height,
      width_height,
      'JPEG',
      quality,
      0,
      outputPath,
    )
      .then(res => {
        if (isOptimize) {
          if (res.size < 1024 * 200 || index >= 2) {
            updateImageData(res.uri);
          } else {
            var newQuality = (1024 * 200 * 100) / res.size;
            optimizeImage(res.uri, newQuality, index + 1);
          }
        } else {
          if (res.size < 1024 * 500 || index >= 2) {
            updateImageData(res.uri);
          } else {
            var newQuality = (1024 * 500 * 100) / res.size;
            optimizeImage(res.uri, newQuality, index + 1);
          }
        }
      })
      .catch(err => {
        console.log('error', err);
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
          optimizeImage(response.assets[0].uri, 100, 0);
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
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        if (response.assets != null && response.assets.length > 0) {
          optimizeImage(response.assets[0].uri, 100, 0);
        }
      }
    });
  };
  return (
    <View style={[styles.container, props.style]}>
      <PhotoCameraPickerDialog
        visible={isPicker}
        message={'Choose Image'}
        onCamera={launchCamera}
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
          {photos &&
            photos.length > 0 &&
            photos.map((photo, index) => {
              return (
                <View key={'image' + index} style={styles.imageStyle}>
                  <Image style={styles.imageContainer} source={{uri: photo}} />
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

          <TouchableOpacity
            style={[styles.imageContainer, {marginLeft: 10}]}
            onPress={() => {
              showSelectionDialog();
            }}>
            <SvgIcon icon="Add_Image" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  titleStyle: {
    textAlign: 'center',
    paddingVertical: 5,
    color: Colors.blackColor,
    fontSize: 15,
    fontFamily: Fonts.secondaryMedium,
  },

  imageStyle: {
    width: 80,
    height: 80,
    marginBottom: 10,
    marginLeft: 10,
  },

  imageContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: whiteLabel().fieldBorder,
    borderRadius: 7,
    width: Dimensions.get('screen').width / 4.5,
    height: Dimensions.get('screen').width / 4.5,
  },

  closeButtonStyle: {
    position: 'absolute',
    right: 0,
    top: 3,
  },
});

export default TakePhotoView;
