import {
  View,
  Text,
  Modal,  
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Divider from '../../../../../components/Divider';
import {style} from '../../../../../constants/Styles';
import Fonts from '../../../../../constants/Fonts';
import Colors, {whiteLabel} from '../../../../../constants/Colors';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import SvgIcon from '../../../../../components/SvgIcon';
import {AppText} from '../../../../../components/common/AppText';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import {ScrollView} from 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';

export default function UploadFileView({
  visible,
  onClose,
  onValueChanged,
  item,
}) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (progress < 10) {        
        setProgress(progress + 1);
      }
    }, 50);
  }, [progress]);

  const onSave = () => {
    onClose();    
  };

  const updateImageData = async path => {
    if (item.value && item.value !== null) {
      onValueChanged([...item.value, path]);
    } else {
      onValueChanged([path]);
    }    
    setProgress(0);
  };

  const optimizeImage = (filePath, quality, index) => {
    var outputPath =
      Platform.OS === 'ios'
        ? `${RNFS.DocumentDirectoryPath}`
        : `${RNFS.ExternalDirectoryPath}`;
    
    var width_height = 800;
    if (item.optimize && item.optimize === '1') {
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
        console.log('resut', res);
        if (item.optimize && item.optimize === '1') {
          if (res.size < 1024 * 200 || index >= 2) {
            console.log('POST image size', res);
            updateImageData(res);
          } else {
            var newQuality = (1024 * 200 * 100) / res.size;
            console.log('newQuality', newQuality);
            optimizeImage(res.uri, newQuality, index + 1);
          }
        } else {
          if (res.size < 1024 * 500 || index >= 2) {
            console.log('POST image size', res);
            updateImageData(res);
          } else {
            var newQuality = (1024 * 500 * 100) / res.size;
            console.log('newQuality', newQuality);
            optimizeImage(res.uri, newQuality, index + 1);
          }
        }
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  const getBarWidth = () => {
    if (Platform.OS === 'ios') {
      return Dimensions.get('screen').width * 0.6;
    } else {
      return Dimensions.get('screen').width * 0.55;
    }
  };

  const renderItem = (element, index) => {
    return (
      <View style={{marginBottom: 10}} key={'upload_file' + index}>
        <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 10}}>
          <View style={{marginLeft: 10, marginRight: 10}}>
            <SvgIcon
              icon={
                element && element.name && element.name.includes('.mp3')
                  ? 'Video_Library'
                  : 'File'
              }
              width="25px"
              height="25px"
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 1, flexDirection: 'column', marginRight: 10}}>
              <View>
                <AppText
                  size="big"
                  style={{fontWeight: '500', marginBottom: 3}}
                  title={element.name}></AppText>
              </View>
              <View
                style={{
                  height: 5,
                  width: getBarWidth(),
                  backgroundColor: Colors.greyColor,
                }}>
                <View
                  style={{
                    height: 5,
                    width:
                      item.value && item.value.length - 1 === index
                        ? (getBarWidth() * progress) / 10
                        : getBarWidth(),
                    backgroundColor: whiteLabel().itemSelectedIconFill,
                  }}></View>
              </View>
            </View>
            <AppText title={parseInt(element.size / 1024) + 'kb'}></AppText>
          </View>

          {progress < 10 && item.value.length - 1 == index && (
            <View style={{marginLeft: 10, marginRight: 10}}>
              <SvgIcon icon={'Check_Circle'} width="25px" height="25px" />
            </View>
          )}
          {(progress == 10 || item.value.length - 1 != index) && (
            <View
              style={{
                backgroundColor: whiteLabel().itemSelectedIconFill,
                width: 23,
                height: 23,
                borderRadius: 20,
                alignItems: 'center',
                marginLeft: 10,
                marginRight: 10,
              }}>
              <SvgIcon
                icon={'Yes_No_Button_Check'}
                width="20px"
                height="20px"
              />
            </View>
          )}
        </View>
        <View style={{height: 1, backgroundColor: Colors.greyColor}}></View>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={style.centeredView}>
        <View style={style.modalView}>
          {/* <TouchableWithoutFeedback onPress={onClose}>  
                        </TouchableWithoutFeedback> */}

          <TouchableOpacity style={{padding: 6}}>
            <Divider />
          </TouchableOpacity>

          <View style={styles.sliderHeader}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Fonts.primaryBold,
                color: Colors.blackColor,
                fontSize: 16,
                flex: 1,
              }}>
              Select you file upload:
            </Text>
            <TouchableOpacity
              style={styles.closeModal}
              onPress={() => {
                onValueChanged([]);
                onClose();
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.secondaryRegular,
                  color: Colors.selectedRedColor,
                }}>
                Clear
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
              }).then(res => {
                console.log('res : ' + JSON.stringify(res));
                if (res && res.length > 0) {
                  var fileName = 'tmp';
                  updateImageData(res[0]);
                }
              });
            }}>
            <View style={styles.selectFileContainer}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <SvgIcon icon="File_Upload" width="35px" height="35px" />
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View style={styles.inputStyle}>
                  <Text style={styles.textStyle}>Select File</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <ScrollView style={{height: 200}}>
            {item &&
              item.value &&
              item.value.length > 0 &&
              item.value.map((element, index) => {
                return renderItem(element, index);
              })}
          </ScrollView>

          <SubmitButton onSubmit={() => onSave()} title="Upload"></SubmitButton>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  selectFileContainer: {
    padding: 10,
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: whiteLabel().fieldBorder,
  },
  
  textStyle: {
    marginHorizontal: 10,
    color: whiteLabel().actionOutlineButtonText,
    fontFamily: Fonts.primaryRegular,
  },

  inputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: whiteLabel().actionOutlineButtonBorder,
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },

  closeModal: {
    paddingRight: 5,
  },
});
