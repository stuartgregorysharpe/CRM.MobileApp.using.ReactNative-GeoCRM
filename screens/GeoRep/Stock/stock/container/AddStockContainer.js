import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AddStockView from '../components/AddStockView';
import {getApiRequest, postApiRequest} from '../../../../../actions/api.action';
import {Constants, Strings} from '../../../../../constants';
import {useSelector} from 'react-redux';
import {getPostParameter} from '../../../../../constants/Helper';
import {
  clearNotification,
  showNotification,
} from '../../../../../actions/notification.action';
import {useDispatch} from 'react-redux';
import {Notification} from '../../../../../components/modal/Notification';

export default function AddStockContainer(props) {
  const dispatch = useDispatch();
  const [deviceTypeLists, setDevicetypeLists] = useState([]);
  const [stockTypes, setStockTypes] = useState({});
  const {items} = props;
  const currentLocation = useSelector(state => state.rep.currentLocation);
  let isMount = true;

  useEffect(() => {
    _callStockFieldData();
    return () => {
      isMount = false;
    };
  }, []);

  const _callStockFieldData = () => {
    getApiRequest('stockmodule/stock-field-data?action=add_stock', {})
      .then(res => {
        if (isMount) {
          if (res.status === Strings.Success) {
            setStockTypes(res.stock_types);
            var types = [];
            for (let value of Object.keys(res.stock_types)) {
              types.push({value: value, label: value});
            }
            setDevicetypeLists(types);
          }
        }
      })
      .catch(e => {});
  };

  const callAddStock = (type, data) => {
    console.log('callAddStock', data);
    var userParam = getPostParameter(currentLocation);
    data['user_local_data'] = userParam.user_local_data;
    postApiRequest('stockmodule/add-stock', data)
      .then(res => {
        if (res.status === Strings.Success) {
          dispatch(
            showNotification({
              type: Strings.Success,
              message: res.message,
              buttonText: 'Ok',
              buttonAction: async () => {
                props.onButtonAction({type: Constants.actionType.ACTION_CLOSE});
                dispatch(clearNotification());
              },
            }),
          );
        } else {
          dispatch(
            showNotification({
              type: Strings.Success,
              message: res.errors,
              buttonText: 'Ok',
            }),
          );
        }
      })
      .catch(e => {
        console.log('error', e);
      });
  };

  return (
    <View style={{alignSelf: 'stretch'}}>
      <AddStockView
        callAddStock={callAddStock}
        stockTypes={stockTypes}
        deviceTypeLists={deviceTypeLists}
        {...props}
      />
      <Notification />
    </View>
  );
}
