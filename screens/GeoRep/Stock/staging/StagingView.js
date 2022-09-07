import React, {useState, useEffect, useRef, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import QRScanModal from '../../../../components/common/QRScanModal';
import SearchBar from '../../../../components/SearchBar';
import {SubmitButton} from '../../../../components/shared/SubmitButton';
import {Constants} from '../../../../constants';
import ShipmentScanResultView from './components/ShipmentScanResultView';
import StagingShipmentList from './components/StagingShipmentList';
import {filterItems, getShipmentsFromItems} from './helper';
import ScanningListViewModal from './modals/ScanningListViewModal';

const StagingView = props => {
  const [keyword, setKeyword] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewListItems, setViewListItems] = useState([]);
  const [lastScanedQrCode, setLastScannedQrCode] = useState('');
  const captureModalRef = useRef(null);
  const scanningListViewModalRef = useRef(null);
  const items = useMemo(
    () => filterItems(props.items, keyword),
    [props.items, keyword],
  );

  const shipments = useMemo(() => getShipmentsFromItems(items), [items]);
  const onCapture = () => {
    if (captureModalRef && captureModalRef.current) {
      captureModalRef.current.showModal();
    }
  };
  const onCaptureAction = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CAPTURE) {
      setLastScannedQrCode(value);
    }
  };
  const onSearch = keyword => {
    setKeyword(keyword);
  };
  const onItemAction = ({type, item}) => {
    if (type == Constants.actionType.ACTION_VIEW) {
      if (item.items) {
        setViewListItems(item.items);
      }
      scanningListViewModalRef.current.showModal();
    }
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
              items={selectedItems}
              lastScanedQrCode={lastScanedQrCode}
              style={{marginBottom: 20}}
              onClose={() => captureModalRef.current.hideModal()}
              onSubmit={() => captureModalRef.current.hideModal()}
            />
          );
        }}
      />
      <StagingShipmentList
        items={shipments}
        style={{flex: 1}}
        onItemAction={onItemAction}
      />
      <SubmitButton
        title={'Accept All'}
        onSubmit={() => {
          if (props.onPress) {
            props.onPress();
          }
        }}
        style={styles.submitButton}
      />
      <ScanningListViewModal
        ref={scanningListViewModalRef}
        title={`Items: ${viewListItems.length}`}
        items={viewListItems}
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
