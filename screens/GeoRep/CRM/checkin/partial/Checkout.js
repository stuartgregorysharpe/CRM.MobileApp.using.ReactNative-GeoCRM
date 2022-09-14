import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,  
} from 'react-native';
import {postApiRequest} from '../../../../../actions/api.action';
import {AppText} from '../../../../../components/common/AppText';
import {whiteLabel} from '../../../../../constants/Colors';
import {getPostParameter} from '../../../../../constants/Helper';
import {storeLocalValue} from '../../../../../constants/Storage';
import {useSelector} from 'react-redux';
import { getDateTime } from '../../../../../helpers/formatHelpers';

export default function Checkout(props) {

  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => {
          if(props._callCheckOut){
            props._callCheckOut();
          }          
        }}>
        <View style={styles.checkout}>
          <AppText
            color={whiteLabel().mainText}
            style={{fontWeight: '700'}}
            size="medium"
            title="Check Out"></AppText>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity style={{flex:1 , marginLeft:20}}>
                <View style={styles.pause}>    
                    <AppText color={whiteLabel().headerText} size="medium" title="Pause"></AppText>
                    <View style={{width:3, height:12,backgroundColor:'white' ,  marginLeft:15}}></View>
                    <View style={{width:3, height:12,backgroundColor:'white' ,  marginLeft:3}}></View>
                </View>
            </TouchableOpacity>
            */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  checkout: {
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  pause: {
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteLabel().headerBackground,
    flexDirection: 'row',
    borderColor: whiteLabel().headerText,
    borderWidth: 1,
  },
});
