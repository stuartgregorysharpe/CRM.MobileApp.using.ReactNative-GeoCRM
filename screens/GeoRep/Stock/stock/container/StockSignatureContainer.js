import {View} from 'react-native';
import React, {useState} from 'react';
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
import PostRequest from '../../../../../DAO/PostRequest';
import {expireToken} from '../../../../../constants/Helper';

export default function StockSignatureContainer(props) {

  const {item, selectedCodes, signatureModalType} = props;
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  var msisdn = '';
  var received = '';

  const onSubmit = signature => {
    if (received != '' && signature != null) {
      setIsLoading(true);
      var postData = new FormData();
      var time_zone = RNLocalize.getTimeZone();

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
              setIsLoading(false);
              return;
            }
            
            var postJsonData = {
              signature_image : {
                uri: signature,
                type: 'image/png',
                name: 'sign_' + item.stock_type + '.png',
              },
              received_by : received,
              'user_local_data[time_zone]' : time_zone,
              'user_local_data[latitude]' : currentLocation && currentLocation.latitude != null ? currentLocation.latitude : '0',
              'user_local_data[longitude]' : currentLocation && currentLocation.longitude != null ? currentLocation.longitude : '0'
            }

            if (item.stock_type != Constants.stockType.RETURN) {
              
              postJsonData = {
                ...postJsonData,
                stock_type : item.stock_type,
                location_id : props.locationId.toString()
              }

              if (item.stock_type == Constants.stockType.DEVICE) {
                postJsonData = {
                  ...postJsonData,
                  stock_item_id : props.item.stock_item_id.toString(),
                  assigned_msisdn : msisdn
                }                
              } else if (item.stock_type == Constants.stockType.SIM) {
                selectedCodes.forEach((item, index) => {
                  var keyValue = `sims[stock_item_ids][${index}]`;
                  postJsonData = {
                    ...postJsonData,
                    [keyValue] : item.stock_item_id.toString()
                  }                                  
                });
              }

              var networks = selectedCodes.map(item => item.network).join(',');              

              PostRequest.find(0, postJsonData, "sell_to_trader", "stockmodule/sell-to-trader" , 
              item.stock_type , item.stock_type == Constants.stockType.DEVICE ? props.item.description: networks ).then((res) => {
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
                    buttonText: Strings.Ok,
                  }),
                );
              });

            } else if (item.stock_type == Constants.stockType.RETURN) {

              postData.append('signature_image', {
                uri: signature,
                type: 'image/png',
                name: 'sign.png',
              });
              postData.append('received_by', received);
              
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

              if (props.stockItemIds.length > 0) {
                props.stockItemIds.forEach((item, index) => {
                  postData.append(`stock_item_ids[${index}]`, item);
                });
                postApiRequestMultipart(
                  'stockmodule/return-to-warehouse',
                  postData,
                )
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
                dispatch(
                  showNotification({
                    type: Strings.Success,
                    message: Strings.Stock.No_Stock_Item_Ids,
                    buttonText: 'Ok',
                  }),
                );
              }
            } else {
              setIsLoading(false);
            }
          } else {
            console.log('no file exist', signature);
            setIsLoading(false);
          }
        })
        .catch(error => {
          console.log('error', error);
          setIsLoading(false);
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
        isLoading={isLoading}
        {...props}
      />
      <Notification />
    </View>
  );
}