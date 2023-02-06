import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {postApiRequest} from '../../../../../actions/api.action';
import {useSelector} from 'react-redux';
import TransferView from '../components/TransferView';
import {expireToken, getPostParameter} from '../../../../../constants/Helper';
import {Constants, Strings} from '../../../../../constants';
import {useDispatch} from 'react-redux';
import {
  clearNotification,
  showNotification,
} from '../../../../../actions/notification.action';
import {Notification} from '../../../../../components/modal/Notification';
import { GetRequestStockUsersDAO, PostRequestDAO } from '../../../../../DAO';
import LoadingProgressBar from '../../../../../components/modal/LoadingProgressBar';

export default function TransferContainer(props) {

  const {stockItem, selectedCodes} = props;

  const [user, setUser] = useState([]);
  const [lists, setLists] = useState([]);

  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  var quantity = '';

  useEffect(() => {

    let mounted = true;
    GetRequestStockUsersDAO.find({}).then((res) => {
      if (mounted) {
        var tmp = [];
        res.users.map((item, index) => {
          tmp.push({label: item.username, value: item.user_id});
        });
        setLists(tmp);
      }
    }).catch((e) => {
      console.log("stockmodule users api error: " , e);
      expireToken(dispatch , e);
    });

    return () => {
      mounted = false;
    };
    
  }, []);

  const onItemSelected = item => {
    setUser(item);
  };
  const onChangedQuantity = quantityVal => {
    quantity = quantityVal;
  };

  const onTrader = () => {
    var userParam = getPostParameter(currentLocation);
    let postData = {
      stock_type: stockItem.stock_type,
      stock_item_id: stockItem.stock_item_id,
      transferee_user_id: user.value,
      user_local_data: userParam.user_local_data,
    };

    var stockItemIds = selectedCodes.map(item => {
      return item.stock_item_id;
    });
    if (stockItem.stock_type == Constants.stockType.SIM) {
      postData['sims'] = {stock_item_ids: stockItemIds};
    } else if (stockItem.stock_type == Constants.stockType.CONSUMABLE) {
      if (quantity != '') {
        postData['transfer_qty'] = quantity;
      } else {
        return;
      }
    }
    if(isLoading) return;
    setIsLoading(true);
    PostRequestDAO.find(0 ,  postData , 'transfer' , 'stockmodule/transfer' , '' , '' , null , dispatch).then((res) => {
      setIsLoading(false);        
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
    }).catch((e) => {
      setIsLoading(false);
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
    
  };

  return (
    <View style={{alignSelf: 'stretch'}}>
      <TransferView
        onItemSelected={onItemSelected}
        onTrader={onTrader}
        onChangedQuantity={onChangedQuantity}
        lists={lists}        
        {...props}
      />
      <Notification />
      <LoadingProgressBar />
    </View>
  );
}
