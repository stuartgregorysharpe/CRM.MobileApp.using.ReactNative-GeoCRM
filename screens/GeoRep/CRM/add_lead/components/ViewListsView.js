import { View ,TouchableOpacity ,FlatList, Dimensions  } from 'react-native'
import React from 'react'
import { AppText } from '../../../../../components/common/AppText';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import CardView from '../../../../../components/common/CardView';
import { getSubText } from '../../../../../helpers/viewHelper';
import SvgIcon from '../../../../../components/SvgIcon';

export default function ViewListsView(props) {

  const {stockItems , removeDevice } = props;
  
  const renderItem = (item, index) => {
    return (
        <TouchableOpacity key={index} onPress={() =>{
            
        }}>
          <CardView style={{ marginTop:10, marginHorizontal:10 , borderColor:whiteLabel().borderColor, borderWidth:1}}>            
              <View style={{flexDirection:'row'}}>
                <View style={{padding:5}}>
                    <AppText size="medium" type="secondaryBold" title={item != undefined ? item.description :  ''} color={Colors.blackColor}></AppText>
                    <View>
                        <AppText title={getSubText(item)} color={whiteLabel().subText}></AppText>
                    </View>                    
                </View>

                <View style={{ marginTop:7, flex:1, alignItems:'flex-end',  marginRight:10 }}>
                  <AppText title={"MSISDN: " + item.msisdn} color={whiteLabel().subText}></AppText>                  
                </View>

                <View style={{marginRight:10, justifyContent:'center'}}>
                    <TouchableOpacity onPress={() => removeDevice(item)}>
                        <SvgIcon icon="DELETE" width="20" height='20' />
                    </TouchableOpacity>                    
                </View>                                               
                
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