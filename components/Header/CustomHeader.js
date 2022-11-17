import * as React from 'react';
import { View, StyleSheet , Text , Image} from 'react-native';
import { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';
import HeaderRightView from './HeaderRightView';

export default function CustomHeader({title, showIcon}) {     
  return (
    <View style={[styles.layoutBarContent]}>

      <View style={styles.layoutBar}>
        {
          showIcon &&
          <Image
            resizeMethod='resize'  
            style={{width:20,height:20}}                 
            source={Images.backIcon}
          />
        }
        
        <Text style={{color:"#FFF", fontFamily:Fonts.primaryRegular, fontSize:17, fontWeight:"700"}} >{title}</Text>
      </View>

      <View style={styles.rightContainer}>
        <HeaderRightView></HeaderRightView>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  layoutBarContent: {
    flexDirection:'row',
    height:62,    
    paddingLeft:15,
    paddingRight:0,
    backgroundColor:whiteLabel().headerBackground,    
  },
  layoutBar: {        
    flexDirection:'row',
    alignSelf:'center'  
  },
  rightContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-end'
  }
})