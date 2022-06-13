
import { View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import StockDetailsView from '../components/StockDetailsView';
import SearchLocationModal from '../modal/SearchLocationModal';
import { useDispatch , useSelector } from 'react-redux';
import { Constants } from '../../../../../constants';

export default function StockDetailsContainer(props) {
         
    const searchLocationModalRef = useRef(null);    
    const isCheckin = useSelector(state => state.location.checkIn);
        
    const onSearchLocation = async({type, value}) => {
        if(type == Constants.actionType.ACTION_NEXT){
            props.openSignature()
        }
    };

    useEffect(() => {

    },[]);
      
    const sellToTrader = (type, data) => {
        if(isCheckin){
            props.openSignature()            
            //searchLocationModalRef.current.showModal();
        }else{
            searchLocationModalRef.current.showModal();
        }                
    }

    const swopAtTrader = (type, data) => {        

    }

    const trader = (type, data) => {
        
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
                onButtonAction={onSearchLocation}
                />   
        </View>
    )
}