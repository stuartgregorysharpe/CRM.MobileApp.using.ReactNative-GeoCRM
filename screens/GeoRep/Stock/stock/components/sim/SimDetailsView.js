
import { View, StyleSheet, Keyboard } from 'react-native'
import React , { useState ,useEffect , useRef } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Constants } from '../../../../../../constants';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SimViewListsModal from '../../modal/sim/SimViewListsModal';
import SimDetailsChildView from './SimDetailsChildView';

export default function SimDetailsView(props) {
      
    const [isScan, setIsScan] = useState(true)
    const simViewListModalRef = useRef(null)

    console.log("selectedCodes",props.selectedCodes);
    console.log("codeLists",props.codeLists);

    const onSuccess = e => {   /// From Camera
        const {data} = e;        
        if(isScan){
          props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: data});
        }
        
    };
    
    const onAddCode = (value) => { // Manual Input
      if(isScan){
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});          
      }      
    }

    const onSellToTrader = () => {
        setIsScan(false);
        props.onSellToTrader();
    }

    const onTransfer = () => {
      setIsScan(false);
      props.onTransfer();
    }
  
    const viewLists = () => {
      simViewListModalRef.current.showModal();
    }

    const onSimViewListClosed = ({type, value})=> {    

      if(type == Constants.actionType.ACTION_CLOSE || type == Constants.actionType.ACTION_CHANGE_NETWORK ){
        simViewListModalRef.current.hideModal()
      }
      if(type == Constants.actionType.ACTION_REMOVE){
        console.log("remoer", value)
        props.onButtonAction({type: Constants.actionType.ACTION_REMOVE, value: value});        
      }
      if(type == Constants.actionType.ACTION_DONE){
        //addStock()
      }
    }

    const renderCustomerMarker = () => {
        return (
          <View style={styles.cameraMarker}>
            <View style={{alignSelf: 'stretch', flexDirection: 'row'}}>
              <View
                style={{
                  borderColor: Colors.green2Color,
                  borderTopWidth: 4,
                  borderLeftWidth: 4,
                  width: 80,
                  height: 80,
                }}
              />
              <View
                style={{
                  width: 70,
                  height: 80,
                }}
              />
              <View
                style={{
                  borderColor: Colors.green2Color,
                  borderTopWidth: 4,
                  borderRightWidth: 4,
                  width: 80,
                  height: 80,
                }}
              />
            </View>
            <View
              style={{
                alignSelf: 'stretch',
                flexDirection: 'row',
                height: 70,
              }}
            />
            <View style={{alignSelf: 'stretch', flexDirection: 'row'}}>
              <View
                style={{
                  borderColor: Colors.green2Color,
                  borderBottomWidth: 4,
                  borderLeftWidth: 4,
                  width: 80,
                  height: 80,
                }}
              />
              <View
                style={{
                  width: 70,
                  height: 80,
                }}
              />
              <View
                style={{
                  borderColor: Colors.green2Color,
                  borderBottomWidth: 4,
                  borderRightWidth: 4,
                  width: 80,
                  height: 80,
                }}
              />
            </View>
          </View>
        );
      };


    return (
        <View style={[styles.container, props.style]}>
            <QRCodeScanner                
                  onRead={onSuccess}
                  reactivate={true}
                  customMarker={renderCustomerMarker()}
                  showMarker
            />

            <SimDetailsChildView
              onClose={() => {Keyboard.dismiss()}} 
              sellToTrader={onSellToTrader}
              transfer={onTransfer}
              viewLists={viewLists}
              onAddCode={(value) => onAddCode(value)}
              {...props}
              ></SimDetailsChildView>
            
            <SimViewListsModal
              ref={simViewListModalRef}              
              lists={props.selectedCodes}
              type="sim_view_lists"
              onButtonAction={onSimViewListClosed}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,                
    },
    cameraMarker: {
        width: 230,
        height: 230,
    },

})

