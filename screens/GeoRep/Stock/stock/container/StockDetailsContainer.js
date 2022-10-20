import {View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import StockDetailsView from '../components/StockDetailsView';
import SearchLocationModal from '../modal/SearchLocationModal';
import {useSelector} from 'react-redux';
import {Constants, Strings} from '../../../../../constants';
import {getLocalData} from '../../../../../constants/Storage';

const StockDetailsContainer = props => {
  const searchLocationModalRef = useRef(null);
  const isCheckin = useSelector(state => state.location.checkIn);
  const [stockType, setStockType] = useState(
    Constants.stockDeviceType.SELL_TO_TRADER,
  );
  var checkinLocationId;
  const onSearchLocation = ({type, value}) => {
    if (type == Constants.actionType.ACTION_NEXT) {
      if (stockType === Constants.stockDeviceType.SELL_TO_TRADER) {
        props.openSignature(value);
      } else if (stockType === Constants.stockDeviceType.SWOP_AT_TRADER) {
        props.openSwopAtTrader(value);
      }
    }
  };

  useEffect(() => {
    if (isCheckin) {
      initialize();
    }
  }, [isCheckin]);

  const initialize = async () => {
    checkinLocationId = await getLocalData('@specific_location_id');
  };

  const sellToTrader = (type, data) => {
    if (isCheckin) {
      props.openSignature({
        stockType: Constants.stockDeviceType.SELL_TO_TRADER,
        locationId: checkinLocationId,
      });
    } else {
      setStockType(Constants.stockDeviceType.SELL_TO_TRADER);
      searchLocationModalRef.current.showModal();
    }
  };
  const swopAtTrader = (type, data) => {
    if (isCheckin) {
      props.openSwopAtTrader({
        stockType: Constants.stockDeviceType.SWOP_AT_TRADER,
        locationId: checkinLocationId,
      });
    } else {
      setStockType(Constants.stockDeviceType.SWOP_AT_TRADER);
      searchLocationModalRef.current.showModal();
    }
  };

  const trader = (type, data) => {
    props.openTrader({stockType: Constants.stockDeviceType.TARDER, value: ''});
  };

  return (
    <View style={{alignSelf: 'stretch'}}>
      <StockDetailsView
        sellToTrader={sellToTrader}
        swopAtTrader={swopAtTrader}
        trader={trader}
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
};

export default StockDetailsContainer;
