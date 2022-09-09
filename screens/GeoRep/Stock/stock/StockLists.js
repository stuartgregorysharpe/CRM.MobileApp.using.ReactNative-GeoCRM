import {View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useRef, useMemo} from 'react';
import {getApiRequest} from '../../../../actions/api.action';
import SearchBar from '../../../../components/SearchBar';
import SvgIcon from '../../../../components/SvgIcon';
import StockListItem from './components/StockListItem';
import StockListHeader from './components/StockListHeader';
import {SubmitButton} from '../../../../components/shared/SubmitButton';
import AddStockModal from './modal/AddStockModal';
import {Constants, Strings} from '../../../../constants';
import StockDeviceDetailsModal from './modal/device/StockDeviceDetailsModal';
import StockSignatureModal from './modal/device/StockSignatureModal';
import SwopAtTraderModal from './modal/device/SwopAtTraderModal';
import TransferModal from './modal/device/TransferModal';
import StockConsumableModal from './modal/consumable/StockConsumableModal';
import SellToTraderSignatureModal from './modal/consumable/SellToTraderSignatureModal';
import {useDispatch} from 'react-redux';
import {showNotification} from '../../../../actions/notification.action';
import QRScanModal from '../../../../components/common/QRScanModal';
import ShipmentScanResultView from '../staging/components/ShipmentScanResultView';
import ScanningListViewModal from '../staging/modals/ScanningListViewModal';
import {filterItemsByBarcode} from '../staging/helper';
import {
  filterItems,
  getItemsFromStockItems,
  getStockItemsFromItems,
} from './helper';

