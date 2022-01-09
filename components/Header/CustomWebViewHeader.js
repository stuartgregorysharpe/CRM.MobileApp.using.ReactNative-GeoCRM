import * as React from 'react';
import { View, StyleSheet , Text , Image, Dimensions, TouchableOpacity, Platform} from 'react-native';
import { PRIMARY_COLOR } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';
import HeaderRightView from './HeaderRightView';

export default function CustomWebViewHeader({title, showIcon, onBackPressed}) {   

  return (
        <View style={[styles.layoutBarContent]} >
            <TouchableOpacity style={{alignSelf:'center'}} onPress={onBackPressed}>
                <View style={styles.layoutBar}>
                    {
                    showIcon &&
                    <Image
                        resizeMethod='resize'  
                        style={{width:20,height:20, marginRight:10}}                 
                        source={Images.backIcon}
                    />
                    }
                    <Text style={{color:"#FFF", fontFamily:Fonts.primaryRegular, fontSize:17, fontWeight:"700"}} >{title}</Text>
                </View>        
            </TouchableOpacity>
            
        </View>
  )
}

const styles = StyleSheet.create({
  layoutBarContent: {
    // position:'absolute',
    flexDirection:'row',
    height:Platform.OS == 'android' ? 72 : 62,
    width:Dimensions.get('window').width,  
    paddingLeft:15,
    paddingRight:0,
    paddingTop:Platform.OS == 'android' ? 20:0,
    backgroundColor:PRIMARY_COLOR,    
  },
  layoutBar: {        
    flexDirection:'row',
    alignSelf:'center'  ,    
  },
  
})