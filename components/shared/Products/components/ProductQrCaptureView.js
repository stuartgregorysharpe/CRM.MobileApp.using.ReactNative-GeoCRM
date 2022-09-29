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
      onButtonAction={props.onButtonAction}
      renderLastScanResultView={() => {
        return (
          <LastScanResultView
            totalItemCount={totalItemCount}
            lastScanedQrCode={lastScanedQrCode}
            style={{marginBottom: 0}}
            products={props.products}
            onSubmit={value =>
              onButtonAction({
                type: Constants.actionType.ACTION_DONE,
                value: value,
              })
            }
          />
        );
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
