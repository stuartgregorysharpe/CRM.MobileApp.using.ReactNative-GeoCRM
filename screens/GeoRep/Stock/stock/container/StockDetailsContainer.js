
import { View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import StockDetailsView from '../components/StockDetailsView';
import SearchLocationModal from '../modal/SearchLocationModal';
import { useDispatch , useSelector } from 'react-redux';
import { Constants } from '../../../../../constants';

export default function StockDetailsContainer(props) {
         
    const searchLocationModalRef = useRef(null);    
    const isCheckin = useSelector(state => state.location.checkIn);
    const [stockType, setStockType] = useState(Constants.stockDeviceType.SELL_TO_TRADER)
        
    const onSearchLocation = async({type, value}) => {
        if(type == Constants.actionType.ACTION_NEXT){            
            console.log("Location id", value.locationId);
            if(stockType === Constants.stockDeviceType.SELL_TO_TRADER){                
                props.openSignature(value)
            }else if(stockType === Constants.stockDeviceType.SWOP_AT_TRADER){
                props.openSwopAtTrader(value);
            }            
        }
    };

    useEffect(() => {

    },[]);
      
    const sellToTrader= (type, data) => {
        if(isCheckin){
            props.openSignature()        
        }else{
            setStockType(Constants.stockDeviceType.SELL_TO_TRADER)
            searchLocationModalRef.current.showModal();
        }                
    }
    const swopAtTrader = (type, data) => {
        if(isCheckin){            
            props.openSwopAtTrader()
        }else{
            setStockType(Constants.stockDeviceType.SWOP_AT_TRADER)
            searchLocationModalRef.current.showModal();            
        }        
    }

    const trader = (type, data) => {
        props.openTrader({stockType:Constants.stockDeviceType.TARDER, value:''});
    }

    return (
        <View style={{alignSelf:'stretch'}}>
            <StockDetailsView
                sellToTrader={sellToTrader}
                swopAtTrader={swopAtTrader}            
                trader={trader}
                item={props.item}
                {...props}
            />
            
            <SearchLocationModal
                ref={searchLocationModalRef}
                title="Search Location"
                stockType={stockType}
                onButtonAction={onSearchLocation}
                />   
        </View>
    )
}