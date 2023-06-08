import {View, FlatList, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
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
import SimDetailsModal from './modal/sim/SimDetailsModal';
import {filterItemsByBarcode} from '../staging/helper';
import {
  captureDeviceStockItem,
  filterItems,
  getItemsFromStockItems,
  getStockItemsFromItems,
} from './helper';
import QRScanModal from '../../../../components/common/QRScanModal';
import StockListFilterModal from './modal/StockListFilterModal';
import {GetRequestStockListsDAO} from '../../../../DAO';
import {getLocalData} from '../../../../constants/Storage';
import {expireToken} from '../../../../constants/Helper';
import ConfirmDialog from '../../../../components/modal/ConfirmDialog';
import { whiteLabel } from '../../../../constants/Colors';
import AlertModal from '../../../../components/modal/AlertModal';
import LoadingBar from '../../../../components/LoadingView/loading_bar';

const StockLists = props => {

  const navigation = props.navigation;

  const [searchKeyword, setSearchKeyword] = useState('');
  const [stockItem, setStockItem] = useState({});
  const addStockModalRef = useRef(null);
  const stockDetailsModalRef = useRef(null);
  const stockSignatureModalRef = useRef(null);
  const swopAtTraderModalRef = useRef(null);
  const traderModalRef = useRef(null);
  const stockConsumableModalRef = useRef(null);
  const consumableSellToTraderModalRef = useRef(null);
  const confirmDialogRef = useRef();  
  const simDetailsModalRef = useRef(null);
  const barcodeScanModalRef = useRef(null);
  const filterModalRef = useRef(null);
  const alertModalRef = useRef();
  const loadingBarRef = useRef();

  const [locationId, setLocationId] = useState(0);
  const [lastScanedQrCode, setLastScannedQrCode] = useState('');
  const [filters, setFilters] = useState({stockType: null});

  const [items, setItems] = useState([]);
  const filteredItems = useMemo(
    () => filterItems(items, searchKeyword, filters),
    [items, searchKeyword, filters],
  );

  const stockLists = useMemo(
    () => getStockItemsFromItems(filteredItems),
    [filteredItems],
  );
  const [selectedItems, setSelectedItems] = useState([]);

  // const selectedCodes = useMemo(
  //   () => selectedItems.map(x => x.iccid),
  //   selectedItems,
  // );

  const dispatch = useDispatch();
  

  useEffect(() => {
    isMount = true;
    callStockLists();
    initializeLocationId();    
    return () => {
      isMount = false;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //callStockLists();
      initializeLocationId();
    });
    return unsubscribe;
  }, [navigation]);

  const initializeLocationId = useCallback(async () => {
    var locationId = await getLocalData('@specific_location_id');
    if (locationId != null && locationId != undefined && locationId != '') {
      setLocationId(locationId);
    }
  }, [locationId]);

  const callStockLists = () => {
    GetRequestStockListsDAO.find({})
      .then(res => {             
        const _items = getItemsFromStockItems(res.stock_items);
        setItems(_items);                           
      })
      .catch(e => {
        expireToken(dispatch, e , alertModalRef);
      });
  };

  const onStockItemPressed = item => {
    setStockItem(item);
    if (item.stock_type === Constants.stockType.DEVICE) {
      stockDetailsModalRef.current.showModal();
    } else if (item.stock_type === Constants.stockType.CONSUMABLE) {
      stockConsumableModalRef.current.showModal();
    } else if (item.stock_type === Constants.stockType.SIM) {
      // if (item.items) {
      //   setSelectedItems(item.items);
      // }
      // simDetailsModalRef.current.showModal();
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

  const onStockDetailsModalClosed = ({type, value}) => {
    stockDetailsModalRef.current.hideModal();
    setTimeout(() => {
      if (type == Constants.actionType.ACTION_NEXT) {
        if (value.locationId != undefined && value.locationId != null) {
          setLocationId(value.locationId);
        }

        if (value.stockType === Constants.stockDeviceType.SELL_TO_TRADER) {
          stockSignatureModalRef.current.showModal();
        } else if (
          value.stockType === Constants.stockDeviceType.SWOP_AT_TRADER
        ) {
          swopAtTraderModalRef.current.showModal();
        } else if (value.stockType === Constants.stockDeviceType.TARDER) {
          traderModalRef.current.showModal();
        }
      }
    }, 500);
  };

  const onScanAction = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CAPTURE) {
      if (value) {
        const capturedItem = captureDeviceStockItem(items, value);
        if (capturedItem) {        
          setStockItem(capturedItem);
          stockDetailsModalRef.current.showModal();          
        } else {
          showMessage( 'Barcode ' + value + " " +  Strings.Stock.No_Device_Found_In_Stock);          
        }
      }
    }
  };

  const onStockSignature = async ({type, value}) => {
    if (type == Constants.actionType.ACTION_CLOSE) {
      stockSignatureModalRef.current.hideModal();
      if (simDetailsModalRef.current) {
        simDetailsModalRef.current.hideModal();
      }
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
      if (simDetailsModalRef.current) {
        simDetailsModalRef.current.hideModal();
      }
      callStockLists();
    }
  };

  const onStockConsumableModalClosed = ({type, value}) => {
    setTimeout(() => {
      if (type == Constants.actionType.ACTION_NEXT) {
        if (value.locationId != undefined && value.locationId != null) {
          setLocationId(value.locationId);
        }
        if (value.stockType === Constants.stockDeviceType.SELL_TO_TRADER) {
          consumableSellToTraderModalRef.current.showModal();
        } else if (value.stockType === Constants.stockDeviceType.TRANSFER) {
          traderModalRef.current.showModal();
        }
      }
    }, 500);
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

  const onSimDetailAction = ({type, value, item}) => {

    if (type == Constants.actionType.ACTION_NEXT) {
      simDetailsModalRef.current.hideModal();
      setStockItem({stock_type: Constants.stockType.SIM});

      if (value.locationId != undefined && value.locationId != null) {
        setLocationId(value.locationId);
      }

      setTimeout(() => {
        if (value.stockType === Constants.stockDeviceType.SELL_TO_TRADER) {
          stockSignatureModalRef.current.showModal();
        } else if (value.stockType === Constants.stockDeviceType.TARDER) {
          traderModalRef.current.showModal();
        }
      }, 700);
    } else if (
      type == Constants.actionType.ACTION_CAPTURE ||
      type == Constants.actionType.ACTION_INPUT_BARCODE
    ) {
      const capturedItems = filterItemsByBarcode(items, value);      
      if (capturedItems && capturedItems.length > 0) {
        const _selectedItems = [...selectedItems];
        capturedItems.forEach(item => {
          const alreadyExist = selectedItems.find(x => x.iccid == item.iccid);
          if (!alreadyExist) {
            _selectedItems.push(item);
          }
        });
        setSelectedItems(_selectedItems);
      } else {
        // if(simDetailsModalRef.current)
        //   simDetailsModalRef.current.showMessage('Barcode ' + value + ' not found in stock');
      }
      setLastScannedQrCode(value);
    } else if (type == Constants.actionType.ACTION_REMOVE) {
      const _items = selectedItems.filter(x => x.iccid != item.iccid);
      setSelectedItems(_items);
    }
  };

  const onCloseScanModal = () => {
    setSelectedItems([]);
    setLastScannedQrCode('');  
    simDetailsModalRef.current.hideModal();
  };

  const onCaptureSim = () => {
    setSelectedItems([]);
    if(simDetailsModalRef.current){
      simDetailsModalRef.current.showModal();    
    }    
  };

  const onCaptureDevice = () => {
    barcodeScanModalRef.current.showModal();    
  };

  const onSelectStockTypeForCapture = () => {
    showConfirmModal();    
  };

  const onPressFilter = () => {
    filterModalRef.current.showModal();
  };

  const showConfirmModal = () => {
      if(confirmDialogRef.current){
          confirmDialogRef.current.showModal( Strings.Stock.Select_Scan_Type , 'Device' , 'Sim');
      }
  }

  const hideConfirmModal = () => {
      if(confirmDialogRef.current){
          confirmDialogRef.current.hideModal()
      }
  }
  const showLoadingBar = () => {
    if(loadingBarRef.current){
      loadingBarRef.current.showModal();
    }
  }  
  const hideLoadingBar = () => {
    if(loadingBarRef.current){
      loadingBarRef.current.hideModal();
    }
  }
  const showMessage = (message) => {
    if(alertModalRef.current){
      alertModalRef.current.alert(message);
    }
  }

  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      
      <SearchBar
        onSearch={text => {
          setSearchKeyword(text);
        }}
        initVal={searchKeyword}
        isFilter={true}
        haveFilter={filters.stockType != null}
        animation={onPressFilter}
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
        items={items}
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
        selectedCodes={selectedItems}
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
        selectedCodes={selectedItems}
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

      <SimDetailsModal
        ref={simDetailsModalRef}
        items={selectedItems}
        stockList={items}
        lastScanedQrCode={lastScanedQrCode}
        onButtonAction={onSimDetailAction}
        onClose={onCloseScanModal}
      />

      <QRScanModal
        ref={barcodeScanModalRef}
        isPartialDetect={true}
        onButtonAction={onScanAction}
        isNotCloseAfterCapture
        showClose={true}
        onClose={() => {
          barcodeScanModalRef.current.hideModal();
        }}        
        renderLastScanResultView={() => {
          return [
            <AlertModal ref={alertModalRef} />
          ];
        }}
      />
      
      <StockListFilterModal
        ref={filterModalRef}
        filters={filters}
        onButtonAction={({type, value}) => {
          if (type == Constants.actionType.ACTION_APPLY) {
            setFilters(value);
          } else if (type == Constants.actionType.ACTION_FORM_CLEAR) {
            setFilters({stockType: null});
          }
        }}
      />


      <LoadingBar ref={loadingBarRef} />
      

      <ConfirmDialog 
          buttonTextStyle={{color: whiteLabel().mainText  }}
          buttonText2Style={{color : whiteLabel().mainText }}
          ref={confirmDialogRef}
          outSideTouch={true}
          onBack={() => {
            hideConfirmModal();
            if(Platform.OS == 'android'){
              onCaptureDevice();
            }else{
              setTimeout(() => {
                onCaptureDevice();
              }, 500);
            }
          }}
          onDone={() => {
            hideConfirmModal();
            if(Platform.OS == 'android'){
              onCaptureSim();
            }else{
              setTimeout(() => {
                onCaptureSim();
              }, 500);
            }            
          }}
      />

    </View>
  );
};

export default StockLists;
