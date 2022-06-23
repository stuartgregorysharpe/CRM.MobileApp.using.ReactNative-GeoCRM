
import { View, Text } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import StockSignatureView from '../components/StockSignatureView';
import { postApiRequestMultipart } from '../../../../../actions/api.action';
import { useSelector } from 'react-redux';
import * as RNLocalize from 'react-native-localize';
import { Constants } from '../../../../../constants';

export default function StockSignatureContainer(props) {
         
    const { item , selectedCodes }  = props;
    const currentLocation = useSelector(state => state.rep.currentLocation);

    var msisdn = '';
    var received = '';
    
    const onItemPressed = (item) => {

    }

    const onSubmit = (signature) => {

        console.log("stockmodule/sell-to-trader", item);
        console.log("selectedCodes" , selectedCodes)
        if(received != ""){
            var postData = new FormData();
            postData.append('stock_type', item.stock_type);
            postData.append('location_id',  props.locationId);
            postData.append('received_by',  received);
            if(item.stock_type ==  Constants.stockType.DEVICE){
                postData.append('stock_item_id', props.item.stock_item_id);            
                postData.append('assigned_msisdn',  msisdn);            
            }else if(item.stock_type == Constants.stockType.SIM){
                postData.append("sims" , {stock_item_ids: selectedCodes } )
            }        
            var time_zone = RNLocalize.getTimeZone();
            postData.append('user_local_data[time_zone]', time_zone);
            postData.append( 'user_local_data[latitude]', currentLocation && currentLocation.latitude != null ? currentLocation.latitude : '0' );
            postData.append( 'user_local_data[longitude]', currentLocation && currentLocation.longitude != null ? currentLocation.longitude : '0' );
            postData.append("File['signature_image']",  { uri: signature, type:'image/png' , name:'sign.png' } );
                        
            postApiRequestMultipart("stockmodule/sell-to-trader" , postData).then((res) => {
    
            }).catch((e) => {
    
            });
        }
        

    }
  
    const onChangedSerial = (serial) => {
        msisdn = serial;
    }
    
    const onChangedReceivedBy = (receivedBy) => {
        received =  receivedBy;
    }
    
    return (
        <View style={{alignSelf:'stretch'}}>
            <StockSignatureView                
                onItemPressed = {onItemPressed}
                onSubmit = {onSubmit}                
                onChangedReceivedBy={onChangedReceivedBy}
                onChangedSerial={onChangedSerial}
                {...props}
            />

            
        </View>
    )
}