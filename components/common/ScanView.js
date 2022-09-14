import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Colors, Constants, Values} from '../../constants';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import SvgIcon from '../SvgIcon';

const ScanView = props => {
  useEffect(() => {
    //requestPermission();
  }, []);
  const requestPermission = () => {
    if (Platform.OS == 'ios') {
      check(PERMISSIONS.IOS.CAMERA)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              break;
            case RESULTS.DENIED:
              request(PERMISSIONS.IOS.CAMERA);
              break;
            case RESULTS.LIMITED:
              console.log(
                'The permission is limited: some actions are possible',
              );
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  const onSuccess = e => {
    const {data} = e;
    onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: data});
  };
  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
  };
  const renderCloseButton = () => {
    if (props.showClose) {
      return (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            if (props.onClose) {
              props.onClose();
            }
          }}>
          <SvgIcon icon="Close" width="30" height="30" />
        </TouchableOpacity>
      );
    }
    return null;
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
  const renderLastScanResultView = () => {
    if (props.renderLastScanResultView) {
      return props.renderLastScanResultView();
    }
    return null;
  };
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <QRCodeScanner
        onRead={onSuccess}
        reactivate={true}
        customMarker={renderCustomerMarker()}
        showMarker
        cameraStyle={{height: '100%'}}
        topViewStyle={{position: 'absolute'}}
        bottomViewStyle={{position: 'absolute'}}
      />
      {renderLastScanResultView()}
      {renderCloseButton()}
    </SafeAreaView>
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
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 24,
  },
});

export default ScanView;
