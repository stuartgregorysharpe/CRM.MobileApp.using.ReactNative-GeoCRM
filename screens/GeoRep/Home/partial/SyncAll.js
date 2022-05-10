import { View, Text , TouchableOpacity} from 'react-native'
import React , {useState} from 'react'
import { style } from '../../../../constants/Styles'
import SvgIcon from '../../../../components/SvgIcon'
import Colors, { whiteLabel } from '../../../../constants/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppText } from '../../../../components/common/AppText';


export default function SyncAll(props) {  

  const [expanded,setExpanded] = useState(false);
  const [syncData, setSyncData] = useState(["","",""]);

  const renderSyncData = (item, index) => {
    return (
      <View key={index} style={{ justifyContent:'center', flexDirection:'column'}}>
        <View style={{height:1, backgroundColor:Colors.lightGreyColor}}></View>
        <View style={{flexDirection:'row', marginTop:10, marginBottom:5, marginLeft:5}}>
            <View style={{flex:1}}>
              <AppText title={index === 0 ? 'Locations' : index === 1 ? 'Products' : 'Stock'} color={whiteLabel().mainText} style={{fontSize:11}}></AppText>
            </View>
            <View style={{flex:1}}>
                <AppText title="21 April 2022 18:45" color={Colors.disabledColor} style={{fontSize:11}}></AppText>
            </View>
            <SvgIcon icon="Check_Circle" width='16' height='16' style={{marginRight:10}} />          
        </View>
      </View>
    )
  }

  return (
    <View style={[style.scrollTabCard, {marginTop:10, flexDirection:'column' , paddingTop:5, paddingBottom:5 }]}>
        <View style={{flexDirection:'row', alignItems:'flex-start'}}>      
          <View style={{backgroundColor:whiteLabel().actionFullButtonBackground , borderRadius:5, marginLeft:5 }}> 
              <SvgIcon icon="Sync" width='50' height='50' />
          </View>
          <View style={{flex:1,  marginLeft:10 , marginTop:3}}>
            <AppText title="Sync All" type="secondaryBold" color={whiteLabel().mainText} style={{fontSize:12}} ></AppText>
            <AppText title="Last date synced 12 May 2021" type="secondaryMedium" color={Colors.disabledColor} style={{ fontSize:11, marginTop:5}}></AppText>
          </View>

          <View style={{flexDirection:'row', marginTop:2 , marginRight: 10 , alignItems:'center' , justifyContent:'center'}}>            
            <Icon
                name={`info-outline`}
                size={20}
                color={Colors.redColor} 
            />
            <TouchableOpacity onPress={() => { setExpanded(!expanded)}}>
              <View style={{marginRight:10, marginLeft:10}}>
                {
                  expanded && 
                  <SvgIcon icon={"Up_Arrow"} width='30' height='30'/>
                }
                {
                  !expanded && 
                  <SvgIcon icon={"Bottom_Arrow"} width='30' height='30' />
                }
              </View>
            </TouchableOpacity>
          </View>      
        </View>

        {
          expanded &&
          <View style={{paddingHorizontal:10, marginTop:10}}>
              {
                syncData.map((item, index) => {
                  return renderSyncData(item, index)
                })
              }
          </View>
        }
        
    </View>
  )
}