
import { View } from 'react-native'
import React , {useEffect, useState } from 'react'
import { getApiRequest, postApiRequest, postApiRequestMultipart } from '../../../../../actions/api.action';
import { useSelector } from 'react-redux';
import TraderView from '../components/TraderView';
import { getPostParameter } from '../../../../../constants/Helper';
import { Constants } from '../../../../../constants';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../../../actions/notification.action';

export default function TraderContainer(props) {
    
    const { stockItem , selectedCodes} = props;
    const [user, setUser] = useState([]);
    const [lists, setLists] = useState([]);
    const currentLocation = useSelector(state => state.rep.currentLocation);
    const dispatch = useDispatch();

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

    const onTrader = () => {                
        var userParam = getPostParameter(currentLocation);    
        let postData = {
            stock_type: stockItem.stock_type,
            stock_item_id: stockItem.stock_item_id,
            transferee_user_id: user.value,
            user_local_data: userParam.user_local_data,
        }
        console.log("selectedCodes" , selectedCodes);
        var stockItemIds = selectedCodes.map((item) =>{
            return item.stock_item_id;
        })
        console.log("stockItemIds", stockItemIds)
        if(stockItem.stock_type == Constants.stockType.SIM){
            postData['sims'] = { stock_item_ids : selectedCodes}
        }
        console.log("postData", postData)
        postApiRequest("stockmodule/transfer" ,postData ).then((res) => {
            dispatch(showNotification({type: 'success' , message: res.message, buttonText: 'Ok'}))
        }).catch((e) => {
            dispatch(showNotification({type: 'success' , message:"Error", buttonText: 'Ok'}))
        });
    }

    return (
        <View style={{alignSelf:'stretch'}}>
            
            <TraderView                            
                onItemSelected={onItemSelected}
                onTrader = {onTrader}                
                lists={lists}
                {...props}
            />

        </View>
    )
}