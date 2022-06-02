import { View ,StyleSheet } from 'react-native'
import React , {  } from 'react'
import Colors, { whiteLabel } from '../../../../constants/Colors'
import { style } from '../../../../constants/Styles'
import SvgIcon from '../../../../components/SvgIcon'
import { AppText } from '../../../../components/common/AppText'

export default function CheckOut() {
  return (
    <View style={{backgroundColor:whiteLabel().actionFullButtonBackground, borderRadius:7}}>

      <View style={{
        justifyContent:'space-between' , 
        flexDirection:'row', alignItems:'center', paddingHorizontal:10, marginTop:5}}> 
        <View style={{flexDirection:'row' , alignItems:'center' , }}>
          <SvgIcon icon="Profile_Done" width='15' height='15' style={{marginRight:5}} />    
          <AppText title="Curent Call" color="white"></AppText>
        </View>
        <View style={{flexDirection:'row' , alignItems:'center' , }}>
          <SvgIcon icon="Hour_Glass" width='15' height='15' style={{marginRight:5}} />   
          <AppText title="1h 23min 23sec" color="white"></AppText>          
          <SvgIcon icon="Bottom_Arrow" width='20px' height='20px' />
        </View>
      </View>
      
      <View style={[style.scrollTabCard, {marginTop:5, marginBottom:10, marginLeft:10, marginRight:10, paddingTop:0 , paddingBottom:0, alignItems:'center'}]}>      
        <View style={{ marginLeft:10 , height:'100%', paddingTop:12, marginRight:5}}> 
            <SvgIcon icon="Location_Arrow" width='15px' height='15px' />
        </View>
        <View style={{flex:1, marginTop:10 , marginBottom:10}}>
          <AppText title="Spar Century City," size="medium" type="secondaryBold" color={whiteLabel().mainText} ></AppText>
          <AppText title="Cape Town" size="medium" type="secondaryBold" color={whiteLabel().mainText} style={{marginTop:5}}></AppText>
        </View>

        <View style={styles.checkoutStyle}> 
          <AppText title="Check Out" size="medium" type="primaryMedium" color={whiteLabel().actionFullButtonText} ></AppText>
        </View> 

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  checkoutStyle : { 
    backgroundColor:whiteLabel().actionFullButtonBackground, 
    flexDirection:'row', 
    marginRight:10, 
    alignItems:'center', 
    paddingTop:10, 
    paddingBottom:10,
    paddingLeft:25,
    paddingRight:25,
    borderRadius:20
  }

});