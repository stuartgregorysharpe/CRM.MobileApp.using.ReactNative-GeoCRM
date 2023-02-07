import {View} from 'react-native';
import React, { useEffect, useState , useRef } from 'react';
import AddStockView from '../components/AddStockView';
import {Constants, Strings} from '../../../../../constants';
import {useSelector} from 'react-redux';
import {expireToken, getPostParameter} from '../../../../../constants/Helper';
import {useDispatch} from 'react-redux';
import {GetRequestStockFieldDataDAO, PostRequestDAO} from '../../../../../DAO';
import { generateKey } from '../../../../../constants/Utils';
import LoadingBar from '../../../../../components/LoadingView/loading_bar';
import AlertDialog from '../../../../../components/modal/AlertDialog';

var add_stock_indempotency = '';

export default function AddStockContainer(props) {

  const dispatch = useDispatch();
  const [deviceTypeLists, setDevicetypeLists] = useState([]);
  const [stockTypes, setStockTypes] = useState({});  
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false)
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const loadingBarRef = useRef(null);

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
    loadingBarRef.current.showModal();
    PostRequestDAO.find(
      0,
      data,
      'add_stock',
      'stockmodule/add-stock',
      type,
      subTitle,
      add_stock_indempotency      
    )
      .then(res => {
        setIsLoading(false);
        loadingBarRef.current.hideModal();
        console.log("add stock response =>", res);
        var message = '';
        if (res.status === Strings.Success) {
          message = res.message != null ? res.message : 'Exist Same IMEI';
        }else{
          message = res.errors;
        }
        setMessageType(res.status);
        setIsConfirmModal(true);
        setMessage(message);
      })
      .catch(e => {
        setIsLoading(false);
        loadingBarRef.current.hideModal();
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

      <LoadingBar 
        backButtonDisabled={true}
        ref={loadingBarRef} />

      <AlertDialog
        visible={isConfirmModal}
        onModalClose={() => {
          setIsConfirmModal(false);     
          if(messageType == Strings.Success){
            props.onButtonAction({type: Constants.actionType.ACTION_CLOSE});
          }
        }}
        message={message}>        
        </AlertDialog>      

    </View>
  );
}
