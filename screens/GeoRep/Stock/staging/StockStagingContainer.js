import React, {useState, useEffect} from 'react';
import StagingView from './StagingView';
import {getItemsFromShipments} from './helper';
import {getApiRequest, postApiRequest} from '../../../../actions/api.action';
import {Strings} from '../../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearNotification,
  showNotification,
} from '../../../../actions/notification.action';
import {expireToken, getPostParameter} from '../../../../constants/Helper';
const StockStagingContainer = props => {

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const dispatch = useDispatch();
  let isMount = true;

  useEffect(() => {
    onLoad();
    return () => {
      isMount = false;
    }
  }, []);

  const onLoad = () => {
    setIsLoading(true);
    getApiRequest('stockmodule/staging')
      .then(data => {
        if(isMount){
          setIsLoading(false);
          const _items = getItemsFromShipments(data.shipments);
          setItems(_items);
        }        
      })
      .catch(e => {
        if(isMount){
          setIsLoading(false);
        }
        expireToken(dispatch , e);
      });
  };

  const onAccept = items => {    
    
    const userParam = getPostParameter(currentLocation);
    setIsLoading(true);
    postApiRequest('stockmodule/staging-accept', {
      iccids: items.map(item => item.iccid),
      user_local_data: userParam.user_local_data,
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
        expireToken(dispatch,e)
      });
  };
  return (
    <StagingView items={items} isLoading={isLoading} onAccept={onAccept} />
  );
};   

export default StockStagingContainer;
    