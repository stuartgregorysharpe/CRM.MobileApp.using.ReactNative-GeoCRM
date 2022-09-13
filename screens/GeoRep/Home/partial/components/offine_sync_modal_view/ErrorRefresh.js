
import { View , StyleSheet } from 'react-native'
import React from 'react'
import SvgIcon from '../../../../../../components/SvgIcon'
import { whiteLabel } from '../../../../../../constants/Colors'
import { AppText } from '../../../../../../components/common/AppText';
import { Colors } from '../../../../../../constants';

const  ErrorRefresh = () =>{
  return (
    <View style={styles.errorContainer}>        
        <SvgIcon icon="Sync" width='25' height='25' color={whiteLabel().mainText} style={{marginBottom:-8}} />
        <AppText title="Retry" style={{fontSize:9}} color={Colors.whiteColor} ></AppText>
    </View>
  )
}
export default ErrorRefresh;

const styles = StyleSheet.create({

    errorContainer:{
      backgroundColor:'red' , 
      borderRadius:5, 
      marginRight:10, 
      alignItems:'center', 
      paddingBottom:4, 
      paddingHorizontal:2 
    }

})