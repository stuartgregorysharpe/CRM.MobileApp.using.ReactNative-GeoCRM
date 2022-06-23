
import { View, Text ,StyleSheet, Keyboard } from 'react-native'
import React , { useState ,useEffect , useRef } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Constants } from '../../../../../../constants';
import SimScanChildView from './../SimScanChildView';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SimViewListsModal from '../../modal/sim/SimViewListsModal';
import SimDetailsChildView from './SimDetailsChildView';

export default function SimDetailsView(props) {
  
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const simViewListModalRef = useRef(null)

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true); // or some other action
          console.log("show key board")
        },
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false); // or some other action
          console.log("hide keyboard")
        },
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);
    
    const onSuccess = e => {   /// From Camera
        const {data} = e;        
        console.log("scanval", data)
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: data});
    };

    const onAddCode = (value) => { // Manual Input
      props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
      
      //props.onAddCode(value)
    }

    const onSellToTrader = () => {
        props.onSellToTrader();
    }

    const onTransfer = () => {
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
        //props.onButtonAction({type: Constants.actionType.ACTION_REMOVE, value: value});        
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
              lists={props.codeLists}
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

