import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import StagingView from './StagingView';
import dummyData from './dummyData.json';
import {getItemsFromShipments} from './helper';
import {getApiRequest, postApiRequest} from '../../../../actions/api.action';
import {Strings} from '../../../../constants';
const StockStagingContainer = props => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    postApiRequest('stockmodule/staging-accept', {
      iccids: items.map(item => item.iccid),
    })
      .then(res => {
        setIsLoading(false);
        if (res.status === Strings.Success) {
          dispatch(
            showNotification({
              type: Strings.Success,
              message: res.message,
              buttonText: 'Ok',
              buttonAction: () => {
                onLoad();
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
