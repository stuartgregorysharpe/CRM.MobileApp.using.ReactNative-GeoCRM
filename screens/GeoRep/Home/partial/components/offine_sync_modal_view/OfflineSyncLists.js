import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppText } from '../../../../../../components/common/AppText';
import Colors, { whiteLabel } from '../../../../../../constants/Colors';

const OfflineSyncLists = props => {

    const { lists , onItemSelected } = props;
    

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
                              title={item.label + " (" + item.itemType + ")"}
                              style={{fontSize: 12.5}}></AppText>
                          <AppText
                              type="secondaryMedium"
                              title={item.subLabel} 
                              color={whiteLabel().subText}
                              style={{fontSize: 10.4}}></AppText>
                      </View>
                      
                      <View style={{flex: 1, alignItems: 'flex-end', marginRight:10}}>
                          <AppText
                              type="secondaryMedium"
                              title={item.time}              
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
export default OfflineSyncLists;