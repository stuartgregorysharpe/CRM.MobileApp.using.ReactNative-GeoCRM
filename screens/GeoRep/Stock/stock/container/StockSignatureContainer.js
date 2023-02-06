import {View} from 'react-native';
import React, { useEffect,  useState} from 'react';
import StockSignatureView from '../components/StockSignatureView';
import {postApiRequestMultipart} from '../../../../../actions/api.action';
import {useSelector} from 'react-redux';
import * as RNLocalize from 'react-native-localize';
import {Constants, Strings} from '../../../../../constants';
import RNFS from 'react-native-fs';
import {useDispatch} from 'react-redux';
import {
  clearLoadingBar,
  clearNotification,
  showLoadingBar,
  showNotification,
} from '../../../../../actions/notification.action';
import {Notification} from '../../../../../components/modal/Notification';
import {expireToken} from '../../../../../constants/Helper';
import { generateKey } from '../../../../../constants/Utils';
import { PostRequestDAO } from '../../../../../DAO';
import LoadingProgressBar from '../../../../../components/modal/LoadingProgressBar';

var sell_to_trader_indempotency = '';


export default function StockSignatureContainer(props) {

  const {item, selectedCodes, signatureModalType} = props;

  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  var msisdn = '';
  var received = '';

  useEffect(() => {
    sell_to_trader_indempotency = generateKey();
  }, []);

  const onSubmit = ( signature, deviceType) => {  

    if (signature != null) {    

      if(isLoading) return;

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
                  primary_device: deviceType === Constants.deviceTypeLabel.PRIMARY ? "1" : "0"
                },
              });
              setIsLoading(false);
              return;
            }
            
            var postJsonData = {
              signature_image : {
                uri: signature,
                type: 'image/png',
                name: 'sign_' + generateKey() + '.png',
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
                  assigned_msisdn : msisdn,
                  primary_device: deviceType === Constants.deviceTypeLabel.PRIMARY ? "1" : "0"
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

              PostRequestDAO.find(0, postJsonData, "sell_to_trader", "stockmodule/sell-to-trader" , 
              item.stock_type , item.stock_type == Constants.stockType.DEVICE ? props.item.description: networks , sell_to_trader_indempotency , dispatch ).then((res) => {
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
              }).catch((e) => {
                setIsLoading(false);
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
                dispatch(showLoadingBar({'type' : 'loading'}));
                postApiRequestMultipart(
                  'stockmodule/return-to-warehouse',
                  postData,
                )
                  .then(res => {
                    setIsLoading(false);
                    dispatch(clearLoadingBar());
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
                    dispatch(clearLoadingBar());                    
                    expireToken(dispatch, e);                  
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
    console.log("receivedBy",receivedBy)
    received = receivedBy;
  };

  const onClose = () => {};

  return (
    <View style={{alignSelf: 'stretch'}}>
      <StockSignatureView
        onSubmit={(path,deviceType) => {
          onSubmit(path, deviceType)
        }}
        onChangedReceivedBy={(text) => {
          onChangedReceivedBy(text)
        }}
        onChangedSerial={(text) => {
          onChangedSerial(text)
        }}
        onClose={onClose}
        
        {...props}
      />
      <Notification />
      <LoadingProgressBar />
    </View>
  );
}