import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import LastScanResultView from './LastScanResultView';
import {Colors, Constants, Values} from '../../../../constants';

const ProductQrCaptureView = props => {
  
  const totalItemCount = props.totalItemCount || 0;
  const lastScanedQrCode = props.lastScanedQrCode;
  const onSuccess = e => {
    const {data} = e;
    onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: data});
  };
  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
  };
  const renderCustomerMarker = () => {
    return (
      <View style={styles.cameraMarker}>
        <View style={{alignSelf: 'stretch', flexDirection: 'row'}}>
          <View
            style={{
              borderColor: Colors.green2Color,
              borderTopWidth: 4,
              borderLeftWidth: 4,
              width: 80,
              height: 80,
            }}
          />
          <View
            style={{
              width: 70,
              height: 80,
            }}
          />
          <View
            style={{
              borderColor: Colors.green2Color,
              borderTopWidth: 4,
              borderRightWidth: 4,
              width: 80,
              height: 80,
            }}
          />
        </View>
        <View
          style={{
            alignSelf: 'stretch',
            flexDirection: 'row',
            height: 70,
          }}
        />
        <View style={{alignSelf: 'stretch', flexDirection: 'row'}}>
          <View
            style={{
              borderColor: Colors.green2Color,
              borderBottomWidth: 4,
              borderLeftWidth: 4,
              width: 80,
              height: 80,
            }}
          />
          <View
            style={{
              width: 70,
              height: 80,
            }}
          />
          <View
            style={{
              borderColor: Colors.green2Color,
              borderBottomWidth: 4,
              borderRightWidth: 4,
              width: 80,
              height: 80,
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={[styles.container, props.style]}>
      <QRCodeScanner
        onRead={onSuccess}
        reactivate={true}
        customMarker={renderCustomerMarker()}
        showMarker
      />
      <LastScanResultView
        totalItemCount={totalItemCount}
        lastScanedQrCode={lastScanedQrCode}
        style={{marginBottom: 0}}
        products={props.products}
        onSubmit={(value) =>
          onButtonAction({type: Constants.actionType.ACTION_DONE , value :value })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraMarker: {
    width: 230,
    height: 230,
  },
});

export default ProductQrCaptureView;
