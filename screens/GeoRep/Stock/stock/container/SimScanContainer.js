
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

export default function SimScanContainer(props) {
    
    const [vodacomLists , setVodacomLists] = useState([]);
    const [cellLists, setCellLists] = useState([]);
    const [telkomLists, setTelkomLists] = useState([]);
    
    useEffect(() => {

    },[]);

    const addData = (value) => {
        console.log("add data" , value)
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }

    const addToCell = (value) => {
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }

    const addToTelkom = (value) => {
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }
        
    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            <SimScanView                 
                onButtonAction={addData}
                // addToVodacom={(value) => addToVodacom(value)}
                // addToCell={(value) => addToCell(value)}
                // addToTelkom={(value) => addToTelkom(value)}
                {...props}
            />
        </View>
    )
}