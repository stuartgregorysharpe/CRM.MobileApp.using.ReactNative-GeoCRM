import { View, Text , FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppText } from '../AppText';
import Colors , { whiteLabel } from '../../../constants/Colors';
import { Constants } from '../../../constants';

export default function DropdownLists(props) {

    const { lists ,onItemSelected } = props;


    const renderItem = (item, index) => {
      return (
          <TouchableOpacity key={index} onPress={() =>{
              onItemSelected(item)
          }}>
              <View style={{flexDirection:'column'}}>
                  <View key={index} style={{ flexDirection:'row', alignItems:'center'}}>

                      <View style={{flex: 1}}>
                          <AppText
                              size="big"
                              type="secondaryBold"
                              title={item.description}
                              style={{fontSize: 12.5}}></AppText>
                          <AppText
                              type="secondaryMedium"
                              title={Constants.stockPrefix.MSN_IMEI + item.imei}
                              color={whiteLabel().subText}
                              style={{fontSize: 10.4}}></AppText>
                      </View>
                      
                      <View style={{flex: 1, alignItems: 'flex-end', marginRight:10}}>
                          <AppText
                              type="secondaryMedium"
                              title={"MSISDN: " + item.msisdn}              
                              style={{fontSize: 10.4}}></AppText>
                      </View>

                  </View>
                  <View style={{height:0.5, backgroundColor:Colors.greyColor, marginVertical:3 , marginRight:10}}></View>
              </View>
          </TouchableOpacity>        
      );
    };

    return (
      <View style={{marginTop:15}}>
          {
            lists !=undefined && lists.length > 0 && lists.map((item, index) => {
                return renderItem(item, index);
            })
          }   
      </View>
    )

}