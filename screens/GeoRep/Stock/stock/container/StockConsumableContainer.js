import {View} from 'react-native';
import React, {useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {Constants, Strings} from '../../../../../constants';
import StockConsumableView from '../components/StockConsumableView';
import SearchLocationModal from '../modal/SearchLocationModal';

export default function StockConsumableContainer(props) {
  const searchLocationModalRef = useRef(null);
  const isCheckin = useSelector(state => state.location.checkIn);
  const [stockType, setStockType] = useState(
    Constants.stockDeviceType.SELL_TO_TRADER,
  );

  const sellToTrader = (type, data) => {
    if (isCheckin) {
      props.openSellToTrader(Constants.stockDeviceType.SELL_TO_TRADER);
    } else {
      setStockType(Constants.stockDeviceType.SELL_TO_TRADER);
      searchLocationModalRef.current.showModal();
    }
  };

  const transfer = (type, data) => {
    props.openTransfer(Constants.stockDeviceType.TRANSFER);
  };

  const onSearchLocation = async ({type, value}) => {
    if (type == Constants.actionType.ACTION_NEXT) {
      if (stockType === Constants.stockDeviceType.SELL_TO_TRADER) {
        props.openSellToTrader(
          Constants.stockDeviceType.SELL_TO_TRADER,
          value.locationId,
        );
      } else if (stockType === Constants.stockDeviceType.SWOP_AT_TRADER) {
      }
    }
  };

  return (
    <View style={{alignSelf: 'stretch'}}>
      <StockConsumableView
        sellToTrader={sellToTrader}
        transfer={transfer}
        item={props.item}
        {...props}
      />

      <SearchLocationModal
        ref={searchLocationModalRef}
        title={Strings.Search_Location}
        stockType={stockType}
        onButtonAction={onSearchLocation}
      />
    </View>
  );
}
