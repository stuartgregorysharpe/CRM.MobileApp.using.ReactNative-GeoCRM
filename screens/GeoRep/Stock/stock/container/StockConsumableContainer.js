
import { View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { Constants } from '../../../../../constants';
import StockConsumableView from '../components/StockConsumableView';

export default function StockConsumableContainer(props) {
         
    const sellToTrader= (type, data) => {        
        props.openSellToTrader(Constants.stockDeviceType.SELL_TO_TRADER);     
    }

    const transfer = (type, data) => {
        props.openTransfer(Constants.stockDeviceType.TRANSFER);
    }

    return (
        <View style={{alignSelf:'stretch'}}>
            <StockConsumableView
                sellToTrader={sellToTrader}
                transfer={transfer}                            
                item={props.item}
                {...props}
            />
      
        </View>
    )
}