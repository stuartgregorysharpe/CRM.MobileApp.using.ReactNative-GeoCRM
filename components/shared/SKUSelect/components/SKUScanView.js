import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import LastScanResultView from './LastScanResultView';
import {Colors, Constants, Values} from '../../../../constants';
import ScanView from '../../../common/ScanView';

const SKUScanView = props => {
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
      showClose
      onClose={() => {
        onButtonAction({type: Constants.actionType.ACTION_DONE});
      }}
      renderLastScanResultView={() => {
        return (
          <LastScanResultView
            totalItemCount={totalItemCount}
            lastScanedQrCode={lastScanedQrCode}
            style={{marginBottom: 0}}
            onSubmit={() =>
              onButtonAction({type: Constants.actionType.ACTION_DONE})
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

export default SKUScanView;
