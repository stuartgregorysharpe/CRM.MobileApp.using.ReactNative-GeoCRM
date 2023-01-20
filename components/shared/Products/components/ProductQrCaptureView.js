import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import LastScanResultView from './LastScanResultView';
import {Colors, Constants, Values} from '../../../../constants';
import ScanView from '../../../common/ScanView';

const ProductQrCaptureView = props => {
  const totalItemCount = props.totalItemCount || 0;
  const lastScanedQrCode = props.lastScanedQrCode;

  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
  };

  return (
    <ScanView
      onButtonAction={onButtonAction}
      showClose
      onClose={() => {
        onButtonAction({type: Constants.actionType.ACTION_CLOSE});
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  cameraMarker: {
    width: 230,
    height: 230,
  },
});

export default ProductQrCaptureView;
