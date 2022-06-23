
import { View } from 'react-native'
import React , {useEffect, useState } from 'react'
import { getApiRequest, postApiRequest, postApiRequestMultipart } from '../../../../../actions/api.action';
import { useSelector } from 'react-redux';
import TraderView from '../components/TraderView';
import { getPostParameter } from '../../../../../constants/Helper';


export default function TraderContainer(props) {
    
    const [user, setUser] = useState([]);
    const [lists, setLists] = useState([]);
    const currentLocation = useSelector(state => state.rep.currentLocation);

    useEffect(() => {
      let mounted = true;
      getApiRequest("https://www.dev.georep.com/local_api_old/stockmodule/users", {} ).then((res) => {
        if(mounted){
            console.log("Res", res);
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
            stock_type: 'Device',
            stock_item_id: props.item.stock_item_id,
            transferee_user_id: user.value,
            user_local_data: userParam.user_local_data,
        }
        console.log("postData", postData)
        postApiRequest("stockmodule/transfer" ,postData ).then((res) => {
            
        }).catch((e) => {

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