import { View, Text ,TouchableOpacity ,FlatList, Dimensions  } from 'react-native'
import React from 'react'
import { AppText } from '../../../../../components/common/AppText';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import CardView from '../../../../../components/common/CardView';
import { getSubText } from '../../../../../helpers/viewHelper';

export default function SelectDevicesView(props) {

  const {stockItems , onItemSelected } = props;
  const renderItem = (item, index) => {
    return (
        <TouchableOpacity key={index} onPress={() =>{
            onItemSelected(item)
        }}>
          <CardView style={{ marginTop:10, marginHorizontal:10 , borderColor:whiteLabel().borderColor, borderWidth:1}}>            
              <View style={{padding:5}}>
                  <AppText size="medium" type="secondaryBold" title={item != undefined ? item.description :  ''} color={Colors.blackColor}></AppText>
                  <AppText title={getSubText(item)} color={whiteLabel().subText}></AppText>
              </View>
          </CardView>
        </TouchableOpacity>
    );
  };

  return (
    <View style={{marginHorizontal:0, marginTop:5 , height:Dimensions.get("screen").height * 0.4}}>
       <FlatList
          data={stockItems}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={10}          
        />        
    </View>
  )

}