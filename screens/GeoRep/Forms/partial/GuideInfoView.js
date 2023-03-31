import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,  
  Image,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { Title } from 'react-native-paper';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import Divider from '../../../../components/Divider';
import { style } from '../../../../constants/Styles';
import { SubmitButton } from '../../../../components/shared/SubmitButton';
import FastImage from 'react-native-fast-image';
import { Values } from '../../../../constants';

export const GuideInfoView = ({ visible, info, onModalClose }) => {
  
  const isShowTitle = info && info.title != undefined && info.title != '';
  const isShowImage = info && info.image != undefined && info.image != '';
  const isShowText = info && info.text != undefined && info.text != '';
  const [isLoading, setIsLoading] = useState(false);

  const [imageHeight, setImageHeight] = useState(undefined);

  useEffect(() => {
    getImageHeight();
  }, [info]);

  const getImageHeight = () => {
    setIsLoading(true);
    Image.getSize(info.image, (width, height) => {
      const screenWidth = Dimensions.get('window').width * 0.8;
      const screenHeight = Dimensions.get("window").height;
      const scaleFactor = width / screenWidth;
      var requiredImageHeight = height / scaleFactor;      
      requiredImageHeight = parseInt(requiredImageHeight) > screenHeight - 100 ? Values.modalHeight : parseInt(requiredImageHeight);      
      setImageHeight(requiredImageHeight);
      setIsLoading(false);
    }, (error) => {
      setIsLoading(false);
      console.log(error);
    });
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onModalClose}>
      <TouchableWithoutFeedback onPress={onModalClose}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <TouchableOpacity style={{ padding: 6 }}>
              <Divider></Divider>
            </TouchableOpacity>

            {isShowTitle && (
              <View style={styles.sliderHeader}>
                <Title style={{ fontFamily: Fonts.primaryBold }}>
                  {info.title}
                </Title>
              </View>
            )}

            {!isLoading && isShowImage && (
              <View style={{ alignItems: 'center' , marginBottom: 5 }}>
                <FastImage
                  style={[styles.imageContainer, { height: imageHeight && imageHeight != undefined ? parseInt(imageHeight) : 300 }]}
                  source={{ uri: info.image }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
            )}
            {isLoading && <ActivityIndicator size={'small'} color={Colors.primaryColor} />}
            {isShowText && (
              <Title style={{ fontFamily: Fonts.primaryRegular, fontSize: 14 }}>
                {info.text}
              </Title>
            )}

            <SubmitButton
              onSubmit={() => onModalClose()}
              title="Close"></SubmitButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.bgColor,
    elevation: 2,
    zIndex: 2000,
    padding: 10,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    width: '80%',
  },
});
