import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Colors, Constants, Values} from '../../constants';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';

import SvgIcon from '../SvgIcon';

const REGION_HEIGHT = 120;
const REGION_WIDTH = Values.deviceWidth - 80;
const REGION_POSITION_TOP = (Values.deviceHeight * 0.6 - 120) / 2;
const REGION_POSITION_LEFT = 40;
const ScanView = props => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const [isPartialDetect, setIsPartialDetect] = useState(props.isPartialDetect);
  const [frameProcessor, barcodes] = useScanBarcodes(
    [BarcodeFormat.ALL_FORMATS],
    {
      checkInverted: true,
    },
  );
  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  React.useEffect(() => {
    if (barcodes) {
      barcodes.forEach(barcode => {
        checkAndCapture(barcode);
      });
    }
    console.log('barcodes', JSON.stringify(barcodes));
  }, [barcodes]);
  const checkAndCapture = barcode => {
    if (validateBarcode(barcode)) {
      onButtonAction({
        type: Constants.actionType.ACTION_CAPTURE,
        value: barcode.rawValue,
      });
    }
  };
  const validateBarcode = barcode => {
    const cornerPoints = getPointsInView(barcode.cornerPoints);
    if (!isPartialDetect) {
      return true;
    }
    const topLeft = {x: REGION_POSITION_LEFT, y: REGION_POSITION_TOP};
    const bottomRight = {
      x: Values.deviceWidth - REGION_POSITION_LEFT,
      y: REGION_POSITION_TOP + REGION_HEIGHT,
    };
    let isValid = true;
    cornerPoints.forEach(point => {
      const isPointInRegion =
        point.x >= topLeft.x &&
        point.y >= topLeft.y &&
        point.x <= bottomRight.x &&
        point.y <= bottomRight.y;
      if (!isPointInRegion) {
        isValid = false;
      }
    });
    return isValid;
  };
  const getPointsInView = cornerPoints => {
    const ratio = 0.72;
    return cornerPoints.map(point => {
      return {
        x: point.x * ratio,
        y: point.y * ratio,
      };
    });
  };
  const renderBoundingBoxes = () => {
    const pointViews = [];
    barcodes.map((barcode, index) => {
      const cornerPoints = getPointsInView(barcode.cornerPoints);
      const isValid = validateBarcode(barcode);
      cornerPoints.forEach(point => {
        pointViews.push(
          <View
            key={'point' + pointViews.length}
            style={{
              borderRadius: 4,
              backgroundColor: isValid ? 'red' : 'gray',
              width: 8,
              height: 8,
              left: point.x,
              top: point.y,
              position: 'absolute',
            }}></View>,
        );
      });
    });
    return pointViews;
  };
  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
  };
  const renderSwitchPartialButton = () => {
    return (
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => {
          setIsPartialDetect(!isPartialDetect);
        }}>
        <SvgIcon icon="Sync" width="50" height="50" />
      </TouchableOpacity>
    );
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
              width: 80,
              height: 70,
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
              width: 80,
              height: 70,
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
    <View style={[styles.container, props.style]}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {device != null && hasPermission && (
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
        )}
        {renderCustomerMarker()}
        <View style={styles.detectLayer}>{renderBoundingBoxes()}</View>
      </View>

      {renderLastScanResultView()}
      {renderSwitchPartialButton()}
      {renderCloseButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
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
  switchButton: {
    position: 'absolute',
    top: 35,
    left: 24,
  },
  detectLayer: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
  },
});

export default ScanView;
