import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import StagingView from './StagingView';
import dummyData from './dummyData.json';
import {getItemsFromShipments} from './helper';
import {getApiRequest, postApiRequest} from '../../../../actions/api.action';
import {Strings} from '../../../../constants';
import {useDispatch} from 'react-redux';
import {
  clearNotification,
  showNotification,
} from '../../../../actions/notification.action';
import {Notification} from '../../../../components/modal/Notification';
const StockStagingContainer = props => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    onLoad();
  }, []);
  const onLoad = () => {
    setIsLoading(true);
    getApiRequest('stockmodule/staging')
      .then(data => {
        setIsLoading(false);
        const _items = getItemsFromShipments(data.shipments);
        setItems(_items);
      })
      .catch(error => {
        setIsLoading(false);
      });
  };
  const onAccept = items => {
    console.log('onAccept');
    setIsLoading(true);
    postApiRequest('stockmodule/staging-accept', {
      iccids: items.map(item => item.iccid),
    })
      .then(res => {
        console.log('res', res);
        setIsLoading(false);
        if (res.status === Strings.Success) {
          dispatch(
            showNotification({
              type: Strings.Success,
              message: 'Sim items moved to current stock successfully',
              buttonText: 'Ok',
              buttonAction: () => {
                onLoad();
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
        console.log('error', e);
      });
  };
  return (
    <StagingView items={items} isLoading={isLoading} onAccept={onAccept} />
  );
};

export default StockStagingContainer;
