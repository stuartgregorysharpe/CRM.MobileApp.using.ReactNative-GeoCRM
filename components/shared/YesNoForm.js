import React, {useState, useEffect, useRef, useMemo} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import Colors, {whiteLabel} from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {style} from '../../constants/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from './Button';
import SvgIcon from '../SvgIcon';
import PhotoCameraPickerDialog from '../modal/PhotoCameraPickerDialog';
import * as ImagePicker from 'react-native-image-picker';
import {checkYesNoValidate} from '../../screens/GeoRep/Forms/questions/helper';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import { optimizeImage } from '../../helpers/imageHelper';
import { getDateTime } from '../../helpers/formatHelpers';
import RNPhotoManipulator from 'react-native-photo-manipulator';

var imageType = '';

export const YesNoForm = ({
  item,
  onTouchStart,
  onPress,
  onTakeImage,
  submissionType,
}) => {
  const [isPicker, setIsPicker] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  

  const isOptimize = item.optimize && item.optimize == '1' ? true : false ;
  const isShowInfoIcon =
    item.guide_info !== undefined && item.guide_info.length != 0;
  const isYes =
    item &&
    item.value !== null &&
    item.value !== '' &&
    item.value.toLowerCase() == 'yes';
  const isNo =
    item &&
    item.value !== null &&
    item.value !== '' &&
    item.value.toLowerCase() == 'no';

  const image_timestamp = item.image_timestamp;

  // Combine image and text
  useEffect(() => {        
    if(item != undefined && image_timestamp == '1' && imageType == 'camera'){
      if(fileInfo){   
        var path = null;
        if (isYes) {
          path = item.yes_image;
        } else {
          path =  item.no_image;
        }        
        if(path != null && path.length > 0 && 
          (Platform.OS == 'android' && !path[0]?.includes('RNPM') || Platform.OS == 'ios' && !path[0]?.includes('Library/Caches')) &&
           RNPhotoManipulator != null){
          const texts = [       
            { position: { x: fileInfo.width/2 , y: fileInfo.height - 40 }, text: getDateTime(), textSize: parseInt(fileInfo.width * 0.045) , color: "#FFFFFF", thickness: 0 }
          ];
          RNPhotoManipulator.printText( path[0] , texts).then(uri => {              
              onTakeImage([uri], item.value);
          });
        }
      }
    }
  }, [item.yes_image, item.no_image]);

  const showSelectionDialog = () => {
    if (submissionType == 'edit') {
      setIsPicker(true);
    } else {
      setIsPicker(true);
    }
  };

  const updateImageData = async (path , imgType) => {
    setIsPicker(false);
    if (item.value != null && item.value !== null) {
      onTakeImage([path], item.value);
      imageType = imgType;
    } else {
      onTakeImage([path], item.value);
      imageType = imgType;
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

          optimizeImage(response.assets[0].uri, 100, 0 , isOptimize , async (res) => {
            setFileInfo(res);
            updateImageData(res.uri , 'gallery');            
          });    

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
          optimizeImage(response.assets[0].uri, 100, 0 , isOptimize , async (res) => {
            setFileInfo(res);
            updateImageData(res.uri , 'camera'); 
          });              
        }
      }
    });
  };

  const isIncludeImage = btnName => {
    if (item.include_image && item.include_image.length > 0) {
      var check = item.include_image.find(item => item === btnName);
      if (check != null && check != undefined) {
        return true;
      }
    }
    return false;
  };

  const getImagePath = () => {
    if (isYes) {
      return item.yes_image;
    } else {
      return item.no_image;
    }
  };

  const haveImage = () => {
    if (!item) return false;
    if ((item && item.value === null) || item.value === '') {
      return false;
    }
    if (
      isYes &&
      item.yes_image != null &&
      item.yes_image != '' &&
      item.yes_image != undefined
    ) {
      return true;
    }
    if (
      isNo &&
      item.no_image != null &&
      item.no_image != '' &&
      item.no_image != undefined
    ) {
      return true;
    }
    return false;
  };

  const isRequiredImage = isIncludeImage(isYes ? 'Yes' : 'No');

  const isCompulsory = !checkYesNoValidate(item);

  const getMarginLeft = () => {
    if (!isRequiredImage) {
      return 20;
    }
    return 0;
  };



  return (
    <View
      style={[
        style.card,
        isCompulsory ? style.compulsoryStyle : {},
        {marginHorizontal: 0, marginVertical: 5},
      ]}>
      <View style={[styles.container]}>
        <PhotoCameraPickerDialog
          visible={isPicker}
          message={'Choose Image'}
          onCamera={launchCamera}
          onGallery={launchImageLibrary}
          onModalClose={() => {
            setIsPicker(false);
          }}></PhotoCameraPickerDialog>

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, paddingHorizontal: 5}}>
            <Text style={styles.titleStyle}> {item.question_text}</Text>
          </View>
          {isShowInfoIcon && (
            <View
              onTouchStart={e => {
                onTouchStart(e.nativeEvent, item.guide_info);
              }}>
              <Icon
                name={`info-outline`}
                size={25}
                color={whiteLabel().mainText}
              />
            </View>
          )}
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              flexDirection:
                isIncludeImage(isYes ? 'Yes' : 'No') && item.value !== null
                  ? 'column'
                  : 'row',
              justifyContent: 'center',
            }}>
            <Button
              btnStyle={{marginTop: 10}}
              title={'Yes'}
              onTaped={isYes}
              onClick={() => {
                if (item.include_image.length == 0) {
                  onPress('yes', 'no_image');
                } else {
                  onPress('yes', 'include_image');
                }
              }}></Button>

            <Button
              btnStyle={{marginTop: 10, marginLeft: getMarginLeft()}}
              title={'No'}
              onTaped={isNo}
              onClick={() => {
                if (item.include_image.length == 0) {
                  onPress('no', 'no_image');
                } else {
                  onPress('no', 'include_image');
                }
              }}></Button>
          </View>

          {isIncludeImage(isYes ? 'Yes' : 'No') &&
            haveImage() &&
            getImagePath() != undefined &&
            getImagePath().map((subItem, index) => {              
              if (subItem.toLowerCase().includes('png') || subItem.toLowerCase().includes('jpg') || subItem.toLowerCase().includes('jpeg') ) {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      showSelectionDialog();
                    }}>
                    <View key={'image' + index} style={styles.imageStyle}>
                      <Image
                        style={styles.imageContainer}
                        source={{uri: subItem}}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }
            })}

          {isIncludeImage(isYes ? 'Yes' : 'No') &&
            item.value !== null &&
            (getImagePath() === undefined || getImagePath().length == 0) && (
              <TouchableOpacity
                style={[styles.imageContainer, {marginLeft: 30}]}
                onPress={() => {
                  showSelectionDialog();
                }}>
                <SvgIcon icon="Add_Image" />
              </TouchableOpacity>
            )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 3,
  },
  titleStyle: {
    textAlign: 'center',
    paddingVertical: 5,
    color: Colors.blackColor,
    fontSize: 15,
    fontFamily: Fonts.secondaryMedium,
  },
  imageContainer: {
    marginTop:10,
    padding: 5,
    // borderWidth: 1,
    // borderColor: whiteLabel().fieldBorder,
    borderRadius: 5,
    width: Dimensions.get('screen').width / 4.5,
    height: Dimensions.get('screen').width / 4.5,
  },
  imageStyle: {
    width: 80,
    height: 80,
    marginBottom: 10,
    marginLeft: 30,
  },
});
