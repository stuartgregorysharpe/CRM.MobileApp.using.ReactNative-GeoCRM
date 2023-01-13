

import { View, Text } from 'react-native'
import React , {useEffect, useState} from 'react'
import Colors, { whiteLabel } from '../../constants/Colors'

export default function IndicatorDotScroller({total, selectedIndex}) {    
    const [indicatorLists, setIndicatorLists] = useState([]);
    useEffect(() =>{
        initLists(total);
    },[total]);
    
    const initLists = (n) => {
        var tmp = [];
        for(var i = 0; i < n; i++){
            tmp.push(i);
        }
        setIndicatorLists(tmp);
    }
  return (
    <View style={{flexDirection:'row' , justifyContent:'center'}}>     

        {
            indicatorLists.map((element, index) => {
                return <View key={index} style={{ 
                    marginLeft:7,
                    width:10,
                    height:10,
                    borderRadius:10,
                    backgroundColor: selectedIndex === index ? whiteLabel().itemSelectedIconFill : Colors.disabledColor
                }}></View>
            })
        }
        
    </View>
  )
}