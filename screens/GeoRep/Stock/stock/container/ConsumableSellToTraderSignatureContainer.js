import {View} from 'react-native';
import React, {useState} from 'react';
import {postApiRequestMultipart} from '../../../../../actions/api.action';
import {useSelector} from 'react-redux';
import * as RNLocalize from 'react-native-localize';
import ConsumableSellToStockSignatureView from '../components/ConsumableSellToStockSignatureView';
import RNFS from 'react-native-fs';
import {useDispatch} from 'react-redux';
import {
  clearNotification,
  showNotification,
} from '../../../../../actions/notification.action';
import {Constants, Strings} from '../../../../../constants';
import {Notification} from '../../../../../components/modal/Notification';
import {expireToken} from '../../../../../constants/Helper';

export default function ConsumableSellToTraderSignatureContainer(props) {
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  var received = '';
  var quantity = '0';
  var price = '';
  var reference = '';

  const onItemPressed = item => {};

  const onSubmit = signature => {
    if (price != '' && quantity != '' && reference != '' && received != '') {
      setIsLoading(true);
      var postData = new FormData();
      RNFS.exists(signature)
        .then(res => {
          if (res) {
            if (!signature.includes('file://')) {
              signature = 'file://' + signature;
            }
            postData.append('signature_image', {
              uri: signature,
              type: 'image/png',
              name: 'sign.png',
            });
            postData.append('stock_type', Constants.stockType.CONSUMABLE);
            postData.append('stock_item_id', props.item.stock_item_id);
            postData.append('location_id', props.locationId);
            postData.append('received_by', received);
            postData.append('sell_quantity', quantity);
            postData.append('price', price);
            postData.append('reference', reference);
            var time_zone = RNLocalize.getTimeZone();
            postData.append('user_local_data[time_zone]', time_zone);
            postData.append(
              'user_local_data[latitude]',
              currentLocation && currentLocation.latitude != null
                ? currentLocation.latitude
                : '0',
            );
            postData.append(
              'user_local_data[longitude]',
              currentLocation && currentLocation.longitude != null
                ? currentLocation.longitude
                : '0',
            );

            postApiRequestMultipart('stockmodule/sell-to-trader', postData)
              .then(res => {
                setIsLoading(false);
                dispatch(
                  showNotification({
                    type: Strings.Success,
                    message: res.message,
                    buttonText: 'Ok',
                    buttonAction: async () => {
                      props.onButtonAction({
                        type: Constants.actionType.ACTION_CLOSE,
                      });
                      dispatch(clearNotification());
                    },
                  }),
                );
              })
              .catch(e => {
                setIsLoading(false);
                console.log('error', e);
                if (e === 'expired') {
                  expireToken(dispatch, e);
                } else {
                  dispatch(
                    showNotification({
                      type: Strings.Success,
                      message: 'Error',
                      buttonText: 'Ok',
                    }),
                  );
                }
              });
          } else {
            setIsLoading(false);
            console.log('no file exist', signature);
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.log('error', error);
        });
    }
  };

  const onChangedReceivedBy = recv => {
    received = recv;
  };
  const onChangedQuantity = qty => {
    quantity = qty;
  };
  const onChangedPrice = priceVal => {
    price = priceVal;
  };
  const onChangedReference = referenceVal => {
    reference = referenceVal;
  };

  const onClose = () => {};

  return (
    <View style={{alignSelf: 'stretch'}}>
      <ConsumableSellToStockSignatureView
        onItemPressed={onItemPressed}
        onSubmit={onSubmit}
        onClose={onClose}
        onChangedReceivedBy={onChangedReceivedBy}
        onChangedQuantity={onChangedQuantity}
        onChangedPrice={onChangedPrice}
        onChangedReference={onChangedReference}
        isLoading={isLoading}
        {...props}
      />
      <Notification />
    </View>
  );
}
