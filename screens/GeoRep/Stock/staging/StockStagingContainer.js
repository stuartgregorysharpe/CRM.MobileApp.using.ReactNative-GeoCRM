import React, {useState, useEffect , useRef } from 'react';
import { Platform, View } from 'react-native';
import StagingView from './StagingView';
import {getItemsFromShipments} from './helper';
import {getApiRequest, postApiRequest} from '../../../../actions/api.action';
import {Strings} from '../../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {expireToken, getPostParameter} from '../../../../constants/Helper';
import { PostRequestDAO } from '../../../../DAO';
import LoadingBar from '../../../../components/LoadingView/loading_bar';
import AlertDialog from '../../../../components/modal/AlertDialog';

const StockStagingContainer = props => {

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [message, setMessage] = useState('');
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const dispatch = useDispatch();
  const loadingBarRef = useRef(null);
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
    loadingBarRef.current.showModal();
    const userParam = getPostParameter(currentLocation);
    setIsLoading(true);

    const postData = {
      iccids: items.map(item => item.iccid),
      user_local_data: userParam.user_local_data,
    };

    PostRequestDAO.find(0, postData , 'staging-accept' , 'stockmodule/staging-accept' , '' , '', null, null ).then((res) => {
      setIsLoading(false);
      loadingBarRef.current.hideModal();
      var message = '';
      if (res.status === Strings.Success) {
        message = 'Sim items moved to current stock successfully';        
      } else {
        message = res.errors;        
      }
      showConfirmModal(message);                        
    }).catch((e) => {
      setIsLoading(false);      
      expireToken(dispatch,e)
    });   
  };

  const showConfirmModal = (message) => {
    setMessage(message);
    if(Platform.OS == 'android'){
      setIsConfirmModal(true);
    }else{
      setTimeout(() => {
        setIsConfirmModal(true);
      }, 500);
    }
  }

  return (
    <View style={{alignSelf: 'stretch', flex:1}}>

      <LoadingBar 
        ref={loadingBarRef}
      />      

      <AlertDialog 
        visible={isConfirmModal}
        message={message}
        onModalClose={() => {
          setIsConfirmModal(false);
          onLoad();
        }}
      />
      
      <StagingView items={items} isLoading={isLoading} onAccept={onAccept} />
    </View>
  );
};   

export default StockStagingContainer;
    