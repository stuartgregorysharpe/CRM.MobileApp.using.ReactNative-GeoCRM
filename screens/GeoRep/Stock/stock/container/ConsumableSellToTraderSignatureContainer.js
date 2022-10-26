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
import PostRequest from '../../../../../DAO/PostRequest';
import {expireToken} from '../../../../../constants/Helper';

export default function ConsumableSellToTraderSignatureContainer(props) {

  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
<<<<<<< HEAD

  var received = '';
  var quantity = '0';
  var price = '';
  var reference = '';
  
=======
  const [received, setReceived] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [reference, setReference] = useState('');

>>>>>>> 73b4c1e015f4776e5f08142ad01bc2ab19c11bdc
  const onItemPressed = item => {};

  const onSubmit = signature => {
    if (price != '' && quantity != '' && reference != '' && received != '') {
      
      var postData = {};
      setIsLoading(true);
      //var postData = new FormData();
      RNFS.exists(signature)
        .then(res => {
          if (res) {
            if (!signature.includes('file://')) {
              signature = 'file://' + signature;
            }
            var time_zone = RNLocalize.getTimeZone();
            postData = {
              signature_image: {
                uri: signature,
                type: 'image/png',
                name: 'sign.png',
              },
              stock_type: Constants.stockType.CONSUMABLE,
              stock_item_id: props.item.stock_item_id,
              location_id: props.locationId,
              received_by: received,
              sell_quantity: quantity,
              price: price,
              reference : reference,
              'user_local_data[time_zone]' : time_zone,
              'user_local_data[latitude]' : currentLocation && currentLocation.latitude != null
              ? currentLocation.latitude
              : '0',
              'user_local_data[longitude]': currentLocation && currentLocation.longitude != null
              ? currentLocation.longitude
              : '0'
            }

            // postData.append('signature_image', {
            //   uri: signature,
            //   type: 'image/png',
            //   name: 'sign.png',
            // });
            // postData.append('stock_type', Constants.stockType.CONSUMABLE);
            // postData.append('stock_item_id', props.item.stock_item_id);
            // postData.append('location_id', props.locationId);
            // postData.append('received_by', received);
            // postData.append('sell_quantity', quantity);
            // postData.append('price', price);
            // postData.append('reference', reference);
            // var time_zone = RNLocalize.getTimeZone();
            // postData.append('user_local_data[time_zone]', time_zone);
            // postData.append(
            //   'user_local_data[latitude]',
            //   currentLocation && currentLocation.latitude != null
            //     ? currentLocation.latitude
            //     : '0',
            // );
            // postData.append(
            //   'user_local_data[longitude]',
            //   currentLocation && currentLocation.longitude != null
            //     ? currentLocation.longitude
            //     : '0',
            // );            
      
            console.log("  save post data ==== " ,postData);
            
            PostRequest.find(0, postData, "sell_to_trader" , "stockmodule/sell-to-trader", Constants.stockType.CONSUMABLE , props.item.description ).then((res) => {
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
            }).catch((e) => {
              expireToken(dispatch, e);
              dispatch(
                showNotification({
                  type: Strings.Success,
                  message: 'Error',
                  buttonText: 'Ok',
                }),
              );
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
    setReceived(recv);
  };
  const onChangedQuantity = qty => {
    setQuantity(qty);
  };
  const onChangedPrice = priceVal => {
    setPrice(priceVal);
  };
  const onChangedReference = referenceVal => {
    setReference(referenceVal);
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
        receivedBy={received}
        reference={reference}
        {...props}
      />
      <Notification />
    </View>
  );
}
