
import { View, Text } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import StockSignatureView from '../components/StockSignatureView';
import { postApiRequestMultipart } from '../../../../../actions/api.action';
import { useSelector } from 'react-redux';
import * as RNLocalize from 'react-native-localize';
import { Constants } from '../../../../../constants';
import RNFS, {
    DownloadFileOptions,
    DocumentDirectoryPath,
    downloadFile,
} from 'react-native-fs';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../../../actions/notification.action';

export default function StockSignatureContainer(props) {
         
    const { item , selectedCodes }  = props;
    const currentLocation = useSelector(state => state.rep.currentLocation);
    const dispatch = useDispatch();

    var msisdn = '';
    var received = '';

    const onItemPressed = (item) => {

    }
    
    const onSubmit = (signature) => {

        console.log("stockmodule/sell-to-trader", item);        
        if(received != ""){
            
            var postData = new FormData();
            RNFS.exists(signature)
            .then(res => {
                if (res) {
                    if(!signature.includes("file://")){
                        signature = "file://" + signature;
                    }
                    postData.append('signature_image',  { uri: signature, type:'image/png' , name:'sign.png' } );
                } else {
                    console.log('no file exist', signature);                    
                }
            })
            .catch(error => {
                console.log('error', error);
            });
            postData.append('received_by',  received);
            var time_zone = RNLocalize.getTimeZone();
            postData.append('user_local_data[time_zone]', time_zone);
            postData.append( 'user_local_data[latitude]', currentLocation && currentLocation.latitude != null ? currentLocation.latitude : '0' );
            postData.append( 'user_local_data[longitude]', currentLocation && currentLocation.longitude != null ? currentLocation.longitude : '0' );   

            if(item.stock_type != Constants.stockType.RETURN){
                postData.append('stock_type', item.stock_type);
                postData.append('location_id',  props.locationId);
                
                if(item.stock_type ==  Constants.stockType.DEVICE){
                    postData.append('stock_item_id', props.item.stock_item_id);            
                    postData.append('assigned_msisdn',  msisdn);            
                }else if(item.stock_type == Constants.stockType.SIM){
                    postData.append("sims" , {stock_item_ids: selectedCodes } )
                }

                postApiRequestMultipart("stockmodule/sell-to-trader" , postData).then((res) => {
                    dispatch(showNotification({type:'success' , message: res.message , buttonText: 'Ok'}))
                }).catch((e) => {
                    dispatch(showNotification({type:'success' , message: "Error" , buttonText: 'Ok'}))
                });
                
            }else if(item.stock_type == Constants.stockType.RETURN){
                props.stockItemIds.forEach((item , index) => {
                    postData.append(`stock_item_ids[${index}]`, item);
                });

                postApiRequestMultipart("stockmodule/return-to-warehouse" , postData).then((res) => {
                    console.log("re", res)
                    dispatch(showNotification({type:'success' , message: res.message , buttonText: 'Ok'}))
                }).catch((e) => {
                    console.log("error", e)
                    dispatch(showNotification({type:'success' , message: "Error" , buttonText: 'Ok'}))
                });
            }            
        }
    }
  
    const onChangedSerial = (serial) => {
        msisdn = serial;
    }
    
    const onChangedReceivedBy = (receivedBy) => {
        received =  receivedBy;
    }

    const onClose = () => {

    }
    

    return (
        <View style={{alignSelf:'stretch'}}>
            <StockSignatureView                
                onItemPressed = {onItemPressed}
                onSubmit = {onSubmit}                
                onChangedReceivedBy={onChangedReceivedBy}
                onChangedSerial={onChangedSerial}
                onClose={onClose}
                {...props}
            />

            
        </View>
    )
}