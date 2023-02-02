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
import { PostRequestDAO } from '../../../../DAO';


const StockStagingContainer = props => {

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const dispatch = useDispatch();
  let isMount = true;

  useEffect(() => {
    isMount = true;
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
          expireToken(dispatch , e);
        }        
      });
  };


  const onAccept = items => {    
    
    if(isLoading) return;
    const userParam = getPostParameter(currentLocation);
    setIsLoading(true);

    const postData = {
      iccids: items.map(item => item.iccid),
      user_local_data: userParam.user_local_data,
    };

    PostRequestDAO.find(0, postData , 'staging-accept' , 'stockmodule/staging-accept' , '' , '', null, dispatch ).then((res) => {
      setIsLoading(false);
      var message = '';
      if (res.status === Strings.Success) {
        message = 'Sim items moved to current stock successfully';        
      } else {
        message = res.errors;        
      }
      dispatch(
        showNotification({
          type: Strings.Success,
          message: message,
          buttonText: Strings.Ok,
          buttonAction: () => {
            if (res.status === Strings.Success) {
              onLoad();
            }            
            dispatch(clearNotification());
          },
        }),
      );
    }).catch((e) => {
      setIsLoading(false);      
      expireToken(dispatch,e)
    });


   
  };
  return (
    <StagingView items={items} isLoading={isLoading} onAccept={onAccept} />
  );
};   

export default StockStagingContainer;
    