import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AddStockView from '../components/AddStockView';
import {Constants, Strings} from '../../../../../constants';
import {useSelector} from 'react-redux';
import {expireToken, getPostParameter} from '../../../../../constants/Helper';
import {
  clearNotification,
  showNotification,
} from '../../../../../actions/notification.action';
import {useDispatch} from 'react-redux';
import {Notification} from '../../../../../components/modal/Notification';
import {GetRequestStockFieldDataDAO, PostRequestDAO} from '../../../../../DAO';
import { generateKey } from '../../../../../constants/Utils';
import LoadingProgressBar from '../../../../../components/modal/LoadingProgressBar';

var add_stock_indempotency = '';

export default function AddStockContainer(props) {

  const dispatch = useDispatch();
  const [deviceTypeLists, setDevicetypeLists] = useState([]);
  const [stockTypes, setStockTypes] = useState({});
  const {items} = props;
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isLoading, setIsLoading] = useState(false);
  let isMount = true;

  useEffect(() => {
    _callStockFieldData();
    add_stock_indempotency  = generateKey();
    return () => {
      isMount = false;
    };
  }, []);

  const _callStockFieldData = () => {
    GetRequestStockFieldDataDAO.find({action: 'add_stock'})
      .then(res => {
        if (isMount) {
          if (res.status === Strings.Success) {
            setStockTypes(res.stock_types);
            var types = [];
            for (let value of Object.keys(res.stock_types)) {
              types.push({value: value, label: value});
            }
            types = types.filter(x => x.value != 'Sim');
            setDevicetypeLists(types);
          }
        }
      })
      .catch(e => {
        expireToken(dispatch, e);
      });
  };

  const callAddStock = (type, data) => {
    if(isLoading) return;
    setIsLoading(true);
    var userParam = getPostParameter(currentLocation);
    data['user_local_data'] = userParam.user_local_data;
    var subTitle = type;
    if (
      type == Constants.stockType.DEVICE ||
      type == Constants.stockType.CONSUMABLE
    ) {
      subTitle = data.description;
    } else {
      subTitle = data.sims.map(item => item.network).join(', ');
    }
    PostRequestDAO.find(
      0,
      data,
      'add_stock',
      'stockmodule/add-stock',
      type,
      subTitle,
      add_stock_indempotency,
      dispatch
    )
      .then(res => {
        setIsLoading(false);
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
        setIsLoading(false);
        expireToken(dispatch, e);
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
      <LoadingProgressBar />
    </View>
  );
}
