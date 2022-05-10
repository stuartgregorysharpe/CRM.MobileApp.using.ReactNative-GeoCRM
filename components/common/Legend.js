
import { View, Text } from 'react-native'
import React from 'react'
import { AppText } from './AppText'
import Colors, { whiteLabel } from '../../constants/Colors';

export default function Legend({types}) {

    const getMargin = () => {
        if(types.length === 3){
            return 10;
        }else if(types.length === 4){
            return 5;
        }
        return 5;
    }
  return (
    <View style={{justifyContent:'space-between', flexDirection:'row', paddingHorizontal:15, marginTop:5}}>
        { 
            types.map((item ,index) => {
                return <View  key={index}  style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{width:12,height:12, borderRadius:2, backgroundColor:item.color , marginRight:getMargin()}}></View>
                    <AppText title={item.name} color={whiteLabel().subText} ></AppText>
                </View>
            })
        }                            
    </View>    
  )
}