export default function StockLists() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [stockItem, setStockItem] = useState({});
  const addStockModalRef = useRef(null);
  const stockDetailsModalRef = useRef(null);
  const stockSignatureModalRef = useRef(null);
  const swopAtTraderModalRef = useRef(null);
  const traderModalRef = useRef(null);
  const stockConsumableModalRef = useRef(null);
  const consumableSellToTraderModalRef = useRef(null);
  const captureScanningListViewModalRef = useRef(null);
  const captureModalRef = useRef(null);
  const [locationId, setLocationId] = useState(0);
  const [lastScanedQrCode, setLastScannedQrCode] = useState('');
  const [items, setItems] = useState([]);
  const filteredItems = useMemo(
    () => filterItems(items, searchKeyword),
    [items, searchKeyword],
  );
  const stockLists = useMemo(
    () => getStockItemsFromItems(filteredItems),
    [filteredItems],
  );
  const [selectedItems, setSelectedItems] = useState([]);
  /*const selectedCodes = useMemo(
    () => selectedItems.map(x => x.iccid),
    selectedItems,
  );*/
  const selectedCodes = [];
  const dispatch = useDispatch();
  let isMount = true;

  useEffect(() => {
    callStockLists();
    return () => {
      isMount = false;
    };
  }, []);

  const callStockLists = () => {
    getApiRequest('stockmodule/stock-list', {})
      .then(res => {
        if (isMount) {
          console.log('res', JSON.stringify(res));
          const _items = getItemsFromStockItems(res.stock_items);
          setItems(_items);
        }
      })
      .catch(e => {
        console.log('E', e);
      });
  };

  const onStockItemPressed = item => {
    setStockItem(item);
    if (item.stock_type === Constants.stockType.DEVICE) {
      stockDetailsModalRef.current.showModal();
    } else if (item.stock_type === Constants.stockType.CONSUMABLE) {
      stockConsumableModalRef.current.showModal();
    } else if (item.stock_type === Constants.stockType.SIM) {
      if (item.items) {
        setSelectedItems(item.items);
      }

      captureModalRef.current.showModal();
    }
  };

  const renderItems = (item, index) => {
    return (
      <StockListItem
        onItemPressed={() => onStockItemPressed(item)}
        item={item}
        key={index}></StockListItem>
    );
  };

  const onAddStockButtonAction = async ({type, value}) => {
    if (type == Constants.actionType.ACTION_CLOSE) {
      addStockModalRef.current.hideModal();
      callStockLists();
    }
  };

  const onStockDetailsModalClosed = async ({type, value}) => {
    if (type == Constants.actionType.ACTION_NEXT) {
      setLocationId(value.locationId);
      if (value.stockType === Constants.stockDeviceType.SELL_TO_TRADER) {
        stockSignatureModalRef.current.showModal();
      } else if (value.stockType === Constants.stockDeviceType.SWOP_AT_TRADER) {
        swopAtTraderModalRef.current.showModal();
      } else if (value.stockType === Constants.stockDeviceType.TARDER) {
        traderModalRef.current.showModal();
      }
    }
  };

  const onStockSignature = async ({type, value}) => {
    if (type == Constants.actionType.ACTION_CLOSE) {
      stockSignatureModalRef.current.hideModal();
      /*if (simDetailsModalRef.current) {
        simDetailsModalRef.current.hideModal();
      }*/
      callStockLists();
    }
  };

  const onSwapAtTraderModalClosed = async ({type, value}) => {
    if (type == Constants.actionType.ACTION_CLOSE) {
      if (swopAtTraderModalRef.current) {
        swopAtTraderModalRef.current.hideModal();
      }
      if (stockDetailsModalRef.current) {
        stockDetailsModalRef.current.hideModal();
      }
      callStockLists();
    }
  };

  const onTransferModalClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CLOSE) {
      if (traderModalRef.current) {
        traderModalRef.current.hideModal();
      }
      /*if (simDetailsModalRef.current) {
        simDetailsModalRef.current.hideModal();
      }*/
      callStockLists();
    }
  };

  const onStockConsumableModalClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_NEXT) {
      setLocationId(value.locationId);
      if (value.stockType === Constants.stockDeviceType.SELL_TO_TRADER) {
        consumableSellToTraderModalRef.current.showModal();
      } else if (value.stockType === Constants.stockDeviceType.TRANSFER) {
        traderModalRef.current.showModal();
      }
    }
  };

  const onStockConsumableSellToTraderModalClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CLOSE) {
      if (consumableSellToTraderModalRef.current) {
        consumableSellToTraderModalRef.current.hideModal();
      }
      if (stockConsumableModalRef.current) {
        stockConsumableModalRef.current.hideModal();
      }
      callStockLists();
    }
  };

  /*const onStockSimDetailsModalClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_NEXT) {
      setLocationId(value.locationId);
      if (value.stockType === Constants.stockDeviceType.SELL_TO_TRADER) {
        stockSignatureModalRef.current.showModal();
      } else if (value.stockType === Constants.stockDeviceType.SELL_TO_TRADER) {
      } else if (value.stockType === Constants.stockDeviceType.TARDER) {
        traderModalRef.current.showModal();
      }
    } else if (type == Constants.actionType.ACTION_CAPTURE) {
      var check = iccids.filter(item => item.code === value);
      var checkFromSelectedCodes = selectedCodes.filter(
        item => item.code === value,
      );
      if (check.length > 0 && checkFromSelectedCodes.length == 0) {
        setSelectedCodes([
          ...selectedCodes,
          {
            stock_item_id: check[0].stock_item_id,
            code: value,
            type: check[0].type,
          },
        ]);
      } else {
        dispatch(
          showNotification({
            type: Strings.Success,
            message: Strings.Stock.ICCID_Not_Found,
            buttonText: 'Ok',
          }),
        );
      }
    } else if (type == Constants.actionType.ACTION_REMOVE) {
      var tmp = selectedCodes.filter(item => item.code !== value.code);
      setSelectedCodes(tmp);
    }
  };*/

  const onCaptureAction = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CAPTURE) {
      const capturedItems = filterItemsByBarcode(props.items, value);
      if (capturedItems && capturedItems.length > 0) {
        const _selectedItems = [...selectedItems, ...capturedItems];
        setSelectedItems(_selectedItems);
      }
      setLastScannedQrCode(value);
    }
  };
  const onCloseScanModal = () => {
    setSelectedItems([]);
    setLastScannedQrCode('');
    captureModalRef.current.hideModal();
  };
  const onPressViewListInScanResult = () => {
    if (selectedItems) {
      console.log('onPressViewListInScanResult');
      captureScanningListViewModalRef.current.showModal();
    }
  };
  const onCaptureViewListItemAction = ({type, item}) => {
    if (type == Constants.actionType.ACTION_REMOVE) {
      const _items = selectedItems.filter(x => x.iccid != item.iccid);
      setSelectedItems(_items);
    }
  };
  const onSelectStockTypeForCapture = () => {};
  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <SearchBar
        onSearch={text => {
          setSearchKeyword(text);
        }}
        initVal={searchKeyword}
        isFilter={true}
        animation={() => {}}
      />

      <View style={{flexDirection: 'column', flex: 1}}>
        <FlatList
          ListHeaderComponent={() => <StockListHeader></StockListHeader>}
          removeClippedSubviews={false}
          initialNumToRender={10}
          data={stockLists}
          renderItem={({item, index}) => renderItems(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <SubmitButton
        onSubmit={() => {
          if (addStockModalRef.current) {
            addStockModalRef.current.showModal();
          }
        }}
        style={{marginHorizontal: 20, marginTop: 10, marginBottom: 10}}
        title={Strings.Stock.Add_Stock}></SubmitButton>

      <TouchableOpacity
        style={{position: 'absolute', right: 30, bottom: 55}}
        onPress={onSelectStockTypeForCapture}>
        <View>
          <SvgIcon icon="Add_Stock" width="55" height="55" />
        </View>
      </TouchableOpacity>

      <AddStockModal
        ref={addStockModalRef}
        title={Strings.Stock.Add_Stock}
        onButtonAction={onAddStockButtonAction}
      />

      {/* stock device modal */}
      <StockDeviceDetailsModal
        ref={stockDetailsModalRef}
        title={'Details'}
        item={stockItem}
        onButtonAction={onStockDetailsModalClosed}
      />

      <StockSignatureModal
        ref={stockSignatureModalRef}
        title={Strings.Stock.Please_Sign}
        locationId={locationId}
        item={stockItem}
        selectedCodes={selectedCodes}
        onButtonAction={onStockSignature}
      />

      <SwopAtTraderModal
        ref={swopAtTraderModalRef}
        title="Swop at Trader"
        locationId={locationId}
        item={stockItem}
        onButtonAction={onSwapAtTraderModalClosed}
      />

      <TransferModal
        ref={traderModalRef}
        title={'Transfer'}
        hideClear={true}
        stockItem={stockItem}
        selectedCodes={selectedCodes}
        onButtonAction={onTransferModalClosed}
      />

      {/* stock consumable modal  */}
      <StockConsumableModal
        ref={stockConsumableModalRef}
        title="Details"
        item={stockItem}
        locationId={locationId}
        onButtonAction={onStockConsumableModalClosed}
      />

      <SellToTraderSignatureModal
        ref={consumableSellToTraderModalRef}
        title="Sell To Trader"
        item={stockItem}
        locationId={locationId}
        onButtonAction={onStockConsumableSellToTraderModalClosed}
      />

      {/* stock sim modal  <SimDetailsModal
          ref={simDetailsModalRef}
          selectedCodes={selectedCodes}
          codeLists={iccids}
          onButtonAction={onStockSimDetailsModalClosed} 
        />*/}
      <QRScanModal
        ref={captureModalRef}
        onButtonAction={onCaptureAction}
        onClose={onCloseScanModal}
        showClose={true}
        renderLastScanResultView={() => {
          return [
            <ShipmentScanResultView
              key={'scan-result'}
              items={selectedItems}
              lastScanedQrCode={lastScanedQrCode}
              style={{marginBottom: 20}}
              onViewList={onPressViewListInScanResult}
              onAddCode={code => {
                onCaptureAction({
                  type: Constants.actionType.ACTION_CAPTURE,
                  value: code,
                });
              }}
              onClose={onCloseScanModal}
              onSubmit={() => captureModalRef.current.hideModal()}
            />,
            <ScanningListViewModal
              key={'capture-list'}
              ref={captureScanningListViewModalRef}
              title={`Items: ${selectedItems.length}`}
              items={selectedItems}
              onItemAction={onCaptureViewListItemAction}
            />,
          ];
        }}
      />
    </View>
  );
}
