
  
  import React from 'react';
  import { View, SafeAreaView, TouchableWithoutFeedback, StyleSheet , TouchableHighlight,Text} from 'react-native';
import Colors from '../../constants/Colors';
import Skeleton from '../Skeleton';
      
    export default  function LoadingView ({ visible }){
        
        if(visible){
            return (                
                <View style={[styles.container]}>
                {Array.from(Array(6)).map((_, key) => (
                    <Skeleton key={key} />  
                ))}
                </View>                
              )
        }else{
            return null;
        }
  }


  const styles = StyleSheet.create({
    container:{
        flex:1,        
        backgroundColor:Colors.bgColor,
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        alignItems:'center',
        justifyContent:'center',
        zIndex:1
    }
  });