import * as React from 'react';
import { View, StyleSheet , Text , Image, Dimensions, TouchableOpacity, Platform} from 'react-native';
import { PRIMARY_COLOR } from '../../constants/Colors';
import Images from '../../constants/Images';
import { style } from '../../constants/Styles';

export default function CustomWebViewHeader({title, showIcon, onBackPressed}) {   

  return (
        <View style={[styles.layoutBarContent]} >
            <TouchableOpacity style={{alignSelf:'center'}} onPress={onBackPressed}>
                <View style={styles.layoutBar}>
                    {
                    showIcon &&
                    <Image
                        resizeMethod='resize'  
                        style={{width:15,height:20, marginRight:10}}                 
                        source={Images.backIcon}
                    />
                    }
                    <Text style={style.header} >{title}</Text>
                </View>        
            </TouchableOpacity>
            
        </View>
  )
}

const styles = StyleSheet.create({
  layoutBarContent: {
    
    flexDirection:'row',
    height:Platform.OS == 'android' ? 72 : 62,
    width:Dimensions.get('window').width,  
    paddingLeft:15,
    paddingRight:0,
    paddingTop:Platform.OS == 'android' ? 20:0,
    backgroundColor:PRIMARY_COLOR,    
    alignItems:'center',
    alignContent:'center'
    
  },
  layoutBar: {        
    flexDirection:'row',
    alignSelf:'center'  ,    
    alignItems:'center',
    alignContent:'center'
  },
  
})