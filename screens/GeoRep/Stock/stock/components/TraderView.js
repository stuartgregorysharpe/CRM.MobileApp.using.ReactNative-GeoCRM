import { View, Text ,StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React , { useState } from 'react'
import CSingleSelectInput from '../../../../../components/common/SelectInput/CSingleSelectInput';
import { AppText } from '../../../../../components/common/AppText';
import { whiteLabel } from '../../../../../constants/Colors';
import SvgIcon from '../../../../../components/SvgIcon';
import CardView from '../../../../../components/common/CardView';
import CTextInput from '../../../../../components/common/CTextInput';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import DropdownInput from '../../../../../components/common/DropdownInput/DropdownInput';
import TakePhotoView from '../../../../../components/shared/TakePhotoView';
import { Constants } from '../../../../../constants';

export default function TraderView(props) {
  
  const { modalType, item,  lists , onItemSelected , onChangedQuantity, onTrader} = props;  
  const [userId, setUserId] = useState("");  
  return (
    <ScrollView style={styles.container}>

          <CSingleSelectInput                    
              description={'User'}
              placeholder={'Select ' + "User"}
              checkedValue={userId}
              items={lists}
              hasError={false}
              disabled={false}
              onSelectItem={item => { 

                  setUserId(item.value);
                  onItemSelected(item)

              }}
              containerStyle={{marginTop: 15}}
          /> 

          {
            item && item.stock_type === Constants.stockType.CONSUMABLE &&
            <CTextInput 
                label={"Received By"}
                value={quantity}
                returnKeyType={'done'}                                        
                isRequired={true}
                onChangeText={text => {                
                    onChangedQuantity(text);
                }}
                style={{marginTop:15}}
            />                       
          }
          

          <SubmitButton title="Trader" style={{marginTop:20 , marginBottom:30}} onSubmit={onTrader}></SubmitButton>          
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
      
      //alignSelf: 'stretch',
      paddingTop: 10,
      marginHorizontal: 20,
      //marginBottom: 30,
      paddingBottom:0,      
  },

})

