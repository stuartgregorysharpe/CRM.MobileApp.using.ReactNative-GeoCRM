import {View} from 'react-native';
import React from 'react';
import StockSignatureView from '../components/StockSignatureView';
import {postApiRequestMultipart} from '../../../../../actions/api.action';
import {useSelector} from 'react-redux';
import * as RNLocalize from 'react-native-localize';
import {Constants, Strings} from '../../../../../constants';
import RNFS from 'react-native-fs';
import {useDispatch} from 'react-redux';
import {
  clearNotification,
  showNotification,
} from '../../../../../actions/notification.action';
import {Notification} from '../../../../../components/modal/Notification';
import { expireToken } from '../../../../../constants/Helper';

export default function StockSignatureContainer(props) {
  const {item, selectedCodes, signatureModalType} = props;
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const dispatch = useDispatch();

  var msisdn = '';
  var received = '';

  const onSubmit = signature => {
    if (received != '' && signature != null) {
      var postData = new FormData();
      RNFS.exists(signature)
        .then(res => {
          if (res) {
            if (!signature.includes('file://')) {
              signature = 'file://' + signature;
            }

            if (signatureModalType == 'save') {
              props.onButtonAction({
                type: Constants.actionType.ACTION_DONE,
                value: {
                  received: received,
                  msisdn: msisdn,
                  signature: signature,
                },
              });
              return;
            }

            postData.append('signature_image', {
              uri: signature,
              type: 'image/png',
              name: 'sign.png',
            });
            postData.append('received_by', received);
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

            if (item.stock_type != Constants.stockType.RETURN) {
              postData.append('stock_type', item.stock_type);
              postData.append('location_id', props.locationId);
              if (item.stock_type == Constants.stockType.DEVICE) {
                postData.append('stock_item_id', props.item.stock_item_id);
                postData.append('assigned_msisdn', msisdn);
              } else if (item.stock_type == Constants.stockType.SIM) {
                console.log('selectedCodes=', selectedCodes);
                selectedCodes.forEach((item, index) => {
                  postData.append(
                    `sims[stock_item_ids][${index}]`,
                    item.stock_item_id,
                  );
                });
              }
              postApiRequestMultipart('stockmodule/sell-to-trader', postData)
                .then(res => {
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
                  if(e === 'expired'){
                    expireToken(dispatch, e)
                  }else{
                    dispatch(
                      showNotification({
                        type: Strings.Success,
                        message: 'Error',
                        buttonText: 'Ok',
                      }),
                    );
                  }
                  
                });
            } else if (item.stock_type == Constants.stockType.RETURN) {
              if (props.stockItemIds.length > 0) {
                props.stockItemIds.forEach((item, index) => {
                  postData.append(`stock_item_ids[${index}]`, item);
                });
                postApiRequestMultipart(
                  'stockmodule/return-to-warehouse',
                  postData,
                )
                  .then(res => {
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
                    console.log('error', e);
                    if(e === 'expired'){
                      expireToken(dispatch, e)
                    }else{
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
                dispatch(
                  showNotification({
                    type: Strings.Success,
                    message: Strings.Stock.No_Stock_Item_Ids,
                    buttonText: 'Ok',
                  }),
                );
              }
            }
          } else {
            console.log('no file exist', signature);
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  };

  const onChangedSerial = serial => {
    msisdn = serial;
  };

  const onChangedReceivedBy = receivedBy => {
    received = receivedBy;
  };

  const onClose = () => {};

  return (
    <View style={{alignSelf: 'stretch'}}>
      <StockSignatureView
        onSubmit={onSubmit}
        onChangedReceivedBy={onChangedReceivedBy}
        onChangedSerial={onChangedSerial}
        onClose={onClose}
        {...props}
      />
      <Notification />
    </View>
  );
}
