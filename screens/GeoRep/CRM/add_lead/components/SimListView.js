import { View ,TouchableOpacity ,FlatList, Dimensions  } from 'react-native'
import React from 'react'
import { AppText } from '../../../../../components/common/AppText';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import CardView from '../../../../../components/common/CardView';
import { getSubText } from '../../../../../helpers/viewHelper';
import { Strings } from '../../../../../constants';
import SvgIcon from '../../../../../components/SvgIcon';

export default function SimListView(props) {

  const { simList , removeDevice } = props;

  console.log("simList",simList)

  const removeSim = (sim) => {
    if(props.removeSim){
      props.removeSim(sim)
    }
  }

  const renderItem = (item, index) => {
    return (
        <TouchableOpacity key={index} onPress={() =>{
            if(props.onItemSelected){
              props.onItemSelected(item)
            }              
        }}>
          <CardView style={{ marginTop:10, marginHorizontal:10 , borderColor:whiteLabel().borderColor, borderWidth:1}}>            
            <View style={{flexDirection:'row'}}>
              <View style={{padding:5, flex:1}}>
                  <AppText size="medium" type="secondaryBold" title={Strings.CRM.RICA_MSISDN} color={Colors.blackColor}></AppText>
                  <AppText title={'MSISDN: ' + item} color={whiteLabel().subText}></AppText>
              </View>
              <View style={{marginRight:10, justifyContent:'center'}}>
                    <TouchableOpacity onPress={() => removeSim(item)}>
                        <SvgIcon icon="DELETE" width="20" height='20' />
                    </TouchableOpacity>                    
              </View>                                               
            </View>
          </CardView>
        </TouchableOpacity>
    );
  };

  return (
    <View style={{marginHorizontal:0, marginTop:5 , height:Dimensions.get("screen").height * 0.35}}>
      <View style={{height:1, backgroundColor:whiteLabel().fieldBorder, marginHorizontal:10}}></View>
      {
        simList.length > 0 &&
        <FlatList
          data={simList}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={10}          
        />      
      }

      {
        simList.length == 0 &&
        <View style={{alignSelf:'center', flex:1, justifyContent:'center'}}>
            <AppText title="Please add relevant RICA MSISDN" size="medium" color={Colors.disabledColor} ></AppText>
        </View>
      }
        
         
    </View>
  )

}