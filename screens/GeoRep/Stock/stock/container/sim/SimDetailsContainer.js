
import { View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import SimDetailsView from '../../components/sim/SimDetailsView';
import SearchLocationModal from '../../modal/SearchLocationModal';
import { useSelector } from 'react-redux';
import { Constants } from '../../../../../../constants';

export default function SimDetailsContainer(props) {
            
    const { selectedCodes } =  props;
    const searchLocationModalRef = useRef(null);
    const isCheckin = useSelector(state => state.location.checkIn);
    const [stockType, setStockType] = useState(Constants.stockDeviceType.SELL_TO_TRADER)
    
    const onSellToTrader = () => {

        if(selectedCodes.length > 0){
            if(isCheckin){            
                //props.onSellToTrader()
            }else{
                setStockType(Constants.stockDeviceType.SELL_TO_TRADER);
                searchLocationModalRef.current.showModal();            
            }     
        }
    }

    const onTransfer = () => {
        if(selectedCodes.length > 0){
            var value = {stockType: Constants.stockDeviceType.TARDER, value: 0}
            props.onButtonAction({ type: Constants.actionType.ACTION_NEXT , value: value });
        }        
    }
        
    const onSearchLocationModalClosed = async({type, value}) => {
        if(type == Constants.actionType.ACTION_NEXT){        
            console.log("Location id in search", value.locationId);
            if(stockType === Constants.stockDeviceType.SELL_TO_TRADER){
                props.openSignature(value)
            }else if(stockType === Constants.stockDeviceType.SWOP_AT_TRADER){
                //props.openSwopAtTrader(value);
            }            
        }
    };

    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            <SimDetailsView                 
                onSellToTrader={onSellToTrader}
                onTransfer={onTransfer}                
                {...props}
            />
            
            <SearchLocationModal
                ref={searchLocationModalRef}
                title="Search Location"
                stockType={stockType}
                onButtonAction={onSearchLocationModalClosed}
                />   
  
        </View>
    )
}