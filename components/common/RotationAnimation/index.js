

import { View, Text , ActivityIndicator, Animated , Easing , StyleSheet } from 'react-native'
import React , { useEffect , useMemo , useImperativeHandle, forwardRef} from 'react'
import { Colors, Images } from '../../../constants'
import { whiteLabel } from '../../../constants/Colors';


export const RotationAnimation = forwardRef((props, ref) => {
  
  useImperativeHandle(ref, () => ({
    start() {
      startImageRotateFunction()
    },
  }));

  useEffect(( ) => {    
    startImageRotateFunction()
  },[])
  
  let rotateValueHolder = new Animated.Value(0);
  const startImageRotateFunction = () => { 
      rotateValueHolder.setValue(0);
      Animated.timing(rotateValueHolder, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
      }).start(() => startImageRotateFunction());
  };
  
  const rotateData = rotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={ [styles.syncLoadingButton, props.style] }>      

      <ActivityIndicator size="small" color={whiteLabel().actionFullButtonBackground} />
      {/* <Animated.Image
          style={{
              width: 20,
              height: 20,
              margin:6,
              transform: [{rotate: rotateData}],
          }}
          source={Images.sync}
      />       */}
    </View>
  )
});


const styles = StyleSheet.create({
  container:{
      flexDirection:'row',        
      alignItems:'center'
  },

  syncLoadingButton: {
      width:35,
      height:35,
      alignItems:'center',
      alignContent:'center',
      justifyContent:'center',
      backgroundColor: Colors.whiteColor , 
      borderRadius:5, 
      marginLeft:5,
      borderWidth:1,
      borderColor:whiteLabel().actionFullButtonBackground,
      marginBottom:5
  }

});

