
import { View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import AddStockView from '../components/AddStockView'
import { getApiRequest, postApiRequest } from '../../../../../actions/api.action';
import { Constants } from '../../../../../constants';
import { useSelector } from 'react-redux';
import { getPostParameter } from '../../../../../constants/Helper';
import { showNotification } from '../../../../../actions/notification.action';
import { useDispatch } from 'react-redux';
import SimScanView from '../components/SimScanView';
import SimViewListsView from '../components/SimViewListsView';

export default function SimViewListsContainer(props) {
    
    const [vodacomLists , setVodacomLists] = useState([]);
    const [cellLists, setCellLists] = useState([]);
    const [telkomLists, setTelkomLists] = useState([]);
    
    useEffect(() => {

    },[]);

    const addData = (value) => {
        
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }
       
    const removeCode = (value) => {
        props.onButtonAction({type: Constants.actionType.ACTION_REMOVE, value: value});   
    }

    const addStock = () => {
        props.onButtonAction({type: Constants.actionType.ACTION_DONE, value: 0});   
    }

    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            <SimViewListsView
                onButtonAcstion={addData}                
                removeCode={(value) =>removeCode(value)}
                addStock={() => addStock()}
                {...props}
            />
        </View>
    )
}