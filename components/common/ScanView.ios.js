import React, {useState, useEffect, useCallback} from 'react';
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

const REGION_HEIGHT = 120;
const REGION_WIDTH = Values.deviceWidth - 80;
const REGION_POSITION_TOP = (Values.deviceHeight * 0.6 - 120) / 2;
const REGION_POSITION_LEFT = 40;
const WINDOW_WIDTH = Values.deviceWidth;
const WINDOW_HEIGHT = Values.deviceHeight;

const ScanView = props => {
  const [barcode, setBarcode] = useState(null);
  const [isPartialDetect, setIsPartialDetect] = useState(props.isPartialDetect);
  useEffect(() => {
    //requestPermission();
    const interval = setInterval(() => {
      setBarcode(null);
    }, 1500);
    return () => clearInterval(interval);
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
    setBarcode(e);
    checkAndCapture(e);

    //onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: data});
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
    if (isPartialDetect) {
      return renderPartialCustomerMarker();
    }
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
  const validateBarcode = barcode => {
    if (!isPartialDetect) {
      return true;
    }
    const boundingBox = getBoundingBox(barcode.bounds);

    const topLeft = {x: REGION_POSITION_LEFT, y: REGION_POSITION_TOP};
    const bottomRight = {
      x: Values.deviceWidth - REGION_POSITION_LEFT,
      y: REGION_POSITION_TOP + REGION_HEIGHT,
    };
    if (
      boundingBox.origin.x >= topLeft.x &&
      boundingBox.origin.y >= topLeft.y &&
      boundingBox.origin.x + boundingBox.size.width <= bottomRight.x &&
      boundingBox.origin.y + boundingBox.size.height <= bottomRight.y
    ) {
      return true;
    }
    return false;
  };
  const getBoundingBox = boundingBox => {
    return {
      size: {
        height: Number(boundingBox.size.height),
        width: Number(boundingBox.size.width),
      },
      origin: {
        x: Number(boundingBox.origin.x),
        y: Number(boundingBox.origin.y),
      },
    };
  };
  const renderBoundingBoxes = () => {
    if (!isPartialDetect) return null;
    if (!barcode) return null;

    const boundingBox = getBoundingBox(barcode.bounds);
    const isValid = validateBarcode(barcode);
    return (
      <View
        key={'boudingBox'}
        style={{
          borderWidth: 2,
          borderColor: isValid ? 'red' : 'gray',
          height: boundingBox.size.height,
          width: boundingBox.size.width,
          left: boundingBox.origin.x,
          top: boundingBox.origin.y,
          position: 'absolute',
        }}></View>
    );
  };
  const checkAndCapture = barcode => {
    let isChecked = false;
    if (validateBarcode(barcode)) {
      isChecked = true;
      onButtonAction({
        type: Constants.actionType.ACTION_CAPTURE,
        value: barcode.data,
      });
    }
    return isChecked;
  };
  const renderPartialCustomerMarker = () => {
    const centerSpacing = Values.deviceWidth - 160;
    return (
      <View style={styles.regionCameraMarker}>
        <View style={{alignSelf: 'stretch', flexDirection: 'row'}}>
          <View
            style={{
              borderColor: Colors.green2Color,
              borderTopWidth: 4,
              borderLeftWidth: 4,
              width: 40,
              height: 40,
            }}
          />
          <View
            style={{
              width: centerSpacing,
              height: 40,
            }}
          />
          <View
            style={{
              borderColor: Colors.green2Color,
              borderTopWidth: 4,
              borderRightWidth: 4,
              width: 40,
              height: 40,
            }}
          />
        </View>
        <View
          style={{
            alignSelf: 'stretch',
            flexDirection: 'row',
            height: 35,
          }}
        />
        <View style={{alignSelf: 'stretch', flexDirection: 'row'}}>
          <View
            style={{
              borderColor: Colors.green2Color,
              borderBottomWidth: 4,
              borderLeftWidth: 4,
              width: 40,
              height: 40,
            }}
          />
          <View
            style={{
              width: centerSpacing,
              height: 40,
            }}
          />
          <View
            style={{
              borderColor: Colors.green2Color,
              borderBottomWidth: 4,
              borderRightWidth: 4,
              width: 40,
              height: 40,
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
        showMarker
        customMarker={<View />}
        cameraStyle={{height: '100%'}}
        topViewStyle={{position: 'absolute'}}
        bottomViewStyle={{position: 'absolute'}}
      />
      <View style={styles.detectLayer}>
        {renderCustomerMarker()}
        {renderBoundingBoxes()}
      </View>
      {renderLastScanResultView()}
      {renderCloseButton()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  regionCameraMarker: {
    width: Values.deviceWidth - 80,
    height: 120,
    position: 'absolute',
    top: (Values.deviceHeight * 0.6 - 120) / 2,
    left: 40,
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
  detectLayer: {
    width: '100%',
    height: '100%',
    top: Values.statusBarHeight,
    left: 0,
    position: 'absolute',
  },
});

export default ScanView;
