import React, {useState, useEffect, useRef, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {postApiRequest} from '../../../../actions/api.action';
import QRScanModal from '../../../../components/common/QRScanModal';
import SearchBar from '../../../../components/SearchBar';
import {SubmitButton} from '../../../../components/shared/SubmitButton';
import {Constants} from '../../../../constants';
import ShipmentScanResultView from './components/ShipmentScanResultView';
import StagingShipmentList from './components/StagingShipmentList';
import {
  filterItems,
  filterItemsByBarcode,
  getShipmentsFromItems,
} from './helper';
import ScanningListViewModal from './modals/ScanningListViewModal';

const StagingView = props => {
  const [keyword, setKeyword] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewListItems, setViewListItems] = useState([]);
  const [lastScanedQrCode, setLastScannedQrCode] = useState('');
  const captureModalRef = useRef(null);
  const scanningListViewModalRef = useRef(null);
  const captureScanningListViewModalRef = useRef(null);
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
      const capturedItems = filterItemsByBarcode(props.items, value);
      if (capturedItems && capturedItems.length > 0) {
        const _selectedItems = [...selectedItems];
        capturedItems.forEach(item => {
          const alreadyExist = selectedItems.find(x => x.iccid == item.iccid);
          if (!alreadyExist) {
            _selectedItems.push(item);
          }
        });
        setSelectedItems(_selectedItems);
        console.log('_selectedItems', selectedItems);
      }
      setLastScannedQrCode(value);
    }
  };
  const onCloseScanModal = () => {
    console.log('onClose');
    setSelectedItems([]);
    setLastScannedQrCode('');
    captureModalRef.current.hideModal();
  };
  const onSearch = keyword => {
    setKeyword(keyword);
  };
  const onItemAction = ({type, item}) => {
    if (type == Constants.actionType.ACTION_VIEW) {
      if (item.items) {
        const _items = [...item.items];
        setViewListItems(_items);
      }
      scanningListViewModalRef.current.showModal();
    } else if (type == Constants.actionType.ACTION_ACCEPT) {
      if (item.items) {
        onAccept(item.items);
      }
    }
  };
  const onCaptureViewListItemAction = ({type, item}) => {
    if (type == Constants.actionType.ACTION_REMOVE) {
      const _items = selectedItems.filter(x => x.iccid != item.iccid);
      setSelectedItems(_items);
    }
  };
  const onListViewItemAction = ({type, item}) => {
    if (type == Constants.actionType.ACTION_REMOVE) {
      const _items = viewListItems.filter(x => x.iccid != item.iccid);
      setViewListItems(_items);
    }
  };
  const onPressViewListInScanResult = () => {
    if (selectedItems) {
      const _items = [...selectedItems];
      setViewListItems(_items);
      console.log('onPressViewListInScanResult');
      captureScanningListViewModalRef.current.showModal();
    }
  };
  const onAccept = items => {
    if (!items) return;
    if (props.onAccept) {
      props.onAccept(items);
    }
    onResetSelection();
  };
  const onResetSelection = () => {
    scanningListViewModalRef.current.hideModal();
    setSelectedItems([]);
    captureModalRef.current.hideModal();
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
        isNotCloseAfterCapture
        onButtonAction={onCaptureAction}
        onClose={onCloseScanModal}
        showClose={true}
        renderLastScanResultView={() => {
          return [
            <ShipmentScanResultView
              key={'scan-result'}
              items={selectedItems}
              lastScanedQrCode={lastScanedQrCode}
              style={{marginBottom: 20, height: 200}}
              onViewList={onPressViewListInScanResult}
              onAddCode={code => {
                onCaptureAction({
                  type: Constants.actionType.ACTION_CAPTURE,
                  value: code,
                });
              }}
              onClose={onCloseScanModal}
              onSubmit={() => {
                if (selectedItems && selectedItems.length > 0) {
                  onAccept(selectedItems);
                  captureModalRef.current.hideModal();
                }
              }}
            />,
            <ScanningListViewModal
              key={'capture-list'}
              ref={captureScanningListViewModalRef}
              title={`Items: ${selectedItems.length}`}
              items={selectedItems}
              onAccept={onAccept}
              onItemAction={onCaptureViewListItemAction}
            />,
          ];
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
          if (props.onAccept) {
            props.onAccept(items);
          }
        }}
        style={styles.submitButton}
      />
      <ScanningListViewModal
        ref={scanningListViewModalRef}
        title={`Items: ${viewListItems.length}`}
        items={viewListItems}
        onAccept={onAccept}
        onItemAction={onListViewItemAction}
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
