
import { View } from 'react-native'
import React , {useEffect, useState } from 'react'
import { getApiRequest, postApiRequest } from '../../../../../actions/api.action';
import { useSelector } from 'react-redux';
import TransferView from '../components/TransferView';
import { getPostParameter } from '../../../../../constants/Helper';
import { Constants, Strings } from '../../../../../constants';
import { useDispatch } from 'react-redux';
import { clearNotification, showNotification } from '../../../../../actions/notification.action';

export default function TransferContainer(props) {
    
    const { stockItem , selectedCodes} = props;
    const [user, setUser] = useState([]);
    const [lists, setLists] = useState([]);
    const currentLocation = useSelector(state => state.rep.currentLocation);
    const dispatch = useDispatch();
    var quantity = '';

    useEffect(() => {
      let mounted = true;
      getApiRequest("stockmodule/users", {} ).then((res) => {
        if(mounted){            
            var tmp = [];
            res.users.map((item , index) => {
                tmp.push({label:item.username, value:item.user_id});
            })
            setLists(tmp)
        }
      }).catch((e) => {
      });
      return () => {
        mounted = false;
      }
    }, [])
         
    const onItemSelected = (item) =>{ 
        setUser(item)
    }
    const onChangedQuantity = (quantityVal) =>{
        quantity = quantityVal;
    }

    const onTrader = () => {                
        var userParam = getPostParameter(currentLocation);    
        let postData = {
            stock_type: stockItem.stock_type,
            stock_item_id: stockItem.stock_item_id,
            transferee_user_id: user.value,
            user_local_data: userParam.user_local_data,
        }
        
        var stockItemIds = selectedCodes.map((item) =>{
            return item.stock_item_id;
        })        
        if(stockItem.stock_type == Constants.stockType.SIM){        
            postData['sims'] = { stock_item_ids : stockItemIds};
        }else if(stockItem.stock_type == Constants.stockType.CONSUMABLE){
            if(quantity != ''){
                postData['transfer_qty'] = quantity;
            }else{
                return;
            }
        }

        postApiRequest("stockmodule/transfer" , postData ).then((res) => {
            dispatch(showNotification({type: Strings.Success , message: res.message, buttonText: 'Ok' , buttonAction: async () => {                    
                props.onButtonAction({ type: Constants.actionType.ACTION_CLOSE });
                dispatch(clearNotification());                 
            }}))
        }).catch((e) => {
            dispatch(showNotification({type: Strings.Success , message:"Error", buttonText: 'Ok'}))
        });
    }

    return (
        <View style={{alignSelf:'stretch'}}>
            
            <TransferView                            
                onItemSelected={onItemSelected}
                onTrader = {onTrader}        
                onChangedQuantity =  {onChangedQuantity}        
                lists={lists}
                {...props}
            />

        </View>
    )
}