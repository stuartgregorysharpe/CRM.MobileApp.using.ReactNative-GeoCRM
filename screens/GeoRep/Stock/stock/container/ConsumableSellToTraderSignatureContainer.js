
import { View, Text } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import StockSignatureView from '../components/StockSignatureView';
import { postApiRequestMultipart } from '../../../../../actions/api.action';
import { useSelector } from 'react-redux';
import * as RNLocalize from 'react-native-localize';
import ConsumableSellToStockSignatureView from '../components/ConsumableSellToStockSignatureView';

export default function ConsumableSellToTraderSignatureContainer(props) {
         
    const currentLocation = useSelector(state => state.rep.currentLocation);

    
    var received = '';
    var quantity = '';
    var price = '';
    var reference = '';

    useEffect(() => {
        console.log("stocksignature location id", props.locationId);
    },[]);

    const onItemPressed = (item) => {

    }
    
    const onSubmit = (signature) => {
        console.log("stockmodule/sell-to-trader");      
        var postData = new FormData();
        postData.append('stock_type', "Device");
        postData.append('stock_item_id', props.item.stock_item_id);
        postData.append('received_by',  received);
        
        postData.append('location_id',  props.locationId);        
        var time_zone = RNLocalize.getTimeZone();
        postData.append('user_local_data[time_zone]', time_zone);
        postData.append( 'user_local_data[latitude]', currentLocation && currentLocation.latitude != null ? currentLocation.latitude : '0' );
        postData.append( 'user_local_data[longitude]', currentLocation && currentLocation.longitude != null ? currentLocation.longitude : '0' );
        postData.append("File['signature_image']",  { uri: signature, type:'image/png' , name:'sign.png' } );
        
        postApiRequestMultipart("stockmodule/sell-to-trader" , postData).then((res) => {

        }).catch((e) => {
        });
    }
  

    const onChangedReceivedBy = (receivedBy) => {
        received =  receivedBy;
    }
    const onChangedQuantity = (receivedBy) => {
        quantity =  quantity;
    }
    const onChangedPrice = (receivedBy) => {
        price =  price;
    }
    const onChangedReference = (receivedBy) => {
        reference =  reference;
    }

    const onClose = () =>{

    }
        
    return (
        <View style={{alignSelf:'stretch'}}>
            <ConsumableSellToStockSignatureView                
                onItemPressed = {onItemPressed}
                onSubmit = {onSubmit}                
                onClose={onClose}
                onChangedReceivedBy={onChangedReceivedBy}
                onChangedQuantity={onChangedQuantity}
                onChangedPrice={onChangedPrice}
                onChangedReference={onChangedReference}
                {...props}
            />                        
        </View>
    )
}