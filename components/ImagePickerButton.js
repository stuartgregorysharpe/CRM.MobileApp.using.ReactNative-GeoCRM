import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import SvgIcon from './SvgIcon';
import {Notification} from './modal/Notification';
import PhotoCameraPickerDialog from './modal/PhotoCameraPickerDialog';

const ImagePickerButton = props => {
  const { isOptimize , image_timestamp } = props;
  const [isPicker, setIsPicker] = useState(false);
  const onPickImage = image => {
    if (props.onPickImage) {
      props.onPickImage(image);
    }
    setIsPicker(false);
  };
  const onPressCamera = () => {
    setIsPicker(true);
  };

  const renderButton = () => {
    if (props.renderButton) {
      return props.renderButton();
    }

    return (
      <TouchableOpacity onPress={onPressCamera}>
        <SvgIcon icon="Camera_Icon" width="23px" height="23px" />
      </TouchableOpacity>
    );
  };
  return (
    <>
      {renderButton()}

      
      <PhotoCameraPickerDialog
        visible={isPicker}
        message={'Choose Image'}
        onPickImage={onPickImage}
        isOptimize={isOptimize}
        image_timestamp={image_timestamp}
        onModalClose={() => {
          setIsPicker(false);
        }}></PhotoCameraPickerDialog>
      <Notification />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ImagePickerButton;
