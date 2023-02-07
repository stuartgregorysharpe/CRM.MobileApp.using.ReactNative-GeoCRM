import {View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import SimDetailsView from '../../components/sim/SimDetailsView';
import SearchLocationModal from '../../modal/SearchLocationModal';
import {useDispatch, useSelector} from 'react-redux';
import {Constants, Strings} from '../../../../../../constants';
import {getLocalData} from '../../../../../../constants/Storage';
import {Notification} from '../../../../../../components/modal/Notification';
import {showNotification} from '../../../../../../actions/notification.action';
import LoadingProgressBar from '../../../../../../components/modal/LoadingProgressBar';

export default function SimDetailsContainer(props) {
  const {items} = props;
  const dispatch = useDispatch();
  const searchLocationModalRef = useRef(null);
  const isCheckin = useSelector(state => state.location.checkIn);
  const [stockType, setStockType] = useState(
    Constants.stockDeviceType.SELL_TO_TRADER,
  );
  var checkinLocationId;

  useEffect(() => {
    if (isCheckin) {
      initialize();
    }
  }, [isCheckin]);

  const initialize = async () => {
    checkinLocationId = await getLocalData('@specific_location_id');
  };

  const onSellToTrader = () => {
    if (!items || items.length == 0) {
      dispatch(
        showNotification({
          type: 'success',
          message: Strings.No_Sims_Selected,
          buttonText: Strings.Ok,
        }),
      );
      return;
    }
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

  const onTransfer = () => {
    if (items.length > 0) {
      var value = {stockType: Constants.stockDeviceType.TARDER, value: 0};
      props.onButtonAction({
        type: Constants.actionType.ACTION_NEXT,
        value: value,
      });
    }
  };

  const onSearchLocationModalClosed = async ({type, value}) => {
    if (type == Constants.actionType.ACTION_NEXT) {
      if (stockType === Constants.stockDeviceType.SELL_TO_TRADER) {
        props.openSignature(value);
      } else if (stockType === Constants.stockDeviceType.SWOP_AT_TRADER) {
      }
    }
  };

  return (
    <View style={{alignSelf: 'stretch'}}>
      <SimDetailsView
        onSellToTrader={onSellToTrader}
        onTransfer={onTransfer}
        {...props}
      />

      <SearchLocationModal
        ref={searchLocationModalRef}
        title={Strings.Search_Location}
        stockType={stockType}
        onButtonAction={onSearchLocationModalClosed}
      />
      <Notification />
      <LoadingProgressBar/>
    </View>
  );
}
