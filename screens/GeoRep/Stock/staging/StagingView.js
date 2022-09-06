import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import QRScanModal from '../../../../components/common/QRScanModal';
import SearchBar from '../../../../components/SearchBar';
import {SubmitButton} from '../../../../components/shared/SubmitButton';
import ShipmentScanResultView from './components/ShipmentScanResultView';
import StagingShipmentList from './components/StagingShipmentList';

const StagingView = props => {
  const {shipments} = props;
  const [keyword, setKeyword] = useState('');
  const captureModalRef = useRef(null);
  const onCapture = () => {
    if (captureModalRef && captureModalRef.current) {
      captureModalRef.current.showModal();
    }
  };
  const onCaptureAction = () => {};
  const onSearch = keyword => {
    setKeyword(keyword);
  };
  return (
    <View style={[styles.container, props.style]}>
      <SearchBar
        isFilter
        onSearch={onSearch}
        suffixButtonIcon="Scan_Icon"
        onSuffixButtonPress={onCapture}
      />
      <QRScanModal
        ref={captureModalRef}
        onButtonAction={onCaptureAction}
        renderLastScanResultView={() => {
          return (
            <ShipmentScanResultView
              lastScanedQrCode={lastScanedQrCode}
              style={{marginBottom: 20}}
              onSubmit={() => captureModalRef.current.hideModal()}
            />
          );
        }}
      />
      <StagingShipmentList items={shipments} style={{flex: 1}} />
      <SubmitButton
        title={'Accept All'}
        onSubmit={() => {
          if (props.onPress) {
            props.onPress();
          }
        }}
        style={styles.submitButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submitButton: {
    alignSelf: 'stretch',
    marginHorizontal: 10,
    marginBottom: 16,
  },
});

export default StagingView;
